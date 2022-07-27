/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useContext } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  render as renderExplorerVis,
  selectExplorerVisualization,
} from '../../../../../../event_analytics/redux/slices/visualization_slice';
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
  const { tabId } = useContext<any>(TabContext);
  const explorerVisualizations = useSelector(selectExplorerVisualization)[tabId];
  const { data } = visualizations;

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
    if (
      configList.dimensions &&
      configList.metrics &&
      visualizations.data?.rawVizData?.[visualizations.vis.name] === undefined
    ) {
      dispatch(
        renderExplorerVis({
          tabId,
          data: {
            ...explorerVisualizations,
            [visualizations.vis.name]: {
              dataConfig: {
                metrics: configList.metrics,
                dimensions: configList.dimensions,
              },
            },
          },
        })
      );
    }
  }, [configList]);

  useEffect(() => {
    if (
      data.rawVizData?.[visualizations.vis.name] &&
      data.rawVizData?.[visualizations.vis.name].dataConfig
    ) {
      setConfigList({
        ...data.rawVizData[visualizations.vis.name].dataConfig,
      });
    } else if (
      visualizations.vis.name !== visChartTypes.HeatMap &&
      visualizations.vis.name !== visChartTypes.Histogram &&
      (data.defaultAxes.xaxis || data.defaultAxes.yaxis)
    ) {
      const { xaxis, yaxis } = data.defaultAxes;
      setConfigList({
        dimensions: [...(xaxis && xaxis)],
        metrics: [...(yaxis && yaxis.map((item, i) => ({ ...item, side: i === 0 ? 'left' : 'right' })))],
      });
    } else if (visualizations.vis.name === visChartTypes.HeatMap) {
      setConfigList({
        dimensions: [initialConfigEntry, initialConfigEntry],
        metrics: [initialConfigEntry],
      });
    } else if (visualizations.vis.name === visChartTypes.Histogram) {
      setConfigList({
        dimensions: [{ bucketSize: '', bucketOffset: '' }],
      });
    }
  }, [
    data.defaultAxes,
    data.rawVizData?.[visualizations.vis.name]?.dataConfig,
    visualizations.vis.name,
  ]);

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
    updateChart(updatedList);
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
    updateChart(updatedList);
  };

  const handleServiceAdd = (name: string) => {
    const updatedList = { ...configList, [name]: [...configList[name], initialConfigEntry] };
    setConfigList(updatedList);
  };

  const updateChart = (updatedConfigList = configList) => {
    dispatch(
      renderExplorerVis({
        tabId,
        data: {
          ...explorerVisualizations,
          [visualizations.vis.name]: {
            dataConfig: {
              metrics: updatedConfigList.metrics,
              dimensions: updatedConfigList.dimensions,
            },
          },
        },
      })
    );
  };

  const isPositionButtonVisible = (sectionName: string) =>
    sectionName === 'metrics' && visualizations.vis.name === visChartTypes.Line;

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
      <>
        <div key={index} className="services">
          <div className="first-division">
            {sectionName === 'dimensions' && visualizations.vis.name === visChartTypes.HeatMap && (
              <EuiTitle size="xxs">
                <h5>{index === 0 ? 'X-Axis' : 'Y-Axis'}</h5>
              </EuiTitle>
            )}
            <EuiPanel color="subdued" style={{ padding: '0px' }}>
            {sectionName == 'metrics' && (
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
            )}
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
                    disabled={sectionName === "dimensions" && visualizations.vis.name === visChartTypes.Line}
                  >
                    Add
                  </EuiButton>
                </EuiFlexItem>
              )}
            </EuiPanel>
          </div>
        </div>
        <EuiSpacer size="s" />
      </>
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
        onBlur={() => updateChart()}
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
          onClick={() => updateChart()}
          size="s"
          disabled
        >
          Update chart
        </EuiButton>
      </EuiFlexItem>
    </>
  );
};
