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

import React from 'react';
import { uniqueId } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuery } from './slices/querySlice';
import { initialTabId } from '../../framework/redux/store/sharedState';
// import { fetchEvents } from './hooks/useFetchEvents';
import { useHistory } from 'react-router-dom';
import { selectQueries } from './slices/querySlice';
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
import { Search } from '../common/seach/search';
import { RAW_QUERY } from '../../common/constants/explorer';

export const Home = (props: any) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const query = useSelector(selectQueries)[initialTabId][RAW_QUERY];

  const queryHistories = [
    {
      query: "source=opensearch_dashboards_sample_data_flights | where timestamp > timestamp('2021-07-01 00:00:00') and timestamp < timestamp('2021-07-02 00:00:00')",
      iconType: "tokenEnum"
    },
    {
      query: "source=opensearch_dashboards_sample_data_flights",
      iconType: "tokenEnum"
    },
    {
      query: "source=opensearch_dashboards_sample_data_flights | where timestamp > timestamp('2021-07-01 00:00:00') and timestamp < timestamp('2021-07-08 00:00:00') | fields Origin, timestamp",
      iconType: "tokenEnum"
    },
  ];

  const visHistories = [
    {
      query: "source=opensearch_dashboards_sample_data_flights | where timestamp > timestamp('2021-07-01 00:00:00') and timestamp < timestamp('2021-07-08 00:00:00') | stats count(Origin) by span(timestamp, '2h')",
      iconType: "tokenHistogram"
    }
  ];

  const column = [{
    field: 'history',
    name: 'History'
  }];

  const actionItems = [
    {
      text: 'Run',
      iconType: '',
      attributes: {
        fill: true
      },
      handlers: {
        onClick: () => {
          history.push('/explorer/events');
        }
      }
    },
    {
      text: 'Live',
      iconType: 'play',
      handlers: {
        onClick: () => {}
      }
    }
  ];

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
          handleQueryChange={ (query) => {
            dispatch(changeQuery({
              tabId: initialTabId,
              query: {
                [RAW_QUERY]: query
              }
            }));
          } }
          handleQuerySearch={ () => {
            history.push('/explorer/events');
          } }
          startTime={ 'now-15m' }
          endTime={ 'now' }
          setStartTime={ () => {} }
          setEndTime={ () => {} }
          setIsOutputStale={ () => {} }
          liveStreamChecked={ false }
          onLiveStreamChange={ () => {} }
          actionItems={ actionItems }
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
                <h1>Query History</h1>
              </EuiTitle>
              <EuiSpacer size="s" />
              {
                queryHistories.map((h) => {
                  return (
                    <EuiListGroupItem
                      key={ uniqueId('query-his-') }
                      onClick={(item) => {
                        dispatch(changeQuery({
                          tabId: initialTabId,
                          query: {
                            [RAW_QUERY]: item.target.outerText
                          }
                        }));
                        history.push('/explorer/events');
                      }}
                      label={ h.query }
                      color="primary"
                      size="s"
                      iconType={ h.iconType }
                  />
                  );
                })
              }
            </EuiListGroup>
          </EuiFlexItem>
          <EuiFlexItem
            grow={ true }
          >
            <EuiListGroup
              maxWidth={ false }
              wrapText={ true }
            >
              <EuiTitle size="s">
                <h1>Visualization History</h1>
              </EuiTitle>
              <EuiSpacer size="s" />
              {
                visHistories.map((h) => {
                  return (
                    <EuiListGroupItem
                      key={ uniqueId('vis-his-') }
                      onClick={(item) => {
                        dispatch(changeQuery({
                          tabId: initialTabId,
                          query: {
                            [RAW_QUERY]: item.target.outerText
                          }
                        }));
                        history.push('/explorer/events');
                      }}
                      label={ h.query }
                      color="primary"
                      size="s"
                      iconType={ h.iconType }
                  />
                  );
                })
              }
            </EuiListGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageContent>
    </div>
  );
};