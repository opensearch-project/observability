/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiToolTip, EuiText, EuiSelect } from '@elastic/eui';
import { I18nProvider } from '@osd/i18n/react';
import { i18n } from '@osd/i18n';
import moment from 'moment';

export interface TimechartHeaderProps {
  /**
   * Format of date to be displayed
   */
  dateFormat?: string;
  /**
   * Range of dates to be displayed
   */
  timeRange?: {
    from: string;
    to: string;
  };
  /**
   * Interval Options
   */
  options: Array<{ text: string; value: string }>;
  /**
   * changes the interval
   */
  onChangeInterval: (interval: string) => void;
  /**
   * selected interval
   */
  stateInterval: string;
}

export function TimechartHeader({
  options,
  onChangeInterval
}: TimechartHeaderProps) {
  const [interval, setInterval] = useState(options[0].value);

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterval(e.target.value);
    onChangeInterval(e.target.value.length > 2 ? e.target.value.slice(5) : e.target.value);
  };

  return (
    <I18nProvider>
      <EuiFlexGroup gutterSize="s" responsive justifyContent="center" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiToolTip
            content={i18n.translate('discover.howToChangeTheTimeTooltip', {
              defaultMessage: 'To change the time, use the global time filter above',
            })}
            delay="long"
          >
            <EuiText data-test-subj="discoverIntervalDateRange" size="s"></EuiText>
          </EuiToolTip>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSelect
            aria-label={i18n.translate('discover.timechartHeader.timeIntervalSelect.ariaLabel', {
              defaultMessage: 'Time interval',
            })}
            compressed
            id="dscResultsIntervalSelector"
            data-test-subj="discoverIntervalSelect"
            options={options}
            value={interval}
            onChange={handleIntervalChange}
            append={undefined}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </I18nProvider>
  );
}
