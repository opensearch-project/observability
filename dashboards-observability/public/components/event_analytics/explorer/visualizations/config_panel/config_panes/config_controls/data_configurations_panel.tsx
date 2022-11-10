/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './data_configurations_panel.scss';

import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  EuiButton,
  EuiCallOut,
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
  REQUIRED_FIELDS,
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
  SelectedItemConfig,
  Query,
  VisualizationState,
  DimensionSpan,
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
  const { data, vis } = visualizations;
  const {
    indexFields: { availableFields },
    query = {},
  } = data;
  const { Bar, HorizontalBar, Line, Scatter, Histogram } = VIS_CHART_TYPES;
  const [configList, setConfigList] = useState<ConfigList>({});
  const [isAddConfigClicked, setIsAddConfigClicked] = useState<boolean>(false);
  const [selectedItemConfig, setSelectedItemConfig] = useState<SelectedItemConfig>({
    index: -1,
    name: '',
  });
  const [selectedItem, setSelectedItem] = useState<ConfigListEntry | DimensionSpan | {}>({});
  const [isTimeStampSelected, setIsTimeStampSelected] = useState<boolean>(false);
  const { userConfigs } = data;
  const { time_field, unit, interval } = configList[SPAN] || {};
  const isSpanError = !isEmpty(time_field) && (unit?.length === 0 || Number(interval) === 0);

  useEffect(() => {
    if (userConfigs.dataConfig) {
      setConfigList({
        ...userConfigs.dataConfig,
      });
      setIsAddConfigClicked(false);
    }
  }, [userConfigs?.dataConfig, vis.name]);

  const updateList = (value: string, field: string) => {
    let listItem = { ...selectedItem };
    if (isTimeStampSelected) {
      delete configList[SPAN];
      listItem = {};
      updateConfigState(false, isAddConfigClicked, {});
    }
    switch (field) {
      case 'custom_label':
        listItem = {
          ...listItem,
          [field]: value.trim(),
        };
        break;
      case 'label':
        listItem.name = value;
      default:
        listItem = {
          ...listItem,
          [field]: value,
        };
    }
    setSelectedItem(listItem);
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

  const removeListItem = (
    arr: ConfigListEntry[],
    index: number,
    count: number,
    objToReplace?: ConfigListEntry
  ) => (objToReplace ? arr.splice(index, count, objToReplace) : arr.splice(index, count));

  const updateConfigState = (timestamp: boolean, isConfigClicked: boolean, selectedObj: {}) => {
    setSelectedItem(selectedObj);
    setIsTimeStampSelected(timestamp);
    setIsAddConfigClicked(isConfigClicked);
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
      removeListItem(arr, index, 1);
      list = { ...list, [name]: arr };
    }
    setConfigList(list);
  };

  const handleServiceAdd = (name: string) => {
    switch (name) {
      case AGGREGATIONS:
        setSelectedItem(initialSeriesEntry);
        break;
      case BREAKDOWNS:
      case GROUPBY:
        setSelectedItem(initialDimensionEntry);
        break;
    }
    setIsAddConfigClicked(true);
    setSelectedItemConfig({
      index: configList[name] !== undefined ? configList[name].length : 0,
      name,
    });
  };

  /**
   * Starts editing for the selected field
   * @param arrIndex position of element to be edited
   * @param sectionName section that will be edited
   * @param timestamp if selected field is span
   */
  const handleServiceEdit = (arrIndex: number, sectionName: string, isTimeStamp: boolean) => {
    setSelectedItemConfig({ index: arrIndex, name: sectionName });
    updateConfigState(
      isTimeStamp,
      true,
      isTimeStamp ? configList[SPAN] : configList[sectionName][arrIndex]
    );
  };

  const handleClosePanel = () => {
    const { index, name } = selectedItemConfig;

    let list = { ...configList };
    // Replaces span object when timestamp is selected.
    if (isTimeStampSelected && !isEmpty(selectedItem?.time_field)) {
      list = {
        ...list,
        [SPAN]: selectedItem as DimensionSpan,
      };
    } else {
      // Checks if entry is valid then either replace or add the entry in the config list.
      const item = { ...(selectedItem as ConfigListEntry) };
      if (item.aggregation === 'count' || (item.aggregation !== '' && item.name !== '')) {
        let configItem = list[name] !== undefined ? [...list[name]] : [];
        if (configItem.length > 0) removeListItem(configItem, index, 1, item);
        else configItem = [item];
        list = {
          ...list,
          [name]: configItem,
        };
      } else {
        removeListItem(list[name], index, 1);
      }
    }
    setConfigList(list);
    updateConfigState(false, false, {});
  };

  /**
   * Parses current query string to get its stats information.
   * @param query PPL query string.u
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
          : prevQuery.selectedTimestamp,
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
            visId: vis?.name || '',
          },
        });
      },
    });
  }, [configList, query, visualizations]);

  const updateVisUIState = ({ visData, query, visConfMetadata, visMeta }: VisualizationState) => {
    fillVisDataInStore({ visData, query, visConfMetadata, visMeta });
  };

  const getTimeStampFilteredFields = (options: IField[]) =>
    filter(options, (i: IField) => i.type !== TIMESTAMP);

  const getOptionsAvailable = (sectionName: string) => {
    const { name, index } = selectedItemConfig;
    if (sectionName === AGGREGATIONS || sectionName === BREAKDOWNS)
      return getTimeStampFilteredFields(fieldOptionList);
    if (vis.name === Line || vis.name === Scatter)
      return filter(fieldOptionList, (i) => i.type === TIMESTAMP);
    if (
      (name === GROUPBY &&
        isEmpty(time_field) &&
        (index === 0 || index === Number(configList[GROUPBY]?.length) + 1)) ||
      isTimeStampSelected
    )
      return fieldOptionList;

    return getTimeStampFilteredFields(fieldOptionList);
  };

  const getSelectedOptions = (field: string) =>
    selectedItem[field]
      ? [
          {
            label: selectedItem[field],
          },
        ]
      : [];

  const getCommonUI = (title: string) => {
    const { name } = selectedItemConfig;
    const isAggregations = name === AGGREGATIONS;
    const obj = { ...(selectedItem as ConfigListEntry) };
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
                    isInvalid={obj?.aggregation === ''}
                    options={AGGREGATION_OPTIONS}
                    selectedOptions={getSelectedOptions('aggregation')}
                    onChange={(e) => updateList(e.length > 0 ? e[0].label : '', 'aggregation')}
                  />
                </EuiFormRow>
              )}
              {/* Show input fields for Series when aggregation is not empty  */}
              {isAggregations && obj.aggregation !== '' && (
                <>
                  {getCommonDimensionsField(name)}
                  <EuiFormRow label="Custom label">
                    <EuiFieldText
                      placeholder="Custom label"
                      value={obj[CUSTOM_LABEL]}
                      onChange={(e) => updateList(e.target.value, CUSTOM_LABEL)}
                      aria-label="input label"
                    />
                  </EuiFormRow>
                </>
              )}
              {/* Show input fields for dimensions */}
              {!isAggregations && getCommonDimensionsField(name)}
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
    const { index, name } = selectedItemConfig;
    const updatedSpan =
      selectedItem.time_field === undefined
        ? { ...initialSpanEntry, [field]: value }
        : { ...selectedItem, [field]: value };
    if (field === TIME_FIELD && index > -1) {
      handleServiceRemove(index, name);
    }
    updateConfigState(true, isAddConfigClicked, updatedSpan);
  };

  const onDimensionFieldChange = (value: Array<EuiComboBoxOptionOption<unknown>>) =>
    isTimeStampFieldsSelected(value.length > 0 ? value[0].label : '')
      ? handleTimeStampFieldsChange(value, TIME_FIELD)
      : updateList(value.length > 0 ? value[0].label : '', 'label');

  const getCommonDimensionsField = (name: string) => {
    const options = isTimeStampSelected
      ? [...selectedItem?.time_field]
      : getSelectedOptions('label');
    return (
      <>
        <EuiFormRow label="Field">
          <EuiComboBox
            aria-label="input field"
            placeholder="Select a field"
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            isInvalid={selectedItem?.label === ''}
            options={getOptionsAvailable(name)}
            selectedOptions={options}
            onChange={onDimensionFieldChange}
          />
        </EuiFormRow>
        {isTimeStampSelected && DateHistogram()}
      </>
    );
  };

  const getNumberField = (type: string) => {
    const dimension = configList[GROUPBY];
    const value = dimension && dimension.length > 0 && dimension[0][type] ? dimension[0][type] : '';
    return (
      <>
        <EuiFieldNumber
          id={htmlIdGenerator('input-number')()}
          fullWidth
          placeholder="auto"
          value={value}
          onChange={(e) => updateHistogramConfig(GROUPBY, type, e.target.value)}
          data-test-subj="valueFieldNumber"
        />
        <EuiSpacer size="s" />
      </>
    );
  };

  const DateHistogram = () => {
    return (
      <>
        <div className="services">
          <div className="first-division">
            <EuiPanel color="subdued" style={{ padding: '0px' }}>
              <EuiSpacer size="s" />
              <EuiFormRow label="Interval">
                <EuiFieldNumber
                  placeholder="Placeholder text"
                  value={selectedItem?.interval ?? 1}
                  min={1}
                  onChange={(e) => {
                    e.persist();
                    setSelectedItem({
                      ...selectedItem,
                      interval: Number(e.target?.value) ?? 0,
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
                  isInvalid={selectedItem?.unit.length === 0}
                  options={TIME_INTERVAL_OPTIONS.map((option) => {
                    return {
                      ...option,
                      label: option.text,
                    };
                  })}
                  selectedOptions={[...selectedItem?.unit] ?? []}
                  onChange={(e) => handleTimeStampFieldsChange(e, 'unit')}
                />
              </EuiFormRow>
            </EuiPanel>
          </div>
        </div>
      </>
    );
  };

  const spanErrorMessage = (
    <EuiCallOut title="error" color="danger" iconType="alert">
      {REQUIRED_FIELDS}
    </EuiCallOut>
  );

  const getRenderFieldsObj = (sectionName: string): DataConfigPanelFieldProps => {
    return {
      list: configList[sectionName] ?? [],
      dimensionSpan: configList[SPAN] ?? initialSpanEntry,
      isSpanError,
      sectionName,
      visType: vis.name,
      addButtonText: 'Click to add',
      handleServiceAdd,
      handleServiceRemove,
      handleServiceEdit,
    };
  };
  const getDataConfigPanel = (sectionName: string) =>
    DataConfigPanelFields(getRenderFieldsObj(sectionName));

  return isAddConfigClicked ? (
    getCommonUI(selectedItemConfig.name)
  ) : (
    <>
      <EuiTitle size="xxs">
        <h3>Configuration</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      {isSpanError && spanErrorMessage}
      <EuiSpacer size="s" />
      {vis.name !== Histogram ? (
        <>
          {getDataConfigPanel(AGGREGATIONS)}
          <EuiSpacer size="s" />
          {getDataConfigPanel(GROUPBY)}
          <EuiSpacer size="s" />
          {(vis.name === Bar || vis.name === HorizontalBar || vis.name === Line) && (
            <>{getDataConfigPanel(BREAKDOWNS)}</>
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
