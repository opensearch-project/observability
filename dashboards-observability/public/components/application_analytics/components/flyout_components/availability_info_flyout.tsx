/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiFlyout,
  EuiFlyoutHeader,
  EuiTitle,
  EuiFlyoutBody,
  EuiText,
  EuiCodeBlock,
  EuiFlyoutFooter,
  EuiButton,
} from '@elastic/eui';
import React from 'react';

interface AvailabilityInfoFlyoutProps {
  closeFlyout: () => void;
}

export function AvailabilityInfoFlyout(props: AvailabilityInfoFlyoutProps) {
  const { closeFlyout } = props;

  return (
    <EuiFlyout onClose={closeFlyout} size="s" type="push">
      <EuiFlyoutHeader>
        <EuiTitle>
          <h2>Availability</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <h3>Configure availability</h3>
          Availability is the status of your application determined by availability levels set on a
          time series metric. To create an availability level, you must configure the following:
          <ul>
            <li>color: The color of the availability badge on the home page</li>
            <li>name: The text in the availability badge on the home page</li>
            <li>expression: Comparison operator to determine the availability</li>
            <li>value: Value to use when calculating availability</li>
          </ul>
          <h3>Configuring availability</h3>
          By default, Application analytics shows results from the last 24 hours of your data. To
          see data from a different timeframe, use the date and time selector.
          <h3>Time series metric</h3>A time series metric is any visualization that has a query that
          spans over a timestamp and is a bar/line chart. You can use the PPL language to define
          arbitrary conditions on your logs to create a visualization over time.
          <h4>Example</h4>
          <EuiCodeBlock>
            {'source = <index_name> | ... | ... | stats ... by span(<timestamp_field>, 1h)'}
          </EuiCodeBlock>
          You can then choose <strong>Bar</strong> or <strong>Line</strong> in visualization
          configurations to create a time series metric.
        </EuiText>
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiButton onClick={closeFlyout}>Close</EuiButton>
      </EuiFlyoutFooter>
    </EuiFlyout>
  );
}
