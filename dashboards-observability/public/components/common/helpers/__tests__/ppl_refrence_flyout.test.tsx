/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { PPLReferenceFlyout } from '../ppl_reference_flyout';

describe('PPL reference flyout component', () => {
  configure({ adapter: new Adapter() });

  it('Renders PPL reference flyout', async () => {
    const wrapper = mount(<PPLReferenceFlyout module="explorere" closeFlyout={() => jest.fn()} />);
    wrapper.update();
    wrapper.find('input').simulate('change', { target: { value: 'stats' } });
    wrapper.find('.euiMark').simulate('click');
    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
