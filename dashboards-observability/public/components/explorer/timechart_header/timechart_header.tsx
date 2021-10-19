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

import React, { useState, useEffect, useCallback } from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiToolTip,
  EuiText,
  EuiSelect,
} from '@elastic/eui';
import { I18nProvider } from '@osd/i18n/react';
import { i18n } from '@osd/i18n';
import moment from 'moment';

export interface TimechartHeaderProps {
  /**
   * Format of date to be displayed
   */
  dateFormat?: string;
  /**
   * Interval for the buckets of the recent request
   */
  bucketInterval?: {
    scaled?: boolean;
    description?: string;
    scale?: number;
  };
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
  options: Array<{ display: string; val: string }>;
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
  bucketInterval,
  dateFormat,
  timeRange,
  options,
  onChangeInterval,
  stateInterval,
}: TimechartHeaderProps) {

  const [interval, setInterval] = useState(stateInterval);
  const toMoment = useCallback(
    (datetime: string) => {
      if (!datetime) {
        return '';
      }
      if (!dateFormat) {
        return datetime;
      }
      return moment(datetime).format(dateFormat);
    },
    [dateFormat]
  );

  useEffect(() => {
    setInterval(stateInterval);
  }, [stateInterval]);

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterval(e.target.value);
    onChangeInterval(e.target.value);
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
            options={options
              .filter(({ val }) => val !== 'custom')
              .map(({ display, val }) => {
                return {
                  text: display,
                  value: val,
                  label: display,
                };
              })}
            value={ interval }
            onChange={ handleIntervalChange }
            append={ undefined }
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </I18nProvider>
  );
}
