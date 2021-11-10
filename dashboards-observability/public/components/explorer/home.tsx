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

import './home.scss';

import React, { useState, ReactElement, useRef, useEffect } from 'react';
import { useDispatch, batch, useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import { useHistory } from 'react-router-dom';
import {
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiPageContent,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiPopover,
  EuiContextMenuPanel,
  EuiContextMenuItem,
  EuiOverlayMask,
  EuiLink,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiText,
  EuiHorizontalRule,
} from '@elastic/eui';
import { Search } from '../common/search/search';
import { RAW_QUERY, TAB_ID_TXT_PFX, SELECTED_DATE_RANGE, EVENT_ANALYTICS_DOCUMENTATION_URL } from '../../../common/constants/explorer';
import { OBSERVABILITY_BASE, EVENT_ANALYTICS, SAVED_OBJECTS } from '../../../common/constants/shared';
import { EmptyTabParams } from '../../../common/types/explorer';
import { HttpStart } from '../../../../../src/core/public';
import SavedObjects from '../../services/saved_objects/event_analytics/saved_objects';
import { addTab, selectQueryTabs } from './slices/query_tab_slice';
import { init as initFields } from './slices/field_slice';
import { init as initQuery, changeQuery } from './slices/query_slice';
import { init as initQueryResult, selectQueryResult } from './slices/query_result_slice';
import { Histories as EventHomeHistories } from './home_table/history_table';
import { selectQueries } from './slices/query_slice';
import { setSelectedQueryTab } from './slices/query_tab_slice';
import { DeletePanelModal } from '../custom_panels/helpers/modal_containers';
import { CUSTOM_PANELS_API_PREFIX } from '../../../common/constants/custom_panels';
import { getSampleDataModal } from '../common/helpers/add_sample_modal';

interface IHomeProps {
  pplService: any;
  dslService: any;
  savedObjects: SavedObjects;
  setToast: (
    title: string,
    color?: string,
    text?: React.ReactChild | undefined,
    side?: string | undefined
  ) => void;
  getExistingEmptyTab: (params: EmptyTabParams) => string;
  http: HttpStart;
}

export const Home = (props: IHomeProps) => {
  const { pplService, dslService, savedObjects, setToast, getExistingEmptyTab, http } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const queries = useSelector(selectQueries);
  const explorerData = useSelector(selectQueryResult);
  const tabIds = useSelector(selectQueryTabs)['queryTabIds'];
  const queryRef = useRef();
  const tabIdsRef = useRef();
  const explorerDataRef = useRef();
  queryRef.current = queries;
  tabIdsRef.current = tabIds;
  explorerDataRef.current = explorerData;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDateRange, setSelectedDateRange] = useState<Array<string>>(['now-15m', 'now']);
  const [savedHistories, setSavedHistories] = useState([]);
  const [selectedHisotries, setSelectedHisotries] = useState([]);
  const [isActionsPopoverOpen, setIsActionsPopoverOpen] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [modalLayout, setModalLayout] = useState(<EuiOverlayMask></EuiOverlayMask>);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const selectedDateRangeRef = useRef();
  selectedDateRangeRef.current = selectedDateRange;

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const fetchHistories = async () => {
    const res = await savedObjects.fetchSavedObjects({
      objectType: ['savedQuery', 'savedVisualization'],
      sortOrder: 'desc',
      fromIndex: 0,
    });
    setSavedHistories(res['observabilityObjectList']);
  };

  const deleteHistoryList = async () => {
    const objectIdsToDelete = selectedHisotries.map((history) => history.data.objectId);
    await savedObjects
      .deleteSavedObjectsList({ objectIdList: objectIdsToDelete })
      .then(async (res) => {
        setSavedHistories((staleHistories) => {
          return staleHistories.filter((his) => {
            return !objectIdsToDelete.includes(his.objectId);
          });
        });
        setToast(`Histories has been successfully deleted.`, 'success');
      })
      .catch((error) => {
        setToast(`Cannot delete Histories, error: ${error.message}`, 'danger');
      })
      .finally(() => {
        closeModal();
      });
  };

  const addNewTab = async (where: string = 'redirect') => {
    //get a new tabId
    const tabId = uniqueId(TAB_ID_TXT_PFX);

    // create a new tab
    await batch(() => {
      dispatch(initQuery({ tabId, }));
      dispatch(initQueryResult({ tabId, }));
      dispatch(initFields({ tabId, }));
      dispatch(addTab({ tabId, }));
      dispatch(changeQuery({
        tabId,
        query: {
          'tabCreatedType': 'redirect'
        }
      }));
    });

    return tabId;
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  const dispatchInitialData = (tabId: string) => {
    batch(() => {
      dispatch(changeQuery({
        tabId,
        query: {
          [RAW_QUERY]: searchQuery,
          [SELECTED_DATE_RANGE]: selectedDateRangeRef.current
        }
      }));
      dispatch(setSelectedQueryTab({ tabId }));
    });
  };
  
  const handleQuerySearch = async () => {
    const emptyTabId = getExistingEmptyTab({
      tabIds: tabIdsRef.current,
      queries: queryRef.current,
      explorerData: explorerDataRef.current,
    });
    const newTabId = emptyTabId ? emptyTabId : await addNewTab();

    // update this new tab with data
    await dispatchInitialData(newTabId);

    // redirect to explorer
    history.push('/event_analytics/explorer');
  };

  const handleQueryChange = async (query: string) => setSearchQuery(query);

  const handleTimePickerChange = async (timeRange: Array<string>) =>
    setSelectedDateRange(timeRange);

  const handleHistoryClick = async (objectId: string) => {
    const emptyTabId = getExistingEmptyTab({
      tabIds: tabIdsRef.current,
      queries: queryRef.current,
      explorerData: explorerDataRef.current
    });
    const newTabId = emptyTabId ? emptyTabId : await addNewTab();
    batch(() => {
      dispatch(changeQuery({
        tabId: newTabId,
        query: {
          'tabCreatedType': 'redirect'
        }
      }));
      dispatch(setSelectedQueryTab({ tabId: newTabId }));
    });
    // redirect to explorer
    history.push(`/event_analytics/explorer/${objectId}`);
  };

  const addSampledata = async () => {
    setModalLayout(
      getSampleDataModal(closeModal, async () => {
        closeModal();
        await addSampleEvents();
      })
    );
    showModal();
  };

  const addSampleEvents = async () => {
    try {
      setIsTableLoading(true);
      const flights = await http
        .get('../api/saved_objects/_find', {
          query: {
            type: 'index-pattern',
            search_fields: 'title',
            search: 'opensearch_dashboards_sample_data_flights',
          },
        })
        .then((resp: any) => resp.total === 0);
      const logs = await http
        .get('../api/saved_objects/_find', {
          query: {
            type: 'index-pattern',
            search_fields: 'title',
            search: 'opensearch_dashboards_sample_data_logs',
          },
        })
        .then((resp: any) => resp.total === 0);
      if (flights || logs) setToast('Adding sample data. This can take some time.');
      await Promise.all([
        flights ? http.post('../api/sample_data/flights') : Promise.resolve(),
        logs ? http.post('../api/sample_data/logs') : Promise.resolve(),
      ]);

      await http
        .get(
          `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}/addSampleSavedObjects/event_analytics`
        )
        .then(async (resp: any) => {
          await http.post(`${CUSTOM_PANELS_API_PREFIX}/panels/addSamplePanels`, {
            body: JSON.stringify({
              savedVisualizationIds: [...resp?.savedVizIds],
            }),
          });

          const res = await savedObjects.fetchSavedObjects({
            objectIdList: [...resp?.savedVizIds, ...resp?.savedQueryIds] || [],
            objectType: ['savedQuery', 'savedVisualization'],
            sortOrder: 'desc',
            fromIndex: 0,
          });
          setSavedHistories((staleHistoryList) => {
            return [...res['observabilityObjectList'], ...staleHistoryList];
          });
        });
      setToast(`Sample events added successfully.`);
    } catch (error) {
      setToast(`Cannot add sample events data, error: ${error}`, 'danger');
      console.error(error.body.message);
    } finally {
      setIsTableLoading(false);
    }
  };

  const popoverButton = (
    <EuiButton
      iconType="arrowDown"
      iconSide="right"
      onClick={() => setIsActionsPopoverOpen(!isActionsPopoverOpen)}
    >
      Actions
    </EuiButton>
  );

  const deleteHistory = () => {
    const customPanelString = `${selectedHisotries.length > 1 ? 'histories' : 'history'}`;
    setModalLayout(
      <DeletePanelModal
        onConfirm={deleteHistoryList}
        onCancel={closeModal}
        title={`Delete ${selectedHisotries.length} ${customPanelString}`}
        message={`Are you sure you want to delete the selected ${selectedHisotries.length} ${customPanelString}?`}
      />
    );
    showModal();
  };

  const popoverItems: ReactElement[] = [
    <EuiContextMenuItem
      key="delete"
      disabled={savedHistories.length === 0 || selectedHisotries.length === 0}
      onClick={() => {
        setIsActionsPopoverOpen(false);
        deleteHistory();
      }}
    >
      Delete
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="redirect"
      onClick={() => {
        setIsActionsPopoverOpen(false);
        history.push(`/event_analytics/explorer`);
      }}
    >
      Event Explorer
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="addSample"
      onClick={() => {
        setIsActionsPopoverOpen(false);
        addSampledata();
      }}
    >
      Add samples
    </EuiContextMenuItem>,
  ];

  return (
    <>
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Event Analytics</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent className="event-home">
            <EuiFlexGroup gutterSize="s">
              <EuiFlexItem>
                <Search
                  query={queryRef.current![RAW_QUERY]}
                  tempQuery={searchQuery}
                  handleQueryChange={handleQueryChange}
                  handleQuerySearch={handleQuerySearch}
                  handleTimePickerChange={handleTimePickerChange}
                  handleTimeRangePickerRefresh={handleQuerySearch}
                  pplService={pplService}
                  dslService={dslService}
                  startTime={selectedDateRange[0]}
                  endTime={selectedDateRange[1]}
                  setStartTime={() => {}}
                  setEndTime={() => {}}
                  showSaveButton={false}
                  runButtonText="New Query"
                />
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="m" />
          </EuiPageContent>
          <EuiSpacer size="m" />
          <EuiPageContent className="event-home">
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle size="s">
                  <h3>
                    Queries and Visualizations
                    <span className="panel-header-count"> ({savedHistories.length})</span>
                  </h3>
                </EuiTitle>
                <EuiSpacer size="s" />
                <EuiText size="s" color="subdued">
                  Use Events Analytics to monitor, correlate, analyze and visualize machine
                  generated data through Piped Processing Language. Save frequently searched queries
                  and visualizations for quick access{' '}
                  <EuiLink external={true} href={EVENT_ANALYTICS_DOCUMENTATION_URL} target="blank">
                    Learn more
                  </EuiLink>
                </EuiText>
              </EuiPageContentHeaderSection>
              <EuiPageContentHeaderSection>
                <EuiFlexGroup gutterSize="s">
                  <EuiFlexItem>
                    <EuiPopover
                      panelPaddingSize="none"
                      button={popoverButton}
                      isOpen={isActionsPopoverOpen}
                      closePopover={() => setIsActionsPopoverOpen(false)}
                    >
                      <EuiContextMenuPanel items={popoverItems} />
                    </EuiPopover>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiHorizontalRule margin="m" />
            <EuiFlexGroup>
              <EuiFlexItem grow={true}>
                {savedHistories.length > 0 ? (
                  <EventHomeHistories
                    savedHistories={savedHistories}
                    handleHistoryClick={handleHistoryClick}
                    isTableLoading={isTableLoading}
                    handleSelectHistory={setSelectedHisotries}
                    selectedHisotries={selectedHisotries}
                  />
                ) : (
                  <>
                    <EuiSpacer size="xxl" />
                    <EuiText textAlign="center">
                      <h2>No Queries or Visualizations</h2>
                      <EuiSpacer size="m" />
                      <EuiText color="subdued">
                        Use events analytics to create and save frequently searched
                        <br />
                        queries and visualizations, using PPL.
                      </EuiText>
                    </EuiText>
                    <EuiSpacer size="m" />
                    <EuiFlexGroup justifyContent="center">
                      <EuiFlexItem grow={false}>
                        <EuiButton
                          fullWidth={false}
                          onClick={() => history.push(`/event_analytics/explorer`)}
                        >
                          Event Explorer
                        </EuiButton>
                      </EuiFlexItem>
                      <EuiFlexItem grow={false}>
                        <EuiButton fullWidth={false} onClick={() => addSampledata()}>
                          Add samples
                        </EuiButton>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiSpacer size="xxl" />
                  </>
                )}
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
      {isModalVisible && modalLayout}
    </>
  );
};
