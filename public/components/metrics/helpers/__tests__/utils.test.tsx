/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DurationRange } from '@elastic/eui/src/components/date_picker/types';
import {
  createPrometheusMetricById,
  getNewVizDimensions,
  mergeLayoutAndMetrics,
  onTimeChange,
  sortMetricLayout,
  updateMetricsWithSelections,
} from '../utils';
import {
  samplePanelVisualizations1,
  samplenewDimensions1,
  samplenewDimensions2,
  samplePanelVisualizations2,
  sampleMetricsVisualizations,
  samplePrometheusVisualizationComponent,
  samplePrometheusVisualizationId,
  sampleLayout,
  sampleVisualizationsList,
  sampleMergedVisualizations,
  samplePrometheusSampleUpdateWithSelections,
  sampleSavedMetric,
  sampleSavedMetricUpdate,
} from '../../../../../test/metrics_contants';
import _ from 'lodash';

describe('Utils helper functions', () => {
  configure({ adapter: new Adapter() });

  it('validates onTimeChange function', () => {
    const setRecentlyUsedRanges = jest.fn((x) => x);
    const setStart = jest.fn();
    const setEnd = jest.fn();
    const recentlyUsedRanges: DurationRange[] = [];
    onTimeChange(
      '2022-01-30T18:44:40.577Z',
      '2022-02-25T19:18:33.075Z',
      recentlyUsedRanges,
      setRecentlyUsedRanges,
      setStart,
      setEnd
    );
    expect(setRecentlyUsedRanges).toHaveBeenCalledWith([
      { start: '2022-01-30T18:44:40.577Z', end: '2022-02-25T19:18:33.075Z' },
    ]);
    expect(setStart).toHaveBeenCalledWith('2022-01-30T18:44:40.577Z');
    expect(setEnd).toHaveBeenCalledWith('2022-02-25T19:18:33.075Z');
  });

  it('validates getNewVizDimensions function', () => {
    expect(getNewVizDimensions([])).toMatchObject({
      x: 0,
      y: 0,
      w: 12,
      h: 2,
    });

    expect(getNewVizDimensions(samplePanelVisualizations1)).toStrictEqual(samplenewDimensions1);
    expect(getNewVizDimensions(samplePanelVisualizations2)).toStrictEqual(samplenewDimensions2);
  });

  it('validates sortMetricLayout function', () => {
    expect(sortMetricLayout(_.shuffle(sampleMetricsVisualizations))).toStrictEqual(
      sampleMetricsVisualizations
    );

    expect(sortMetricLayout(_.shuffle(sampleMetricsVisualizations))).toStrictEqual(
      sampleMetricsVisualizations
    );
  });

  it('validates mergeLayoutAndMetrics function', () => {
    expect(mergeLayoutAndMetrics(sampleLayout, sampleVisualizationsList)).toStrictEqual(
      sampleMergedVisualizations
    );
  });

  it('validates createPrometheusMetricById function', () => {
    expect(createPrometheusMetricById(samplePrometheusVisualizationId)).toStrictEqual(
      samplePrometheusVisualizationComponent
    );
  });

  it('validates updateMetricsWithSelections function', () => {
    expect(
      updateMetricsWithSelections(samplePrometheusVisualizationComponent, 'now-1d', 'now', '1h')
    ).toStrictEqual(samplePrometheusSampleUpdateWithSelections);

    expect(updateMetricsWithSelections(sampleSavedMetric, 'now-30m', 'now', '1m')).toStrictEqual(
      sampleSavedMetricUpdate
    );
  });
});
