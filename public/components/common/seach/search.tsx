/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  EuiFlexGroup,
} from '@elastic/eui';
import _ from 'lodash';

import { QueryBar } from './queryBar';
import { Filter } from './Filter';

export interface IQueryBarProps {
  handleQueryChange: (query: string) => void
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
    handleQueryChange,
    handleQuerySearch,
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    setIsOutputStale
  } = props;

  const [ dateRange, setDateRange ] = useState(['now-15m', 'now']);

  function renderQueryBar ({ handleQueryChange, handleQuerySearch }: IQueryBarProps) {
    return (
      <QueryBar 
        handleQueryChange={ handleQueryChange }
        handleQuerySearch={ handleQuerySearch }
      />
    );
  }

  return (
    <>
    <div className="globalQueryBar">
      <EuiFlexGroup
          gutterSize="s"
          justifyContent="flexEnd"
        >
          { renderQueryBar({ handleQueryChange, handleQuerySearch }) }
          <Filter
            startTime={ startTime }
            endTime={ endTime }
            setStartTime={ setStartTime }
            setEndTime={ setEndTime }
            setIsOutputStale={ setIsOutputStale }
            liveStreamChecked={props.liveStreamChecked}
            onLiveStreamChange={props.onLiveStreamChange}
          />
      </EuiFlexGroup>
    </div>
    </>
  );
}

Search.propTypes = {
  handleQueryChange: PropTypes.func,
  handleQuerySearch: PropTypes.func
};

export default Search;
