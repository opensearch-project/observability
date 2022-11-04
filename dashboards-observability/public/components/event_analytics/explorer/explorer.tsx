/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import dateMath from '@elastic/datemath';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiContextMenuItem,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHorizontalRule,
  EuiLink,
  EuiLoadingSpinner,
  EuiPopover,
  EuiPopoverFooter,
  EuiSpacer,
  EuiTabbedContent,
  EuiTabbedContentTab,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { FormattedMessage } from '@osd/i18n/react';
import classNames from 'classnames';
import { cloneDeep, has, isEmpty, isEqual, reduce } from 'lodash';
import React, { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
  AVAILABLE_FIELDS,
  DATE_PICKER_FORMAT,
  DEFAULT_AVAILABILITY_QUERY,
  EVENT_ANALYTICS_DOCUMENTATION_URL,
  FILTERED_PATTERN,
  NEW_TAB,
  PATTERNS_EXTRACTOR_REGEX,
  PATTERNS_REGEX,
  PATTERN_REGEX,
  PPL_DEFAULT_PATTERN_REGEX_FILETER,
  RAW_QUERY,
  SAVED_OBJECT_ID,
  SAVED_OBJECT_TYPE,
  SAVED_QUERY,
  SAVED_VISUALIZATION,
  SELECTED_DATE_RANGE,
  SELECTED_FIELDS,
  SELECTED_PATTERN_FIELD,
  SELECTED_TIMESTAMP,
  TAB_CHART_ID,
  TAB_CHART_TITLE,
  TAB_CREATED_TYPE,
  TAB_EVENT_ID,
  TAB_EVENT_TITLE,
  TIME_INTERVAL_OPTIONS,
} from '../../../../common/constants/explorer';
import {
  LIVE_END_TIME,
  LIVE_OPTIONS,
  PPL_NEWLINE_REGEX,
  PPL_PATTERNS_DOCUMENTATION_URL,
  PPL_STATS_REGEX,
} from '../../../../common/constants/shared';
import { GroupByChunk } from '../../../../common/query_manager/ast/types';
import {
  IDefaultTimestampState,
  IExplorerProps,
  IField,
  IQueryTab,
  IVisualizationContainerProps,
} from '../../../../common/types/explorer';
import {
  buildQuery,
  composeFinalQuery,
  getIndexPatternFromRawQuery,
} from '../../../../common/utils';
import { sleep } from '../../common/live_tail/live_tail_button';
import { onItemSelect, parseGetSuggestions } from '../../common/search/autocomplete_logic';
import { Search } from '../../common/search/search';
import { getVizContainerProps } from '../../visualizations/charts/helpers';
import { TabContext, useFetchEvents, useFetchPatterns, useFetchVisualizations } from '../hooks';
import { selectCountDistribution } from '../redux/slices/count_distribution_slice';
import { selectFields, sortFields, updateFields } from '../redux/slices/field_slice';
import { selectPatterns } from '../redux/slices/patterns_slice';
import { selectQueryResult } from '../redux/slices/query_result_slice';
import { changeDateRange, changeQuery, selectQueries } from '../redux/slices/query_slice';
import { updateTabName } from '../redux/slices/query_tab_slice';
import { selectExplorerVisualization } from '../redux/slices/visualization_slice';
import {
  change as changeVisualizationConfig,
  change as changeVizConfig,
  change as updateVizConfig,
  selectVisualizationConfig,
} from '../redux/slices/viualization_config_slice';
import { formatError, getDefaultVisConfig } from '../utils';
import { DataGrid } from './events_views/data_grid';
import './explorer.scss';
import { HitsCounter } from './hits_counter/hits_counter';
import { PatternsTable } from './log_patterns/patterns_table';
import { NoResults } from './no_results';
import { Sidebar } from './sidebar';
import { TimechartHeader } from './timechart_header';
import { ExplorerVisualizations } from './visualizations';
import { CountDistribution } from './visualizations/count_distribution';

const TYPE_TAB_MAPPING = {
  [SAVED_QUERY]: TAB_EVENT_ID,
  [SAVED_VISUALIZATION]: TAB_CHART_ID,
};

export const Explorer = ({
  pplService,
  dslService,
  tabId,
  savedObjects,
  timestampUtils,
  setToast,
  http,
  history,
  notifications,
  savedObjectId,
  curSelectedTabId,
  searchBarConfigs,
  appId = '',
  appBaseQuery = '',
  addVisualizationToPanel,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  callback,
  callbackInApp,
  queryManager,
}: IExplorerProps) => {
  const dispatch = useDispatch();
  const requestParams = { tabId };
  const { getLiveTail, getEvents, getAvailableFields, isEventsLoading } = useFetchEvents({
    pplService,
    requestParams,
  });
  const { getVisualizations, getCountVisualizations, isVisLoading } = useFetchVisualizations({
    pplService,
    requestParams,
  });
  const {
    isEventsLoading: isPatternLoading,
    getPatterns,
    setDefaultPatternsField,
  } = useFetchPatterns({
    pplService,
    requestParams,
  });
  const appLogEvents = tabId.startsWith('application-analytics-tab');
  const query = useSelector(selectQueries)[tabId];
  const explorerData = useSelector(selectQueryResult)[tabId];
  const explorerFields = useSelector(selectFields)[tabId];
  const countDistribution = useSelector(selectCountDistribution)[tabId];
  const explorerVisualizations = useSelector(selectExplorerVisualization)[tabId];
  const userVizConfigs = useSelector(selectVisualizationConfig)[tabId] || {};
  const patternsData = useSelector(selectPatterns)[tabId];
  const [selectedContentTabId, setSelectedContentTab] = useState(TAB_EVENT_ID);
  const [selectedCustomPanelOptions, setSelectedCustomPanelOptions] = useState([]);
  const [selectedPanelName, setSelectedPanelName] = useState('');
  const [curVisId, setCurVisId] = useState('bar');
  const [prevIndex, setPrevIndex] = useState('');
  const [isPanelTextFieldInvalid, setIsPanelTextFieldInvalid] = useState(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [timeIntervalOptions, setTimeIntervalOptions] = useState(TIME_INTERVAL_OPTIONS);
  const [isOverridingTimestamp, setIsOverridingTimestamp] = useState(false);
  const [isOverridingPattern, setIsOverridingPattern] = useState(false);
  const [isPatternConfigPopoverOpen, setIsPatternConfigPopoverOpen] = useState(false);
  const [patternRegexInput, setPatternRegexInput] = useState(PPL_DEFAULT_PATTERN_REGEX_FILETER);
  const [tempQuery, setTempQuery] = useState(query[RAW_QUERY]);
  const [isLiveTailPopoverOpen, setIsLiveTailPopoverOpen] = useState(false);
  const [isLiveTailOn, setIsLiveTailOn] = useState(false);
  const [liveTailTabId, setLiveTailTabId] = useState(TAB_EVENT_ID);
  const [liveTailName, setLiveTailName] = useState('Live');
  const [liveHits, setLiveHits] = useState(0);
  const [browserTabFocus, setBrowserTabFocus] = useState(true);
  const [liveTimestamp, setLiveTimestamp] = useState(DATE_PICKER_FORMAT);
  const [triggerAvailability, setTriggerAvailability] = useState(false);
  const [viewLogPatterns, setViewLogPatterns] = useState(false);
  const [isValidDataConfigOptionSelected, setIsValidDataConfigOptionSelected] =
    useState<boolean>(false);
  const [spanValue, setSpanValue] = useState(false);
  const [subType, setSubType] = useState('visualization');
  const [metricMeasure, setMetricMeasure] = useState('');
  const [metricLabel, setMetricLabel] = useState([]);
  const queryRef = useRef();
  const appBasedRef = useRef('');
  appBasedRef.current = appBaseQuery;
  const selectedPanelNameRef = useRef('');
  const explorerFieldsRef = useRef();
  const isLiveTailOnRef = useRef(false);
  const liveTailTabIdRef = useRef('');
  const liveTailNameRef = useRef('Live');
  queryRef.current = query;
  selectedPanelNameRef.current = selectedPanelName;
  explorerFieldsRef.current = explorerFields;
  isLiveTailOnRef.current = isLiveTailOn;
  liveTailTabIdRef.current = liveTailTabId;
  liveTailNameRef.current = liveTailName;

  let minInterval = 'y';
  const findAutoInterval = (start: string = '', end: string = '') => {
    if (start?.length === 0 || end?.length === 0 || start === end)
      return ['d', [...TIME_INTERVAL_OPTIONS]];
    const momentStart = dateMath.parse(start)!;
    const momentEnd = dateMath.parse(end)!;
    const diffSeconds = momentEnd.unix() - momentStart.unix();

    // less than 1 second
    if (diffSeconds <= 1) minInterval = 'ms';
    // less than 2 minutes
    else if (diffSeconds <= 60 * 2) minInterval = 's';
    // less than 2 hours
    else if (diffSeconds <= 3600 * 2) minInterval = 'm';
    // less than 2 days
    else if (diffSeconds <= 86400 * 2) minInterval = 'h';
    // less than 1 month
    else if (diffSeconds <= 86400 * 31) minInterval = 'd';
    // less than 3 months
    else if (diffSeconds <= 86400 * 93) minInterval = 'w';
    // less than 1 year
    else if (diffSeconds <= 86400 * 366) minInterval = 'M';

    setTimeIntervalOptions([
      { text: 'Auto', value: 'auto_' + minInterval },
      ...TIME_INTERVAL_OPTIONS,
    ]);
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        setBrowserTabFocus(false);
      } else {
        setBrowserTabFocus(true);
      }
    });
  });

  const getErrorHandler = (title: string) => {
    return (error: any) => {
      const formattedError = formatError(error.name, error.message, error.body.message);
      notifications.toasts.addError(formattedError, {
        title,
      });
    };
  };

  const getSavedDataById = async (objectId: string) => {
    // load saved query/visualization if object id exists
    await savedObjects
      .fetchSavedObjects({
        objectId,
      })
      .then(async (res) => {
        const savedData = res.observabilityObjectList[0];
        const isSavedQuery = has(savedData, SAVED_QUERY);
        const savedType = isSavedQuery ? SAVED_QUERY : SAVED_VISUALIZATION;
        const objectData = isSavedQuery ? savedData.savedQuery : savedData.savedVisualization;
        const currQuery = appLogEvents
          ? objectData?.query.replace(appBaseQuery + '| ', '')
          : objectData?.query || '';

        if (appLogEvents) {
          if (objectData?.selected_date_range?.start && objectData?.selected_date_range?.end) {
            setStartTime(objectData.selected_date_range.start);
            setEndTime(objectData.selected_date_range.end);
          }
        }

        // update redux
        batch(async () => {
          await dispatch(
            changeQuery({
              tabId,
              query: {
                [RAW_QUERY]: currQuery,
                [SELECTED_TIMESTAMP]: objectData?.selected_timestamp?.name || 'timestamp',
                [SAVED_OBJECT_ID]: objectId,
                [SAVED_OBJECT_TYPE]: savedType,
                [SELECTED_DATE_RANGE]:
                  objectData?.selected_date_range?.start && objectData?.selected_date_range?.end
                    ? [objectData.selected_date_range.start, objectData.selected_date_range.end]
                    : ['now-15m', 'now'],
              },
            })
          );
          await dispatch(
            updateFields({
              tabId,
              data: {
                [SELECTED_FIELDS]: [...objectData?.selected_fields?.tokens],
              },
            })
          );
          await dispatch(
            updateTabName({
              tabId,
              tabName: objectData.name,
            })
          );
          // fill saved user configs
          if (objectData?.type) {
            let visConfig = {};
            if (!isEmpty(objectData.user_configs) && !isEmpty(objectData.user_configs.series)) {
              visConfig = JSON.parse(objectData.user_configs);
            } else {
              const statsTokens = queryManager.queryParser().parse(objectData.query).getStats();
              visConfig = { dataConfig: { ...getDefaultVisConfig(statsTokens) } };
            }
            await dispatch(
              updateVizConfig({
                tabId,
                vizId: objectData?.type,
                data: visConfig,
              })
            );
          }
        });

        // update UI state with saved data
        setSelectedPanelName(objectData?.name || '');
        setCurVisId(objectData?.type || 'bar');
        setTempQuery((staleTempQuery: string) => {
          return appLogEvents ? currQuery : objectData?.query || staleTempQuery;
        });
        const tabToBeFocused = isSavedQuery
          ? TYPE_TAB_MAPPING[SAVED_QUERY]
          : TYPE_TAB_MAPPING[SAVED_VISUALIZATION];
        setSelectedContentTab(tabToBeFocused);
        await fetchData();
      })
      .catch((error) => {
        notifications.toasts.addError(error, {
          title: `Cannot get saved data for object id: ${objectId}`,
        });
      });
  };

  const getDefaultTimestampByIndexPattern = async (
    indexPattern: string
  ): Promise<IDefaultTimestampState> => await timestampUtils.getTimestamp(indexPattern);

  const fetchData = async (startingTime?: string, endingTime?: string) => {
    const curQuery = queryRef.current;
    const rawQueryStr = buildQuery(appBasedRef.current, curQuery![RAW_QUERY]);
    const curIndex = getIndexPatternFromRawQuery(rawQueryStr);

    if (isEmpty(rawQueryStr)) return;

    if (isEmpty(curIndex)) {
      setToast('Query does not include valid index.', 'danger');
      return;
    }

    let curTimestamp: string = curQuery![SELECTED_TIMESTAMP];
    if (isEmpty(curTimestamp)) {
      const defaultTimestamp = await getDefaultTimestampByIndexPattern(curIndex);
      if (isEmpty(defaultTimestamp.default_timestamp)) {
        setToast(defaultTimestamp.message, 'danger');
        return;
      }
      curTimestamp = defaultTimestamp.default_timestamp;
      if (defaultTimestamp.hasSchemaConflict) {
        setToast(defaultTimestamp.message, 'danger');
      }
    }

    let curPattern: string = curQuery![SELECTED_PATTERN_FIELD];

    if (isEmpty(curPattern)) {
      const patternErrorHandler = getErrorHandler('Error fetching default pattern field');
      await setDefaultPatternsField(curIndex, '', patternErrorHandler);
      const newQuery = queryRef.current;
      curPattern = newQuery![SELECTED_PATTERN_FIELD];
      if (isEmpty(curPattern)) {
        setToast('Index does not contain a valid pattern field.', 'danger');
        return;
      }
    }

    if (isEqual(typeof startingTime, 'undefined') && isEqual(typeof endingTime, 'undefined')) {
      startingTime = curQuery![SELECTED_DATE_RANGE][0];
      endingTime = curQuery![SELECTED_DATE_RANGE][1];
    }

    // compose final query
    const finalQuery = composeFinalQuery(
      curQuery![RAW_QUERY],
      startingTime!,
      endingTime!,
      curTimestamp,
      isLiveTailOnRef.current,
      appBasedRef.current,
      curQuery![SELECTED_PATTERN_FIELD],
      curQuery![PATTERN_REGEX],
      curQuery![FILTERED_PATTERN]
    );

    await dispatch(
      changeQuery({
        tabId,
        query: {
          finalQuery,
          [SELECTED_TIMESTAMP]: curTimestamp,
        },
      })
    );

    // search
    if (finalQuery.match(PPL_STATS_REGEX)) {
      const cusVisIds = userVizConfigs ? Object.keys(userVizConfigs) : [];
      getVisualizations();
      getAvailableFields(`search source=${curIndex}`);
      for (const visId of cusVisIds) {
        dispatch(
          changeVisualizationConfig({
            tabId,
            vizId: visId,
            data: { ...userVizConfigs[visId] },
          })
        );
      }
    } else {
      findAutoInterval(startTime, endTime);
      if (isLiveTailOnRef.current) {
        getLiveTail(undefined, getErrorHandler('Error fetching events'));
      } else {
        getEvents(undefined, getErrorHandler('Error fetching events'));
      }
      getCountVisualizations(minInterval);

      // to fetch patterns data on current query
      if (!finalQuery.match(PATTERNS_REGEX)) {
        getPatterns(minInterval);
      }
    }

    // for comparing usage if for the same tab, user changed index from one to another
    if (!isLiveTailOnRef.current) {
      setPrevIndex(curTimestamp);
      if (!queryRef.current!.isLoaded) {
        dispatch(
          changeQuery({
            tabId,
            query: {
              isLoaded: true,
            },
          })
        );
      }
    }
  };

  const isIndexPatternChanged = (currentQuery: string, prevTabQuery: string) =>
    !isEqual(getIndexPatternFromRawQuery(currentQuery), getIndexPatternFromRawQuery(prevTabQuery));

  const updateTabData = async (objectId: string) => {
    await getSavedDataById(objectId);
  };

  const prepareAvailability = async () => {
    setSelectedContentTab(TAB_CHART_ID);
    setTriggerAvailability(true);
    await setTempQuery(DEFAULT_AVAILABILITY_QUERY);
    await updateQueryInStore(DEFAULT_AVAILABILITY_QUERY);
    await handleTimeRangePickerRefresh(true);
  };

  useEffect(() => {
    if (!isEmpty(appBasedRef.current)) {
      if (callback) {
        callback(() => prepareAvailability());
      }
      if (callbackInApp) {
        callbackInApp(() => prepareAvailability());
      }
    }
  }, [appBasedRef.current]);

  useEffect(() => {
    if (queryRef.current!.isLoaded) return;
    let objectId;
    if (queryRef.current![TAB_CREATED_TYPE] === NEW_TAB || appLogEvents) {
      objectId = queryRef.current!.savedObjectId || '';
    } else {
      objectId = queryRef.current!.savedObjectId || savedObjectId;
    }
    if (objectId) {
      updateTabData(objectId);
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (appLogEvents) {
      if (savedObjectId) {
        updateTabData(savedObjectId);
      }
    }
  }, [savedObjectId]);

  const handleAddField = (field: IField) => toggleFields(field, AVAILABLE_FIELDS, SELECTED_FIELDS);

  const handleRemoveField = (field: IField) =>
    toggleFields(field, SELECTED_FIELDS, AVAILABLE_FIELDS);

  const handleTimePickerChange = async (timeRange: string[]) => {
    if (appLogEvents) {
      setStartTime(timeRange[0]);
      setEndTime(timeRange[1]);
    }
    await dispatch(
      changeDateRange({
        tabId: requestParams.tabId,
        data: {
          [RAW_QUERY]: queryRef.current![RAW_QUERY],
          [SELECTED_DATE_RANGE]: timeRange,
        },
      })
    );
  };

  const showPermissionErrorToast = () => {
    setToast(
      'Please ask your administrator to enable Event Analytics for you.',
      'danger',
      <EuiLink href={EVENT_ANALYTICS_DOCUMENTATION_URL} target="_blank">
        Documentation
      </EuiLink>
    );
  };

  const handleTimeRangePickerRefresh = async (availability?: boolean) => {
    handleQuerySearch(availability);
    if (availability !== true && query.rawQuery.match(PATTERNS_REGEX)) {
      let currQuery = query.rawQuery;
      const currPattern = currQuery.match(PATTERNS_EXTRACTOR_REGEX)!.groups!.pattern;
      // Remove existing pattern selection if it exists
      if (currQuery.match(PATTERNS_REGEX)) {
        currQuery = currQuery.replace(PATTERNS_REGEX, '');
      }
      const patternSelectQuery = `${currQuery.trim()} | patterns ${currPattern}`;
      await setTempQuery(patternSelectQuery);
      await updateQueryInStore(patternSelectQuery);
      // Passing in empty string will remove pattern query
      const patternErrorHandler = getErrorHandler('Error fetching patterns');
      getPatterns(minInterval, patternErrorHandler);
    }
  };

  /**
   * Toggle fields between selected and unselected sets
   * @param field field to be toggled
   * @param FieldSetToRemove set where this field to be removed from
   * @param FieldSetToAdd set where this field to be added
   */
  const toggleFields = (field: IField, FieldSetToRemove: string, FieldSetToAdd: string) => {
    const nextFields = cloneDeep(explorerFields);
    const thisFieldSet = nextFields[FieldSetToRemove];
    const nextFieldSet = thisFieldSet.filter((fd: IField) => fd.name !== field.name);
    nextFields[FieldSetToRemove] = nextFieldSet;
    nextFields[FieldSetToAdd].push(field);
    batch(() => {
      dispatch(
        updateFields({
          tabId,
          data: {
            ...nextFields,
          },
        })
      );
      dispatch(
        sortFields({
          tabId,
          data: [FieldSetToAdd],
        })
      );
    });
  };

  const sidebarClassName = classNames({
    closed: isSidebarClosed,
  });

  const mainSectionClassName = classNames({
    'col-md-10': !isSidebarClosed,
    'col-md-12': isSidebarClosed,
  });

  const handleOverrideTimestamp = async (timestamp: IField) => {
    const curQuery = queryRef.current;
    const rawQueryStr = buildQuery(appBaseQuery, curQuery![RAW_QUERY]);
    const curIndex = getIndexPatternFromRawQuery(rawQueryStr);
    if (isEmpty(rawQueryStr) || isEmpty(curIndex)) {
      setToast('Cannot override timestamp because there was no valid index found.', 'danger');
      return;
    }

    setIsOverridingTimestamp(true);

    await dispatch(
      changeQuery({
        tabId,
        query: {
          [SELECTED_TIMESTAMP]: timestamp?.name || '',
        },
      })
    );

    setIsOverridingTimestamp(false);
    handleQuerySearch();
  };

  const handleOverridePattern = async (pattern: IField) => {
    setIsOverridingPattern(true);
    await setDefaultPatternsField(
      '',
      pattern.name,
      getErrorHandler('Error overriding default pattern')
    );
    setIsOverridingPattern(false);
    await getPatterns(minInterval, getErrorHandler('Error fetching patterns'));
  };

  const totalHits: number = useMemo(() => {
    if (isLiveTailOn && countDistribution?.data) {
      const hits = reduce(
        countDistribution.data['count()'],
        (sum, n) => {
          return sum + n;
        },
        liveHits
      );
      setLiveHits(hits);
      return hits;
    }
    return 0;
  }, [countDistribution?.data]);

  const onPatternSelection = async (pattern: string) => {
    if (queryRef.current![FILTERED_PATTERN] === pattern) {
      return;
    }
    dispatch(
      changeQuery({
        tabId,
        query: {
          [FILTERED_PATTERN]: pattern,
        },
      })
    );
    // workaround to refresh callback and trigger fetch data
    await setTempQuery(queryRef.current![RAW_QUERY]);
    await handleTimeRangePickerRefresh(true);
  };

  const getMainContent = () => {
    return (
      <main className="container-fluid">
        <div className="row">
          <div
            className={`col-md-2 dscSidebar__container dscCollapsibleSidebar ${sidebarClassName}`}
            id="discover-sidebar"
            data-test-subj="eventExplorer__sidebar"
          >
            {!isSidebarClosed && (
              <div className="explorerFieldSelector">
                <Sidebar
                  query={query}
                  explorerFields={explorerFields}
                  explorerData={explorerData}
                  selectedTimestamp={query[SELECTED_TIMESTAMP]}
                  selectedPattern={query[SELECTED_PATTERN_FIELD]}
                  handleOverrideTimestamp={handleOverrideTimestamp}
                  handleOverridePattern={handleOverridePattern}
                  handleAddField={(field: IField) => handleAddField(field)}
                  handleRemoveField={(field: IField) => handleRemoveField(field)}
                  isOverridingTimestamp={isOverridingTimestamp}
                  isOverridingPattern={isOverridingPattern}
                  isFieldToggleButtonDisabled={
                    isEmpty(explorerData.jsonData) ||
                    !isEmpty(queryRef.current![RAW_QUERY].match(PPL_STATS_REGEX))
                  }
                />
              </div>
            )}
            <EuiButtonIcon
              iconType={isSidebarClosed ? 'menuRight' : 'menuLeft'}
              iconSize="m"
              size="s"
              onClick={() => {
                setIsSidebarClosed((staleState) => {
                  return !staleState;
                });
              }}
              data-test-subj="collapseSideBarButton"
              aria-controls="discover-sidebar"
              aria-expanded={isSidebarClosed ? 'false' : 'true'}
              aria-label="Toggle sidebar"
              className="dscCollapsibleSidebar__collapseButton"
            />
          </div>
          <div className={`dscWrapper ${mainSectionClassName}`}>
            {explorerData && !isEmpty(explorerData.jsonData) ? (
              <div className="dscWrapper__content">
                <div className="dscResults">
                  {countDistribution?.data && !isLiveTailOnRef.current && (
                    <>
                      <EuiFlexGroup justifyContent="center" alignItems="center">
                        <EuiFlexItem grow={false}>
                          <HitsCounter
                            hits={reduce(
                              countDistribution.data['count()'],
                              (sum, n) => {
                                return sum + n;
                              },
                              0
                            )}
                            showResetButton={false}
                            onResetQuery={() => {}}
                          />
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                          <TimechartHeader
                            dateFormat={'MMM D, YYYY @ HH:mm:ss.SSS'}
                            options={timeIntervalOptions}
                            onChangeInterval={(intrv) => {
                              getCountVisualizations(intrv);
                              getPatterns(intrv, getErrorHandler('Error fetching patterns'));
                            }}
                            stateInterval="auto"
                          />
                        </EuiFlexItem>
                      </EuiFlexGroup>
                      <CountDistribution countDistribution={countDistribution} />
                      <EuiHorizontalRule margin="xs" />
                      <EuiFlexGroup
                        justifyContent="spaceBetween"
                        alignItems="center"
                        style={{ margin: '8px' }}
                        gutterSize="xs"
                      >
                        <EuiFlexItem grow={false}>
                          {viewLogPatterns && (
                            <EuiFlexGroup gutterSize="s" alignItems="center">
                              <EuiFlexItem grow={false}>
                                <EuiTitle size="s">
                                  <h3 style={{ margin: '0px' }}>
                                    Patterns{' '}
                                    <span className="pattern-header-count">
                                      ({patternsData.patternTableData?.length || 0})
                                    </span>
                                  </h3>
                                </EuiTitle>
                              </EuiFlexItem>
                              <EuiFlexItem grow={false}>
                                <EuiPopover
                                  button={
                                    <EuiButtonIcon
                                      iconType="gear"
                                      onClick={() =>
                                        setIsPatternConfigPopoverOpen(!isPatternConfigPopoverOpen)
                                      }
                                    />
                                  }
                                  isOpen={isPatternConfigPopoverOpen}
                                  closePopover={() => setIsPatternConfigPopoverOpen(false)}
                                  anchorPosition="upCenter"
                                >
                                  <EuiTitle size="xxs">
                                    <h3>Pattern regex</h3>
                                  </EuiTitle>
                                  <EuiText size="s">
                                    Log patterns allow you to cluster your logs, to help
                                  </EuiText>
                                  <EuiText size="s">summarize large volume of logs.</EuiText>
                                  <EuiSpacer size="s" />
                                  <EuiFormRow
                                    helpText={
                                      <EuiText size="s">
                                        Pattern regex is used to reduce logs into log groups.{' '}
                                        <EuiLink
                                          href={PPL_PATTERNS_DOCUMENTATION_URL}
                                          target="_blank"
                                        >
                                          help
                                        </EuiLink>
                                      </EuiText>
                                    }
                                  >
                                    <EuiFieldText
                                      value={patternRegexInput}
                                      onChange={(e) => setPatternRegexInput(e.target.value)}
                                    />
                                  </EuiFormRow>
                                  <EuiPopoverFooter>
                                    <EuiFlexGroup justifyContent="flexEnd">
                                      <EuiFlexItem grow={false}>
                                        <EuiButtonEmpty
                                          size="s"
                                          onClick={() => setIsPatternConfigPopoverOpen(false)}
                                        >
                                          Cancel
                                        </EuiButtonEmpty>
                                      </EuiFlexItem>
                                      <EuiFlexItem grow={false}>
                                        <EuiButton
                                          size="s"
                                          fill
                                          onClick={async () => {
                                            await setIsPatternConfigPopoverOpen(false);
                                            await dispatch(
                                              changeQuery({
                                                tabId,
                                                query: {
                                                  [PATTERN_REGEX]: patternRegexInput,
                                                },
                                              })
                                            );
                                            await getPatterns(
                                              minInterval,
                                              getErrorHandler('Error fetching patterns')
                                            );
                                          }}
                                        >
                                          Apply
                                        </EuiButton>
                                      </EuiFlexItem>
                                    </EuiFlexGroup>
                                  </EuiPopoverFooter>
                                </EuiPopover>
                              </EuiFlexItem>
                            </EuiFlexGroup>
                          )}
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                          <EuiFlexGroup>
                            <EuiFlexItem grow={false}>
                              {viewLogPatterns && (
                                <EuiText size="s">
                                  <EuiLink onClick={() => onPatternSelection('')}>
                                    Clear Selection
                                  </EuiLink>
                                </EuiText>
                              )}
                            </EuiFlexItem>
                            <EuiFlexItem grow={false}>
                              <EuiText size="s">
                                <EuiLink
                                  onClick={() => {
                                    // hide patterns will also clear pattern selection
                                    if (viewLogPatterns) {
                                      onPatternSelection('');
                                    }
                                    setViewLogPatterns(!viewLogPatterns);
                                    setIsPatternConfigPopoverOpen(false);
                                  }}
                                >
                                  {`${viewLogPatterns ? 'Hide' : 'Show'} Patterns`}
                                </EuiLink>
                              </EuiText>
                            </EuiFlexItem>
                          </EuiFlexGroup>
                        </EuiFlexItem>
                      </EuiFlexGroup>
                      <EuiHorizontalRule margin="xs" />
                      {viewLogPatterns && (
                        <>
                          <PatternsTable
                            tableData={patternsData.patternTableData || []}
                            onPatternSelection={onPatternSelection}
                            tabId={tabId}
                            query={query}
                            isPatternLoading={isPatternLoading}
                            totalHits={reduce(
                              countDistribution.data['count()'],
                              (sum, n) => sum + n,
                              0
                            )}
                          />
                          <EuiHorizontalRule margin="xs" />
                        </>
                      )}
                    </>
                  )}

                  <section
                    className="dscTable dscTableFixedScroll"
                    aria-labelledby="documentsAriaLabel"
                  >
                    <h2 className="euiScreenReaderOnly" id="documentsAriaLabel">
                      <FormattedMessage
                        id="discover.documentsAriaLabel"
                        defaultMessage="Documents"
                      />
                    </h2>
                    <div className="dscDiscover">
                      {isLiveTailOnRef.current && (
                        <>
                          <EuiSpacer size="m" />
                          <EuiFlexGroup justifyContent="center" alignItems="center" gutterSize="m">
                            <EuiLoadingSpinner size="l" />
                            <EuiText textAlign="center" data-test-subj="LiveStreamIndicator_on">
                              <strong>&nbsp;&nbsp;Live streaming</strong>
                            </EuiText>
                            <EuiFlexItem grow={false}>
                              <HitsCounter
                                hits={totalHits}
                                showResetButton={false}
                                onResetQuery={() => {}}
                              />
                            </EuiFlexItem>
                            <EuiFlexItem grow={false}>since {liveTimestamp}</EuiFlexItem>
                          </EuiFlexGroup>
                          <EuiSpacer size="m" />
                        </>
                      )}
                      {countDistribution?.data && (
                        <EuiTitle size="s">
                          <h3 style={{ margin: '0px', textAlign: 'left', marginLeft: '10px' }}>
                            Events
                            <span className="event-header-count">
                              {' '}
                              (
                              {reduce(
                                countDistribution.data['count()'],
                                (sum, n) => {
                                  return sum + n;
                                },
                                0
                              )}
                              )
                            </span>
                          </h3>
                        </EuiTitle>
                      )}
                      <EuiHorizontalRule margin="xs" />
                      <DataGrid
                        http={http}
                        pplService={pplService}
                        rows={explorerData.jsonData}
                        rowsAll={explorerData.jsonDataAll}
                        explorerFields={explorerFields}
                        timeStampField={queryRef.current![SELECTED_TIMESTAMP]}
                        rawQuery={queryRef.current![RAW_QUERY]}
                      />
                      <a tabIndex={0} id="discoverBottomMarker">
                        &#8203;
                      </a>
                    </div>
                  </section>
                </div>
              </div>
            ) : (
              <NoResults />
            )}
          </div>
        </div>
      </main>
    );
  };

  function getMainContentTab({
    tabID,
    tabTitle,
    getContent,
  }: {
    tabID: string;
    tabTitle: string;
    getContent: () => JSX.Element;
  }) {
    return {
      id: tabID,
      name: (
        <>
          <EuiText data-test-subj={`${tabID}Tab`} size="s" textAlign="left" color="default">
            <span className="tab-title">{tabTitle}</span>
          </EuiText>
        </>
      ),
      content: <>{getContent()}</>,
    };
  }

  const visualizations: IVisualizationContainerProps = useMemo(() => {
    return getVizContainerProps({
      vizId: curVisId,
      rawVizData: explorerVisualizations,
      query,
      indexFields: explorerFields,
      userConfigs: { ...userVizConfigs[curVisId] } || {},
      appData: { fromApp: appLogEvents },
      explorer: { explorerData, explorerFields, query, http, pplService },
    });
  }, [curVisId, explorerVisualizations, explorerFields, query, userVizConfigs]);

  const callbackForConfig = (childFunc: () => void) => {
    if (childFunc && triggerAvailability) {
      childFunc();
      setTriggerAvailability(false);
    }
  };

  const getExplorerVis = () => {
    return (
      <ExplorerVisualizations
        query={query}
        curVisId={curVisId}
        setCurVisId={setCurVisId}
        explorerFields={explorerFields}
        explorerVis={explorerVisualizations}
        explorerData={explorerData}
        handleAddField={handleAddField}
        handleRemoveField={handleRemoveField}
        visualizations={visualizations}
        handleOverrideTimestamp={handleOverrideTimestamp}
        callback={callbackForConfig}
        queryManager={queryManager}
      />
    );
  };

  const getMainContentTabs = () => {
    return [
      getMainContentTab({
        tabID: TAB_EVENT_ID,
        tabTitle: TAB_EVENT_TITLE,
        getContent: () => getMainContent(),
      }),
      getMainContentTab({
        tabID: TAB_CHART_ID,
        tabTitle: TAB_CHART_TITLE,
        getContent: () => getExplorerVis(),
      }),
    ];
  };

  const memorizedMainContentTabs = useMemo(() => {
    return getMainContentTabs();
  }, [
    curVisId,
    isPanelTextFieldInvalid,
    explorerData,
    explorerFields,
    isSidebarClosed,
    countDistribution,
    explorerVisualizations,
    selectedContentTabId,
    isOverridingTimestamp,
    visualizations,
    query,
    isLiveTailOnRef.current,
    patternsData,
    viewLogPatterns,
    isPatternConfigPopoverOpen,
    patternRegexInput,
    userVizConfigs,
  ]);

  const handleContentTabClick = (selectedTab: IQueryTab) => setSelectedContentTab(selectedTab.id);

  const updateQueryInStore = async (updateQuery: string) => {
    await dispatch(
      changeQuery({
        tabId,
        query: {
          [RAW_QUERY]: updateQuery.replaceAll(PPL_NEWLINE_REGEX, ''),
        },
      })
    );
  };

  const updateCurrentTimeStamp = async (timestamp: string) => {
    await dispatch(
      changeQuery({
        tabId,
        query: {
          [SELECTED_TIMESTAMP]: timestamp,
        },
      })
    );
  };

  const handleQuerySearch = useCallback(
    async (availability?: boolean) => {
      // clear previous selected timestamp when index pattern changes
      if (
        !isEmpty(tempQuery) &&
        !isEmpty(query[RAW_QUERY]) &&
        isIndexPatternChanged(tempQuery, query[RAW_QUERY])
      ) {
        await updateCurrentTimeStamp('');
        await setDefaultPatternsField('', '');
      }
      if (availability !== true) {
        await updateQueryInStore(tempQuery);
      }
      await fetchData();

      if (selectedContentTabId === TAB_CHART_ID) {
        // parse stats section on every search
        const statsTokens = queryManager.queryParser().parse(tempQuery).getStats();
        const updatedDataConfig = getDefaultVisConfig(statsTokens);
        await dispatch(
          changeVizConfig({
            tabId,
            vizId: curVisId,
            data: { dataConfig: { ...updatedDataConfig } },
          })
        );
      }
    },
    [tempQuery, query, selectedContentTabId, curVisId]
  );

  const handleQueryChange = async (newQuery: string) => setTempQuery(newQuery);

  const handleSavingObject = async () => {
    const currQuery = queryRef.current;
    const currFields = explorerFieldsRef.current;
    if (isEmpty(currQuery![RAW_QUERY]) && isEmpty(appBaseQuery)) {
      setToast('No query to save.', 'danger');
      return;
    }
    if (isEmpty(selectedPanelNameRef.current)) {
      setIsPanelTextFieldInvalid(true);
      setToast('Name field cannot be empty.', 'danger');
      return;
    }
    setIsPanelTextFieldInvalid(false);
    if (isEqual(selectedContentTabId, TAB_EVENT_ID)) {
      const isTabMatchingSavedType = isEqual(currQuery![SAVED_OBJECT_TYPE], SAVED_QUERY);
      if (!isEmpty(currQuery![SAVED_OBJECT_ID]) && isTabMatchingSavedType) {
        await savedObjects
          .updateSavedQueryById({
            query: currQuery![RAW_QUERY],
            fields: currFields![SELECTED_FIELDS],
            dateRange: currQuery![SELECTED_DATE_RANGE],
            name: selectedPanelNameRef.current,
            timestamp: currQuery![SELECTED_TIMESTAMP],
            objectId: currQuery![SAVED_OBJECT_ID],
            type: '',
          })
          .then((res: any) => {
            setToast(
              `Query '${selectedPanelNameRef.current}' has been successfully updated.`,
              'success'
            );
            dispatch(
              updateTabName({
                tabId,
                tabName: selectedPanelNameRef.current,
              })
            );
            return res;
          })
          .catch((error: any) => {
            notifications.toasts.addError(error, {
              title: `Cannot update query '${selectedPanelNameRef.current}'`,
            });
          });
      } else {
        // create new saved query
        savedObjects
          .createSavedQuery({
            query: currQuery![RAW_QUERY],
            fields: currFields![SELECTED_FIELDS],
            dateRange: currQuery![SELECTED_DATE_RANGE],
            name: selectedPanelNameRef.current,
            timestamp: currQuery![SELECTED_TIMESTAMP],
            objectId: '',
            type: '',
          })
          .then((res: any) => {
            history.replace(`/event_analytics/explorer/${res.objectId}`);
            setToast(
              `New query '${selectedPanelNameRef.current}' has been successfully saved.`,
              'success'
            );
            batch(() => {
              dispatch(
                changeQuery({
                  tabId,
                  query: {
                    [SAVED_OBJECT_ID]: res.objectId,
                    [SAVED_OBJECT_TYPE]: SAVED_QUERY,
                  },
                })
              );
              dispatch(
                updateTabName({
                  tabId,
                  tabName: selectedPanelNameRef.current,
                })
              );
            });
            history.replace(`/event_analytics/explorer/${res.objectId}`);
            return res;
          })
          .catch((error: any) => {
            if (error?.body?.statusCode === 403) {
              showPermissionErrorToast();
            } else {
              notifications.toasts.addError(error, {
                title: `Cannot save query '${selectedPanelNameRef.current}'`,
              });
            }
          });
      }
      // to-dos - update selected custom panel
      if (!isEmpty(selectedCustomPanelOptions)) {
        // update custom panel - query
      }
    } else if (isEqual(selectedContentTabId, TAB_CHART_ID)) {
      if (
        (isEmpty(currQuery![RAW_QUERY]) && isEmpty(appBaseQuery)) ||
        isEmpty(explorerVisualizations)
      ) {
        setToast(`There is no query or(and) visualization to save`, 'danger');
        return;
      }
      let savingVisRes;
      const vizDescription = userVizConfigs[curVisId]?.dataConfig?.panelOptions?.description || '';
      const isTabMatchingSavedType = isEqual(currQuery![SAVED_OBJECT_TYPE], SAVED_VISUALIZATION);
      if (!isEmpty(currQuery![SAVED_OBJECT_ID]) && isTabMatchingSavedType) {
        savingVisRes = await savedObjects
          .updateSavedVisualizationById({
            query: buildQuery(appBaseQuery, currQuery![RAW_QUERY]),
            fields: currFields![SELECTED_FIELDS],
            dateRange: currQuery![SELECTED_DATE_RANGE],
            name: selectedPanelNameRef.current,
            timestamp: currQuery![SELECTED_TIMESTAMP],
            objectId: currQuery![SAVED_OBJECT_ID],
            type: curVisId,
            userConfigs: userVizConfigs.hasOwnProperty(curVisId)
              ? JSON.stringify(userVizConfigs[curVisId])
              : JSON.stringify({}),
            description: vizDescription,
            subType: subType,
            unitsOfMeasure: metricMeasure,
          })
          .then((res: any) => {
            setToast(
              `Visualization '${selectedPanelNameRef.current}' has been successfully updated.`,
              'success'
            );
            dispatch(
              updateTabName({
                tabId,
                tabName: selectedPanelNameRef.current,
              })
            );
            return res;
          })
          .catch((error: any) => {
            notifications.toasts.addError(error, {
              title: `Cannot update Visualization '${selectedPanelNameRef.current}'`,
            });
          });
      } else {
        // create new saved visualization
        savingVisRes = await savedObjects
          .createSavedVisualization({
            query: buildQuery(appBaseQuery, currQuery![RAW_QUERY]),
            fields: currFields![SELECTED_FIELDS],
            dateRange: currQuery![SELECTED_DATE_RANGE],
            type: curVisId,
            name: selectedPanelNameRef.current,
            timestamp: currQuery![SELECTED_TIMESTAMP],
            applicationId: appId,
            userConfigs: userVizConfigs.hasOwnProperty(curVisId)
              ? JSON.stringify(userVizConfigs[curVisId])
              : JSON.stringify({}),
            description: vizDescription,
            subType: subType,
            unitsOfMeasure: metricMeasure,
          })
          .then((res: any) => {
            batch(() => {
              dispatch(
                changeQuery({
                  tabId,
                  query: {
                    [SAVED_OBJECT_ID]: res.objectId,
                    [SAVED_OBJECT_TYPE]: SAVED_VISUALIZATION,
                  },
                })
              );
              dispatch(
                updateTabName({
                  tabId,
                  tabName: selectedPanelNameRef.current,
                })
              );
            });
            if (appLogEvents) {
              addVisualizationToPanel(res.objectId, selectedPanelNameRef.current);
            } else {
              history.replace(`/event_analytics/explorer/${res.objectId}`);
            }
            setToast(
              `New visualization '${selectedPanelNameRef.current}' has been successfully saved.`,
              'success'
            );
            return res;
          })
          .catch((error: any) => {
            notifications.toasts.addError(error, {
              title: `Cannot save Visualization '${selectedPanelNameRef.current}'`,
            });
          });
      }
      if (!has(savingVisRes, 'objectId')) return;
      // update custom panel - visualization
      if (!isEmpty(selectedCustomPanelOptions)) {
        savedObjects
          .bulkUpdateCustomPanel({
            selectedCustomPanels: selectedCustomPanelOptions,
            savedVisualizationId: savingVisRes.objectId,
          })
          .then((res: any) => {
            setToast(
              `Visualization '${selectedPanelNameRef.current}' has been successfully saved to operation panels.`,
              'success'
            );
          })
          .catch((error: any) => {
            notifications.toasts.addError(error, {
              title: `Cannot add Visualization '${selectedPanelNameRef.current}' to operation panels`,
            });
          });
      }
    }
  };

  const liveTailLoop = async (
    name: string,
    startingTime: string,
    endingTime: string,
    delayTime: number
  ) => {
    setLiveTailName(name);
    setLiveTailTabId(curSelectedTabId.current as unknown as string);
    setIsLiveTailOn(true);
    setToast('Live tail On', 'success');
    setIsLiveTailPopoverOpen(false);
    setLiveTimestamp(dateMath.parse(endingTime)?.utc().format(DATE_PICKER_FORMAT) || '');
    setLiveHits(0);
    await sleep(2000);
    const curLiveTailname = liveTailNameRef.current;
    while (isLiveTailOnRef.current === true && curLiveTailname === liveTailNameRef.current) {
      handleLiveTailSearch(startingTime, endingTime);
      if (liveTailTabIdRef.current !== curSelectedTabId.current) {
        setIsLiveTailOn(false);
        isLiveTailOnRef.current = false;
        setLiveTailName('Live');
        setLiveHits(0);
      }
      await sleep(delayTime);
    }
  };

  const stopLive = () => {
    setLiveTailName('Live');
    setIsLiveTailOn(false);
    setLiveHits(0);
    setIsLiveTailPopoverOpen(false);
    if (isLiveTailOnRef.current) setToast('Live tail Off', 'danger');
  };

  useEffect(() => {
    if (isEqual(selectedContentTabId, TAB_CHART_ID) || !browserTabFocus) {
      stopLive();
    }
  }, [selectedContentTabId, browserTabFocus]);

  // stop live tail if the page is moved using breadcrumbs
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      stopLive();
    }
  }).observe(document, { subtree: true, childList: true });

  const popoverItems: ReactElement[] = LIVE_OPTIONS.map((e) => {
    return (
      <EuiContextMenuItem
        key={e.label}
        onClick={async () => {
          liveTailLoop(e.label, e.startTime, LIVE_END_TIME, e.delayTime);
        }}
        data-test-subj={'eventLiveTail__delay' + e.label}
      >
        {e.label}
      </EuiContextMenuItem>
    );
  });

  const dateRange =
    isEmpty(startTime) || isEmpty(endTime)
      ? isEmpty(query.selectedDateRange)
        ? ['now-15m', 'now']
        : [query.selectedDateRange[0], query.selectedDateRange[1]]
      : [startTime, endTime];

  const handleLiveTailSearch = useCallback(
    async (startingTime: string, endingTime: string) => {
      await updateQueryInStore(tempQuery);
      fetchData(startingTime, endingTime);
    },
    [tempQuery]
  );

  useEffect(() => {
    if (isEqual(selectedContentTabId, TAB_CHART_ID)) {
      const statsTokens = queryManager.queryParser().parse(tempQuery).getStats();
      const updatedDataConfig = getDefaultVisConfig(statsTokens);
      setSpanValue(!isEqual(typeof updatedDataConfig.span, 'undefined'));
    }
  }, [tempQuery, selectedContentTabId, curVisId]);

  return (
    <TabContext.Provider
      value={{
        tabId,
        curVisId,
        dispatch,
        changeVisualizationConfig,
        explorerVisualizations,
        setToast,
        pplService,
        handleQuerySearch,
        handleQueryChange,
        setTempQuery,
        fetchData,
        explorerFields,
        explorerData,
        http,
        query,
      }}
    >
      <div className="dscAppContainer">
        <Search
          key="search-component"
          query={appLogEvents ? tempQuery : query[RAW_QUERY]}
          tempQuery={tempQuery}
          handleQueryChange={handleQueryChange}
          handleQuerySearch={handleQuerySearch}
          dslService={dslService}
          startTime={appLogEvents ? startTime : dateRange[0]}
          endTime={appLogEvents ? endTime : dateRange[1]}
          handleTimePickerChange={(timeRange: string[]) => handleTimePickerChange(timeRange)}
          selectedPanelName={selectedPanelNameRef.current}
          selectedCustomPanelOptions={selectedCustomPanelOptions}
          setSelectedPanelName={setSelectedPanelName}
          setSelectedCustomPanelOptions={setSelectedCustomPanelOptions}
          handleSavingObject={handleSavingObject}
          isPanelTextFieldInvalid={isPanelTextFieldInvalid}
          savedObjects={savedObjects}
          showSavePanelOptionsList={isEqual(selectedContentTabId, TAB_CHART_ID)}
          handleTimeRangePickerRefresh={handleTimeRangePickerRefresh}
          isLiveTailPopoverOpen={isLiveTailPopoverOpen}
          closeLiveTailPopover={() => setIsLiveTailPopoverOpen(false)}
          popoverItems={popoverItems}
          isLiveTailOn={isLiveTailOnRef.current}
          selectedSubTabId={selectedContentTabId}
          searchBarConfigs={searchBarConfigs}
          getSuggestions={parseGetSuggestions}
          onItemSelect={onItemSelect}
          tabId={tabId}
          baseQuery={appBaseQuery}
          stopLive={stopLive}
          setIsLiveTailPopoverOpen={setIsLiveTailPopoverOpen}
          liveTailName={liveTailNameRef.current}
          searchError={explorerVisualizations}
          curVisId={curVisId}
          spanValue={spanValue}
          setSubType={setSubType}
          setMetricMeasure={setMetricMeasure}
          setMetricLabel={setMetricLabel}
        />
        <EuiTabbedContent
          className="mainContentTabs"
          initialSelectedTab={memorizedMainContentTabs[0]}
          selectedTab={memorizedMainContentTabs.find((tab) => tab.id === selectedContentTabId)}
          onTabClick={(selectedTab: EuiTabbedContentTab) => handleContentTabClick(selectedTab)}
          tabs={memorizedMainContentTabs}
        />
      </div>
    </TabContext.Provider>
  );
};
