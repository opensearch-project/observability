/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiButtonEmpty, EuiToken } from '@elastic/eui';

interface IMetricNameProps {
  metric: any;
  handleClick: (props: any) => void;
}

export const MetricName = (props: IMetricNameProps) => {
  const { metric, handleClick } = props;

  const title = metric.catalog === 'CUSTOM_METRICS' ? 'OpenSearch' : 'Prometheus';
  const token =
    metric.catalog === 'CUSTOM_METRICS'
      ? '/ui/default_branding/opensearch_mark_default_mode.svg'
      : 'tokenProperty';
  const name = (metricName: string) => {
    return metric.catalog === 'CUSTOM_METRICS' ? metricName : metricName.split('.')[1];
  };

  return (
    <EuiButtonEmpty
      className="eui-textTruncate"
      title={metric.name}
      onClick={() => handleClick(metric)}
    >
      <EuiToken
        className="tokenMargin"
        title={title}
        iconType={token}
        fill="light"
        color="euiColorVis1"
        shape="square"
      />{' '}
      {name(metric.name)}
    </EuiButtonEmpty>
  );
};
