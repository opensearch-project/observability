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

import React, { useState, ReactElement } from 'react';
import { useDispatch, batch } from 'react-redux';
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
} from '@elastic/eui';
import { Search } from '../common/search/search';
import {
  INDEX,
  RAW_QUERY,
  TAB_ID_TXT_PFX,
  SELECTED_TIMESTAMP,
  SELECTED_DATE_RANGE,
  SELECTED_FIELDS
} from '../../../common/constants/explorer';
import { useEffect } from 'react';
import SavedObjects from '../../services/saved_objects/event_analytics/saved_objects';
import { addTab } from './slices/query_tab_slice';
import { init as initFields } from './slices/field_slice';
import {
  init as initQuery,
  changeQuery
} from './slices/query_slice';
import { init as initQueryResult } from './slices/query_result_slice';
import { Histories as EventHomeHistories } from './home_table/history_table';

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
}

export const Home = (props: IHomeProps) => {
  const {
    pplService,
    dslService,
    savedObjects,
    setToast,
  } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDateRange, setSelectedDateRange] = useState<Array<string>>(['now-15m', 'now']);
  const [savedHistories, setSavedHistories] = useState([]);
  const [isActionsPopoverOpen, setIsActionsPopoverOpen] = useState(false);

  const fetchHistories = async () => {
    const res = await savedObjects.fetchSavedObjects({
      objectType: ['savedQuery', 'savedVisualization'],
      sortOrder: 'desc',
      fromIndex: 0
    });
    setSavedHistories(res['observabilityObjectList']);
  };

  const deleteHistoryById = async(objectId: string, name: string) => {
    await savedObjects
          .deleteSavedObjectsById({ objectId })
          .then(async (res) => {
            setSavedHistories((staleHistories) => {
              return staleHistories.filter((his) => {
                return his.objectId !== objectId;
              });
            });
            setToast(`History '${name}' has been successfully deleted.`, 'success');
          })
          .catch((error) => { 
            console.log('delete error: ', error); 
            setToast(`Cannot delete history '${name}', error: ${error.message}`, 'danger');
          });
  };

  const addNewTab = async () => {
    //get a new tabId
    const tabId = uniqueId(TAB_ID_TXT_PFX);

    // create a new tab
    await batch(() => {
      dispatch(initQuery({ tabId, }));
      dispatch(initQueryResult({ tabId, }));
      dispatch(initFields({ tabId, }));
      dispatch(addTab({ tabId, }));
    });

    return tabId;
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  const addSearchInput = async (tabId: string) => {
    dispatch(changeQuery({
      tabId,
      query: {
        [RAW_QUERY]: searchQuery,
        [SELECTED_DATE_RANGE]: selectedDateRange
      }
    }));
  }

  const handleQuerySearch = async () => {
    // create new tab
    const newTabId = await addNewTab();

    // update this new tab with data
    await addSearchInput(newTabId);

    // redirect to explorer
    history.push('/event_analytics/explorer');
  }

  const handleQueryChange = async (query: string, index: string) => setSearchQuery(query);

  const handleTimePickerChange = async (timeRange: Array<string>) => setSelectedDateRange(timeRange);

  const handleHistoryClick = async (objectId: string) => {
    // redirect to explorer
    history.push(`/event_analytics/explorer/${objectId}`);
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

  const popoverItems: ReactElement[] = [
    <EuiContextMenuItem
      key="rename"
      onClick={() => {
        setIsActionsPopoverOpen(false);
        history.push(`/event_analytics/explorer`);
      }}
    >
      Event Explorer
    </EuiContextMenuItem>
  ];

  return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Event Analytics</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent id="event-home">
            <EuiFlexGroup gutterSize="s">
              <EuiFlexItem>
                <Search
                  query={ searchQuery }
                  handleQueryChange={ handleQueryChange }
                  handleQuerySearch={ handleQuerySearch }
                  handleTimePickerChange={ handleTimePickerChange }
                  pplService={ pplService }
                  dslService={ dslService }
                  startTime={ selectedDateRange[0] }
                  endTime={ selectedDateRange[1] }
                  setStartTime={ () => {} }
                  setEndTime={ () => {} }
                  setIsOutputStale={ () => {} }
                  liveStreamChecked={ false }
                  onLiveStreamChange={ () => {} }
                  showSaveButton={ false }
                  runButtonText="New Query"
                />
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size='m' />
            <EuiPageHeaderSection>
              <EuiFlexGroup 
                gutterSize="s"
                justifyContent="spaceBetween"
              >
                <EuiFlexItem grow={false}>
                  <EuiTitle size="s">
                    <h1 id='home-his-title'>{ "Queries and Visualizations" }</h1>
                  </EuiTitle>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
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
            </EuiPageHeaderSection>
            <EuiSpacer size="m" />
            <EuiFlexGroup>
              <EuiFlexItem grow={ true }>
                <EventHomeHistories
                  handleDeleteHistory={deleteHistoryById}
                  savedHistories={savedHistories}
                  handleHistoryClick={handleHistoryClick}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
  );
};
