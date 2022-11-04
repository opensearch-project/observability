/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { isEmpty, forEach } from 'lodash';
import { CUSTOM_LABEL } from '../../../../../common/constants/explorer';
import { ConfigList, DimensionSpan } from '../../../../../common/types/explorer';
import { removeBacktick } from '../../../../../common/utils';

export const getCompleteTimespanKey = (span: DimensionSpan) => {
  if (isEmpty(span) || isEmpty(span.time_field) || isEmpty(span.interval) || isEmpty(span.unit))
    return '';
  return { name: `span(${span.time_field[0]?.name},${span.interval}${span.unit[0]?.value})` };
};

/**
 * Transform to traces that can be consumed by plotly.
 * @param intermediateVisData preprocessed json data that has dimensions to single aggregation mapping.
 * @param param1 required visualization configurations.
 * @returns traces.
 */
export const transformPreprocessedDataToTraces = (
  intermediateVisData: Array<any>,
  { breakdowns, isVertical = true }: Partial<ConfigList>
) => {
  const traceMap = new Map<string, any>();
  const hasBreakdown = !isEmpty(breakdowns);
  forEach(intermediateVisData, (entry) => {
    const traceKey = hasBreakdown ? [entry.breakdown, entry.aggName].join(',') : entry.aggName;
    if (isEmpty(traceMap.get(traceKey))) {
      traceMap.set(traceKey, {
        x: isVertical ? [entry.x] : [entry.value],
        y: isVertical ? [entry.value] : [entry.x],
        name: hasBreakdown ? [entry.breakdown, entry.aggName].join(',') : `${traceKey}`,
      });
    } else {
      const curTrace = traceMap.get(traceKey);
      const xaxisValue = isVertical ? entry.x : entry.value;
      const yaxisValue = isVertical ? entry.value : entry.x;
      curTrace!.x.push(xaxisValue);
      curTrace!.y.push(yaxisValue);
    }
  });
  return [...traceMap.values()];
};

/**
 * preprocess json data to
 * 1. concatenate dimensions to generate one dimension
 * 2. concatenate breakdowns (if there's any) generate one breakdown
 * 3. map dimension/breakdown to aggregations
 * @param visJson raw json data from data fetching
 * @param param1 required visualization configurations.
 * @returns intermediate visualization json data
 */
export const preprocessJsonData = (
  visJson: Array<any>,
  { dimensions, series, breakdowns, span }: Partial<ConfigList>
) => {
  const seriesFlattenedEntries = [];
  forEach(visJson, (entry) => {
    const backtickRemovedEntry = {};
    // remove backtick, so data in jsonData can be accessed through using field name
    forEach(entry, (value, key) => {
      backtickRemovedEntry[removeBacktick(key)] = value;
      removeBacktick(key);
    });
    forEach(series, (sr) => {
      let tabularVizData = {};
      const serieKey = sr[CUSTOM_LABEL] ? sr[CUSTOM_LABEL] : `${sr.aggregation}(${sr.name})`;
      if (!isEmpty(serieKey)) {
        const concatedXaxisLabel = [
          ...(!isEmpty(span) ? [getCompleteTimespanKey(span)] : []),
          ...dimensions,
        ]
          .map((dimension) => {
            return removeBacktick(backtickRemovedEntry[removeBacktick(dimension.name)]);
          })
          .join(',');
        const concatedBreakdownLabel = breakdowns
          ? breakdowns
              .map((breakdown) => backtickRemovedEntry[removeBacktick(breakdown.name)])
              .join(',')
          : '';
        tabularVizData = {
          value: backtickRemovedEntry[serieKey],
          x: concatedXaxisLabel,
          breakdown: concatedBreakdownLabel,
          aggName: serieKey,
        };
      } else {
        tabularVizData = {
          value: 0,
          x: '',
          breakdown: '',
        };
      }
      seriesFlattenedEntries.push(tabularVizData);
    });
  });
  return seriesFlattenedEntries;
};
