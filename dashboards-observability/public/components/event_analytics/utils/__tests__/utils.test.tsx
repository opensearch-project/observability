/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {
  hexToRgb,
  lightenColor,
  formatError,
  isValidTraceId,
  rangeNumDocs,
  getHeaders,
  findAutoInterval,
  getTooltipHoverInfo,
} from '../utils';

describe('Utils event analytics helper functions', () => {
  configure({ adapter: new Adapter() });

  it('validates hexToRgb function', () => {
    expect(hexToRgb()).toBe('rgba(60,161,199,1)');
    expect(hexToRgb('test', 1, true)).toBe('rgba(96,353,409,1)');
    expect(hexToRgb('#000000', 1, true)).toBe('rgba(0,0,0,1)');
  });

  it('validates lightenColor function', () => {
    expect(lightenColor('#00000', 10)).toBe('#1a1a1a');
  });

  it('validates formatError function', () => {
    expect(formatError('Warning', 'This is a warning', 'Test warning description')).toStrictEqual({
      body: {
        attributes: { error: { caused_by: { reason: 'Test warning description', type: '' } } },
      },
      message: 'This is a warning',
      name: 'Warning',
    });
  });

  it('validates isValidTraceId function', () => {
    expect(isValidTraceId('#00000')).toBe(false);
    expect(isValidTraceId('abcdefghijklmnopqrstuvwxyzabcdef')).toBe(true);
  });

  it('validates rangeNumDocs function', () => {
    expect(rangeNumDocs(11000)).toBe(10000);
    expect(rangeNumDocs(-200)).toBe(0);
    expect(rangeNumDocs(2000)).toBe(2000);
  });

  it('validates findAutoInterval function', () => {
    expect(findAutoInterval('60', '180')).toStrictEqual([
      'ms',
      [
        { text: 'Auto', value: 'auto_ms' },
        { text: 'Minute', value: 'm' },
        { text: 'Hour', value: 'h' },
        { text: 'Day', value: 'd' },
        { text: 'Week', value: 'w' },
        { text: 'Month', value: 'M' },
        { text: 'Year', value: 'y' },
      ],
    ]);
  });

  it('validates getTooltipHoverInfo function', () => {
    expect(getTooltipHoverInfo({ tooltipMode: 'visible', tooltipText: 'Test' })).toBe('Test');
    expect(getTooltipHoverInfo({ tooltipMode: 'hidden', tooltipText: 'Test' })).toBe('none');
  });

  it('validates getHeaders function', () => {
    expect(
      getHeaders(
        [
          {
            name: 'host',
            type: 'text',
          },
          {
            name: 'ip_count',
            type: 'integer',
          },
          {
            name: 'per_ip_bytes',
            type: 'long',
          },
          {
            name: 'resp_code',
            type: 'text',
          },
          {
            name: 'sum_bytes',
            type: 'long',
          },
        ],
        ['', 'Time', '_source'],
        undefined
      )
    ).toBeTruthy();
    expect(getHeaders([], ['', 'Time', '_source'], undefined)).toBeTruthy();
  });
});
