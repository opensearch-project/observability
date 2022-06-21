/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { EuiTitle, EuiComboBox, EuiSpacer, EuiAccordion, EuiButton, EuiFieldText, EuiFlexItem, EuiFormRow, EuiIcon, EuiPanel, EuiText } from '@elastic/eui';
import { useDispatch, useSelector } from 'react-redux';
// import { updateFields } from 'public/components/event_analytics/redux/slices/field_slice';
import { updateFields } from '../../../../../../event_analytics/redux/slices/field_slice';
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
  const [metricsList, setMetricsList] = useState([{ label: "", name: "", aggregation: "", custom_label: "" }]);
  const [dimenstionsList, setDimensionsList] = useState([{ label: "", name: "", aggregation: "", custom_label: "" }]);

  const { data } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;

  useEffect(() => {
    if (fieldOptionList.length > 0 && metricsList.length === 0) {
      const list = [...metricsList];
      list[0]['label'] = fieldOptionList[0].label;
      list[0]['name'] = fieldOptionList[0].label;
      list[0]['aggregation'] = AGGREGATION_OPTIONS[0].label;
      setMetricsList(list);
    }

    if (fieldOptionList.length > 0 && dimenstionsList.length === 0) {
      const list = [...metricsList];
      list[0]['label'] = fieldOptionList[0].label;
      list[0]['name'] = fieldOptionList[0].label;
      list[0]['aggregation'] = AGGREGATION_OPTIONS[0].label;
      setDimensionsList(list);
    }

  }, [fieldOptionList]);

  const onfieldOptionChange = (e, index) => {
    const list = [...metricsList];
    list[index]['label'] = e[0].label;
    list[index]['name'] = e[0].label;
    setMetricsList(list);
  };

  const onAggregationChange = (e, index) => {
    const list = [...metricsList];
    list[index]['aggregation'] = e[0].label;
    setMetricsList(list);
  };

  const onCustomLabelChange = (e, index) => {
    const list = [...metricsList];
    list[index]['custom_label'] = e.target.value;
    setMetricsList(list);
  };

  const onDimfieldOptionChange = (e, index) => {
    const list = [...dimenstionsList];
    list[index]['label'] = e[0].label;
    list[index]['name'] = e[0].label;
    setDimensionsList(list);
  };

  const onDimAggregationChange = (e, index) => {
    const list = [...dimenstionsList];
    list[index]['aggregation'] = e[0].label;
    setDimensionsList(list);
  };

  const onDimCustomLabelChange = async (e, index) => {
    const list = [...dimenstionsList];
    list[index]['custom_label'] = e.target.value;
    setDimensionsList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...metricsList];
    list.splice(index, 1);
    setMetricsList(list);
  };

  //Metrics State
  const handleServiceAdd = async () => {
    setMetricsList([...metricsList, { label: "", name: "", aggregation: "", custom_label: "" }]);
    let newMertics = [];
    newMertics.push(metricsList)
    let newDimesnions = [];
    newDimesnions.push(dimenstionsList)
    dispatch(
      renderExplorerVis({
        tabId: tabID,
        data: {
          ...explorerVisualizations,
          dataConfig: {
            metrics: newMertics,
            dimenstions: newDimesnions
          }
        }
      })
    );
  };

  //Dimensions state
  const handleDimServiceAdd = () => {
    setDimensionsList([...dimenstionsList, { label: "", name: "", aggregation: "", custom_label: "" }]);
    let newMertics = [];
    newMertics.push(metricsList)
    let newDimesnions = [];
    newDimesnions.push(dimenstionsList)
    dispatch(
      renderExplorerVis({
        tabId: tabID,
        data: {
          ...explorerVisualizations,
          dataConfig: {
            metrics: newMertics,
            dimenstions: newDimesnions
          }
        }
      })
    );
  };

  const handleDimServiceRemove = (index) => {
    const list = [...dimenstionsList];
    list.splice(index, 1);
    setDimensionsList(list);
  };

  const renderMetricsUI = () => {
    return (
      <>
        {metricsList.map((singleField, index) => (
          <><div key={index} className="services">
            <div className="first-division">
              <EuiPanel color="subdued">
                <EuiFormRow
                  label="Aggregation"
                  labelAppend={
                    metricsList.length !== 1 && (
                      <EuiText size="xs">
                        <EuiIcon type="cross" color="danger" onClick={() => handleServiceRemove(index)} />
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
                    onChange={(e) => onAggregationChange(e, index)}
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
                    onChange={(e) => onfieldOptionChange(e, index)}
                  />
                </EuiFormRow>

                <EuiFormRow
                  label="Custom label"
                >
                  <EuiFieldText
                    placeholder="Custom label"
                    value={singleField.custom_label}
                    onChange={(e) => onCustomLabelChange(e, index)}
                    aria-label="Use aria labels when no actual label is in use" />
                </EuiFormRow>
                <EuiSpacer size="s" />
                {metricsList.length - 1 === index && metricsList.length < 4 && (
                  <EuiFlexItem grow={true}>
                    <EuiButton fullWidth iconType="plusInCircleFilled" color='primary' onClick={handleServiceAdd}>
                      Add
                    </EuiButton>
                  </EuiFlexItem>
                )}
              </EuiPanel>
            </div>
          </div>
            <EuiSpacer size="s" />
          </>
        ))
        }
      </>
    )
  }

  const renderDimensionsUI = () => {
    return (
      <>
        <EuiSpacer size="s" />
        {dimenstionsList.map((singleDimField, index) => (
          <><div key={index} className="services">
            <div>
              <EuiPanel color="subdued">
                <EuiFormRow
                  label="Aggregation"
                  labelAppend={
                    dimenstionsList.length !== 1 && (
                      <EuiText size="xs">
                        <EuiIcon type="cross" color="danger" onClick={() => handleDimServiceRemove(index)} />
                      </EuiText>
                    )
                  }
                >
                  <EuiComboBox
                    aria-label="Accessible screen reader label"
                    placeholder="Select a aggregation"
                    singleSelection={{ asPlainText: true }}
                    options={AGGREGATION_OPTIONS}
                    selectedOptions={singleDimField.aggregation ? [{ 'label': singleDimField.aggregation }] : []}
                    onChange={(e) => onDimAggregationChange(e, index)}
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
                    selectedOptions={singleDimField.label ? [{ 'label': singleDimField.label }] : []}
                    onChange={(e) => onDimfieldOptionChange(e, index)}
                  />
                </EuiFormRow>

                <EuiFormRow
                  label="Custom label"
                >
                  <EuiFieldText
                    placeholder="Custom label"
                    value={singleDimField.custom_label}
                    onChange={(e) => onDimCustomLabelChange(e, index)}
                    aria-label="Use aria labels when no actual label is in use" />
                </EuiFormRow>
                <EuiSpacer size="s" />
                {dimenstionsList.length - 1 === index && dimenstionsList.length < 4 && (
                  <EuiFlexItem grow={true}>
                    <EuiButton fullWidth iconType="plusInCircleFilled" color='primary' onClick={handleDimServiceAdd}>
                      Add
                    </EuiButton>
                  </EuiFlexItem>
                )}
              </EuiPanel>
            </div>
          </div>
            <EuiSpacer size="s" />
          </>
        ))}
      </>
    )
  }

  return (
    <>
      <EuiTitle size="xxs">
        <h3>Data Cofigurations</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiTitle size="xxs">
        <h3>Dimensions</h3>
      </EuiTitle>
      {renderMetricsUI()}
      <EuiSpacer size="s" />
      <EuiTitle size="xxs">
        <h3>Metrics</h3>
      </EuiTitle>
      {renderDimensionsUI()}
    </>
  );
};
