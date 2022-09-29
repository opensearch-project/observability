/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './data_configurations_panel.scss';

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
  EuiToolTip,
} from '@elastic/eui';
import { useDispatch, batch } from 'react-redux';
import { changeQuery } from '../../../../../redux/slices/query_slice';
import { change as changeVizConfig } from '../../../../../redux/slices/viualization_config_slice';
import {
  AGGREGATIONS,
  AGGREGATION_OPTIONS,
  GROUPBY,
  RAW_QUERY,
  TIME_INTERVAL_OPTIONS,
} from '../../../../../../../../common/constants/explorer';
import { ButtonGroupItem } from './config_button_group';
import { VIS_CHART_TYPES } from '../../../../../../../../common/constants/shared';
import { ConfigList, DataConfigPanelProps } from '../../../../../../../../common/types/explorer';
import { TabContext } from '../../../../../hooks';
import { composeAggregations } from '../../../../../../../../common/query_manager/utils';

const initialDimensionEntry = {
  label: '',
  name: '',
};

const initialSeriesEntry = {
  alias: '',
  label: '',
  name: '',
  aggregation: 'count',
};

export const DataConfigPanelItem = ({
  fieldOptionList,
  visualizations,
  queryManager,
}: DataConfigPanelProps) => {
  const dispatch = useDispatch();
  const { tabId, handleQueryChange, fetchData, curVisId } = useContext<any>(TabContext);
  const { data } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;
  const {
    indexFields: { availableFields },
  } = data;
  const [configList, setConfigList] = useState<ConfigList>({});
  const { userConfigs } = data;

  useEffect(() => {
    if (userConfigs && userConfigs.dataConfig) {
      setConfigList({
        ...userConfigs.dataConfig,
      });
    } else if (some(SPECIAL_RENDERING_VIZS, (visType) => visType === visualizations.vis.name)) {
      // any vis that doesn't conform normal metrics/dimensions data confiurations
      setConfigList({
        ...DEFAULT_DATA_CONFIGS[visualizations.vis.name],
      });
    } else {
      // default
      const statsTokens = queryManager.queryParser().parse(data.query.rawQuery).getStats();
      if (!statsTokens) {
        setConfigList({
          metrics: [],
          dimensions: [],
        });
      } else {
        const fieldInfo = statsTokens.groupby?.span?.span_expression?.field;
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
          span: {
            time_field: statsTokens.groupby?.span?.span_expression?.field
              ? [getStandardedOuiField(fieldInfo, 'timestamp')]
              : [],
            interval: statsTokens.groupby?.span?.span_expression?.literal_value ?? '0',
            unit: statsTokens.groupby?.span?.span_expression?.time_unit
              ? [getStandardedOuiField(statsTokens.groupby?.span?.span_expression?.time_unit)]
              : [],
          },
        });
      }
    }
  }, [userConfigs?.dataConfig, visualizations.vis.name]);

  const updateList = (value: string, index: number, name: string, field: string) => {
    const list = { ...configList };
    let listItem = { ...list[name][index] };
    listItem = {
      ...listItem,
      [field === 'custom_label' ? 'alias' : field]: value,
    };
    if (field === 'label') {
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
  };

  const handleServiceAdd = (name: string) => {
    const list = {
      ...configList,
      [name]: [
        ...configList[name],
        name === AGGREGATIONS ? initialSeriesEntry : initialDimensionEntry,
      ],
    };
    setConfigList(list);
  };

  const updateChart = (updatedConfigList: ConfigList = configList) => {
    if (visualizations.vis.name === VIS_CHART_TYPES.Histogram) {
      dispatch(
        changeVizConfig({
          tabId,
          vizId: curVisId,
          data: {
            ...userConfigs,
            dataConfig: {
              ...userConfigs.dataConfig,
              [GROUPBY]: configList[GROUPBY],
              [AGGREGATIONS]: configList[AGGREGATIONS],
            },
          },
        })
      );
    } else {
      const statsTokens = queryManager!.queryParser().parse(data.query.rawQuery).getStats();
      const newQuery = queryManager!
        .queryBuilder()
        .build(data.query.rawQuery, composeAggregations(updatedConfigList, statsTokens));

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
                ...userConfigs.dataConfig,
                [GROUPBY]: configList[GROUPBY],
                [AGGREGATIONS]: configList[AGGREGATIONS],
                breakdowns: updatedConfigList.breakdowns,
                span: updatedConfigList.span,
              },
            },
          })
        );
      });
    }
  };

  const isPositionButtonVisible = (sectionName: string) =>
    sectionName === AGGREGATIONS &&
    (visualizations.vis.name === VIS_CHART_TYPES.Line ||
      visualizations.vis.name === VIS_CHART_TYPES.Scatter);

  const getOptionsAvailable = (sectionName: string) => {
    const selectedFields = {};
    const unselectedFields = fieldOptionList.filter((field) => !selectedFields[field.label]);
    return sectionName === AGGREGATIONS
      ? unselectedFields
      : visualizations.vis.name === VIS_CHART_TYPES.Line ||
        visualizations.vis.name === VIS_CHART_TYPES.Scatter
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
                  {sectionName === GROUPBY && visualizations.vis.name === VIS_CHART_TYPES.HeatMap && (
                    <EuiTitle size="xxs">
                      <h5>{index === 0 ? 'X-Axis' : 'Y-Axis'}</h5>
                    </EuiTitle>
                  )}
                  <EuiPanel color="subdued" style={{ padding: '0px' }}>
                    {sectionName === AGGREGATIONS && (
                      <EuiFormRow
                        label="Aggregation"
                        labelAppend={
                          visualizations.vis.name !== VIS_CHART_TYPES.HeatMap && (
                            <EuiText size="xs">
                              <EuiToolTip
                                position="bottom"
                                content="At least one metric is required to render a chart"
                                delay="regular"
                                anchorClassName="eui-textTruncate"
                              >
                                <EuiIcon
                                  type="cross"
                                  color="danger"
                                  onClick={() => handleServiceRemove(index, sectionName)}
                                />
                              </EuiToolTip>
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
                        visualizations.vis.name !== VIS_CHART_TYPES.HeatMap &&
                        sectionName !== AGGREGATIONS && (
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
        {visualizations.vis.name !== VIS_CHART_TYPES.HeatMap && (
          <EuiFlexItem grow>
            <EuiButton
              fullWidth
              size="s"
              iconType="plusInCircleFilled"
              color="primary"
              onClick={() => handleServiceAdd(sectionName)}
              disabled={
                sectionName === 'dimensions' &&
                (visualizations.vis.name === VIS_CHART_TYPES.Line ||
                  visualizations.vis.name === VIS_CHART_TYPES.Scatter)
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
          configList[GROUPBY] && configList[GROUPBY].length > 0 && configList[GROUPBY][0][type]
            ? configList[GROUPBY][0][type]
            : ''
        }
        onChange={(e) => updateHistogramConfig('dimensions', type, e.target.value)}
        data-test-subj="valueFieldNumber"
      />
      <EuiSpacer size="s" />
    </>
  );

  const getBreakDownFields = useCallback(
    (configList: ConfigList) => {
      return configList[GROUPBY];
    },
    [configList[GROUPBY]]
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
                  options={configList[GROUPBY]}
                  selectedOptions={configList.breakdowns ?? []}
                  onChange={(fields) => {
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
  }, [configList[GROUPBY], configList.breakdowns]);

  const DateHistogram = useMemo(() => {
    return (
      <>
        <div className="services">
          <div className="first-division">
            <EuiPanel color="subdued" style={{ padding: '0px' }}>
              <EuiFormRow label="Timestamp">
                <EuiComboBox
                  aria-label="Accessible screen reader label"
                  placeholder="Select fields"
                  singleSelection
                  options={availableFields
                    .filter((idxField) => idxField.type === 'timestamp')
                    .map((field) => ({ ...field, label: field.name }))}
                  selectedOptions={
                    configList.span?.time_field ? [...configList.span?.time_field] : []
                  }
                  onChange={(field) => {
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
                  onChange={(e) => {
                    e.persist();
                    setConfigList((staleState) => {
                      return {
                        ...staleState,
                        span: {
                          ...staleState.span,
                          interval: e.target?.value ?? 1,
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
                  singleSelection
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
        <h3>Configuration</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      {visualizations.vis.name !== VIS_CHART_TYPES.Histogram ? (
        <>
          <div style={{ display: 'flex' }}>
            <EuiTitle size="xxs">
              <h3>Series</h3>
            </EuiTitle>
            <EuiToolTip
              position="right"
              content="At least one metric is required to render a chart"
              delay="regular"
              anchorClassName="eui-textTruncate"
            >
              <EuiIcon type="iInCircle" color="text" size="m" className="info-icon" />
            </EuiToolTip>
          </div>
          <EuiSpacer size="s" />
          {getCommonUI(configList[AGGREGATIONS], AGGREGATIONS)}
          <EuiSpacer size="m" />
          <EuiTitle size="xxs">
            <h3>Dimensions</h3>
          </EuiTitle>
          <EuiSpacer size="s" />
          {getCommonUI(configList[GROUPBY], GROUPBY)}
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
        >
          Update chart
        </EuiButton>
      </EuiFlexItem>
    </>
  );
};
