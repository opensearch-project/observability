/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { 
  uniqueId,
  isEmpty,
  cloneDeep,
  isEqual
} from 'lodash';
import { 
  FormattedMessage 
} from '@osd/i18n/react';
import {
  EuiText,
  EuiButtonIcon,
  EuiTabbedContent,
  EuiTabbedContentTab,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';
import classNames from 'classnames';
import { Search } from '../common/search/search';
import { CountDistribution } from './visualizations/count_distribution';
import { DataGrid } from './data_grid';
import { Sidebar } from './sidebar';
import { NoResults } from './no_results';
import { HitsCounter } from './hits_counter/hits_counter';
import { TimechartHeader } from './timechart_header';
import { ExplorerVisualizations } from './visualizations';
import {
  IField,
  IQueryTab
} from '../../../common/types/explorer';
import {
  TAB_CHART_TITLE,
  TAB_EVENT_TITLE,
  TAB_EVENT_ID_TXT_PFX,
  TAB_CHART_ID_TXT_PFX,
  RAW_QUERY,
  SELECTED_DATE_RANGE,
  SELECTED_FIELDS,
  SELECTED_TIMESTAMP,
  UNSELECTED_FIELDS,
  AVAILABLE_FIELDS,
  INDEX,
  TIME_INTERVAL_OPTIONS,
  HAS_SAVED_TIMESTAMP
} from '../../../common/constants/explorer';
import { PPL_STATS_REGEX } from '../../../common/constants/shared';
import { 
  getIndexPatternFromRawQuery,
  insertDateRangeToQuery
} from '../../../common/utils';
import { 
  useFetchEvents,
  useFetchVisualizations,
} from './hooks';
import { 
  changeQuery,
  changeDateRange,
  selectQueries
} from './slices/query_slice';
import { selectQueryResult } from './slices/query_result_slice';
import { 
  selectFields,
  updateFields,
  sortFields
} from './slices/field_slice';
import { selectCountDistribution } from './slices/count_distribution_slice';
import { selectExplorerVisualization } from './slices/visualization_slice';
import PPLService from '../../services/requests/ppl';
import DSLService from '../../services/requests/dsl';
import SavedObjects from '../../services/saved_objects/event_analytics/saved_objects';
import TimestampUtils from 'public/services/timestamp/timestamp';

const TAB_EVENT_ID = uniqueId(TAB_EVENT_ID_TXT_PFX);
const TAB_CHART_ID = uniqueId(TAB_CHART_ID_TXT_PFX);

interface IExplorerProps {
  pplService: PPLService;
  dslService: DSLService;
  tabId: string;
  savedObjects: SavedObjects;
  timestampUtils: TimestampUtils;
<<<<<<< HEAD
  setToast: any;
=======
>>>>>>> main
}

export const Explorer = ({
  pplService,
  dslService,
  tabId,
  savedObjects,
<<<<<<< HEAD
  timestampUtils,
  setToast
=======
  timestampUtils
>>>>>>> main
}: IExplorerProps) => {

  const dispatch = useDispatch();
  const requestParams = { tabId, };
  const {
    isEventsLoading,
    getEvents,
    getAvailableFields
  } = useFetchEvents({
    pplService,
    requestParams
  });
  const {
    isVisLoading,
    getVisualizations,
    getCountVisualizations
  } = useFetchVisualizations({
    pplService,
    requestParams
  });

  const query = useSelector(selectQueries)[tabId];
  const explorerData = useSelector(selectQueryResult)[tabId];
  const explorerFields = useSelector(selectFields)[tabId];
  const countDistribution = useSelector(selectCountDistribution)[tabId];
  const explorerVisualizations = useSelector(selectExplorerVisualization)[tabId];
  
  const [selectedContentTabId, setSelectedContentTab] = useState<string>(TAB_EVENT_ID);
  const [selectedCustomPanelOptions, setSelectedCustomPanelOptions] = useState([]);
  const [selectedPanelName, setSelectedPanelName] = useState('');
  const [curVisId, setCurVisId] = useState<string>('bar');
  const [prevIndex, setPrevIndex] = useState<string>('');
  const [isPanelTextFieldInvalid, setIsPanelTextFieldInvalid ] = useState<boolean>(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState<Boolean>(false);
<<<<<<< HEAD
=======
  const [fixedScrollEl, setFixedScrollEl] = useState<HTMLElement | undefined>();
>>>>>>> main
  
  const queryRef = useRef();
  const selectedPanelNameRef = useRef();
  const explorerFieldsRef = useRef();
  queryRef.current = query;
  selectedPanelNameRef.current = selectedPanelName;
  explorerFieldsRef.current = explorerFields;

  const composeFinalQuery = (curQuery: any, timeField: string) => {
    if (isEmpty(curQuery![RAW_QUERY])) return '';
    return insertDateRangeToQuery({
      rawQuery: curQuery![RAW_QUERY],
      startTime: curQuery![SELECTED_DATE_RANGE][0],
      endTime: curQuery![SELECTED_DATE_RANGE][1],
      timeField,
    });
  };

  const fetchData = async () => {
    const curQuery = queryRef.current;
    const rawQueryStr = curQuery![RAW_QUERY];
    const curIndex = getIndexPatternFromRawQuery(rawQueryStr);
    
    if (isEmpty(rawQueryStr)) return;
    if (isEmpty(curIndex)) {
      setToast('Query does not include vaild index.', 'danger');
      return;
    } 
    
    let curTimestamp = '';
    let hasSavedTimestamp = false;

    // determines timestamp for search
    if (isEmpty(curQuery![SELECTED_TIMESTAMP]) || !isEqual(curIndex, prevIndex)) {
      const savedTimestamps = await savedObjects.fetchSavedObjects({
        objectId: curIndex
      });
      if (savedTimestamps?.observabilityObjectList[0]?.timestamp?.name) {
        // from saved objects
        hasSavedTimestamp = true;
        curTimestamp = savedTimestamps.observabilityObjectList[0].timestamp.name;
      } else {
        // from index mappings
        hasSavedTimestamp = false;
        const timestamps = await timestampUtils.getTimestamp(curIndex);
        curTimestamp = timestamps!.default_timestamp
      }
    }

    if (isEmpty(curTimestamp)) {
      setToast('Index does not contain time field.', 'danger');
      return;
    }

    // compose final query
    const finalQuery = composeFinalQuery(curQuery, curTimestamp || curQuery![SELECTED_TIMESTAMP]);
    
    await dispatch(changeQuery({
      tabId,
      query: {
        finalQuery,
        [SELECTED_TIMESTAMP]: curTimestamp || curQuery![SELECTED_TIMESTAMP],
        [HAS_SAVED_TIMESTAMP]: hasSavedTimestamp
      }
    }));

    
    // search
    if (rawQueryStr.match(PPL_STATS_REGEX)) {
      getVisualizations();
      getAvailableFields(`search source=${curIndex}`);
    } else {
      getEvents();
      getCountVisualizations('h');
    }

    // for comparing usage if for the same tab, user changed index from one to another
    setPrevIndex(curTimestamp || curQuery![SELECTED_TIMESTAMP]);
  };

  // should run in two usecases 
  // 1. load explorer for the first time
  // 2. when overrides default timestamp
  useEffect(() => {
    fetchData();
  }, [query[SELECTED_TIMESTAMP]]);

  const handleAddField = (field: IField) => toggleFields(field, AVAILABLE_FIELDS, SELECTED_FIELDS);

  const handleRemoveField = (field: IField) => toggleFields(field, SELECTED_FIELDS, AVAILABLE_FIELDS);

  const handleTimePickerChange = async (timeRange: Array<string>) => {
    await dispatch(changeDateRange({
      tabId: requestParams.tabId,
      data: {
        [SELECTED_DATE_RANGE]: timeRange
      }
    }));
    fetchData();
  }

  /**
   * Toggle fields between selected and unselected sets
   * @param field field to be toggled
   * @param FieldSetToRemove set where this field to be removed from
   * @param FieldSetToAdd set where this field to be added
  */
  const toggleFields = (
    field: IField,
    FieldSetToRemove: string,
    FieldSetToAdd: string
  ) => {

    const nextFields = cloneDeep(explorerFields);
    const thisFieldSet = nextFields[FieldSetToRemove];
    const nextFieldSet = thisFieldSet.filter((fd: IField) => fd.name !== field.name);
    nextFields[FieldSetToRemove] = nextFieldSet;
    nextFields[FieldSetToAdd].push(field);
    batch(() => {
      dispatch(updateFields({ 
        tabId,
        data: {
          ...nextFields
        }
      }));
      dispatch(sortFields({
        tabId,
        data: [FieldSetToAdd]
      }));
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
    const rawQueryStr = curQuery![RAW_QUERY];
    const curIndex = getIndexPatternFromRawQuery(rawQueryStr);
    const requests = {
      index: curIndex,
      name: timestamp.name,
      type: timestamp.type,
      dsl_type: 'date'
    };
    if (isEmpty(rawQueryStr) || isEmpty(curIndex)) { 
      setToast('Cannot override timestamp because there was no valid index found.', 'danger');
      return;
    }
    if (curQuery![HAS_SAVED_TIMESTAMP]) {
      await savedObjects.updateTimestamp({
        ...requests
      }).catch((error: any) => { 
        setToast(`Cannot override timestamp, error: ${error.message}`);
        return;
      });
    } else {
      await savedObjects.createSavedTimestamp({
        ...requests
      }).catch((error: any) => { 
        setToast(`Cannot override timestamp, error: ${error.message}`);
        return;
      })
    }
    await dispatch(changeQuery({
      tabId,
      query: {
        [SELECTED_TIMESTAMP]: ''
      }
    }));
  };

  const getMainContent = () => {

    return (
      <main className="container-fluid">
        <div className="row">
          <div
              className={`col-md-2 dscSidebar__container dscCollapsibleSidebar ${sidebarClassName}`}
              id="discover-sidebar"
              data-test-subj="discover-sidebar"
            >
              {!isSidebarClosed && (
                <div className="dscFieldChooser">
                  <Sidebar
                    explorerFields={ explorerFields }
                    explorerData={ explorerData }
                    selectedTimestamp={ query[SELECTED_TIMESTAMP] }
                    handleOverrideTimestamp={ handleOverrideTimestamp }
                    handleAddField={ (field: IField) => handleAddField(field) }
                    handleRemoveField={ (field: IField) => handleRemoveField(field) }
                  />
                </div>
              )}
              <EuiButtonIcon
                iconType={ isSidebarClosed ? 'menuRight' : 'menuLeft' }
                iconSize="m"
                size="s"
                onClick={ () => {
                  setIsSidebarClosed(staleState => {
                    return !staleState;
                  });
                } }
                data-test-subj="collapseSideBarButton"
                aria-controls="discover-sidebar"
                aria-expanded={ isSidebarClosed ? 'false' : 'true' }
                aria-label="Toggle sidebar"
                className="dscCollapsibleSidebar__collapseButton"
              />
          </div>
          <div className={`dscWrapper ${mainSectionClassName}`}>
          { (explorerData && !isEmpty(explorerData.jsonData)) ? (
            <div className="dscWrapper__content">
              <div className="dscResults">
                { 
                  explorerData && (
                    <>
                      <EuiFlexGroup
                        justifyContent="center"
                        alignItems="center"
                      >
                        <EuiFlexItem
                          grow={false}
                        >
                          <HitsCounter 
                            hits={ explorerData['datarows']?.length || countDistribution?.size || 0 }
                            showResetButton={false}
                            onResetQuery={ () => {} }
                          />
                        </EuiFlexItem>
                        <EuiFlexItem
                          grow={false}
                        >
                          <TimechartHeader
                            dateFormat={ "MMM D, YYYY @ HH:mm:ss.SSS" }
                            options={ TIME_INTERVAL_OPTIONS }
                            onChangeInterval={(intrv) => {
                              getCountVisualizations(intrv);
                            }}
                            stateInterval="auto"
                          />
                        </EuiFlexItem>
                      </EuiFlexGroup>
                      <CountDistribution
                        countDistribution={ countDistribution }
                      />
                    </>
                  )
                }
                
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
                    <DataGrid
                      rows={ explorerData['jsonData'] }
                      rowsAll={ explorerData['jsonDataAll'] }
                      explorerFields={ explorerFields }
                    />
                    <a tabIndex={0} id="discoverBottomMarker">
                      &#8203;
                    </a>
                  </div>
                </section>
              </div>
            </div>
          ) : <NoResults />}
          </div>
        </div>
      </main>
    );
  };

  function getMainContentTab ({
    tabId,
    tabTitle,
    getContent
  }: {
    tabId: string,
    tabTitle: string,
    getContent: () => JSX.Element
  }) {
    return {
      id: tabId,
      name: (<>
              <EuiText
                size="s"
                textAlign="left"
                color="default"
              >
                <span className="tab-title">{ tabTitle }</span>
              </EuiText>
            </>),
      content: (
        <>
          { getContent() }
        </>)
    };
  };

  const getExplorerVis = () => {
    return (
      <ExplorerVisualizations
        curVisId={ curVisId }
        setCurVisId={ setCurVisId }
        explorerFields={ explorerFields }
        explorerVis={ explorerVisualizations }
        explorerData={ explorerData }
        handleAddField={ handleAddField }
        handleRemoveField={ handleRemoveField }
      />
    );
  };

  const getMainContentTabs = () => {
    return [
        getMainContentTab(
          {
            tabId: TAB_EVENT_ID,
            tabTitle: TAB_EVENT_TITLE,
            getContent: () => getMainContent()
          }
        ),
        getMainContentTab(
          {
            tabId: TAB_CHART_ID,
            tabTitle: TAB_CHART_TITLE,
            getContent: () => getExplorerVis()
          }
        )
    ];
  };

  const memorizedMainContentTabs = useMemo(() => {
    return getMainContentTabs();
  },
    [
      curVisId,
      isPanelTextFieldInvalid,
      explorerData,
      explorerFields,
      isSidebarClosed,
      countDistribution,
      explorerVisualizations
    ]
  );

  const handleContentTabClick = (selectedTab: IQueryTab) => setSelectedContentTab(selectedTab.id);
  
  const handleQuerySearch = () => fetchData();

  const handleQueryChange = (query: string, index: string) => {
    dispatch(changeQuery({
      tabId,
      query: {
        [RAW_QUERY]: query,
        [INDEX]: index
      },
    }));
  }

  const handleSavingObject = async () => {

    const currQuery = queryRef.current;
    const currFields = explorerFieldsRef.current;
    if (isEmpty(currQuery![RAW_QUERY])) { 
      setToast('No query to save.', 'danger');
      return; 
    };

    if (isEmpty(selectedPanelNameRef.current)) {
      setIsPanelTextFieldInvalid(true);
      setToast('Name field cannot be empty.', 'danger');
      return;
    }
    setIsPanelTextFieldInvalid(false);

    if (isEqual(selectedContentTabId, TAB_EVENT_ID)) {
      
      // create new saved query
      savedObjects.createSavedQuery({
        query: currQuery![RAW_QUERY],
        fields: currFields![SELECTED_FIELDS],
        dateRange: currQuery![SELECTED_DATE_RANGE],
        name: selectedPanelNameRef.current,
        timestamp: currQuery![SELECTED_TIMESTAMP]
      }).catch((error: any) => { 
        setToast(`Cannot save query, error: ${error.message}`, 'danger');
        return;
      });

      // to-dos - update selected custom panel
      if (!isEmpty(selectedCustomPanelOptions)) {
        // update custom panel - query
      }

    } else if (isEqual(selectedContentTabId, TAB_CHART_ID)) {
      
      // create new saved visualization
      const savingVisRes = await savedObjects.createSavedVisualization({
        query: currQuery![RAW_QUERY],
        fields: currFields![SELECTED_FIELDS],
        dateRange: currQuery![SELECTED_DATE_RANGE],
        type: curVisId,
        name: selectedPanelNameRef.current,
        timestamp: currQuery![SELECTED_TIMESTAMP]
      }).catch((error: any) => {
        setToast(`Cannot save Visualization, error: ${error.message}`, 'danger');
        return;
      });

      // update custom panel - visualization
      if (!isEmpty(selectedCustomPanelOptions)) {
        
        savedObjects.bulkUpdateCustomPanel({
          selectedCustomPanels: selectedCustomPanelOptions,
          savedVisualizationId: savingVisRes?.objectId
        }).catch((error: any) => {
          setToast(`Cannot add to operation panels, error: ${error.message}`, 'danger');
        });
      }
    }
  };

  const dateRange = isEmpty(query['selectedDateRange']) ? ['now/15m', 'now'] :
   [query['selectedDateRange'][0], query['selectedDateRange'][1]];

  return (
    <div className="dscAppContainer">
      <Search
        key="search-component"
        query={ query[RAW_QUERY] }
        handleQueryChange={ (query: string, index: string = '') => { handleQueryChange(query, index) } }
        handleQuerySearch={ () => { handleQuerySearch() } }
        dslService = { dslService }
        startTime={ dateRange[0] }
        endTime={ dateRange[1] }
        handleTimePickerChange={ (timeRange: Array<string>) => handleTimePickerChange(timeRange) }
        selectedPanelName={ selectedPanelNameRef.current }
        selectedCustomPanelOptions={ selectedCustomPanelOptions }
        setSelectedPanelName={ setSelectedPanelName }
        setSelectedCustomPanelOptions={ setSelectedCustomPanelOptions }
        handleSavingObject={ handleSavingObject }
        isPanelTextFieldInvalid={ isPanelTextFieldInvalid }
        savedObjects={ savedObjects }
        showSavePanelOptionsList={ isEqual(selectedContentTabId, TAB_CHART_ID) }
      />
      <EuiTabbedContent
        className="mainContentTabs"
        initialSelectedTab={ memorizedMainContentTabs[0] }
        selectedTab={ memorizedMainContentTabs.find(tab => { tab.id === selectedContentTabId }) }
        onTabClick={ (selectedTab: EuiTabbedContentTab) => handleContentTabClick(selectedTab) }
        tabs={ memorizedMainContentTabs }
      />
    </div>
  );
};
