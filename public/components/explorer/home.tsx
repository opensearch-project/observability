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

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuery } from './slices/query_slice';
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
import { INDEX, RAW_QUERY } from '../../../common/constants/explorer';
import { useEffect } from 'react';
import SavedObjects from '../../services/saved_objects/event_analytics/saved_objects';

interface IHomeProps {
  pplService: any;
  dslService: any;
  savedObjects: SavedObjects;
  http: any;
}

export const Home = (props: IHomeProps) => {
  const { 
    pplService, 
    dslService,
    savedObjects,
    http
  } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useSelector(selectQueries)[initialTabId][RAW_QUERY];
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

  useEffect(() => {
    fetchHistories();
  }, []);

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
          query={ query }
          handleQueryChange={ (query: string, index: string) => {
            dispatch(changeQuery({
              tabId: initialTabId,
              query: {
                [RAW_QUERY]: query,
                [INDEX]: index
              }
            }));
          } }
          handleQuerySearch={ () => {
            history.push('/event_analytics/explorer');
          } }
          pplService={ pplService }
          dslService={ dslService }
          startTime={ 'now-15m' }
          endTime={ 'now' }
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