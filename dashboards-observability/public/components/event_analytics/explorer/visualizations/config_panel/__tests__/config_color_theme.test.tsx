import { waitFor } from '@testing-library/react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { TEST_COLOR_THEME } from '../../../../../../../test/event_analytics_constants';
import { ConfigColorTheme } from '../config_panes/config_controls';

describe('ConfigColorTheme component', () => {
  configure({ adapter: new Adapter() });
  const vizStates = [
    {
      ctid: 'AA12BB44',
      name: { label: 'testNameA' },
      color: '#FFFFFF',
    },
    {
      ctid: 'AA13BB45',
      name: { label: 'testNameB' },
      color: '#000000',
    },
  ];
  const onConfigChange = jest.fn();
  const wrapper = mount(
    <ConfigColorTheme
      visualizations={TEST_COLOR_THEME}
      schemas={{}}
      vizState={vizStates}
      handleConfigChange={onConfigChange}
      sectionName={'Color theme'}
    />
  );

  it('Renders ConfigColorTheme component', async () => {
    wrapper.update();
    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders ConfigColorTheme component to simulate accordion button', async () => {
    wrapper.find('button[data-test-subj="config-color-theme-accordion"]').simulate('click');
  });

  it('Renders ConfigColorTheme component to simulate color picker', async () => {
    wrapper
      .find('input[data-test-subj="euiColorPickerAnchor config-color-theme-colorpicker-AA12BB44"]')
      .simulate('click');
  });

  it('Renders ConfigColorTheme component to simulate combo box', async () => {
    wrapper.find('div[data-test-subj="config-color-theme-combobox-AA12BB44"]').simulate('click');
  });

  it('Renders ConfigColorTheme component to simulate trash icon', async () => {
    wrapper.find('svg[data-test-subj="config-color-theme-trash-AA12BB44"]').simulate('click');
  });
});
