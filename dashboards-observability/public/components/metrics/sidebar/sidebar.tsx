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
import {
  availableMetricsSelector,
  deSelectMetric,
  selectMetric,
  loadMetrics,
  selectedMetricsSelector,
} from '../redux/slices/metrics_slice';
import { CoreStart } from '../../../../../../src/core/public';
import PPLService from '../../../services/requests/ppl';

interface ISidebarProps {
  http: CoreStart['http'];
  pplService: PPLService;
}

export const Sidebar = (props: ISidebarProps) => {
  const { http, pplService } = props;
  const dispatch = useDispatch();

  const availableMetrics = useSelector(availableMetricsSelector);
  const selectedMetrics = useSelector(selectedMetricsSelector);

  useEffect(() => {
    batch(() => {
      dispatch(loadMetrics({ http, pplService }));
    });
  }, []);

  const handleAddMetric = (metric: any) => dispatch(selectMetric(metric));

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
            {selectedMetrics.map((metric: any) => (
              <li key={metric.id}>
                <EuiLink onClick={() => handleRemoveMetric(metric)}>{metric.name}</EuiLink>
              </li>
            ))}
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
            {availableMetrics.map((metric: any) => (
              <li key={metric.id}>
                <EuiLink onClick={() => handleAddMetric(metric)}>{metric.name}</EuiLink>
              </li>
            ))}
          </ul>
        </EuiAccordion>
      </section>
    </I18nProvider>
  );
};
