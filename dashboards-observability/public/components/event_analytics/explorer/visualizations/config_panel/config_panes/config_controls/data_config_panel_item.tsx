/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { some } from 'lodash';
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
import { useDispatch, useSelector, batch } from 'react-redux';
import {
  render as renderExplorerVis,
  selectExplorerVisualization,
} from '../../../../../../event_analytics/redux/slices/visualization_slice';
import { changeQuery } from '../../../../../../event_analytics/redux/slices/query_slice';
import {
  change as changeVizConfig,
  selectVisualizationConfig,
} from '../../../../../../event_analytics/redux/slices/viualization_config_slice';
import {
  AGGREGATION_OPTIONS,
  numericalTypes,
  RAW_QUERY,
  TIME_INTERVAL_OPTIONS,
} from '../../../../../../../../common/constants/explorer';
import { ButtonGroupItem } from './config_button_group';
import { visChartTypes } from '../../../../../../../../common/constants/shared';
import { ConfigList } from '../../../../../../../../common/types/explorer';
import { TabContext } from '../../../../../hooks';
import { QueryManager } from '../../../../../../../../query_manager';
import { composeAggregations } from '../../../../../../../../query_manager/utils';

const initialConfigEntry = {
  label: '',
  aggregation: '',
  custom_label: '',
  name: '',
  side: 'right',
  type: '',
};

const DEFAULT_DATA_CONFIGS = {
  [visChartTypes.HeatMap]: {
    dimensions: [initialConfigEntry, initialConfigEntry],
    metrics: [initialConfigEntry],
  },
  [visChartTypes.Histogram]: {
    dimensions: [{ bucketSize: '', bucketOffset: '' }],
  },
};

const SPECIAL_RENDERING_VIZS = [visChartTypes.HeatMap, visChartTypes.Histogram];

export const DataConfigPanelItem = ({ fieldOptionList, visualizations }: any) => {
  const dispatch = useDispatch();
  const { tabId, handleQuerySearch, handleQueryChange, setTempQuery, fetchData } = useContext<any>(
    TabContext
  );
  // const explorerVisualizations = useSelector(selectExplorerVisualization)[tabId];
  const explorerVisualizationConfigs = useSelector(selectVisualizationConfig)[tabId];
  const { data } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;
  const {
    indexFields: { availableFields },
  } = data;
  const [configList, setConfigList] = useState<ConfigList>({});

  // useEffect(() => {
  //   const qm = new QueryManager();
  //   const statsTokens = qm.queryParser().parse(data.query.rawQuery).getStats();
  //   console.log('statsToekns useEffect: ', statsTokens);
  //   if (!statsTokens) {
  //     setConfigList({
  //       metrics: [],
  //       dimensions: [],
  //     });
  //   } else {
  //     setConfigList({
  //       metrics: statsTokens.aggregations.map((agg) => ({
  //         label: agg.function?.value_expression,
  //         name: agg.function?.value_expression,
  //         aggregation: agg.function?.name,
  //       })),
  //       dimensions: statsTokens.groupby?.group_fields?.map((agg) => ({
  //         label: agg.name ?? '',
  //         name: agg.name ?? '',
  //       })),
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (
  //     configList.dimensions &&
  //     configList.metrics &&
  //     visualizations.data?.rawVizData?.[visualizations.vis.name] === undefined
  //   ) {
  //     dispatch(
  //       renderExplorerVis({
  //         tabId,
  //         data: {
  //           ...explorerVisualizations,
  //           [visualizations.vis.name]: {
  //             dataConfig: {
  //               metrics: configList.metrics,
  //               dimensions: configList.dimensions,
  //             },
  //           },
  //         },
  //       })
  //     );
  //   }
  // }, [configList]);

  useEffect(() => {
    if (
      data.rawVizData?.[visualizations.vis.name] &&
      data.rawVizData?.[visualizations.vis.name].dataConfig
    ) {
      setConfigList((staleState) => {
        return {
          ...staleState,
          ...data.rawVizData[visualizations.vis.name].dataConfig,
        };
      });
    } else if (some(SPECIAL_RENDERING_VIZS, (visType) => visType === visualizations.vis.name)) {
      // any vis that doesn't conform normal metrics/dimensions data confiurations
      setConfigList({
        ...DEFAULT_DATA_CONFIGS[visualizations.vis.name],
      });
    } else {
      // default
      const qm = new QueryManager();
      const statsTokens = qm.queryParser().parse(data.query.rawQuery).getStats();
      if (!statsTokens) {
        setConfigList({
          metrics: [],
          dimensions: [],
        });
      } else {
        setConfigList({
          metrics: statsTokens.aggregations.map((agg) => ({
            alias: agg.alias,
            label: agg.function?.value_expression,
            name: agg.function?.value_expression,
            aggregation: agg.function?.name,
          })),
          dimensions: statsTokens.groupby?.group_fields?.map((agg) => ({
            label: agg.name ?? '',
            name: agg.name ?? '',
          })),
        });
      }
    }

    // if (
    //   data.rawVizData?.[visualizations.vis.name] &&
    //   data.rawVizData?.[visualizations.vis.name].dataConfig
    // ) {
    //   setConfigList({
    //     ...data.rawVizData[visualizations.vis.name].dataConfig,
    //   });
    // } else if (
    //   visualizations.vis.name !== visChartTypes.HeatMap &&
    //   visualizations.vis.name !== visChartTypes.Histogram &&
    //   (data.defaultAxes.xaxis || data.defaultAxes.yaxis)
    // ) {
    //   // const { xaxis, yaxis } = data.defaultAxes;
    //   // setConfigList({
    //   //   dimensions: [...(xaxis && xaxis)],
    //   //   metrics: [
    //   //     ...(yaxis && yaxis.map((item, i) => ({ ...item, side: i === 0 ? 'left' : 'right' }))),
    //   //   ],
    //   // });
    // } else if (visualizations.vis.name === visChartTypes.HeatMap) {
    //   setConfigList({
    //     dimensions: [initialConfigEntry, initialConfigEntry],
    //     metrics: [initialConfigEntry],
    //   });
    // } else if (visualizations.vis.name === visChartTypes.Histogram) {
    //   setConfigList({
    //     dimensions: [{ bucketSize: '', bucketOffset: '' }],
    //   });
    // }
  }, [
    data.defaultAxes,
    data.rawVizData?.[visualizations.vis.name]?.dataConfig,
    visualizations.vis.name,
  ]);

  const updateList = (value: string, index: number, name: string, field: string) => {
    const list = { ...configList };
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
    // updateChart(updatedList);
  };

  const updateHistogramConfig = (configName: string, fieldName: string, value: string) => {
    const list = { ...configList };
    const listItem = { ...list[configName][0] };
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
    // updateChart(updatedList);
  };

  const handleServiceAdd = (name: string) => {
    const updatedList = { ...configList, [name]: [...configList[name], initialConfigEntry] };
    setConfigList(updatedList);
  };

  const updateChart = (updatedConfigList = configList) => {
    const qm = new QueryManager();
    const statsTokens = qm.queryParser().parse(data.query.rawQuery).getStats();
    // const test_updatedConfigList = {
    //   ...updatedConfigList,
    //   span: statsTokens.groupby?.span ?? null,
    // };
    console.log('statsTokens: ', statsTokens);
    // console.log('test_updatedConfigList: ', test_updatedConfigList);
    // console.log('composed config: ', composeAggregations(updatedConfigList, statsTokens));
    console.log('updatedConfigList: ', updatedConfigList);
    const newQuery = qm
      .queryBuilder()
      .build(data.query.rawQuery, composeAggregations(updatedConfigList, statsTokens));

    // console.log('newly built query: ', newQuery);

    batch(async () => {
      await handleQueryChange(newQuery);
      await dispatch(
        changeQuery({
          tabId,
          query: {
            ...data.query,
            [RAW_QUERY]: newQuery,
          },
        })
      );
      await fetchData();
      await dispatch(
        changeVizConfig({
          tabId,
          vizId: visualizations.vis.name,
          data: {
            dataConfig: {
              metrics: updatedConfigList.metrics,
              dimensions: updatedConfigList.dimensions,
              breakdowns: updatedConfigList.breakdowns,
            },
          },
        })
      );
    });
  };

  const isPositionButtonVisible = (sectionName: string) =>
    sectionName === 'metrics' && visualizations.vis.name === visChartTypes.Line;

  const getOptionsAvailable = (sectionName: string) => {
    const selectedFields = {};
    // for (const key in configList) {
    //   configList[key] && configList[key].forEach((field) => (selectedFields[field.label] = true));
    // }
    // fieldOptionList.filter((field) => !selectedFields[field.label]);
    const unselectedFields = fieldOptionList.filter((field) => !selectedFields[field.label]);
    // console.log('unselectedFields: ', unselectedFields);
    return sectionName === 'metrics'
      ? unselectedFields
      : visualizations.vis.name === visChartTypes.Line
      ? unselectedFields.filter((i) => i.type === 'timestamp')
      : unselectedFields;
  };

  const getCommonUI = (lists, sectionName: string) => {
    return (
      <>
        {Array.isArray(lists) &&
          lists.map((singleField, index: number) => (
            <>
              <div key={index} className="services">
                <div className="first-division">
                  {sectionName === 'dimensions' &&
                    visualizations.vis.name === visChartTypes.HeatMap && (
                      <EuiTitle size="xxs">
                        <h5>{index === 0 ? 'X-Axis' : 'Y-Axis'}</h5>
                      </EuiTitle>
                    )}
                  <EuiPanel color="subdued" style={{ padding: '0px' }}>
                    {sectionName === 'metrics' && (
                      <EuiFormRow
                        label="Aggregation"
                        labelAppend={
                          visualizations.vis.name !== visChartTypes.HeatMap && (
                            <EuiText size="xs">
                              <EuiIcon
                                type="cross"
                                color="danger"
                                onClick={() => handleServiceRemove(index, sectionName)}
                              />
                            </EuiText>
                            // Array.isArray(lists) &&
                            // lists.length !== 1 && (
                            //   <EuiText size="xs">
                            //     <EuiIcon
                            //       type="cross"
                            //       color="danger"
                            //       onClick={() => handleServiceRemove(index, sectionName)}
                            //     />
                            //   </EuiText>
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
                            updateList(
                              e.length > 0 ? e[0].label : '',
                              index,
                              sectionName,
                              'aggregation'
                            )
                          }
                        />
                      </EuiFormRow>
                    )}
                    <EuiFormRow
                      label="Field"
                      labelAppend={
                        visualizations.vis.name !== visChartTypes.HeatMap &&
                        sectionName !== 'metrics' && (
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
                        onChange={(e) =>
                          updateList(e.target.value, index, sectionName, 'custom_label')
                        }
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
                          handleButtonChange={(id: string) =>
                            updateList(id, index, sectionName, 'side')
                          }
                        />
                      </EuiFormRow>
                    )}
                    <EuiSpacer size="s" />
                  </EuiPanel>
                </div>
              </div>
              <EuiSpacer size="s" />
            </>
          ))}
        {visualizations.vis.name !== visChartTypes.HeatMap && (
          <EuiFlexItem grow>
            <EuiButton
              fullWidth
              size="s"
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
      </>
    );
  };

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
        // onBlur={() => updateChart()}
        data-test-subj="valueFieldNumber"
      />
      <EuiSpacer size="s" />
    </>
  );

  const getBreakDownFields = useCallback(
    (configList) => {
      return configList.dimensions;
    },
    [configList.dimensions]
  );

  const Breakdowns = useMemo(() => {
    return (
      <>
        <div className="services">
          <div className="first-division">
            <EuiPanel color="subdued" style={{ padding: '0px' }}>
              <EuiFormRow label="Fields">
                <EuiComboBox
                  aria-label="Accessible screen reader label"
                  placeholder="Select fields"
                  singleSelection={false}
                  options={configList.dimensions}
                  selectedOptions={configList.breakdowns ?? []}
                  onChange={(fields) => {
                    console.log('breakdown fields: ', fields);
                    setConfigList((staleState) => {
                      return {
                        ...staleState,
                        breakdowns: fields,
                      };
                    });
                  }}
                />
              </EuiFormRow>
            </EuiPanel>
          </div>
        </div>
      </>
    );
  }, [configList.dimensions, configList.breakdowns]);
  // console.log('visualizations: ', visualizations);
  const DateHistogram = useMemo(() => {
    console.log('configList: ', configList);
    return (
      <>
        <div className="services">
          <div className="first-division">
            <EuiPanel color="subdued" style={{ padding: '0px' }}>
              <EuiFormRow label="Timestamp">
                <EuiComboBox
                  aria-label="Accessible screen reader label"
                  placeholder="Select fields"
                  singleSelection={{ asPlainText: false }}
                  options={availableFields
                    .filter((idxField) => idxField.type === 'timestamp')
                    .map((field) => ({ ...field, label: field.name }))}
                  selectedOptions={configList.span?.time_field ? [...configList.span?.time_field] : []}
                  onChange={(field) => {
                    console.log('timestamp fields: ', field);
                    setConfigList((staleState) => {
                      return {
                        ...staleState,
                        span: {
                          ...staleState.span,
                          time_field: field,
                        },
                      };
                    });
                  }}
                />
              </EuiFormRow>
              <EuiFormRow label="Interval">
                <EuiFieldNumber
                  placeholder="Placeholder text"
                  value={configList.span?.interval ?? 1}
                  min={1}
                  onChange={(val) => {
                    setConfigList((staleState) => {
                      return {
                        ...staleState,
                        span: {
                          ...staleState.span,
                          interval: val,
                        },
                      };
                    });
                  }}
                  aria-label="Use aria labels when no actual label is in use"
                />
              </EuiFormRow>
              <EuiFormRow label="Unit">
                <EuiComboBox
                  aria-label="Accessible screen reader label"
                  placeholder="Select fields"
                  singleSelection={false}
                  options={TIME_INTERVAL_OPTIONS.map((option) => {
                    return {
                      ...option,
                      label: option.text,
                    };
                  })}
                  selectedOptions={configList.span?.unit ? [...configList.span?.unit] : []}
                  onChange={(unit) => {
                    setConfigList((staleState) => {
                      return {
                        ...staleState,
                        span: {
                          ...staleState.span,
                          unit,
                        },
                      };
                    });
                  }}
                />
              </EuiFormRow>
            </EuiPanel>
          </div>
        </div>
      </>
    );
  }, [availableFields, configList.span]);

  return (
    <>
      <EuiTitle size="xxs">
        <h3>Data Configurations</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      {visualizations.vis.name !== visChartTypes.Histogram ? (
        <>
          <EuiTitle size="xxs">
            <h3>Metrics</h3>
          </EuiTitle>
          <EuiSpacer size="s" />
          {getCommonUI(configList.metrics, 'metrics')}
          <EuiSpacer size="m" />
          <EuiTitle size="xxs">
            <h3>Dimensions</h3>
          </EuiTitle>
          <EuiSpacer size="s" />
          {getCommonUI(configList.dimensions, 'dimensions')}
          <EuiSpacer size="s" />
          <EuiTitle size="xxs">
            <h3>Date Histogram</h3>
          </EuiTitle>
          {DateHistogram}
          {/* <EuiTitle size="xxs">
            <h3>Breakdowns</h3>
          </EuiTitle>
          {Breakdowns} */}
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
      <EuiSpacer size="m" />
      <EuiFlexItem grow={false}>
        <EuiButton
          data-test-subj="visualizeEditorRenderButton"
          iconType="play"
          onClick={() => updateChart()}
          size="s"
          // disabled
        >
          Update chart
        </EuiButton>
      </EuiFlexItem>
    </>
  );
};
