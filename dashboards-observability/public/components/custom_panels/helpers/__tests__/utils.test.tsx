/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import { DurationRange } from '@elastic/eui/src/components/date_picker/types';

import {
  isNameValid,
  convertDateTime,
  mergeLayoutAndVisualizations,
  onTimeChange,
  isDateValid,
  isPPLFilterValid,
  displayVisualization,
} from '../utils';
import {
  sampleLayout,
  sampleMergedVisualizations,
  samplePanelVisualizations,
  samplePPLEmptyResponse,
  samplePPLResponse,
  sampleSavedVisualization,
} from '../../../../../test/panels_constants';
import { PPL_DATE_FORMAT } from '../../../../../common/constants/shared';
import React from 'react';

describe('Utils helper functions', () => {
  configure({ adapter: new Adapter() });

  it('validates isNameValid function', () => {
    expect(isNameValid('Lorem ipsum dolor sit amet, consectetur adipiscing elit,')).toBe(false);
    expect(isNameValid('Lorem ipsum dolor sit amet, consectetur adipiscin')).toBe(true);
  });

  it('validates convertDateTime function', () => {
    expect(convertDateTime('2022-01-30T18:44:40.577Z')).toBe(
      moment.utc('2022-01-30T18:44:40.577Z').format(PPL_DATE_FORMAT)
    );
    expect(convertDateTime('2022-02-25T19:18:33.075Z', true)).toBe(
      moment.utc('2022-02-25T19:18:33.075Z').format(PPL_DATE_FORMAT)
    );
  });

  it('validates mergeLayoutAndVisualizations function', () => {
    const setState = jest.fn();
    mergeLayoutAndVisualizations(sampleLayout, samplePanelVisualizations, setState);
    expect(setState).toHaveBeenCalledWith(sampleMergedVisualizations);
  });

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

  it('validates isDateValid function', () => {
    const setToast = jest.fn();
    expect(
      isDateValid(
        convertDateTime('2022-01-30T18:44:40.577Z'),
        convertDateTime('2022-02-25T19:18:33.075Z', false),
        setToast
      )
    ).toBe(true);
    expect(
      isDateValid(
        convertDateTime('2022-01-30T18:44:40.577Z'),
        convertDateTime('2022-01-30T18:44:40.577Z', false),
        setToast
      )
    ).toBe(true);
    expect(
      isDateValid(
        convertDateTime('2022-02-25T19:18:33.075Z'),
        convertDateTime('2022-01-30T18:44:40.577Z', false),
        setToast
      )
    ).toBe(false);
  });

  it('validates isPPLFilterValid function', () => {
    const setToast = jest.fn();
    expect(isPPLFilterValid(sampleSavedVisualization.visualization.query, setToast)).toBe(false);
    expect(isPPLFilterValid("where Carrier = 'OpenSearch-Air'", setToast)).toBe(true);
  });

  it('renders displayVisualization function', () => {
    const wrapper1 = mount(
      <div>{displayVisualization(sampleSavedVisualization, samplePPLResponse, 'bar')}</div>
    );
    expect(wrapper1).toMatchSnapshot();

    const wrapper2 = mount(
      <div>{displayVisualization(sampleSavedVisualization, samplePPLResponse, 'line')}</div>
    );
    expect(wrapper2).toMatchSnapshot();

    const wrapper3 = mount(
      <div>
        {displayVisualization(sampleSavedVisualization, samplePPLResponse, 'horizontal_bar')}
      </div>
    );
    expect(wrapper3).toMatchSnapshot();

    const wrapper4 = mount(
      <div>{displayVisualization({}, samplePPLEmptyResponse, 'horizontal_bar')}</div>
    );
    expect(wrapper4).toMatchSnapshot();
  });
});
