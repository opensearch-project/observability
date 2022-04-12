/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
// import { ConfigPanel } from '../config_panel';
import {
  SELECTED_FIELDS,
  AVAILABLE_FIELDS,
  UNSELECTED_FIELDS,
  QUERIED_FIELDS,
} from '../../../../../../../common/constants/explorer';
import {
  AVAILABLE_FIELDS as SIDEBAR_AVAILABLE_FIELDS,
  QUERY_FIELDS,
} from '../../../../../../../test/event_analytics_constants';

describe.skip('Config panel component', () => {
  configure({ adapter: new Adapter() });

  it('Renders empty config panel wrapper component', async () => {
    const wrapper = mount(<ConfigPanel />);

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders config panel wrapper component with fields', async () => {
    const explorerFields = {
      [SELECTED_FIELDS]: [],
      [UNSELECTED_FIELDS]: [],
      [AVAILABLE_FIELDS]: SIDEBAR_AVAILABLE_FIELDS,
      [QUERIED_FIELDS]: QUERY_FIELDS,
    };

    const wrapper = mount(<ConfigPanel explorerFields={explorerFields} />);

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders panel item component', async () => {
    const explorerFields = {
      [SELECTED_FIELDS]: [],
      [UNSELECTED_FIELDS]: [],
      [AVAILABLE_FIELDS]: SIDEBAR_AVAILABLE_FIELDS,
      [QUERIED_FIELDS]: QUERY_FIELDS,
    };

    const wrapper = mount(<ConfigPanel explorerFields={explorerFields} />);

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
