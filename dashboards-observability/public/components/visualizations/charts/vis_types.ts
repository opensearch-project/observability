/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { barVisDefinition } from './bar/bar_type';
import { lineVisDefinition } from './lines/line_type';
import { pieVisDefinition } from './pie/pie_type';
import { histogramVisDefinition } from './histogram/histogram_type';
import { bubbleVisDefinition } from './bubble/bubble_type';
import { mapsVisDefinition } from './maps/heatmap_type';

export const VIS_TYPES = {
  bar: barVisDefinition,
  horizontal_bar: barVisDefinition,
  line: lineVisDefinition,
  pie: pieVisDefinition,
  histogram: histogramVisDefinition,
  bubble: bubbleVisDefinition,
  heatmap: mapsVisDefinition,
};

export const getVisType = (visType: string) => {
  return VIS_TYPES[visType];
};
