/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { EuiTitle, EuiComboBox, EuiSpacer, EuiAccordion, EuiButton, EuiFieldText, EuiFlexItem, EuiFormRow, EuiIcon, EuiPanel, EuiText } from '@elastic/eui';
import { useDispatch, useSelector } from 'react-redux';
// import { AGGREGATION_OPTIONS } from 'common/constants/explorer';
import { render as renderExplorerVis } from '../../../../../../event_analytics/redux/slices/visualization_slice';
import { selectExplorerVisualization } from '../../../../../../event_analytics/redux/slices/visualization_slice';

const AGGREGATION_OPTIONS = [
  {
    label: 'COUNT',
  },
  {
    label: 'SUM',
  },
  {
    label: 'AVERAGE',
  },
  {
    label: 'MAX',
  },
  {
    label: 'MIN',
  },
  {
    label: 'VAR_SAMP',
  },
  {
    label: 'VAR_POP',
  },
  {
    label: 'STDDEV_SAMP',
  },
  {
    label: 'STDDEV_POP',
  },
];

export const DataConfigPanelItem = ({
  fieldOptionList,
  visualizations,
  tabID
}: any) => {
  const dispatch = useDispatch();
  const explorerVisualizations = useSelector(selectExplorerVisualization)[tabID];
  const [configList, setConfigList] = useState({
    dimensions: [{ label: "", aggregation: "", custom_label: "", name: ""}],
    metrics: [{ label: "", aggregation: "", custom_label: "", name:""}],
  });

  const { data } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;
  const updateList = (value, index, name, field) => {
    let list = {...configList};
    let listItem = list[name][index];
    listItem = {...listItem, [field]: value};
    list[name][index] = listItem;
    setConfigList(list);
  }

  const onfieldOptionChange = (e, index, name) => {
    console.log("index", index, name); 
    // const list = { ...configList, [name]: [ ...configList[name], [index]: { ...configList[name][index], ['label']: e[0].label }] };
    updateList(e[0].label, index, name, 'label'); 
    updateList(e[0].label, index, name, 'name'); 
  };

  const onAggregationChange = (e, index: number, name: string) => {
    updateList(e[0].label, index, name, 'aggregation'); 
  };

  const onCustomLabelChange = (e, index, name) => {
    updateList(e.target.value, index, name, 'custom_label');
  };


  const handleServiceRemove = (index, name) => {
    const list = { ...configList };
    list[name].splice(index, 1);
    setConfigList(list);
  };

  const handleServiceAdd = async (name: string) => {
    let newEntry = { label: "", aggregation: "", custom_label: "", name: "" };
    let newList = { ...configList, [name]: [...configList[name], newEntry] }
    setConfigList(newList);
  };

  const updateChart = () => { 
    dispatch(
      renderExplorerVis({
        tabId: tabID,
        data: {
          ...explorerVisualizations,
          dataConfig: {
            metrics: configList.metrics,
            dimensions: configList.dimensions
          }
        }
      })
    );
  }

  const getCommonUI = (lists, sectionName: string) => lists.map((singleField, index) =>  (
      <><div key={index} className="services">
        <div className="first-division">
          <EuiPanel color="subdued">
            <EuiFormRow
              label="Aggregation"
              labelAppend={
                lists.length !== 1 && (
                  <EuiText size="xs">
                    <EuiIcon type="cross" color="danger" onClick={() => handleServiceRemove(index, sectionName)} />
                  </EuiText>
                )
              }
            >
              <EuiComboBox
                aria-label="Accessible screen reader label"
                placeholder="Select a aggregation"
                singleSelection={{ asPlainText: true }}
                options={AGGREGATION_OPTIONS}
                selectedOptions={singleField.aggregation ? [{ 'label': singleField.aggregation }] : []}
                onChange={(e) => onAggregationChange(e, index, sectionName)}
              />
  
            </EuiFormRow>
            <EuiFormRow
              label="Field"
            >
              <EuiComboBox
                aria-label="Accessible screen reader label"
                placeholder="Select a field"
                singleSelection={{ asPlainText: true }}
                options={fieldOptionList}
                selectedOptions={singleField.label ? [{ 'label': singleField.label }] : []}
                onChange={(e) => onfieldOptionChange(e, index, sectionName)}
              />
            </EuiFormRow>
  
            <EuiFormRow
              label="Custom label"
            >
              <EuiFieldText
                placeholder="Custom label"
                value={singleField.custom_label}
                onChange={(e) => onCustomLabelChange(e, index, sectionName)}
                aria-label="Use aria labels when no actual label is in use" />
            </EuiFormRow>
            <EuiSpacer size="s" />
            { lists.length - 1 === index &&
              <EuiFlexItem grow={true}>
                <EuiButton fullWidth iconType="plusInCircleFilled" color='primary' onClick={() => handleServiceAdd(sectionName)}>
                  Add
                </EuiButton>
              </EuiFlexItem>
  }
          </EuiPanel>
        </div>
      </div>
        <EuiSpacer size="s" />
      </>
    ))

  return (
    <>
      <EuiTitle size="xxs">
        <h3>Data Cofigurations</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiTitle size="xxs">
        <h3>Dimensions</h3>
      </EuiTitle>
      {getCommonUI(configList.dimensions, 'dimensions')}
      
      <EuiSpacer size="s" />
      <EuiTitle size="xxs">
        <h3>Metrics</h3>
      </EuiTitle>
      {getCommonUI(configList.metrics, 'metrics')}
      <EuiFlexItem grow={false}>
            <EuiButton
              data-test-subj="visualizeEditorRenderButton"
              iconType="play"
              onClick={updateChart}
              size="s"
            >
              Update chart
            </EuiButton>
        </EuiFlexItem>
    </>
  );
};
