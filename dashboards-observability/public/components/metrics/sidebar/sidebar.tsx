/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './sidebar.scss';

import React, { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { EuiTitle, EuiSpacer, EuiAccordion, EuiLink } from '@elastic/eui';
import { I18nProvider } from '@osd/i18n/react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { AVAILABLE_METRICS, SELECTED_METRICS } from '../../../../common/constants/metrics';
import {
  availableMetricsSelector,
  deSelectMetric,
  selectMetric,
  loadMetrics,
  metricsStateSelector,
  selectedMetricsSelector,
} from '../redux/slices/metrics_slice';
import { fetchSurroundingData } from 'public/components/event_analytics/utils';

interface ISidebarProps {
  metricsList: any;
}

export const Sidebar = (props: ISidebarProps) => {
  const dispatch = useDispatch();

  const metricsState = useSelector(metricsStateSelector)
  useEffect(() => console.log("metricsState", {metricsState}), [metricsState])

  const availableMetrics = useSelector(availableMetricsSelector)
const selectedMetrics = useSelector(selectedMetricsSelector)

  useEffect(() => {
    dispatch(loadMetrics())
  }, []);

  // Initializing sidebar with dummy data
  const [showFields, setShowFields] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');


  const handleAddMetric = (metric: any) =>
    dispatch(selectMetric(metric));

  const handleRemoveMetric = (metric: any) => {
    dispatch(deSelectMetric(metric));
  };

  return (
    <I18nProvider>
      <section className="sidebarHeight ">
        <EuiAccordion
          initialIsOpen
          id="recentlyCreatedMetricsSelector"
          buttonContent={
            <EuiTitle size="xxxs">
              <span>Recently Created Fields</span>
            </EuiTitle>
          }
          paddingSize="xs"
        />
        <EuiSpacer size="s" />
        <EuiAccordion
          initialIsOpen
          id="selectedMetricsSelector"
          buttonContent={
            <EuiTitle size="xxxs">
              <span>Selected Metrics</span>
            </EuiTitle>
          }
          paddingSize="xs"
        >
          <ul>
            {selectedMetrics.map((metric: any) => {
              let name;
              if (metric.name) {
                name = metric.name;
              } else {
                name = metric[2];
              }
              return (
                <li>
                  <EuiLink
                    onClick={() => handleRemoveMetric(metric)}
                  >
                    {name}
                  </EuiLink>
                </li>
              );
            })}
          </ul>
        </EuiAccordion>
        <EuiSpacer size="s" />
        <EuiAccordion
          initialIsOpen
          id="availableMetricsSelector"
          buttonContent={
            <EuiTitle size="xxxs">
              <span>Available Metrics</span>
            </EuiTitle>
          }
          paddingSize="xs"
        >
          <ul>
            {[].map((visualization: any) => {
              return (
                <li>
                  <EuiLink
                    onClick={() => {
                      handleAddMetric(visualization, true);
                    }}
                  >
                    {visualization.name}
                  </EuiLink>
                </li>
              );
            })}
            {availableMetrics.map((metric: any) =>
              <li key={metric.id}>
                <EuiLink
                  onClick={() => handleAddMetric(metric)}
                >
                  {metric.name}
                </EuiLink>
              </li>
            )}
          </ul>
        </EuiAccordion>
      </section>
    </I18nProvider>
  );
};
