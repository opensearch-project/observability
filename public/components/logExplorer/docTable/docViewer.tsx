/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import React, { useMemo, useState } from 'react';
import _ from 'lodash';
import { 
  EuiTabbedContent,
  EuiTabbedContentTab
} from '@elastic/eui';
import { DocViewTable } from './detailTable/docDetailTable';
import { JsonCodeBlock } from './json_code_block/json_code_block';

const TABS = ['Table', 'JSON'];

export function DocViewer(props: any) {

  const [curSelectedTab, setCurSelectedTab] = useState<EuiTabbedContentTab>(null);

  // can be passed in later
  const getTabList = (props = null) => {
    return [
      {
        id: _.uniqueId('doc_viewer_tab_'),
        name: 'Table',
        component: (tabProps) => <DocViewTable
                                    filter={ () => {} }
                                    onAddColumn={ () => {} }
                                    onRemoveColumn={ () => {} }
                                    { ...tabProps }
                                  />,
        otherProps: {}
      },
      {
        id: _.uniqueId('doc_viewer_tab_'),
        name: 'JSON',
        component: (tabProps) => <JsonCodeBlock { ...tabProps }/>,
        otherProps: {}
      }
    ];
  };

  const tabs = useMemo(() => {
    return getTabList().map((tab) => {
      const tid = new Date().valueOf()
      const Component = tab.component;
      return {
        id: tab.id,
        name: tab.name,
        content: <Component hit={ props.hit } { ...tab.otherProps }/>
      }
    });
  }, [ props.hit ]);


  if (!tabs.length) {
    // There there's a minimum of 2 tabs active in Discover.
    // This condition takes care of unit tests with 0 tabs.
    return null;
  }

  return (
    <div className="osdDocViewer">
      <EuiTabbedContent 
        tabs={tabs} 
        selectedTab={ curSelectedTab || tabs[0]}
        onTabClick={ (selectedTab: EuiTabbedContentTab) => setCurSelectedTab(selectedTab) }
      />
    </div>
  );
}