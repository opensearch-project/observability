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
import { CustomPanelTable } from '../custom_panel_table';
import { waitFor } from '@testing-library/react';
import { panelsData } from '../../../../test/panels_constants';
import { CustomPanelListType } from '../../../../common/types/custom_panels';

describe('Panels Table Component', () => {
  configure({ adapter: new Adapter() });

  it('renders panel table container', async () => {
    const loading = false;
    const fetchCustomPanels = jest.fn();
    const customPanelData: CustomPanelListType[] = panelsData.panels;
    const createCustomPanel = jest.fn();
    const setBreadcrumbs = jest.fn();
    const parentBreadcrumb = [
      { text: 'Operational panels', href: '#/operational_panels/' },
      { text: 'Observability', href: 'observability#/' },
    ];
    const renameCustomPanel = jest.fn();
    const cloneCustomPanel = jest.fn();
    const deleteCustomPanelList = jest.fn();
    const addSamplePanels = jest.fn();

    const wrapper = mount(
      <CustomPanelTable
        loading={loading}
        fetchCustomPanels={fetchCustomPanels}
        customPanels={customPanelData}
        createCustomPanel={createCustomPanel}
        setBreadcrumbs={setBreadcrumbs}
        parentBreadcrumb={parentBreadcrumb}
        renameCustomPanel={renameCustomPanel}
        cloneCustomPanel={cloneCustomPanel}
        deleteCustomPanelList={deleteCustomPanelList}
        addSamplePanels={addSamplePanels}
      />
    );
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
