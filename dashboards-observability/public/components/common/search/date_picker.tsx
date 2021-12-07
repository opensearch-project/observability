/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
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
    handleTimePickerChange,
    handleTimeRangePickerRefresh
  } = props;

  const handleTimeChange = (e) => {
    const start = e.start;
    const end = e.start === e.end ? 'now' : e.end;
    handleTimePickerChange([start, end]);
  };

  return (
    <EuiSuperDatePicker
      data-test-subj="pplSearchDatePicker"
      start={startTime}
      end={endTime}
      dateFormat={uiSettingsService.get('dateFormat')}
      onTimeChange={handleTimeChange}
      onRefresh={handleTimeRangePickerRefresh}
      className="osdQueryBar__datePicker"
    />
  );
}