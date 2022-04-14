/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { TimechartHeader } from '../timechart_header';
import { TIME_INTERVAL_OPTIONS } from '../../../../../../common/constants/explorer';

describe('Time chart header component', () => {
  configure({ adapter: new Adapter() });

  it('Renders Time chart header component', async () => {
    const onChangeInterval = jest.fn();

    const wrapper = mount(
      <TimechartHeader
        dateFormat={'MMM D, YYYY @ HH:mm:ss.SSS'}
        onChangeInterval={onChangeInterval}
        options={TIME_INTERVAL_OPTIONS}
        stateInterval="auto"
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
