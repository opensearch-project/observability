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