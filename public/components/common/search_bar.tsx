import {
  EuiButton,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiSuperDatePicker,
} from '@elastic/eui';
import React, { Dispatch, SetStateAction } from 'react';
import { Filters } from './filters';

export const renderDatePicker = (startTime, setStartTime, endTime, setEndTime) => {
  return (
    <EuiSuperDatePicker
      start={startTime}
      end={endTime}
      showUpdateButton={false}
      onTimeChange={(e) => {
        console.log(e);
        setStartTime(e.start);
        setEndTime(e.end);
      }}
    />
  );
};

export interface SearchBarProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  startTime: string;
  setStartTime: Dispatch<SetStateAction<string>>;
  endTime: string;
  setEndTime: Dispatch<SetStateAction<string>>;
}

export function SearchBar(props: SearchBarProps) {
  return (
    <>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem>
          <EuiFieldSearch
            fullWidth
            placeholder="Trace ID, trace group name, user ID, service name"
            value={props.query}
            onChange={(e) => props.setQuery(e.target.value)}
            onSearch={(e) => console.log(e)}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          {renderDatePicker(props.startTime, props.setStartTime, props.endTime, props.setEndTime)}
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton fill iconType="refresh">
            Refresh
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="s" />
      <Filters />
    </>
  );
}
