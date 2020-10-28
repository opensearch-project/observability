import {
  EuiButton,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiSuperDatePicker,
} from '@elastic/eui';
import _ from 'lodash';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
}

export function SearchBar(props: SearchBarOwnProps) {
  // use another query state to avoid typing delay
  const [query, setQuery] = useState(props.query);
  const setGlobalQuery = _.debounce((q) => props.setQuery(q), 50);

  return (
    <>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem>
          <EuiFieldSearch
            fullWidth
            placeholder="Trace ID, trace group name, user ID, service name"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setGlobalQuery(e.target.value);
            }}
            onSearch={props.refresh}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          {renderDatePicker(props.startTime, props.setStartTime, props.endTime, props.setEndTime)}
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton fill iconType="refresh" onClick={props.refresh}>
            Refresh
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="s" />
      <Filters filters={props.filters} setFilters={props.setFilters} />
    </>
  );
}
