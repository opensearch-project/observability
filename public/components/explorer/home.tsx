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

export const Home = (props: any) => {
  const {pplService, dslService} = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useSelector(selectQueries)[initialTabId][RAW_QUERY];

  const queryHistories = [
    {
      query: "search source=opensearch_dashboards_sample_data_logs | where utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')",
      iconType: "tokenEnum"
    }
  ];

  const visHistories = [
    {
      query: "search source=opensearch_dashboards_sample_data_logs | where utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00') | stats count() by span(utc_time, '15m')",
      iconType: "tokenHistogram"
    }
  ];

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
            history.push('/explorer/events');
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