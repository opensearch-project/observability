/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './sidebar.scss';

import React, { useEffect } from 'react';
import { EuiSpacer } from '@elastic/eui';
import { I18nProvider } from '@osd/i18n/react';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
  availableMetricsSelector,
  deSelectMetric,
  selectMetric,
  loadMetrics,
  selectedMetricsSelector,
  recentlyCreatedMetricsSelector,
  searchedMetricsSelector,
} from '../redux/slices/metrics_slice';
import { CoreStart } from '../../../../../../src/core/public';
import PPLService from '../../../services/requests/ppl';
import { MetricsAccordion } from './metrics_accordion';

interface ISidebarProps {
  http: CoreStart['http'];
  pplService: PPLService;
  search: boolean;
}

export const Sidebar = (props: ISidebarProps) => {
  const { http, pplService, search } = props;
  const dispatch = useDispatch();

  const availableMetrics = useSelector(availableMetricsSelector);
  const selectedMetrics = useSelector(selectedMetricsSelector);
  const recentlyCreatedMetrics = useSelector(recentlyCreatedMetricsSelector);
  const searchedMetrics = useSelector(searchedMetricsSelector);

  useEffect(() => {
    batch(() => {
      dispatch(loadMetrics({ http, pplService }));
    });
  }, []);

  const handleAddMetric = (metric: any) => dispatch(selectMetric(metric));

  const handleRemoveMetric = (metric: any) => {
    dispatch(deSelectMetric(metric));
  };

  const availableMetricsDisplay = search ? searchedMetrics : availableMetrics;

  return (
    <I18nProvider>
      <section className="sidebarHeight">
        <MetricsAccordion
          metricsList={recentlyCreatedMetrics}
          headerName="Recently Created Metrics"
          handleClick={handleAddMetric}
        />
        <EuiSpacer size="s" />
        <MetricsAccordion
          metricsList={selectedMetrics}
          headerName="Selected Metrics"
          handleClick={handleRemoveMetric}
        />
        <EuiSpacer size="s" />
        <MetricsAccordion
          metricsList={availableMetricsDisplay}
          headerName="Available Metrics"
          handleClick={handleAddMetric}
        />
      </section>
    </I18nProvider>
  );
};
