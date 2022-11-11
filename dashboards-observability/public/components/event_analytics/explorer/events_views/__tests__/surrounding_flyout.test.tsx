import { waitFor } from '@testing-library/react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { FlyoutContainers } from '../../../../common/flyout_containers';

describe('Test surrounding flyout component', () => {
  configure({ adapter: new Adapter() });
  
  it('Renders surrounding flyout component', async () => {
    const wrapper = mount(
      <FlyoutContainers
        closeFlyout={() => {}}
        flyoutHeader={<></>}
        flyoutBody={<></>}
        flyoutFooter={<></>}
        ariaLabel="testSurroundingFlyout"
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
