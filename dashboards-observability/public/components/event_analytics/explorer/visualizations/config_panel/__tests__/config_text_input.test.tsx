/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { TextInputFieldItem } from '../config_panes/config_controls/config_text_input';

describe('Config text input component', () => {
  configure({ adapter: new Adapter() });
  it('Renders TextInputFieldItem with empty data', async () => {
    const wrapper = mount(
      <TextInputFieldItem name={''} title={''} currentValue={''} handleInputChange={jest.fn()} />
    );

    wrapper.update();
    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders TextInputFieldItem with data', async () => {
    const wrapper = mount(
      <TextInputFieldItem
        name={'seriesUnits'}
        title={'Series'}
        currentValue={'units'}
        handleInputChange={jest.fn()}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
