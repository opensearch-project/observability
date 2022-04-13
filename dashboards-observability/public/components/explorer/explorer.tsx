/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */

import './explorer.scss';
import React, { useState, useMemo, useEffect, useRef, useCallback, ReactElement } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { isEmpty, cloneDeep, isEqual, has, reduce } from 'lodash';
import { FormattedMessage } from '@osd/i18n/react';
import { EuiLoadingSpinner, EuiSpacer } from '@elastic/eui';
import {
  EuiText,
  EuiButtonIcon,
  EuiTabbedContent,
  EuiTabbedContentTab,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiContextMenuItem,
} from '@elastic/eui';
import dateMath from '@elastic/datemath';
import classNames from 'classnames';
import { Search } from '../common/search/search';
import { CountDistribution } from './visualizations/count_distribution';
import { DataGrid } from './data_grid';
import { Sidebar } from './sidebar';
import { NoResults } from './no_results';
import { HitsCounter } from './hits_counter/hits_counter';
import { TimechartHeader } from './timechart_header';
import { ExplorerVisualizations } from './visualizations';
import { IField, IQueryTab, IDefaultTimestampState } from '../../../common/types/explorer';
import {
  TAB_CHART_TITLE,
  TAB_EVENT_TITLE,
  RAW_QUERY,
  SELECTED_DATE_RANGE,
  SELECTED_FIELDS,
  SELECTED_TIMESTAMP,
  AVAILABLE_FIELDS,
  TIME_INTERVAL_OPTIONS,
  SAVED_QUERY,
  SAVED_VISUALIZATION,
  SAVED_OBJECT_ID,
  SAVED_OBJECT_TYPE,
  NEW_TAB,
  TAB_CREATED_TYPE,
  EVENT_ANALYTICS_DOCUMENTATION_URL,
  TAB_EVENT_ID,
  TAB_CHART_ID,
  INDEX,
  FINAL_QUERY,
  DATE_PICKER_FORMAT,
} from '../../../common/constants/explorer';
import { PPL_STATS_REGEX, PPL_NEWLINE_REGEX, LIVE_OPTIONS, LIVE_END_TIME  } from '../../../common/constants/shared';
import { getIndexPatternFromRawQuery, preprocessQuery, buildQuery } from '../../../common/utils';
import { useFetchEvents, useFetchVisualizations } from './hooks';
import { changeQuery, changeDateRange, selectQueries } from './slices/query_slice';
import { selectQueryResult } from './slices/query_result_slice';
import { selectFields, updateFields, sortFields } from './slices/field_slice';
import { updateTabName } from './slices/query_tab_slice';
import { selectCountDistribution } from './slices/count_distribution_slice';
import { selectExplorerVisualization } from './slices/visualization_slice';
import {
  selectVisualizationConfig,
  change as changeVisualizationConfig,
} from './slices/viualization_config_slice';
import { change as updateVizConfig } from './slices/viualization_config_slice';
import { IExplorerProps, IVisualizationContainerProps } from '../../../common/types/explorer';
import { TabContext } from './hooks';
import { getVizContainerProps } from '../visualizations/charts/helpers';
import {
  parseGetSuggestions,
  onItemSelect,
} from '../common/search/autocomplete_logic';
import { formatError } from './utils';
import { sleep } from '../common/live_tail/live_tail_button';

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
  const appLogEvents = tabId.startsWith('application-analytics-tab');
  const query = useSelector(selectQueries)[tabId];
  const explorerData = useSelector(selectQueryResult)[tabId];
  const explorerFields = useSelector(selectFields)[tabId];
  const countDistribution = useSelector(selectCountDistribution)[tabId];
  const explorerVisualizations = useSelector(selectExplorerVisualization)[tabId];
  const userVizConfigs = useSelector(selectVisualizationConfig)[tabId] || {};
  const [selectedContentTabId, setSelectedContentTab] = useState(TAB_EVENT_ID);
  const [selectedCustomPanelOptions, setSelectedCustomPanelOptions] = useState([]);
  const [selectedPanelName, setSelectedPanelName] = useState('');
  const [curVisId, setCurVisId] = useState('bar');
  const [prevIndex, setPrevIndex] = useState('');
  const [isPanelTextFieldInvalid, setIsPanelTextFieldInvalid] = useState(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [timeIntervalOptions, setTimeIntervalOptions] = useState(TIME_INTERVAL_OPTIONS);
  const [isOverridingTimestamp, setIsOverridingTimestamp] = useState(false);
  const [tempQuery, setTempQuery] = useState(query[RAW_QUERY]);
  const [isLiveTailPopoverOpen, setIsLiveTailPopoverOpen] = useState(false);
  const [isLiveTailOn, setIsLiveTailOn] = useState(false);
  const [liveTailTabId, setLiveTailTabId] = useState(TAB_EVENT_ID);
  const [liveTailName, setLiveTailName] = useState('Live');
  const [liveHits, setLiveHits] = useState(0);
  const [browserTabFocus, setBrowserTabFocus] = useState(true);
  const [liveTimestamp, setLiveTimestamp] = useState(DATE_PICKER_FORMAT);

  const queryRef = useRef();
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
    document.addEventListener("visibilitychange", function() {
      if (document.hidden) {
        setBrowserTabFocus(false);
      }
      else {
        setBrowserTabFocus(true);
      }
    });
  });

  const composeFinalQuery = (
    curQuery: any,
    startingTime: string,
    endingTime: string,
    timeField: string,
    isLiveQuery: boolean
  ) => {
    const fullQuery = buildQuery(appBaseQuery, curQuery![RAW_QUERY]);
    if (isEmpty(fullQuery)) return '';
    return preprocessQuery({
      rawQuery: fullQuery,
      startTime: startingTime,
      endTime: endingTime,
      timeField,
      isLiveQuery,
    });
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
            await dispatch(
              updateVizConfig({
                tabId,
                vizId: objectData?.type,
                data: JSON.parse(objectData.user_configs),
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

  const fetchData = async (startTime?: string, endTime?: string) => {
    const curQuery = queryRef.current;
    const rawQueryStr = buildQuery(appBaseQuery, curQuery![RAW_QUERY]);
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

    if ((isEqual(typeof startTime, 'undefined')) && (isEqual(typeof endTime, 'undefined'))) {
      startTime = curQuery![SELECTED_DATE_RANGE][0];
      endTime = curQuery![SELECTED_DATE_RANGE][1];
    }

    // compose final query
    const finalQuery = composeFinalQuery(
      curQuery,
      startTime,
      endTime,
      curTimestamp,
      isLiveTailOnRef.current
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
    if (rawQueryStr.match(PPL_STATS_REGEX)) {
      getVisualizations();
      getAvailableFields(`search source=${curIndex}`);
    } else {
      findAutoInterval(startTime, endTime);
      if (isLiveTailOnRef.current){
        getLiveTail(undefined, (error) => {
          const formattedError = formatError(error.name, error.message, error.body.message);
          notifications.toasts.addError(formattedError, {
            title: 'Error fetching events',
          });
        });
      } else {
        getEvents(undefined, (error) => {
          const formattedError = formatError(error.name, error.message, error.body.message);
          notifications.toasts.addError(formattedError, {
            title: 'Error fetching events',
          });
        });
      }
      getCountVisualizations(minInterval);
    }

    // for comparing usage if for the same tab, user changed index from one to another
    if (!isLiveTailOnRef.current){
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
      } else {
        setTempQuery('');
        emptyTab();
      }
    }
  }, [savedObjectId]);

  const emptyTab = async () => {
    await dispatch(
      changeQuery({
        tabId,
        query: {
          [RAW_QUERY]: '',
          [FINAL_QUERY]: '',
          [INDEX]: '',
          [SELECTED_TIMESTAMP]: '',
          [SAVED_OBJECT_ID]: '',
        },
      })
    );
    await fetchData();
  };

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

  const handleTimeRangePickerRefresh = () => {
    handleQuerySearch();
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

  const totalHits: number = useMemo(() => {
    if (isLiveTailOn && countDistribution?.data) {    
     let hits = reduce(
       countDistribution['data']['count()'],
       (sum, n) => {
         return sum + n;
       },
       liveHits
       )
       setLiveHits(hits);
       return hits
   }} , [countDistribution?.data]);

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
              <div className="dscFieldChooser">
                <Sidebar
                  query={query}
                  explorerFields={explorerFields}
                  explorerData={explorerData}
                  selectedTimestamp={query[SELECTED_TIMESTAMP]}
                  handleOverrideTimestamp={handleOverrideTimestamp}
                  handleAddField={(field: IField) => handleAddField(field)}
                  handleRemoveField={(field: IField) => handleRemoveField(field)}
                  isOverridingTimestamp={isOverridingTimestamp}
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
                            }}
                            stateInterval="auto"
                          />
                        </EuiFlexItem>
                      </EuiFlexGroup>
                      <CountDistribution countDistribution={countDistribution} />
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
                            <EuiFlexGroup justifyContent="center" alignItems="center" gutterSize='m'>
                              <EuiLoadingSpinner size="l" />
                              <EuiText textAlign="center" data-test-subj="LiveStreamIndicator_on">
                                <strong>&nbsp;&nbsp;Live streaming</strong>
                              </EuiText>
                              <EuiFlexItem grow={false}>
                                <HitsCounter
                                  hits={totalHits}
                                  showResetButton={false}
                                  onResetQuery={() => { } } />
                              </EuiFlexItem>
                              <EuiFlexItem grow={false}>
                                since {liveTimestamp}
                              </EuiFlexItem>
                            </EuiFlexGroup><EuiSpacer size="m" />
                          </>
                      )}
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
          <EuiText size="s" textAlign="left" color="default">
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
      userConfigs: userVizConfigs[curVisId] || {},
      appData: { fromApp: appLogEvents },
    });
  }, [curVisId, explorerVisualizations, explorerFields, query, userVizConfigs]);

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

  const handleQuerySearch = useCallback(async () => {
    // clear previous selected timestamp when index pattern changes
    if (
      !isEmpty(tempQuery) &&
      !isEmpty(query[RAW_QUERY]) &&
      isIndexPatternChanged(tempQuery, query[RAW_QUERY])
    ) {
      await updateCurrentTimeStamp('');
    }
    await updateQueryInStore(tempQuery);
    fetchData();
  }, [tempQuery, query[RAW_QUERY]]);

  const handleQueryChange = async (newQuery: string) => {
    setTempQuery(newQuery);
  };

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
    startTime: string,
    endTime: string,
    delayTime: number
  ) => {
    setLiveTailName(name);
    setLiveTailTabId(curSelectedTabId.current);
    setIsLiveTailOn(true);
    setToast('Live tail On', 'success');
    setIsLiveTailPopoverOpen(false);
    setLiveTimestamp(dateMath.parse(endTime)?.utc().format(DATE_PICKER_FORMAT));
    setLiveHits(0);
    await sleep(2000);
    const curLiveTailname = liveTailNameRef.current;
    while (isLiveTailOnRef.current === true && curLiveTailname === liveTailNameRef.current) {
      handleLiveTailSearch(startTime, endTime);
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
  }

  useEffect(() => {
    if ((isEqual(selectedContentTabId, TAB_CHART_ID)) || (!browserTabFocus)) {
      stopLive();
    }
  }, [selectedContentTabId, browserTabFocus]);

  //stop live tail if the page is moved using breadcrumbs
  let lastUrl = location.href; 
  new MutationObserver(() => {
    const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        stopLive();
      }
  }).observe(document, {subtree: true, childList: true});

  const popoverItems: ReactElement[] = LIVE_OPTIONS.map((e) => {
    return (
    <EuiContextMenuItem
      key={e.label} 
      onClick={async () => {
        liveTailLoop(e.label, e.startTime, LIVE_END_TIME, e.delayTime);
      }}
      data-test-subj={'eventLiveTail__delay'+e.label}
    >
      {e.label}
    </EuiContextMenuItem>
    )
  });

  const dateRange =
    isEmpty(startTime) || isEmpty(endTime)
      ? isEmpty(query.selectedDateRange)
        ? ['now-15m', 'now']
        : [query.selectedDateRange[0], query.selectedDateRange[1]]
      : [startTime, endTime];

  const handleLiveTailSearch = useCallback(
    async (startTime: string, endTime: string) => {
      await updateQueryInStore(tempQuery);
      fetchData(startTime, endTime);
    },
    [tempQuery]
  );

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