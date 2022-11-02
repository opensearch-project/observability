/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { createBarTypeDefinition } from './bar/bar_type';
import { createLineTypeDefinition } from './lines/line_type';
import { createPieTypeDefinition } from './pie/pie_type';
import { createHistogramVisDefinition } from './histogram/histogram_type';
import { createBubbleVisDefinition } from './bubble/bubble_type';
import { createMapsVisDefinition } from './maps/heatmap_type';
import { createDatatableTypeDefinition } from './data_table/data_table_type';
import { createGaugeTypeDefinition } from './financial/gauge/gauge_type';
import { createTreeMapDefinition } from './maps/treemap_type';
import { createTextTypeDefinition } from './text/text_type';
import { createLogsViewTypeDefinition } from './logs_view/logs_view_type';
import { createMetricsTypeDefinition } from './metrics/metrics_type';

export const VIS_TYPES = {
  bar: createBarTypeDefinition,
  horizontal_bar: createBarTypeDefinition,
  line: createLineTypeDefinition,
  pie: createPieTypeDefinition,
  histogram: createHistogramVisDefinition,
  data_table: createDatatableTypeDefinition,
  gauge: createGaugeTypeDefinition,
  bubble: createBubbleVisDefinition,
  heatmap: createMapsVisDefinition,
  tree_map: createTreeMapDefinition,
  text: createTextTypeDefinition,
  scatter: createLineTypeDefinition,
  logs_view: createLogsViewTypeDefinition,
  metrics: createMetricsTypeDefinition,
};

export const getVisType = (visType: string, params: any = {}) => {
  return VIS_TYPES[visType](params);
};
