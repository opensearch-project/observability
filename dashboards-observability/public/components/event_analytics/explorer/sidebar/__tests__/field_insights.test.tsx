/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { FieldInsights } from '../field_insights';
import { AGENT_FIELD } from '../../../../../../test/event_analytics_constants';

describe('Field Insights component', () => {
  configure({ adapter: new Adapter() });

  it('Renders a field insights', async () => {
    const query = {
      rawQuery:
        'source=opensearch_dashboards_sample_data_flights | fields Carrier,FlightDelayMin | stats sum(FlightDelayMin) as delays by Carrier',
    };

    const wrapper = mount(<FieldInsights field={AGENT_FIELD} query={query} />);

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
