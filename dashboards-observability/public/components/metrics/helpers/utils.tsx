/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import dateMath from '@elastic/datemath';
import { ShortDate } from '@elastic/eui';
import { DurationRange } from '@elastic/eui/src/components/date_picker/types';
import _ from 'lodash';
import React from 'react';
import { Layout } from 'react-grid-layout';
import { VISUALIZATION, SAVED_VISUALIZATION } from '../../../../common/constants/metrics';
import {
  EVENT_ANALYTICS,
  OBSERVABILITY_BASE,
  SAVED_OBJECTS,
} from '../../../../common/constants/shared';
import PPLService from '../../../services/requests/ppl';
import { CoreStart } from '../../../../../../src/core/public';
import { MetricType } from '../../../../common/types/metrics';
import { VisualizationType } from '../../../../common/types/custom_panels';
import { DEFAULT_METRIC_HEIGHT, DEFAULT_METRIC_WIDTH } from '../../../../common/constants/metrics';
import { UNITS_OF_MEASURE } from '../../../../common/constants/explorer';
import { updateQuerySpanInterval } from '../../custom_panels/helpers/utils';

export const onTimeChange = (
  start: ShortDate,
  end: ShortDate,
  recentlyUsedRanges: DurationRange[],
  setRecentlyUsedRanges: React.Dispatch<React.SetStateAction<DurationRange[]>>,
  setStart: React.Dispatch<React.SetStateAction<string>>,
  setEnd: React.Dispatch<React.SetStateAction<string>>
) => {
  const recentlyUsedRange = recentlyUsedRanges.filter((recentlyUsedRange) => {
    const isDuplicate = recentlyUsedRange.start === start && recentlyUsedRange.end === end;
    return !isDuplicate;
  });
  recentlyUsedRange.unshift({ start, end });
  setStart(start);
  setEnd(end);
  setRecentlyUsedRanges(recentlyUsedRange.slice(0, 9));
};

// PPL Service requestor
export const pplServiceRequestor = (pplService: PPLService, finalQuery: string) => {
  return pplService.fetch({ query: finalQuery, format: VISUALIZATION }).catch((error: Error) => {
    console.error(error);
  });
};

// Observability backend to fetch visualizations/custom metrics
export const getVisualizations = (http: CoreStart['http']) => {
  return http
    .get(`${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}`, {
      query: { objectType: [SAVED_VISUALIZATION] },
    })
    .catch((err) => {
      console.error('Issue in fetching all saved visualizations', err);
    });
};

interface boxType {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const calculatOverlapArea = (bb1: boxType, bb2: boxType) => {
  const x_left = Math.max(bb1.x1, bb2.x1);
  const y_top = Math.max(bb1.y1, bb2.y1);
  const x_right = Math.min(bb1.x2, bb2.x2);
  const y_bottom = Math.min(bb1.y2, bb2.y2);

  if (x_right < x_left || y_bottom < y_top) return 0;
  return (x_right - x_left) * (y_bottom - y_top);
};

const getTotalOverlapArea = (panelVisualizations: MetricType[]) => {
  const newVizBox = { x1: 0, y1: 0, x2: DEFAULT_METRIC_WIDTH, y2: DEFAULT_METRIC_HEIGHT };
  const currentVizBoxes = panelVisualizations.map((visualization) => {
    return {
      x1: visualization.x,
      y1: visualization.y,
      x2: visualization.x + visualization.w,
      y2: visualization.y + visualization.h,
    };
  });

  let isOverlapping = 0;
  currentVizBoxes.map((viz) => {
    isOverlapping += calculatOverlapArea(viz, newVizBox);
  });
  return isOverlapping;
};

// We want to check if the new visualization being added, can be placed at { x: 0, y: 0, w: 6, h: 4 };
// To check this we try to calculate overlap between all the current visualizations and new visualization
// if there is no overalap (i.e Total Overlap Area is 0), we place the new viz. in default position
// else, we add it to the bottom of the panel
export const getNewVizDimensions = (panelVisualizations: MetricType[]) => {
  let maxY: number = 0;
  let maxYH: number = 0;

  // check if we can place the new visualization at default location
  if (getTotalOverlapArea(panelVisualizations) === 0) {
    return { x: 0, y: 0, w: DEFAULT_METRIC_WIDTH, h: DEFAULT_METRIC_HEIGHT };
  }

  // else place the new visualization at the bottom of the panel
  panelVisualizations.map((panelVisualization: MetricType) => {
    if (panelVisualization.y >= maxY) {
      maxY = panelVisualization.y;
      maxYH = panelVisualization.h;
    }
  });

  return { x: 0, y: maxY + maxYH, w: DEFAULT_METRIC_WIDTH, h: DEFAULT_METRIC_HEIGHT };
};

export const getMinSpanInterval = (start: any, end: any) => {
  const momentStart = dateMath.parse(start)!;
  const momentEnd = dateMath.parse(end, { roundUp: true })!;
  const diffSeconds = momentEnd.unix() - momentStart.unix();
  let minInterval;
  // // less than 1 second
  // if (diffSeconds <= 1) minInterval = 'ms';
  // less than 2 minutes
  if (diffSeconds <= 60 * 2) minInterval = 's';
  // less than 2 hours
  else if (diffSeconds <= 3600 * 2) minInterval = 'm';
  // less than 2 days
  else if (diffSeconds <= 86400 * 2) minInterval = 'h';
  // less than 1 month
  else if (diffSeconds <= 86400 * 31) minInterval = 'd';
  // less than 3 months
  else if (diffSeconds <= 86400 * 93) minInterval = 'w';
  // less than 1 year
  else if (diffSeconds <= 86400 * 366) minInterval = 'M';

  return minInterval;
};

// Merges new layout into visualizations
export const mergeLayoutAndMetrics = (
  layout: Layout[],
  newVisualizationList: VisualizationType[]
) => {
  const newPanelVisualizations: VisualizationType[] = [];

  for (let i = 0; i < newVisualizationList.length; i++) {
    for (let j = 0; j < layout.length; j++) {
      if (newVisualizationList[i].id == layout[j].i) {
        newPanelVisualizations.push({
          ...newVisualizationList[i],
          x: layout[j].x,
          y: layout[j].y,
          w: layout[j].w,
          h: layout[j].h,
        });
      }
    }
  }
  return newPanelVisualizations;
};

export const sortMetricLayout = (metricsLayout: MetricType[]) => {
  return metricsLayout.sort((a: MetricType, b: MetricType) => {
    if (a.y > b.y) return 1;
    if (a.y < b.y) return -1;
    else return 0;
  });
};

export const createPrometheusMetricById = (metricId: string) => {
  return {
    name: '[Prometheus Metric] ' + metricId,
    description: '',
    query: 'source = ' + metricId + ' | stats avg(@value) by span(@timestamp,1h)',
    type: 'line',
    timeField: '@timestamp',
    selected_fields: {
      text: '',
      tokens: [],
    },
    sub_type: 'metric',
    user_configs: {},
  };
};

export const updateMetricsWithSelections = (
  savedVisualization: any,
  startTime: ShortDate,
  endTime: ShortDate,
  spanValue: string
) => {
  return {
    query: updateQuerySpanInterval(
      savedVisualization.query,
      savedVisualization.timeField,
      spanValue
    ),
    fields: savedVisualization.selected_fields.tokens,
    dateRange: [startTime, endTime],
    timestamp: savedVisualization.timeField,
    name: savedVisualization.name,
    description: savedVisualization.description,
    type: 'line',
    subType: 'metric',
    userConfigs: JSON.stringify(savedVisualization.user_configs),
  };
};
