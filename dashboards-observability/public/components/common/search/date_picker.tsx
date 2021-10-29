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
  EuiSuperDatePicker
} from '@elastic/eui';
import {
  IDatePickerProps
} from './search';
import { uiSettingsService } from '../../../../common/utils';

export function DatePicker(props: IDatePickerProps) {

  const {
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    handleTimePickerChange
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
        dateFormat={uiSettingsService.get('dateFormat')}
        onTimeChange={(e) => {
          const start = e.start;
          const end = e.start === e.end ? 'now' : e.end;
          handleTimePickerChange([start, end]);
        }}
        onRefresh={ handleRefresh }
        className="osdQueryBar__datePicker"
      />
    </EuiFlexItem>
  );
}