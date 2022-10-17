/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { CustomInputModal } from '../custom_input_modal';

describe('Custom Input Model component', () => {
  configure({ adapter: new Adapter() });

  it('renders custom input modal with single argument', () => {
    const runModal = jest.fn;
    const closeModal = jest.fn();
    const labelTxt = 'test label';
    const titletxt = 'Input test';
    const btn1txt = 'btn test';
    const btn2txt = 'btn test 2';
    const wrapper = shallow(
      <CustomInputModal
        runModal={runModal}
        closeModal={closeModal}
        labelTxt={labelTxt}
        titletxt={titletxt}
        btn1txt={btn1txt}
        btn2txt={btn2txt}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders custom input modal with multiple arguments', () => {
    const runModal = jest.fn;
    const closeModal = jest.fn();
    const labelTxt = 'test label';
    const titletxt = 'Input test';
    const btn1txt = 'btn test';
    const btn2txt = 'btn test 2';
    const openPanelName = 'Test Dashboards';
    const helpText = 'Help Text';
    const optionalArgs = ['option1', 'option2', 'option3'];
    const wrapper = shallow(
      <CustomInputModal
        runModal={runModal}
        closeModal={closeModal}
        labelTxt={labelTxt}
        titletxt={titletxt}
        btn1txt={btn1txt}
        btn2txt={btn2txt}
        openPanelName={openPanelName}
        helpText={helpText}
        optionalArgs={optionalArgs}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
