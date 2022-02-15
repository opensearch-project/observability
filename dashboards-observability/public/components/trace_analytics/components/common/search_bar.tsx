/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiButton,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiSuperDatePicker,
} from '@elastic/eui';
import { uiSettingsService } from '../../../../../common/utils';
import _ from 'lodash';
import React, { useState } from 'react';
import { Filters, FiltersProps } from './filters/filters';

export const renderDatePicker = (
  startTime: string,
  setStartTime: (startTime: string) => void,
  endTime: string,
  setEndTime: (endTime: string) => void
) => {
  return (
    <EuiSuperDatePicker
      start={startTime}
      end={endTime}
      dateFormat={uiSettingsService.get('dateFormat')}
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
  setQuery: (query: string) => void;
  startTime: string;
  setStartTime: (startTime: string) => void;
  endTime: string;
  setEndTime: (endTime: string) => void;
}

interface SearchBarOwnProps extends SearchBarProps {
  refresh: () => void;
  page: 'dashboard' | 'traces' | 'services' | 'app';
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
        <EuiFlexItem grow={false} style={{maxWidth: '40vw'}}>
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
