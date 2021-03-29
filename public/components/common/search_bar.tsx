/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

import {
  EuiButton,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiSuperDatePicker,
} from '@elastic/eui';
import _ from 'lodash';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { FiltersProps, Filters } from './filters/filters';

export const renderDatePicker = (startTime, setStartTime, endTime, setEndTime) => {
  return (
    <EuiSuperDatePicker
      start={startTime}
      end={endTime}
      showUpdateButton={false}
      onTimeChange={(e) => {
        setStartTime(e.start);
        setEndTime(e.end);
      }}
    />
  );
};

export interface SearchBarProps extends FiltersProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  startTime: string;
  setStartTime: Dispatch<SetStateAction<string>>;
  endTime: string;
  setEndTime: Dispatch<SetStateAction<string>>;
}

interface SearchBarOwnProps extends SearchBarProps {
  refresh: () => void;
  page: 'dashboard' | 'traces' | 'services';
  datepickerOnly?: boolean;
}

export function SearchBar(props: SearchBarOwnProps) {
  // use another query state to avoid typing delay
  const [query, setQuery] = useState(props.query);
  const setGlobalQuery = _.debounce((q) => props.setQuery(q), 50);

  return (
    <>
      <EuiFlexGroup gutterSize="s">
        {!props.datepickerOnly && (
          <EuiFlexItem>
            <EuiFieldSearch
              fullWidth
              isClearable={false}
              placeholder="Trace ID, trace group name, service name"
              data-test-subj="search-bar-input-box"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setGlobalQuery(e.target.value);
              }}
              onSearch={props.refresh}
            />
          </EuiFlexItem>
        )}
        <EuiFlexItem grow={false}>
          {renderDatePicker(props.startTime, props.setStartTime, props.endTime, props.setEndTime)}
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton
            data-test-subj="search-bar-refresh-button"
            fill
            iconType="refresh"
            onClick={props.refresh}
          >
            Refresh
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      {!props.datepickerOnly && (
        <>
          <EuiSpacer size="s" />
          <Filters page={props.page} filters={props.filters} setFilters={props.setFilters} />
        </>
      )}
    </>
  );
}
