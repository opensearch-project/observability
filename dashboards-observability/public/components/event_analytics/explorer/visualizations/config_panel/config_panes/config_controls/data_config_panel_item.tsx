/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { uniqueId, isEmpty } from 'lodash';
import { EuiTitle, EuiComboBox, EuiSpacer, EuiAccordion, EuiButton, EuiFieldText, EuiFlexItem, EuiFormRow, EuiIcon, EuiPanel, EuiText } from '@elastic/eui';
import { AGGREGATION_OPTIONS } from 'common/constants/explorer';

export const DataConfigPanelItem = ({
  paddingTitle,
  selectedAxis,
  dropdownList,
  onSelectChange,
  isInvalid,
  isSingleSelection = false,
  isClearable = true,
}: any) => {
  const options = dropdownList.map((item) => {
    return {
      ...item,
      label: item.name,
    };
  });
  // const { data } = visualizations;
  // const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;
  // console.log('fields ', fields)
  console.log('options @@@@',options)
  const [metricsList, setMetricsList] = useState([{ field_option: "", aggregation: "", custom_label: "" }]);
  const [dimenstionsList, setDimensionsList] = useState([{ field_option: "", aggregation: "", custom_label: "" }]);

  const onfieldOptionChange = (e, index) => {
    const list = [...metricsList];
    list[index]['field_option'] = e[0].label;
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
    list[index]['field_option'] = e[0].label;
    setDimensionsList(list);
  };

  const onDimAggregationChange = (e, index) => {
    const list = [...dimenstionsList];
    list[index]['aggregation'] = e[0].label;
    setDimensionsList(list);
  };

  const onDimCustomLabelChange = (e, index) => {
    const list = [...dimenstionsList];
    list[index]['custom_label'] = e.target.value;
    setDimensionsList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...metricsList];
    list.splice(index, 1);
    setMetricsList(list);
  };

  const handleServiceAdd = () => {
    setMetricsList([...metricsList, { field_option: "", aggregation: "", custom_label: "" }]);
  };


  const handleDimServiceAdd = () => {
    setDimensionsList([...dimenstionsList, { field_option: "", aggregation: "", custom_label: "" }]);
  };

  const handleDimServiceRemove = (index) => {
    const list = [...dimenstionsList];
    list.splice(index, 1);
    setDimensionsList(list);
  };
  const fieldOptionList = fields.map((name) => {
    return { label: name.name };
  })

  console.log('metricsList ', metricsList);
  console.log('dimenstionsList ', dimenstionsList);

  const renderMetricsUI = () => {
    return (
      <>
        <EuiAccordion id={'metricsAccordian'} buttonContent="Metrics">
          <EuiSpacer size="s" />
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
                      options={options}
                      selectedOptions={singleField.field_option ? [{ 'label': singleField.field_option }] : []}
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
                </EuiPanel>
              </div>
              {metricsList.length - 1 === index && metricsList.length < 4 && (
                <EuiFlexItem grow={true}>
                  <EuiButton fullWidth iconType="plusInCircleFilled" color='primary' onClick={handleServiceAdd}>
                    Add
                  </EuiButton>
                </EuiFlexItem>
              )}
            </div>
            </>
          ))}
        </EuiAccordion>
      </>
    )
  }

  const renderDimensionsUI = () => {
    return (
      <>
        <EuiAccordion id={'DimensionsAccordian'} buttonContent="Dimensions">
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
                      selectedOptions={singleDimField.field_option ? [{ 'label': singleDimField.field_option }] : []}
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
                </EuiPanel>
              </div>
              {dimenstionsList.length - 1 === index && dimenstionsList.length < 4 && (
                <EuiFlexItem grow={true}>
                  <EuiButton fullWidth iconType="plusInCircleFilled" color='primary' onClick={handleDimServiceAdd}>
                    Add
                  </EuiButton>
                </EuiFlexItem>
              )}
            </div>
            </>
          ))}
        </EuiAccordion>
      </>
    )
  }
  
  return (
    <>
      <EuiTitle size="xxs">
        <h3>{paddingTitle}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      {/* <EuiComboBox
        id={uniqueId('axis-select-')}
        placeholder="Select a field"
        options={options}
        selectedOptions={selectedAxis}
        isInvalid={isInvalid ?? isEmpty(selectedAxis)}
        isClearable={isClearable}
        singleSelection={isSingleSelection}
        onChange={onSelectChange}
        aria-label="Use aria labels when no actual label is in use"
      /> */}

{renderMetricsUI()}
  <EuiSpacer size="s" />
{renderDimensionsUI()}
    </>
  );
};
