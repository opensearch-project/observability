/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { createBarTypeDefinition } from './bar/bar_type';
import { createHorizontalBarTypeDefinition } from './bar/horizontal_bar_type';
import { createLineTypeDefinition } from './lines/line_type';
import { createPieTypeDefinition } from './pie/pie_type';
import { createHistogramVisDefinition } from './histogram/histogram_type';
import { createBubbleVisDefinition } from './bubble/bubble_type';
import { createMapsVisDefinition } from './maps/heatmap_type';
import { createDatatableTypeDefinition } from './data_table/data_table_type';
import { createGaugeTypeDefinition } from './gauge/gauge_type';

export const VIS_TYPES = {
  bar: createBarTypeDefinition,
  horizontal_bar: createHorizontalBarTypeDefinition,
  line: createLineTypeDefinition,
  pie: createPieTypeDefinition,
  histogram: createHistogramVisDefinition,
  data_table: createDatatableTypeDefinition,
  guage: createGaugeTypeDefinition,
  bubble: createBubbleVisDefinition,
  heatmap: createMapsVisDefinition,
};

export const getVisType = (visType: string, params: any = {}) => {
  return VIS_TYPES[visType](params);
};
