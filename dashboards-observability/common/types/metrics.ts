/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { VisualizationType } from './custom_panels';

export interface MetricData {
  metricId: string;
  metricType: 'savedCustomMetric' | 'prometheusMetric';
  metricName: string;
}

export interface MetricType extends VisualizationType {
  id: string;
  savedVisualizationId: string;
  x: number;
  y: number;
  w: number;
  h: number;
  metricType: 'savedCustomMetric' | 'prometheusMetric';
}
