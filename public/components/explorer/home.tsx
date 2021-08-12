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
import { useHistory } from 'react-router-dom';
import { EuiBasicTable } from '@elastic/eui';
import { Search } from '../common/seach/search';

export const Home = (props: any) => {

  const history = useHistory();

  const histories = [{
    historiy: 'sample histories list, all histories will be listed here, showing the last N queries that user has executed'
  }];

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
          history.push('/event/explorer');
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
      <h1>Event Analytics</h1>
      <Search 
        query={""}
        handleQueryChange={ () => {} }
        handleQuerySearch={ () => {} }
        startTime={ 'now-15m' }
        endTime={ 'now' }
        setStartTime={ () => {} }
        setEndTime={ () => {} }
        setIsOutputStale={ () => {} }
        liveStreamChecked={ false }
        onLiveStreamChange={ () => {} }
        actionItems={ actionItems }
      />
      {/* <Search 
        query={ props.query }
        handleQueryChange={ (query: string) => { props.setSearchQuery(query, props.tabId) } }
        handleQuerySearch={ () => { props.querySearch(props.tabId) } }
        startTime={ startTime }
        endTime={ endTime }
        setStartTime={ setStartTime }
        setEndTime={ setEndTime }
        setIsOutputStale={ () => {} }
        liveStreamChecked={ liveStreamChecked }
        onLiveStreamChange={ handleLiveStreamChecked }
      /> */}
      <EuiBasicTable 
        items={ histories }
        columns={ column }
      />
    </div>
  );
};