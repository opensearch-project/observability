/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './config_panel.scss';
import { uniqueId } from 'lodash';

import React, { memo } from 'react';
import { EuiForm, EuiSpacer, EuiTabbedContent } from '@elastic/eui';
import { PanelItem } from './configPanelItem';
import { ConfigEditor } from './config_editor/config_editor';
import { getDefaultSpec } from '../visualization_specs/default_spec';
// import { PlotlyVizEditor } from '../shared_components/plotly_viz_editor';

export const ConfigPanelWrapper = memo(function ConfigPanelWrapper(props: any) {
  return <LayerPanels {...props} />;
});

function LayerPanels(props: any) {
  const { explorerFields } = props;

  const panelItems = [
    {
      paddingTitle: 'X-axis',
      advancedTitle: 'Advanced',
      dropdownList:
        explorerFields && explorerFields.availableFields ? explorerFields.availableFields : [],
    },
    {
      paddingTitle: 'Y-axis',
      advancedTitle: 'Advanced',
      dropdownList: [],
    },
  ];

  const ConfigPanelItems = (props) => {
    const { panelItems } = props;
    return (
      <EuiForm className="lnsConfigPanel">
        {panelItems.map((item) => {
          return (
            <section key={uniqueId('vis-conf-panel-')}>
              <PanelItem
                paddingTitle={item.paddingTitle}
                advancedTitle={item.advancedTitle}
                dropdownList={item.dropdownList}
              >
                here goes advanced setting
              </PanelItem>
              <EuiSpacer size="s" />
            </section>
          );
        })}
      </EuiForm>
    );
  };

  const tabs = [
    {
      id: 'style-panel',
      name: 'Styles',
      content: <ConfigEditor spec={getDefaultSpec()} />,
    },
    {
      id: 'setting-panel',
      name: 'Settings',
      content: <ConfigPanelItems panelItems={panelItems} />,
    },
  ];

  return (
    <EuiTabbedContent
      id="vis-config-tabs"
      tabs={tabs}
      initialSelectedTab={tabs[0]}
      autoFocus="selected"
    />
  );
}
