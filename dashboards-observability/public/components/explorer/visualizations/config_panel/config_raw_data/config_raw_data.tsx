/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useContext, useEffect } from 'react';
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
  curVisId,
  xaxis,
  yaxis,
  setXaxis,
  setYaxis,
}: any) => {
  const [pagination, setPagination] = useState({ pageIndex: 0 });
  const [hjsonConfig, setHjsonConfig] = useState(spec);
  // const [xaxis, setXaxis] = useState([]);
  // const [yaxis, setYaxis] = useState([]);
  // const labelAddedFields = queriedVizRes?.metadata?.fields.map((field) => {
  //   return {
  //     ...field,
  //     label: field.name,
  //   };
  // });
  // useEffect(() => {
  //   const needsRotate = curVisId === 'horizontal_bar';
  //   if (needsRotate) {
  //     setXaxis(labelAddedFields.slice(0, labelAddedFields.length - 1));
  //     setYaxis([labelAddedFields[labelAddedFields.length - 1]]);
  //   } else {
  //     setYaxis(labelAddedFields.slice(0, labelAddedFields.length - 1));
  //     setXaxis([labelAddedFields[labelAddedFields.length - 1]]);
  //   }
  // }, []);

  const panelItems = useMemo(() => {
    console.log('curVisId: ', curVisId);
    return curVisId !== 'horizontal_bar'
      ? [
          {
            paddingTitle: 'X-axis',
            advancedTitle: 'Advanced',
            dropdownList: queriedVizRes?.metadata?.fields || [],
            selectedAxis: xaxis,
            isSingleSelection: true,
            onAxisChage: setXaxis,
          },
          {
            paddingTitle: 'Y-axis',
            advancedTitle: 'Advanced',
            dropdownList: queriedVizRes?.metadata?.fields || [],
            selectedAxis: yaxis,
            isSingleSelection: false,
            onAxisChage: setYaxis,
          },
        ]
      : [
          {
            paddingTitle: 'X-axis',
            advancedTitle: 'Advanced',
            dropdownList: queriedVizRes?.metadata?.fields || [],
            selectedAxis: xaxis,
            isSingleSelection: false,
            onAxisChage: setXaxis,
          },
          {
            paddingTitle: 'Y-axis',
            advancedTitle: 'Advanced',
            dropdownList: queriedVizRes?.metadata?.fields || [],
            isSingleSelection: true,
            selectedAxis: yaxis,
            onAxisChage: setYaxis,
          },
        ];
  }, [curVisId, queriedVizRes?.metadata?.fields, xaxis, yaxis]);

  const handleConfigChange = (changes) => {
    onConfigUpdate({
      ...changes,
    });
  };

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
                      selectedAxis={item.selectedAxis}
                      isSingleSelection={item.isSingleSelection}
                      onSelectChange={item.onAxisChage}
                    />
                    <EuiSpacer size="s" />
                  </section>
                );
              })}
              <EuiAccordion id="accordion1" buttonContent="Advanced">
                <ConfigEditor
                  setToast={setToast}
                  onConfigUpdate={() => {
                    // handleConfigChange({
                    //   xaxis,
                    //   yaxis,
                    // });
                  }}
                  spec={spec}
                />
              </EuiAccordion>
            </EuiPanel>
          </EuiForm>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
