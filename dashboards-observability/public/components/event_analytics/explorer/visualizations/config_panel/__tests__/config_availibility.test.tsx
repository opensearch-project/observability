import { waitFor } from '@testing-library/react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { TEST_CONFIG_AVAILABILITY } from '../../../../../../../test/event_analytics_constants';
import { ConfigAvailability } from '../config_panes/config_controls';

describe('ConfigAvailability component', () => {
  configure({ adapter: new Adapter() });
  const vizStates = [
    {
      thid: 'AA12BB44',
      name: 'testNameA',
      color: '#FFFFFF',
      value: 4,
      expression: '≥',
    },
    {
      thid: 'AA13BB45',
      name: 'testNameB',
      color: '#000000',
      value: 3,
      expression: '≥',
    },
  ];
  const onConfigChange = jest.fn();
  const wrapper = mount(
    <ConfigAvailability
      visualizations={TEST_CONFIG_AVAILABILITY}
      onConfigChange={onConfigChange}
      vizState={{ level: vizStates }}
    />
  );

  it('Renders configAvailability component with visualization and viztypes data', async () => {
    wrapper.update();
    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders configAvailability component to simulate accordion button', async () => {
    wrapper.find('button[data-test-subj="config-availibility-accordion"]').simulate('click');
  });

  it('Renders configAvailability component to simulate color picker', async () => {
    wrapper
      .find('input[data-test-subj="euiColorPickerAnchor config-availibility-colorpicker-AA12BB44"]')
      .simulate('click');
  });

  it('Renders configAvailability component to simulate field text', async () => {
    wrapper
      .find('input[data-test-subj="config-availibility-fieldtext-AA12BB44"]')
      .simulate('click');
  });

  it('Renders configAvailability component to simulate select availability dropdown', async () => {
    wrapper.find('select[data-test-subj="config-availibility-select-AA12BB44"]').simulate('click');
  });

  it('Renders configAvailability component to simulate field number', async () => {
    wrapper
      .find('input[data-test-subj="config-availibility-fieldnumber-AA12BB44"]')
      .simulate('click');
  });

  it('Renders configAvailability component to simulate trash icon', async () => {
    wrapper.find('svg[data-test-subj="config-availibility-trash-AA12BB44"]').simulate('click');
  });
});
