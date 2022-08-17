/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useContext, Fragment } from 'react';
import {
  EuiTitle,
  EuiComboBox,
  EuiSpacer,
  EuiButton,
  EuiFieldText,
  EuiFlexItem,
  EuiFormRow,
  EuiIcon,
  EuiPanel,
  EuiText,
  EuiFieldNumber,
  htmlIdGenerator,
} from '@elastic/eui';
import { useDispatch } from 'react-redux';
import {
  AGGREGATION_OPTIONS,
  numericalTypes,
} from '../../../../../../../../common/constants/explorer';
import { ButtonGroupItem } from './config_button_group';
import { visChartTypes } from '../../../../../../../../common/constants/shared';
import { ConfigList } from '../../../../../../../../common/types/explorer';
import { TabContext } from '../../../../../hooks';

export const DataConfigPanelItem = ({ fieldOptionList, visualizations }: any) => {
  const dispatch = useDispatch();
  const { tabId, curVisId, changeVisualizationConfig } = useContext<any>(TabContext);
  const { data } = visualizations;
  const { userConfigs } = data;

  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;

  const initialConfigEntry = {
    label: '',
    aggregation: '',
    custom_label: '',
    name: '',
    side: 'right',
    type: '',
  };

  const [configList, setConfigList] = useState<ConfigList>({});

  useEffect(() => {
    if (userConfigs && userConfigs.dataConfig && userConfigs.dataConfig.valueOptions) {
      setConfigList({
        ...userConfigs.dataConfig.valueOptions,
      });
    }
  }, [userConfigs?.dataConfig?.valueOptions, visualizations.vis.name]);

  const updateList = (value: string, index: number, name: string, field: string) => {
    let list = { ...configList };
    let listItem = { ...list[name][index] };
    listItem = {
      ...listItem,
      [field]: value,
    };
    if (field === 'label') {
      listItem.type = value !== '' ? fields.find((x) => x.name === value)?.type : '';
      listItem.name = value;
    }
    const updatedList = {
      ...list,
      [name]: [
        ...list[name].slice(0, index),
        listItem,
        ...list[name].slice(index + 1, list[name].length),
      ],
    };
    setConfigList(updatedList);
  };

  const updateHistogramConfig = (configName: string, fieldName: string, value: string) => {
    const list = { ...configList };
    let listItem = { ...list[configName][0] };
    listItem[fieldName] = value;
    const updatedList = {
      ...list,
      [configName]: [listItem],
    };
    setConfigList(updatedList);
  };

  const handleServiceRemove = (index: number, name: string) => {
    const list = { ...configList };
    const arr = [...list[name]];
    arr.splice(index, 1);
    const updatedList = { ...list, [name]: arr };
    setConfigList(updatedList);
  };

  const handleServiceAdd = (name: string) => {
    const updatedList = { ...configList, [name]: [...configList[name], initialConfigEntry] };
    setConfigList(updatedList);
  };

  const updateChart = () => {
    dispatch(
      changeVisualizationConfig({
        tabId,
        vizId: curVisId,
        data: {
          ...userConfigs,
          dataConfig: {
            ...userConfigs.dataConfig,
            valueOptions: {
              dimensions: configList.dimensions,
              metrics: configList.metrics,
            },
          },
        },
      })
    );
  };

  const isPositionButtonVisible = (sectionName: string) =>
    sectionName === 'metrics' &&
    (visualizations.vis.name === visChartTypes.Line ||
      visualizations.vis.name === visChartTypes.Scatter);

  const getOptionsAvailable = (sectionName: string) => {
    let selectedFields = {};
    for (const key in configList) {
      configList[key] && configList[key].forEach((field) => (selectedFields[field.label] = true));
    }
    const unselectedFields = fieldOptionList.filter((field) => !selectedFields[field.label]);
    return sectionName === 'metrics'
      ? unselectedFields
      : visualizations.vis.name === visChartTypes.Line
      ? unselectedFields.filter((i) => i.type === 'timestamp')
      : unselectedFields;
  };

  const getCommonUI = (lists, sectionName: string) =>
    lists &&
    lists.map((singleField, index: number) => (
      <Fragment key={index}>
        <div key={index} className="services">
          <div className="first-division">
            {sectionName === 'dimensions' && visualizations.vis.name === visChartTypes.HeatMap && (
              <EuiTitle size="xxs">
                <h5>{index === 0 ? 'X-Axis' : 'Y-Axis'}</h5>
              </EuiTitle>
            )}
            <EuiPanel color="subdued" style={{ padding: '0px' }}>
              <EuiFormRow
                label="Aggregation"
                labelAppend={
                  visualizations.vis.name !== visChartTypes.HeatMap &&
                  lists.length !== 1 && (
                    <EuiText size="xs">
                      <EuiIcon
                        type="cross"
                        color="danger"
                        onClick={() => handleServiceRemove(index, sectionName)}
                      />
                    </EuiText>
                  )
                }
              >
                <EuiComboBox
                  aria-label="Accessible screen reader label"
                  placeholder="Select a aggregation"
                  singleSelection={{ asPlainText: true }}
                  options={AGGREGATION_OPTIONS}
                  selectedOptions={
                    singleField.aggregation ? [{ label: singleField.aggregation }] : []
                  }
                  onChange={(e) =>
                    updateList(e.length > 0 ? e[0].label : '', index, sectionName, 'aggregation')
                  }
                />
              </EuiFormRow>
              <EuiFormRow label="Field">
                <EuiComboBox
                  aria-label="Accessible screen reader label"
                  placeholder="Select a field"
                  singleSelection={{ asPlainText: true }}
                  options={getOptionsAvailable(sectionName)}
                  selectedOptions={singleField.label ? [{ label: singleField.label }] : []}
                  onChange={(e) =>
                    updateList(e.length > 0 ? e[0].label : '', index, sectionName, 'label')
                  }
                />
              </EuiFormRow>

              <EuiFormRow label="Custom label">
                <EuiFieldText
                  placeholder="Custom label"
                  value={singleField.custom_label}
                  onChange={(e) => updateList(e.target.value, index, sectionName, 'custom_label')}
                  aria-label="Use aria labels when no actual label is in use"
                />
              </EuiFormRow>

              {isPositionButtonVisible(sectionName) && (
                <EuiFormRow label="Side">
                  <ButtonGroupItem
                    legend="Side"
                    groupOptions={[
                      { id: 'left', label: 'Left' },
                      { id: 'right', label: 'Right' },
                    ]}
                    idSelected={singleField.side || 'right'}
                    handleButtonChange={(id: string) => updateList(id, index, sectionName, 'side')}
                  />
                </EuiFormRow>
              )}

              <EuiSpacer size="s" />
              {visualizations.vis.name !== visChartTypes.HeatMap && lists.length - 1 === index && (
                <EuiFlexItem grow>
                  <EuiButton
                    fullWidth
                    iconType="plusInCircleFilled"
                    color="primary"
                    onClick={() => handleServiceAdd(sectionName)}
                    disabled={
                      sectionName === 'dimensions' && visualizations.vis.name === visChartTypes.Line
                    }
                  >
                    Add
                  </EuiButton>
                </EuiFlexItem>
              )}
            </EuiPanel>
          </div>
        </div>
        <EuiSpacer size="s" />
      </Fragment>
    ));

  const getNumberField = (type: string) => (
    <>
      <EuiFieldNumber
        id={htmlIdGenerator('input-number')()}
        fullWidth
        placeholder="auto"
        value={
          configList?.dimensions &&
          configList?.dimensions.length > 0 &&
          configList.dimensions[0][type]
            ? configList.dimensions[0][type]
            : ''
        }
        onChange={(e) => updateHistogramConfig('dimensions', type, e.target.value)}
        data-test-subj="valueFieldNumber"
      />
      <EuiSpacer size="s" />
    </>
  );

  return (
    <>
      <EuiTitle size="xxs">
        <h3>Data Configurations</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      {visualizations.vis.name !== visChartTypes.Histogram ? (
        <>
          <EuiTitle size="xxs">
            <h3>Dimensions</h3>
          </EuiTitle>
          {getCommonUI(configList.dimensions, 'dimensions')}

          <EuiSpacer size="s" />
          <EuiTitle size="xxs">
            <h3>Metrics</h3>
          </EuiTitle>
          {getCommonUI(configList.metrics, 'metrics')}
        </>
      ) : (
        <>
          <EuiTitle size="xxs">
            <h3>Bucket Size</h3>
          </EuiTitle>
          {getNumberField('bucketSize')}

          <EuiSpacer size="s" />
          <EuiTitle size="xxs">
            <h3>Bucket Offset</h3>
          </EuiTitle>
          {getNumberField('bucketOffset')}
        </>
      )}
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
