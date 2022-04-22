/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { TimeSeries } from '../time_series/time_series';
import {
  LAYOUT_CONFIG,
  SAMPLE_VISUALIZATIONS,
} from '../../../../../test/event_analytics_constants';
import { SAMPLE_VISUALIZATIONS_VIS_TIME_SERIES } from '../../../../../test/constants';

describe('Time-Series component', () => {
  configure({ adapter: new Adapter() });

  const COMPLETE_VISUALIZATIONS = {
    ...SAMPLE_VISUALIZATIONS,
    vis: SAMPLE_VISUALIZATIONS_VIS_TIME_SERIES,
  };
  it('Renders Time-Series component', async () => {
    const wrapper = mount(
      <TimeSeries
        visualizations={COMPLETE_VISUALIZATIONS}
        name="Time series"
        layoutConfig={LAYOUT_CONFIG}
        isUniColor={true}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
