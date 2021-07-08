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
import PropTypes from 'prop-types';
import {
  EuiFlexGroup,
  EuiButton,
  EuiFlexItem
} from '@elastic/eui';
import _ from 'lodash';

import { QueryBar } from './queryBar';
import { Filter } from './Filter';

import './search.scss';
import { _termValuesToQuery } from '@elastic/eui/src/components/search_bar/query/ast_to_es_query_dsl';

export interface IQueryBarProps {
  query: string
  handleQueryChange: (query: string) => void;
  handleQuerySearch: () => void
}

export interface IFilterProps {
  startTime: String
  endTime: String
  setStartTime: () => void
  setEndTime: () => void
  setTimeRange: () => void
  setIsOutputStale: () => void
}

function Search (props: any) {

  const {
    query,
    handleQueryChange,
    handleQuerySearch,
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    setIsOutputStale
  } = props;

  function renderQueryBar ({ query, handleQueryChange, handleQuerySearch }: IQueryBarProps) {
    return (
      <QueryBar
        query={ query }
        handleQueryChange= { handleQueryChange }
        handleQuerySearch= { handleQuerySearch }
      />
    );
  }

  return (
    <div className="globalQueryBar">
      <EuiFlexGroup
          gutterSize="s"
          justifyContent="flexEnd"
        >
          { renderQueryBar({ query, handleQueryChange, handleQuerySearch }) }
          <Filter
            startTime={ startTime }
            endTime={ endTime }
            setStartTime={ setStartTime }
            setEndTime={ setEndTime }
            setIsOutputStale={ setIsOutputStale }
            liveStreamChecked={props.liveStreamChecked}
            onLiveStreamChange={props.onLiveStreamChange}
          />
          <EuiFlexItem
            className="euiFlexItem--flexGrowZero"
          >
            <EuiButton 
              onClick={() => {}} 
              iconType="refresh"
            >
              Refresh
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem
            className="euiFlexItem--flexGrowZero"
          >
            <EuiButton 
              onClick={() => {}} 
              iconType="play"
            >
              Live
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem
            className="euiFlexItem--flexGrowZero"
          >
            <EuiButton 
              onClick={() => {}} 
              iconType="heart"
            >
              Save
            </EuiButton>
          </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}

Search.propTypes = {
  handleQueryChange: PropTypes.func,
  handleQuerySearch: PropTypes.func
};

export default Search;
