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

import React, { useState, useRef } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { isEmpty, uniqueId, isEqual } from 'lodash';
import { initialTabId } from '../../framework/redux/store/shared_state';
import { useHistory } from 'react-router-dom';
import { selectQueries } from './slices/query_slice';
import {
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiPageContent,
  EuiListGroup,
  EuiListGroupItem,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem
} from '@elastic/eui';
import { Search } from '../common/search/search';
import { 
  INDEX,
  RAW_QUERY,
  TAB_ID_TXT_PFX,
  SELECTED_TIMESTAMP,
  SELECTED_DATE_RANGE
} from '../../../common/constants/explorer';
import {
  IQuery
} from '../../../common/types/explorer';
import { useEffect } from 'react';
import SavedObjects from '../../services/saved_objects/event_analytics/saved_objects';
import { 
  selectQueryTabs,
  addTab,
  setSelectedQueryTab,
  removeTab
} from './slices/query_tab_slice';
import { 
  init as initFields,
  remove as removefields
} from './slices/field_slice';
import {
  init as initQuery,
  remove as removeQuery,
  changeQuery
} from './slices/query_slice';
import { 
  init as initQueryResult,
  remove as removeQueryResult,
} from './slices/query_result_slice';
import timestampUtils from '../../services/timestamp/timestamp';

interface IHomeProps {
  pplService: any;
  dslService: any;
  savedObjects: SavedObjects;
  timestampUtils: timestampUtils;
  http: any;
}

export const Home = (props: IHomeProps) => {
  const { 
    pplService, 
    dslService,
    savedObjects,
    timestampUtils,
    http
  } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDateRange, setSelectedDateRange] = useState<Array<string>>(['now-15m', 'now']);
  const [savedHistories, setSavedHistories] = useState([]);

  const fetchHistories = async () => {
    const res = await savedObjects.fetchSavedObjects({
      objectType: ['savedQuery', 'savedVisualization'],
      sortOrder: 'desc',
      fromIndex: 0,
      maxItems: 10
    });
    setSavedHistories(res['observabilityObjectList'] || []);
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
  return (
    <div className="dscAppContainer">
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Event Analytics</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>
        </EuiPageBody>
      </EuiPage>
      <EuiPageContent>
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
        />
        <EuiSpacer />
        <EuiFlexGroup
          direction="column"
        >
          <EuiFlexItem
            grow={ true }
          >
            <EuiListGroup
              maxWidth={ false }
              wrapText={ true }
            >
              <EuiTitle size="s">
                <h1>{ "Histories" }</h1>
              </EuiTitle>
              <EuiSpacer size="s" />
            </EuiListGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageContent>
    </div>
  );
};