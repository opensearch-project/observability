/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { SavePanel } from '../save_panel';
import { SELECTED_PANELS_OPTIONS } from '../../../../../../test/event_analytics_constants';
import SavedObjects from '../../../../../services/saved_objects/event_analytics/saved_objects';
import httpClientMock from '../../../../../../test/__mocks__/httpClientMock';

describe('Saved query table component', () => {
  configure({ adapter: new Adapter() });

  it('Renders saved query table', async () => {
    const handleNameChange = jest.fn();
    const handleOptionChange = jest.fn();
    const setMetricLabel = jest.fn();
    const savedObjects = new SavedObjects(httpClientMock);
    
    const wrapper = mount(
      <SavePanel
        selectedOptions={SELECTED_PANELS_OPTIONS}
        handleNameChange={handleNameChange}
        handleOptionChange={handleOptionChange}
        savedObjects={savedObjects}
        savePanelName={'Count by depature'}
        showOptionList={true}
        curVisId={'line'}
        spanValue={false} 
        setSubType={'metric'} 
        setMetricMeasure={'hours (h)'}
        setMetricLabel={setMetricLabel}      
        />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});