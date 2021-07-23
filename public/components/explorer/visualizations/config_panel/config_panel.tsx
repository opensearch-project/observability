/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import './config_panel.scss';

import React, { memo } from 'react';
import { 
  EuiForm,
  EuiSpacer,
  EuiTabbedContent
} from '@elastic/eui';
import { PanelItem } from './configPanelItem'
import { ConfigPanelWrapperProps } from './types';

export const ConfigPanelWrapper = memo(function ConfigPanelWrapper(props: ConfigPanelWrapperProps) {
  return <LayerPanels {...props} />;
});

function LayerPanels(
  props: ConfigPanelWrapperProps & {
    activeDatasourceId: string;
  }
) {
  const {    
    queryResults
  } = props;

  const panelItems = [
    {
      paddingTitle: 'X-axis',
      advancedTitle: 'Advanced',
      dropdownList: queryResults && queryResults.schema ? queryResults.schema : []
    },
    {
      paddingTitle: 'Y-axis',
      advancedTitle: 'Advanced',
      dropdownList: []
    }
  ];

  const ConfigPanelItems = (props) => {
    const {
      panelItems
    } = props;
    return (
      <EuiForm className="lnsConfigPanel">
        { panelItems.map((item) => {
          return (
            <>
              <PanelItem
                paddingTitle={ item.paddingTitle }
                advancedTitle={ item.advancedTitle }
                dropdownList={ item.dropdownList }
              >
                here goes advanced setting
              </PanelItem>
              <EuiSpacer size="s" />
            </>
          );
        }) }
      </EuiForm>
    );
  }

  const tabs = [
    {
      id: 'setting-panel',
      name: 'Settings',
      content: <ConfigPanelItems 
                panelItems={ panelItems }
              />
    }
  ];

  return (
    <EuiTabbedContent
      id="vis-config-tabs"
      tabs={ tabs }
      initialSelectedTab={ tabs[1] }
      autoFocus="selected"
    />
  );
}
