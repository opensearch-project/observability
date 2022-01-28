/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useContext } from 'react';
import {
  EuiForm,
  EuiSpacer,
  EuiTabbedContent,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiAccordion,
} from '@elastic/eui';
import { EuiInMemoryTable } from '@elastic/eui';
import { PanelItem } from '../configPanelItem';
import { ConfigEditor } from '../config_editor/config_editor';
import { PlotlyVizEditor } from '../../shared_components/plotly_viz_editor';
// import { ConfigPanelItems } from '../configPanelItem';

export const VizDataPanel = ({
  spec,
  onConfigUpdate,
  setToast,
  vizVectors,
  columns,
  customVizConfigs,
  queriedVizRes,
}: any) => {
  const [pagination, setPagination] = useState({ pageIndex: 0 });
  const [hjsonConfig, setHjsonConfig] = useState(spec);
  const panelItems = [
    {
      paddingTitle: 'X-axis',
      advancedTitle: 'Advanced',
      dropdownList: queriedVizRes?.metadata?.fields || [],
      defaultAxis: queriedVizRes?.metadata?.fields[queriedVizRes?.metadata?.fields.length - 1],
    },
    {
      paddingTitle: 'Y-axis',
      advancedTitle: 'Advanced',
      dropdownList: queriedVizRes?.metadata?.fields || [],
      defaultAxis: queriedVizRes?.metadata?.fields[0],
    },
  ];

  return (
    <>
      <EuiFlexGroup
        className="visEditorSidebar"
        direction="column"
        justifyContent="spaceBetween"
        gutterSize="none"
        responsive={false}
      >
        <EuiFlexItem className="visEditorSidebar__formWrapper">
          <EuiForm className="visEditorSidebar__form">
            <EuiPanel paddingSize="m">
              {panelItems.map((item, index) => {
                return (
                  <section key={index}>
                    <PanelItem
                      paddingTitle={item.paddingTitle}
                      advancedTitle={item.advancedTitle}
                      dropdownList={item.dropdownList}
                      defaultAxis={item.defaultAxis}
                    >
                      <ConfigEditor
                        setToast={setToast}
                        onConfigUpdate={onConfigUpdate}
                        spec={spec}
                      />
                    </PanelItem>
                    <EuiSpacer size="s" />
                  </section>
                );
              })}
              <EuiAccordion id="accordion1" buttonContent="Advanced">
                <ConfigEditor setToast={setToast} onConfigUpdate={onConfigUpdate} spec={spec} />
              </EuiAccordion>
            </EuiPanel>
          </EuiForm>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
