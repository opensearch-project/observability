/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import httpClientMock from '../../../../../../test/__mocks__/httpClientMock';
import { PanelGrid } from '../panel_grid';
import PPLService from '../../../../../services/requests/ppl';
import { VisualizationType } from '../../../../../../common/types/custom_panels';
import { coreStartMock } from '../../../../../../test/__mocks__/coreMocks';
import { waitFor } from '@testing-library/react';

describe('Panel Grid Component', () => {
  configure({ adapter: new Adapter() });

  it('renders panel grid component with empty visualizations', async () => {
    const http = httpClientMock;
    const core = coreStartMock;
    const panelId = '';
    const panelVisualizations: VisualizationType[] = [];
    const setPanelVisualizations = jest.fn();
    const editMode = false;
    const pplService = new PPLService(httpClientMock);
    const start = 'now-15m';
    const end = 'now';
    const onRefresh = false;
    const cloneVisualization = jest.fn();
    const pplFilterValue = '';
    const showFlyout = jest.fn();
    const editActionType = '';

    const wrapper = mount(
      <PanelGrid
        http={http}
        panelId={panelId}
        chrome={core.chrome}
        panelVisualizations={panelVisualizations}
        setPanelVisualizations={setPanelVisualizations}
        editMode={editMode}
        pplService={pplService}
        startTime={start}
        endTime={end}
        onRefresh={onRefresh}
        cloneVisualization={cloneVisualization}
        pplFilterValue={pplFilterValue}
        showFlyout={showFlyout}
        editActionType={editActionType}
      />
    );
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
