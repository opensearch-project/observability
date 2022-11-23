/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import SavedObjects from '../saved_objects/event_analytics/saved_objects';
import { coreStartMock } from '../../../test/__mocks__/coreMocks';
// import { NoResults } from '../explorer/no_results';

describe('Saved Object', () => {
  configure({ adapter: new Adapter() });

  it('Renders saved object class', async () => {
    console.log('From test saved component');
    const core = coreStartMock;
    const savedObject = new SavedObjects(core.http);
    savedObject.fetchSavedObjects({
      objectType: ['savedQuery', 'savedVisualization'],
      sortOrder: 'desc',
      fromIndex: 0,
    });
    // const wrapper = mount(<NoResults />);
    // wrapper.update();
    // await waitFor(() => {
    //   expect(wrapper).toMatchSnapshot();
    // });
  });
});
