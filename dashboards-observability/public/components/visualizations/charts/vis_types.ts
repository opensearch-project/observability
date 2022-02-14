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
import { createGaugeTypeDefinition } from './financial/gauge/gauge_type';
import { createCandleStickDefinition } from './financial/candle_stick/candle_stick_type';
import { createTreeMapDefinition } from './maps/treemap_type';

export const VIS_TYPES = {
  bar: createBarTypeDefinition,
  horizontal_bar: createHorizontalBarTypeDefinition,
  line: createLineTypeDefinition,
  pie: createPieTypeDefinition,
  histogram: createHistogramVisDefinition,
  data_table: createDatatableTypeDefinition,
  gauge: createGaugeTypeDefinition,
  bubble: createBubbleVisDefinition,
  heatmap: createMapsVisDefinition,
  candle_stick: createCandleStickDefinition,
  tree_map: createTreeMapDefinition,
};

export const getVisType = (visType: string, params: any = {}) => {
  return VIS_TYPES[visType](params);
};
