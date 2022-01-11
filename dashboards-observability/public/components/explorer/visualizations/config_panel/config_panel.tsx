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
import { VizRawDataPanel } from './config_raw_data/config_raw_data';
// import { PlotlyVizEditor } from '../shared_components/plotly_viz_editor';

export const ConfigPanelWrapper = memo(function ConfigPanelWrapper(props: any) {
  return <LayerPanels {...props} />;
});

function LayerPanels({ explorerFields, vizVectors }: any) {
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
    // const { panelItems } = props;
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
      id: 'raw-data-panel',
      name: 'Raw Data',
      content: (
        <VizRawDataPanel vizVectors={vizVectors?.jsonData} columns={vizVectors?.metadata?.fields} />
      ),
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
