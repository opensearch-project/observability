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

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { 
  FormattedMessage 
} from '@osd/i18n/react';
import {
  EuiText,
  EuiButtonIcon,
  EuiTabbedContent,
  EuiTabbedContentTab,
  EuiFlexGroup,
  EuiFlexItem
} from '@elastic/eui';
import classNames from 'classnames';
import { Search } from '../common/seach/search';
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
  SELECTED_FIELDS,
  UNSELECTED_FIELDS
} from '../../../common/constants/explorer';
import { getIndexPatternFromRawQuery } from '../../../common/utils';
import { 
  useFetchEvents,
  useFetchVisualizations
} from './hooks';
import { 
  changeQuery,
  selectQueries
} from './slices/query_slice';
import { selectQueryResult } from './slices/query_result_slice';
import { selectFields, updateFields } from './slices/field_slice';
import { selectCountDistribution } from './slices/count_distribution_slice';
import { selectExplorerVisualization } from './slices/visualization_slice';

const TAB_EVENT_ID = _.uniqueId(TAB_EVENT_ID_TXT_PFX);
const TAB_CHART_ID = _.uniqueId(TAB_CHART_ID_TXT_PFX);

interface IExplorerProps {
  pplService: any;
  tabId: string
}

const statsRegx = new RegExp(/stats/);

export const Explorer = ({
  pplService,
  tabId
}: IExplorerProps) => {

  const dispatch = useDispatch();

  const requestParams = {
    tabId,
  };
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

  const query = useSelector(selectQueries)[tabId][RAW_QUERY];
  const explorerData = useSelector(selectQueryResult)[tabId];
  const explorerFields = useSelector(selectFields)[tabId];
  const countDistribution = useSelector(selectCountDistribution)[tabId];
  const explorerVisualizations = useSelector(selectExplorerVisualization)[tabId];
  const [selectedContentTabId, setSelectedContentTab] = useState<string>(TAB_EVENT_ID);
  const [startTime, setStartTime] = useState<string>('now-15m');
  const [endTime, setEndTime] = useState<string>('now');
  const [liveStreamChecked, setLiveStreamChecked] = useState<Boolean>(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState<Boolean>(false);
  const [fixedScrollEl, setFixedScrollEl] = useState<HTMLElement | undefined>();
  const fixedScrollRef = useCallback(
    (node: HTMLElement) => {
      if (node !== null) {
        setFixedScrollEl(node);
      }
    },
    [setFixedScrollEl]
  );

  useEffect(() => {
    if (!query) return;
    if (statsRegx.test(query)) {
      const index = getIndexPatternFromRawQuery(query);
      if (!index) return;
      getAvailableFields(`search source=${index}`);
      getVisualizations();
    } else {
      getEvents();
      getCountVisualizations('h');
    }
  }, []);

  const handleAddField = (field: IField) => toggleFields(field, UNSELECTED_FIELDS, SELECTED_FIELDS);

  const handleRemoveField = (field: IField) => toggleFields(field, SELECTED_FIELDS, UNSELECTED_FIELDS);

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

    const nextFields = _.cloneDeep(explorerFields);
    const thisFieldSet = nextFields[FieldSetToRemove];
    const nextFieldSet = thisFieldSet.filter((fd: IField) => fd.name !== field.name);
    nextFields[FieldSetToRemove] = nextFieldSet;
    nextFields[FieldSetToAdd].push(field);

    dispatch(updateFields({ 
      tabId,
      data: {
        ...nextFields
      }
    }));
  };

  const handleLiveStreamChecked = () => setLiveStreamChecked(!liveStreamChecked);

  const sidebarClassName = classNames({
    closed: isSidebarClosed,
  });

  const mainSectionClassName = classNames({
    'col-md-10': !isSidebarClosed,
    'col-md-12': isSidebarClosed,
  });

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
                    queryData={ explorerData?.jsonData }
                    explorerFields={ explorerFields }
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
          { (explorerData && !_.isEmpty(explorerData)) ? (
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
                            showResetButton={true}
                            onResetQuery={ () => {} }
                          />
                        </EuiFlexItem>
                        <EuiFlexItem
                          grow={false}
                        >
                          <TimechartHeader
                            dateFormat={ "MMM D, YYYY @ HH:mm:ss.SSS" }
                            options={[
                              {
                                display: 'Auto',
                                val: 'auto'
                              },
                              {
                                display: 'Millisecond',
                                val: 'ms'
                              },
                              {
                                display: 'Second',
                                val: 's'
                              },
                              {
                                display: 'Minute',
                                val: 'm'
                              },
                              {
                                display: 'Hour',
                                val: 'h'
                              },
                              {
                                display: 'Day',
                                val: 'd'
                              },
                              {
                                display: 'Week',
                                val: 'w'
                              },
                              {
                                display: 'Month',
                                val: 'M'
                              },
                              {
                                display: 'Year',
                                val: 'y'
                              },
                            ]}
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
                  ref={fixedScrollRef}
                >
                  <h2 className="euiScreenReaderOnly" id="documentsAriaLabel">
                    <FormattedMessage
                      id="discover.documentsAriaLabel"
                      defaultMessage="Documents"
                    />
                  </h2>
                  <div className="dscDiscover">
                    <DataGrid 
                      key={`datagrid-${tabId}`}
                      tabId={ tabId }
                      columns={ explorerData['schema'] }
                      rows={ explorerData['jsonData'] }
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
        queryResults={ explorerData }
        explorerFields={ explorerFields }
        query={ query }
        explorerVis={ explorerVisualizations }
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
      explorerData,
      explorerFields,
      isSidebarClosed,
      countDistribution,
      explorerVisualizations
    ]
  );

  const actionItems = [
    {
      text: 'Refresh',
      iconType: 'refresh',
      handlers: {
        onClick: () => {
          console.log('refresh clicked');
        }
      }
    },
    {
      text: 'Live',
      iconType: 'play',
      handlers: {
        onClick: () => {
          console.log('refresh clicked');
        }
      }
    },
    {
      text: 'Save',
      iconType: 'heart',
      handlers: {
        onClick: () => {
          console.log('refresh clicked');
        }
      }
    }
  ];

  const handleContentTabClick = (selectedTab: IQueryTab) => setSelectedContentTab(selectedTab.id);
  
  const handleQuerySearch = () => {
    if (statsRegx.test(query)) {
      const index = getIndexPatternFromRawQuery(query); // index
      if (!index) return;
      getAvailableFields(`search source=${index}`);
      getVisualizations();
      return;
    } 
    getEvents();
    getCountVisualizations('h');
  }

  const handleQueryChange = (query: string, tabId: string) => {
    dispatch(changeQuery({
      tabId,
      query: {
        [RAW_QUERY]: query
      }
    }));
  }
  
  return (
    <div className="dscAppContainer">
      <h1 className="euiScreenReaderOnly">testing</h1>
      <Search
        query={ query }
        handleQueryChange={ (query: string) => { handleQueryChange(query, tabId) } }
        handleQuerySearch={ () => { handleQuerySearch(tabId) } }
        startTime={ startTime }
        endTime={ endTime }
        setStartTime={ setStartTime }
        setEndTime={ setEndTime }
        setIsOutputStale={ () => {} }
        liveStreamChecked={ liveStreamChecked }
        onLiveStreamChange={ handleLiveStreamChecked }
        actionItems={ actionItems }
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