/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { colorPalette } from '@elastic/eui';

export const BLUES_PALETTE = {
  name: 'Blues',
  label: 'Blues',
  colors: [
    'rgb(5,10,172)',
    'rgb(40,60,190)',
    'rgb(70,100,245)',
    'rgb(90,120,245)',
    'rgb(106,137,247)',
    'rgb(220,220,220)',
  ],
};

export const REDS_PALETTE = {
  name: 'Reds',
  label: 'Reds',
  colors: ['rgb(220,220,220)', 'rgb(245,195,157)', 'rgb(245,160,105)', 'rgb(178,10,28)'],
};

export const GREENS_PALETTE = {
  name: 'Greens',
  label: 'Greens',
  colors: [
    'rgb(0,68,27)',
    'rgb(0,109,44)',
    'rgb(35,139,69)',
    'rgb(65,171,93)',
    'rgb(116,196,118)',
    'rgb(161,217,155)',
    'rgb(199,233,192)',
    'rgb(229,245,224)',
    'rgb(247,252,245)',
  ],
};

export const GREYS_PALETTE = {
  name: 'Greys',
  label: 'Greys',
  colors: ['rgb(0,0,0)', 'rgb(255,255,255)'],
};

export const BLUE_RED_PALETTE = {
  name: 'Bluered',
  label: 'Blue-Red',
  colors: ['rgb(0,0,255)', 'rgb(255,0,0)'],
};

export const RED_BLUE_PALETTE = {
  name: 'RdBu',
  label: 'Red-Blue',
  colors: [
    'rgb(5,10,172)',
    'rgb(106,137,247)',
    'rgb(190,190,190)',
    'rgb(220,170,132)',
    'rgb(230,145,90)',
    'rgb(178,10,28)',
  ],
};

export const YELLOW_ORANGE_RED_PALETTE = {
  name: 'YlOrRd',
  label: 'Yellow-Orange-Red',
  colors: [
    'rgb(128,0,38)',
    'rgb(189,0,38)',
    'rgb(227,26,28)',
    'rgb(252,78,42)',
    'rgb(253,141,60)',
    'rgb(254,178,76)',
    'rgb(254,217,118)',
    'rgb(255,237,160)',
    'rgb(255,255,204)',
  ],
};

export const YELLOW_GREEN_BLUE_PALETTE = {
  name: 'YlGnBu',
  label: 'Yellow-Green-Blue',
  colors: [
    'rgb(8,29,88)',
    'rgb(37,52,148)',
    'rgb(34,94,168)',
    'rgb(29,145,192)',
    'rgb(65,182,196)',
    'rgb(127,205,187)',
    'rgb(199,233,180)',
    'rgb(237,248,217)',
    'rgb(255,255,217)',
  ],
};

export const DEFAULT_PALETTE = 'default';
export const SINGLE_COLOR_PALETTE = 'singleColor';
export const MULTI_COLOR_PALETTE = 'multicolor';

export const COLOR_PALETTES = [
  {
    value: DEFAULT_PALETTE,
    title: 'Default',
    type: 'text',
  },
  {
    value: SINGLE_COLOR_PALETTE,
    title: 'Single color',
    type: 'text',
  },
  {
    value: MULTI_COLOR_PALETTE,
    title: 'Multicolored',
    type: 'text',
  },
  {
    value: BLUES_PALETTE.name,
    title: BLUES_PALETTE.label,
    palette: colorPalette(BLUES_PALETTE.colors, 20),
    type: 'gradient',
  },
  {
    value: REDS_PALETTE.name,
    title: REDS_PALETTE.label,
    palette: colorPalette(REDS_PALETTE.colors, 20),
    type: 'gradient',
  },
  {
    value: GREENS_PALETTE.name,
    title: GREENS_PALETTE.label,
    palette: colorPalette(GREENS_PALETTE.colors, 20),
    type: 'gradient',
  },
  {
    value: GREYS_PALETTE.name,
    title: GREYS_PALETTE.label,
    palette: colorPalette(GREYS_PALETTE.colors, 20),
    type: 'gradient',
  },
  {
    value: BLUE_RED_PALETTE.name,
    title: BLUE_RED_PALETTE.label,
    palette: colorPalette(BLUE_RED_PALETTE.colors, 20),
    type: 'gradient',
  },
  {
    value: RED_BLUE_PALETTE.name,
    title: RED_BLUE_PALETTE.label,
    palette: colorPalette(RED_BLUE_PALETTE.colors, 20, true),
    type: 'gradient',
  },
  {
    value: YELLOW_ORANGE_RED_PALETTE.name,
    title: YELLOW_ORANGE_RED_PALETTE.label,
    palette: colorPalette(YELLOW_ORANGE_RED_PALETTE.colors, 20),
    type: 'gradient',
  },
  {
    value: YELLOW_GREEN_BLUE_PALETTE.name,
    title: YELLOW_GREEN_BLUE_PALETTE.label,
    palette: colorPalette(YELLOW_GREEN_BLUE_PALETTE.colors, 20),
    type: 'gradient',
  },
];
export const HEX_CONTRAST_COLOR = 0xFFFFFF;
export const PIE_PALETTES = [
  {
    value: DEFAULT_PALETTE,
    title: 'Default',
    type: 'text',
  },
  {
    value: SINGLE_COLOR_PALETTE,
    title: 'Single Color',
    type: 'text',
  }
];
