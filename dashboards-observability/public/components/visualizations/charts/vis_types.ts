/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { barVisDefinition } from './bar/bar_type';
import { lineVisDefinition } from './lines/line_type';

export const VIS_TYPES = {
  bar: barVisDefinition,
  horizontal_bar: barVisDefinition,
  line: lineVisDefinition,
};

export const getVisType = (visType: string) => {
  return VIS_TYPES[visType];
};
