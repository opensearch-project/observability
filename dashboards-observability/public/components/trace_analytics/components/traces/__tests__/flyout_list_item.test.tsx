/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { render } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { FlyoutListItem } from '../flyout_list_item';

describe('<FlyoutListItem /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the component', () => {
    const addSpanFilter = jest.fn();
    const utils = render(
      <FlyoutListItem title="Span ID" description="test-span-id" addSpanFilter={addSpanFilter} />
    );
    expect(utils.container.firstChild).toMatchSnapshot();
  });

  it('renders the component', () => {
    const addSpanFilter = jest.fn();
    const utils = render(
      <FlyoutListItem title="Span ID" description="test-span-id" addSpanFilter={addSpanFilter} />
    );
  });
});
