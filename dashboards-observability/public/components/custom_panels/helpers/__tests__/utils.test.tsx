/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
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
    expect(convertDateTime('now')).toBe(moment().format(PPL_DATE_FORMAT));
    expect(convertDateTime('now-y', true)).toBe(
      moment().subtract(1, 'years').format(PPL_DATE_FORMAT)
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
    onTimeChange('now-y', 'now', recentlyUsedRanges, setRecentlyUsedRanges, setStart, setEnd);
    expect(setRecentlyUsedRanges).toHaveBeenCalledWith([{ start: 'now-y', end: 'now' }]);
    expect(setStart).toHaveBeenCalledWith('now-y');
    expect(setEnd).toHaveBeenCalledWith('now');
  });

  it('validates isDateValid function', () => {
    const setToast = jest.fn();
    expect(isDateValid(convertDateTime('now-y'), convertDateTime('now', false), setToast)).toBe(
      true
    );
    expect(isDateValid(convertDateTime('now'), convertDateTime('now', false), setToast)).toBe(true);
    expect(isDateValid(convertDateTime('now'), convertDateTime('now-15m', false), setToast)).toBe(
      false
    );
    expect(isDateValid(convertDateTime('now'), convertDateTime('now-1d', false), setToast)).toBe(
      false
    );
  });

  it('validates isPPLFilterValid function', () => {
    const setToast = jest.fn();
    expect(isPPLFilterValid(sampleSavedVisualization.visualization.query, setToast)).toBe(false);
    expect(isPPLFilterValid("where Carrier = 'OpenSearch-Air'", setToast)).toBe(true);
  });

  it('renders displayVisualization function', () => {
    const wrapper1 = mount(<div>{displayVisualization(samplePPLResponse, 'bar', false)}</div>);
    expect(wrapper1).toMatchSnapshot();

    const wrapper2 = mount(<div>{displayVisualization(samplePPLResponse, 'line', true)}</div>);
    expect(wrapper2).toMatchSnapshot();

    const wrapper3 = mount(
      <div>{displayVisualization(samplePPLResponse, 'horizontal_bar', false)}</div>
    );
    expect(wrapper3).toMatchSnapshot();

    const wrapper4 = mount(
      <div>{displayVisualization(samplePPLEmptyResponse, 'horizontal_bar', true)}</div>
    );
    expect(wrapper4).toMatchSnapshot();
  });
});
