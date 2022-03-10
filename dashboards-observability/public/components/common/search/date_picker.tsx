/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiSuperDatePicker } from '@elastic/eui';
import { IDatePickerProps } from './search';
import { uiSettingsService } from '../../../../common/utils';

export function DatePicker(props: IDatePickerProps) {
  const { startTime, endTime, handleTimePickerChange, handleTimeRangePickerRefresh } = props;

  const handleTimeChange = (e) => handleTimePickerChange([e.start, e.end]);

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
