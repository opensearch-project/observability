/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiAccordion, EuiTitle } from '@elastic/eui';
import { MetricName } from './metric_name';

interface IMetricNameProps {
  metricsList: [];
  headerName: string;
  handleClick: (props: any) => void;
}

export const MetricsAccordion = (props: IMetricNameProps) => {
  const { metricsList, headerName, handleClick } = props;

  return (
    <EuiAccordion
      initialIsOpen
      id={`${headerName}Selector`}
      buttonContent={
        <EuiTitle size="xxxs">
          <span>{headerName}</span>
        </EuiTitle>
      }
      paddingSize="none"
    >
      <ul className="metricsList">
        {metricsList.slice(0, 100).map((metric: any) => (
          <li key={metric.id} className="metricsListContainer">
            <MetricName metric={metric} handleClick={handleClick} />
          </li>
        ))}
      </ul>
      {metricsList.length > 100 && <p>Use search bar for searching through all metrics.</p>}
    </EuiAccordion>
  );
};
