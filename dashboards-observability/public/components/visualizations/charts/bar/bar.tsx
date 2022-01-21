/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

import { isEmpty, take } from 'lodash';
import { Plt } from '../../plotly/plot';
import { LONG_CHART_COLOR, PLOTLY_COLOR } from '../../../../../common/constants/shared';

export const Bar = ({
  visualizations,
  dispatch = null,
  orientation = 'v',
  figureConfig = {},
  layoutConfig = {},
  isUniColor = false,
  customVizData = [],
}: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations;
  const stackLength = fields.length - 1;

  // Individual bars have different colors
  // when: stackLength = 1 and length of result buckets < 16 and chart is not unicolor
  // Else each stacked bar has its own color using colorway
  let marker = {};
  if (stackLength === 1 && data[fields[stackLength].name].length < 16 && !isUniColor) {
    marker = {
      color: data[fields[stackLength].name].map((_: string, index: number) => {
        return PLOTLY_COLOR[index % PLOTLY_COLOR.length];
      }),
    };
  }

  const isVertical = orientation !== 'h';
  const barValues = take(fields, stackLength > 0 ? stackLength : 1).map((field: any) => {
    return {
      x: orientation !== 'h' ? data[fields[stackLength].name] : data[field.name],
      y: orientation !== 'h' ? data[field.name] : data[fields[stackLength].name],
      type: 'bar',
      marker,
      name: field.name,
      orientation,
    };
  });

  useEffect(() => {
    const allExpectLast = take(fields, stackLength > 0 ? stackLength : 1).map((field: any) => {
      return {
        ...field,
        values: data[field.name],
      };
    });
    const lastOnly = [fields[-1]];
    const fieldsCal = {
      x: orientation !== 'h' ? [...allExpectLast] : [...lastOnly],
      y: orientation !== 'h' ? [...lastOnly] : [...allExpectLast],
    };
    console.log('fieldsCal: ', fieldsCal);
    // dispatch({
    //   data: { ...fieldsCal },
    // });
  }, []);

  // If chart has length of result buckets < 16
  // then use the LONG_CHART_COLOR for all the bars in the chart
  const plotlyColorway =
    data[fields[stackLength].name].length < 16 ? PLOTLY_COLOR : [LONG_CHART_COLOR];

  return (
    <Plt
      data={barValues}
      layout={{
        ...layoutConfig,
        colorway: plotlyColorway,
      }}
      config={{
        ...figureConfig,
      }}
      dispatch={dispatch}
    />
  );
};
