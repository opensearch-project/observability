/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './sidebar.scss';

import React, { useState } from 'react';
import { cloneDeep } from 'lodash';
import { EuiTitle, EuiSpacer, EuiAccordion, EuiLink } from '@elastic/eui';
import { I18nProvider } from '@osd/i18n/react';
import { batch, useDispatch } from 'react-redux';
import { AVAILABLE_METRICS, SELECTED_METRICS } from '../../../../common/constants/metrics';
import { updateMetrics, sortMetrics, selectMetrics } from '../redux/slices/metrics_slice';

interface ISidebarProps {
  metricsList: any;
  visualizationsList: any;
}

export const Sidebar = (props: ISidebarProps) => {
  const dispatch = useDispatch();

  // Initializing sidebar with dummy data
  const { metricsList, visualizationsList } = props;
  const metricNames = metricsList.metrics;
  const [showFields, setShowFields] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  /**
   * Toggle metric names between selected and available sets
   * @param metric metric to be toggled
   * @param MetricSetToRemove set where this metric needs to be removed from
   * @param MetricSetToAdd set where this metric needs to be added to
   */
  const toggleMetrics = (
    metric: any,
    visualization: boolean,
    MetricSetToRemove: string,
    MetricSetToAdd: string
  ) => {
    const nextMetrics = cloneDeep(metricsList);
    const thisMetricSet = nextMetrics.metrics[MetricSetToRemove];
    // Dummy data for now, will globalize the filter later
    // If statements are to separate visualizations and dummy data from prometheus
    let nextMetricSet;
    if (visualization) {
      nextMetricSet = thisMetricSet.filter((row: any) => row.name !== metric.name);
    } else {
      nextMetricSet = thisMetricSet.filter((row: any) => row[2] !== metric[2]);
    }
    nextMetrics.metrics[MetricSetToRemove] = nextMetricSet;
    if (!visualization || MetricSetToRemove !== SELECTED_METRICS) {
      nextMetrics.metrics[MetricSetToAdd].push(metric);
    }
    batch(() => {
      dispatch(
        updateMetrics({
          data: { ...nextMetrics.metrics },
        })
      );
      dispatch(
        sortMetrics({
          data: [MetricSetToAdd],
        })
      );
    });
  };

  const handleAddMetric = (metric: any, visualization: boolean) =>
    toggleMetrics(metric, visualization, AVAILABLE_METRICS, SELECTED_METRICS);

  const handleRemoveMetric = (metric: any, visualization: boolean) => {
    toggleMetrics(metric, visualization, SELECTED_METRICS, AVAILABLE_METRICS);
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
            {metricNames[SELECTED_METRICS].map((metric: any) => {
              let name;
              if (metric.name) {
                name = metric.name;
              } else {
                name = metric[2];
              }
              return (
                <li>
                  <EuiLink
                    onClick={() => {
                      if (metric.name) {
                        handleRemoveMetric(metric, true);
                      } else {
                        handleRemoveMetric(metric, false);
                      }
                    }}
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
            {visualizationsList.map((visualization: any) => {
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
            {metricNames[AVAILABLE_METRICS].map((metric: any) => {
              return (
                <li>
                  <EuiLink
                    onClick={() => {
                      handleAddMetric(metric, false);
                    }}
                  >
                    {metric[2]}
                  </EuiLink>
                </li>
              );
            })}
          </ul>
        </EuiAccordion>
      </section>
    </I18nProvider>
  );
};
