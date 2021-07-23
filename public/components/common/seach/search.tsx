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

export interface IQueryBarProps {
  query: any
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

export const Search = (props: any) => {

  const {
    query,
    handleQueryChange,
    handleQuerySearch,
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    setIsOutputStale,
    actionItems
  } = props;

  function renderQueryBar ({ query, handleQueryChange, handleQuerySearch }: IQueryBarProps) {
    return (
      <QueryBar
        query={ query }
        handleQueryChange={ handleQueryChange }
        handleQuerySearch={ handleQuerySearch }
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
          { actionItems.length > 0 && (
            actionItems.map((item) => {
              return (
                <EuiFlexItem
                  key={_.uniqueId('search-action-')}
                  className={ item.className ? item.className : "euiFlexItem--flexGrowZero"}
                >
                  <EuiButton 
                    iconType={ item.iconType }
                    { ...item.attributes }
                    { ...item.handlers }
                  >
                    { item.text }
                  </EuiButton>
                </EuiFlexItem>
              );
            })
          ) }
      </EuiFlexGroup>
    </div>
  );
}

Search.propTypes = {
  handleQueryChange: PropTypes.func,
  handleQuerySearch: PropTypes.func
};
