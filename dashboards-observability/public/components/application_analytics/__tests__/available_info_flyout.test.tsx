import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { AvailabilityInfoFlyout } from '../components/flyout_components/availability_info_flyout';

describe('AvailabilityInfoFlyout component', () => {
  configure({ adapter: new Adapter() });

  it('renders AvailabilityInfoFlyout', () => {
    const wrapper = mount(<AvailabilityInfoFlyout closeFlyout={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
