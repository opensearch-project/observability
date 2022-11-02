/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './data_configurations_panel.scss';

import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  EuiButton,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiFieldNumber,
  EuiFieldText,
  EuiFlexItem,
  EuiFormRow,
  EuiPanel,
  EuiSpacer,
  EuiTitle,
  htmlIdGenerator,
} from '@elastic/eui';
import { filter, isEmpty } from 'lodash';
import {
  AGGREGATIONS,
  AGGREGATION_OPTIONS,
  BREAKDOWNS,
  CUSTOM_LABEL,
  FINAL_QUERY,
  GROUPBY,
  RAW_QUERY,
  SPAN,
  TIMESTAMP,
  TIME_FIELD,
  TIME_INTERVAL_OPTIONS,
  SELECTED_DATE_RANGE,
} from '../../../../../../../../common/constants/explorer';
import { VIS_CHART_TYPES } from '../../../../../../../../common/constants/shared';
import { composeAggregations } from '../../../../../../../../common/query_manager/utils';
import {
  ConfigList,
  ConfigListEntry,
  DataConfigPanelFieldProps,
  DataConfigPanelProps,
  IField,
  SelectedConfigItem,
  Query,
  VisualizationState,
} from '../../../../../../../../common/types/explorer';
import { TabContext, useRenderVisualization } from '../../../../../hooks';
import { DataConfigItemClickPanel } from '../config_controls/data_config_item_click_panel';
import { DataConfigPanelFields } from '../config_controls/data_config_panel_fields';
import { ButtonGroupItem } from './config_button_group';
import { composeFinalQuery } from '../../../../../../../../common/utils';

const initialDimensionEntry = {
  label: '',
  name: '',
};

const initialSeriesEntry = {
  [CUSTOM_LABEL]: '',
  label: '',
  name: '',
  aggregation: 'count',
};

const initialSpanEntry = { time_field: [], interval: 0, unit: [] };

export const DataConfigPanelItem = ({
  fieldOptionList,
  visualizations,
  queryManager,
}: DataConfigPanelProps) => {
  const { tabId, handleQueryChange, pplService } = useContext<any>(TabContext);
  const requestParams = { tabId };
  const { getVisualizations, fillVisDataInStore } = useRenderVisualization({
    pplService,
    requestParams,
  });
  const { data } = visualizations;
  const {
    indexFields: { availableFields },
    query = {},
  } = data;
  const [configList, setConfigList] = useState<ConfigList>({});
  const [isAddConfigClicked, setIsAddConfigClicked] = useState<boolean>(false);
  const [selectedConfigItem, setSelectedConfigItem] = useState<SelectedConfigItem>({
    index: -1,
    name: '',
  });
  const [isTimeStampSelected, setIsTimeStampSelected] = useState<boolean>(false);
  const { userConfigs } = data;

  useEffect(() => {
    if (userConfigs.dataConfig) {
      setConfigList({
        ...userConfigs.dataConfig,
      });
      setIsAddConfigClicked(false);
    }
  }, [userConfigs?.dataConfig, visualizations.vis.name]);

  const updateList = (value: string, field: string) => {
    const { index, name } = selectedConfigItem;
    let listItem = { ...configList[name][index] };
    listItem = {
      ...listItem,
      [field]: field === 'custom_label' ? value.trim() : value,
    };
    if (field === 'label') {
      listItem.name = value;
    }
    const updatedList = {
      ...configList,
      [name]: [
        ...configList[name].slice(0, index),
        listItem,
        ...configList[name].slice(index + 1, configList[name].length),
      ],
      ...(configList[SPAN] !== undefined && {
        [SPAN]: isTimeStampSelected ? initialSpanEntry : { ...configList[SPAN] },
      }),
    };
    setIsTimeStampSelected(false);
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

  /**
   * Removes element from config list
   * @param index position of element to be removed
   * @param name section name for which cross icon is clicked
   */
  const handleServiceRemove = (index: number, name: string) => {
    let list = { ...configList };
    const isTimeStamp = name === SPAN;
    if (isTimeStamp) {
      delete list[SPAN];
    } else {
      const arr = [...list[name]];
      arr.splice(index, 1);
      list = { ...list, [name]: arr };
    }
    setConfigList(list);
  };

  const handleServiceAdd = (name: string) => {
    setIsAddConfigClicked(true);
    const list = {
      ...configList,
      [name]:
        name !== `${BREAKDOWNS}`
          ? [
              ...(configList[name] ?? []),
              name === AGGREGATIONS ? initialSeriesEntry : initialDimensionEntry,
            ]
          : configList[name] !== undefined
          ? [...configList[name], initialDimensionEntry]
          : [initialDimensionEntry],
    };
    setSelectedConfigItem({ index: list[name].length - 1, name });
    setConfigList(list);
  };

  /**
   * Starts editing for the selected field
   * @param arrIndex position of element to be edited
   * @param sectionName section that will be edited
   * @param timestamp if selected field is span
   */
  const handleServiceEdit = (arrIndex: number, sectionName: string, isTimeStamp: boolean) => {
    setIsTimeStampSelected(isTimeStamp);
    setSelectedConfigItem({ index: arrIndex, name: sectionName });
    setIsAddConfigClicked(true);
  };

  const handleClosePanel = () => {
    const { index, name } = selectedConfigItem;
    if (index > -1) {
      const selectedObj = configList[name][index] ?? [];
      const list = { ...configList };
      if (
        selectedObj?.aggregation !== 'count' &&
        (selectedObj?.aggregation === '' || selectedObj?.name === '')
      ) {
        list[name].splice(index, 1);
      }
      if (isTimeStampSelected) {
        if (selectedObj?.name !== '') {
          const updConfig = [...configList[name]];
          updConfig.splice(index, 1);
          list[GROUPBY] = [...updConfig];
        }
        if (configList.span?.interval === 0 || configList.span?.unit?.length === 0) {
          delete list[SPAN];
        }
      }
      setConfigList(list);
    }
    setIsTimeStampSelected(false);
    setIsAddConfigClicked(false);
  };

  /**
   * Parses current query string to get its stats information.
   * @param query PPL query string.
   * @returns stats information of a parsed query.
   */
  const getStatsTokens = (query: string) => queryManager!.queryParser().parse(query).getStats();

  /**
   * Builds new query based on existing query stats and new configurations.
   * @param prevQuery query string from prevous query state.
   * @param visConfig visualization UI configurations.
   * @param statsTokens parsed stats tokens.
   * @returns
   */
  const getNewQueryString = (prevQuery: string, visConfig: ConfigList, statsTokens) =>
    queryManager!.queryBuilder().build(prevQuery, composeAggregations(visConfig, statsTokens));

  /**
   * Derives new query state from previous state and new configurations.
   * @param prevQuery current query state.
   * @param newQueryString new query.
   * @param visConfig visualization configurations.
   * @returns next query state.
   */
  const getNextQueryState = (
    prevQuery: Query,
    newQueryString: string,
    visConfig: ConfigList
  ): Query => {
    return {
      ...prevQuery,
      [RAW_QUERY]: newQueryString,
      [FINAL_QUERY]: composeFinalQuery(
        newQueryString,
        prevQuery[SELECTED_DATE_RANGE][0] || 'now',
        prevQuery[SELECTED_DATE_RANGE][1] || 'now',
        !isEmpty(visConfig.span?.time_field)
          ? visConfig.span?.time_field[0].name
          : prevQuery['selectedTimestamp'],
        false,
        ''
      ),
    };
  };

  /**
   * calculate next visualization state on update chart event.
   * @param param0 query and visualization config.
   * @returns next visualization state.
   */
  const prepareNextVisState = ({
    query,
    visConfig,
  }: {
    query: Query;
    visConfig: ConfigList;
  }): Array<string | Query> => {
    const newQuery: string = getNewQueryString(
      query[RAW_QUERY],
      visConfig,
      getStatsTokens(query[RAW_QUERY])
    );
    return [newQuery, getNextQueryState(query, newQuery, visConfig)];
  };

  const updateChart = useCallback(() => {
    const [newQueryString, nextQueryState] = prepareNextVisState({
      query,
      visConfig: {
        ...configList,
      },
    });

    handleQueryChange(newQueryString);
    getVisualizations({
      query: nextQueryState[FINAL_QUERY],
      callback: (res) => {
        updateVisUIState({
          visData: res,
          query: nextQueryState,
          visConfMetadata: {
            ...configList,
          },
          visMeta: {
            visId: visualizations.vis?.name || '',
          },
        });
      },
    });
  }, [configList, query, visualizations]);

  const updateVisUIState = ({ visData, query, visConfMetadata, visMeta }: VisualizationState) => {
    fillVisDataInStore({ visData: visData, query, visConfMetadata, visMeta });
  };

  const isPositionButtonVisible = (sectionName: string) =>
    sectionName === AGGREGATIONS &&
    (visualizations.vis.name === VIS_CHART_TYPES.Line ||
      visualizations.vis.name === VIS_CHART_TYPES.Scatter);

  const getTimeStampFilteredFields = (options: IField[]) =>
    filter(options, (i: IField) => i.type !== TIMESTAMP);

  const getOptionsAvailable = (sectionName: string) => {
    if (
      sectionName === AGGREGATIONS ||
      sectionName === BREAKDOWNS ||
      (selectedConfigItem.name === GROUPBY && selectedConfigItem.index === 0) ||
      isTimeStampSelected
    )
      return fieldOptionList;
    if (
      visualizations.vis.name === VIS_CHART_TYPES.Line ||
      visualizations.vis.name === VIS_CHART_TYPES.Scatter
    )
      return filter(fieldOptionList, (i) => i.type === TIMESTAMP);
    return getTimeStampFilteredFields(fieldOptionList);
  };

  const getCommonUI = (title: string) => {
    const { index, name } = selectedConfigItem;
    const selectedObj = isTimeStampSelected ? configList[SPAN] : configList[name][index];
    const isAggregations = name === AGGREGATIONS;
    return (
      <>
        <div className="services">
          <div className="first-division">
            <DataConfigItemClickPanel
              isSecondary
              title={title}
              closeMenu={() => handleClosePanel()}
            />
            <EuiPanel color="subdued" style={{ padding: '0px' }}>
              {/* Aggregation input for Series */}
              {isAggregations && (
                <EuiFormRow label="Aggregation">
                  <EuiComboBox
                    aria-label="aggregation input"
                    placeholder="Select a aggregation"
                    singleSelection={{ asPlainText: true }}
                    options={AGGREGATION_OPTIONS}
                    selectedOptions={
                      selectedObj.aggregation
                        ? [
                            {
                              label: selectedObj.aggregation,
                            },
                          ]
                        : []
                    }
                    onChange={(e) => updateList(e.length > 0 ? e[0].label : '', 'aggregation')}
                  />
                </EuiFormRow>
              )}
              {/* Show input fields for Series when aggregation is not empty  */}
              {isAggregations && selectedObj.aggregation !== '' && (
                <>
                  {getCommonDimensionsField(selectedObj, name)}
                  <EuiFormRow label="Custom label">
                    <EuiFieldText
                      placeholder="Custom label"
                      value={selectedObj[CUSTOM_LABEL]}
                      onChange={(e) => updateList(e.target.value, CUSTOM_LABEL)}
                      aria-label="input label"
                    />
                  </EuiFormRow>
                </>
              )}
              {/* Show input fields for dimensions */}
              {!isAggregations && getCommonDimensionsField(selectedObj, name)}
              {isPositionButtonVisible(name) && (
                <EuiFormRow label="Side">
                  <ButtonGroupItem
                    legend="Side"
                    groupOptions={[
                      { id: 'left', label: 'Left' },
                      { id: 'right', label: 'Right' },
                    ]}
                    idSelected={selectedObj.side || 'right'}
                    handleButtonChange={(id: string) => updateList(id, 'side')}
                  />
                </EuiFormRow>
              )}
            </EuiPanel>
            <EuiSpacer size="s" />
          </div>
        </div>
      </>
    );
  };

  const isTimeStampFieldsSelected = (value: string) =>
    filter(fieldOptionList, (obj) => obj.name === value && obj.type === TIMESTAMP).length > 0;

  const handleTimeStampFieldsChange = (
    value: Array<EuiComboBoxOptionOption<unknown>>,
    field: string
  ) => {
    const { index, name } = selectedConfigItem;
    const updatedList = {
      ...configList,
      [SPAN]:
        configList[SPAN] === undefined
          ? {
              ...initialSpanEntry,
              [field]: value,
            }
          : { ...configList[SPAN], [field]: value },
    };
    if (field === TIME_FIELD && index > -1) {
      handleServiceRemove(index, name);
    }
    setIsTimeStampSelected(true);
    setConfigList(updatedList as ConfigList);
  };

  const getCommonDimensionsField = (selectedObj: ConfigListEntry, name: string) => {
    return (
      <>
        <EuiFormRow label="Field">
          <EuiComboBox
            aria-label="input field"
            placeholder="Select a field"
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            options={getOptionsAvailable(name)}
            selectedOptions={
              isTimeStampSelected
                ? [...configList.span?.time_field]
                : selectedObj?.label
                ? [
                    {
                      label: selectedObj?.label,
                    },
                  ]
                : []
            }
            onChange={(e) =>
              isTimeStampFieldsSelected(e.length > 0 ? e[0].label : '')
                ? handleTimeStampFieldsChange(e, TIME_FIELD)
                : updateList(e.length > 0 ? e[0].label : '', 'label')
            }
          />
        </EuiFormRow>
        {isTimeStampSelected && DateHistogram}
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
        onChange={(e) => updateHistogramConfig(GROUPBY, type, e.target.value)}
        data-test-subj="valueFieldNumber"
      />
      <EuiSpacer size="s" />
    </>
  );

  const DateHistogram = useMemo(() => {
    return (
      <>
        <div className="services">
          <div className="first-division">
            <EuiPanel color="subdued" style={{ padding: '0px' }}>
              <EuiSpacer size="s" />
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
                          interval: e.target?.value ?? 0,
                        },
                      };
                    });
                  }}
                  aria-label="interval field"
                />
              </EuiFormRow>
              <EuiFormRow label="Unit">
                <EuiComboBox
                  aria-label="date unit"
                  placeholder="Select fields"
                  singleSelection={{ asPlainText: true }}
                  isClearable={false}
                  options={TIME_INTERVAL_OPTIONS.map((option) => {
                    return {
                      ...option,
                      label: option.text,
                    };
                  })}
                  selectedOptions={configList.span?.unit ? [...configList.span?.unit] : []}
                  onChange={(e) => handleTimeStampFieldsChange(e, 'unit')}
                />
              </EuiFormRow>
            </EuiPanel>
          </div>
        </div>
      </>
    );
  }, [availableFields, configList.span]);

  const getRenderFieldsObj = (sectionName: string): DataConfigPanelFieldProps => {
    return {
      list: configList[sectionName] ?? [],
      dimensionSpan: configList[SPAN] ?? initialSpanEntry,
      sectionName,
      visType: visualizations.vis.name,
      addButtonText: 'Click to add',
      handleServiceAdd,
      handleServiceRemove,
      handleServiceEdit,
    };
  };

  return isAddConfigClicked ? (
    getCommonUI(selectedConfigItem.name)
  ) : (
    <>
      <EuiTitle size="xxs">
        <h3>Configuration</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      {visualizations.vis.name !== VIS_CHART_TYPES.Histogram ? (
        <>
          {DataConfigPanelFields(getRenderFieldsObj(AGGREGATIONS))}
          <EuiSpacer size="s" />
          {DataConfigPanelFields(getRenderFieldsObj(GROUPBY))}
          <EuiSpacer size="s" />
          {(visualizations.vis.name === VIS_CHART_TYPES.Bar ||
            visualizations.vis.name === VIS_CHART_TYPES.HorizontalBar ||
            visualizations.vis.name === VIS_CHART_TYPES.Line) && (
            <>{DataConfigPanelFields(getRenderFieldsObj(BREAKDOWNS))}</>
          )}
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
