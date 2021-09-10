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
import {
  EuiFlexItem,
  EuiSwitch,
  EuiSuperDatePicker,
} from '@elastic/eui';
import {
  IFilterProps
} from './search';

export function Filter(props: IFilterProps) {

  const {
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    setIsOutputStale
  } = props;

  function handleTimeChange({
    start,
    end,
  }: {
    start: string;
    end: string;
  }) {
    setStartTime(start);
    setEndTime(end);
  }

  function handleRefresh({ 
    start, 
    end 
  }: { 
      start: string,
      end: string,
      label?: string,
      refreshInterval: number
  }) {
    const retVal = {
      dateRange: {
        from: start,
        to: end,
      },
    };
    setStartTime(start);
    setEndTime(end);
  }

  return (
    <EuiFlexItem
      className="euiFlexItem--flexGrowZero"
    >
      <EuiSuperDatePicker
        start={ startTime }
        end={ endTime }
        showUpdateButton={ false }
        dateFormat="MM/DD/YYYY hh:mm:ss A"
        onTimeChange={(e) => {
          setStartTime(e.start);
          setEndTime(e.end);
        }}
        onRefresh={ handleRefresh }
        className="osdQueryBar__datePicker"
      />
    </EuiFlexItem>
  );
}