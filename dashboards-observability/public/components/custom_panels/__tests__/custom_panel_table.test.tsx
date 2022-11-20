/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { CustomPanelTable } from '../custom_panel_table';
import { waitFor } from '@testing-library/react';
import { panelBreadCrumbs, panelsData } from '../../../../test/panels_constants';
import { CustomPanelListType } from '../../../../common/types/custom_panels';

describe('Panels Table Component', () => {
  configure({ adapter: new Adapter() });

  const loading = false;
  const fetchCustomPanels = jest.fn();
  const emptyPanelData: CustomPanelListType[] = [];
  const createCustomPanel = jest.fn();
  const setBreadcrumbs = jest.fn();
  const parentBreadcrumb = panelBreadCrumbs;
  const renameCustomPanel = jest.fn();
  const cloneCustomPanel = jest.fn();
  const deleteCustomPanelList = jest.fn();
  const addSamplePanels = jest.fn();

  const wrapperEmptyPanel = mount(
    <CustomPanelTable
      loading={loading}
      fetchCustomPanels={fetchCustomPanels}
      customPanels={emptyPanelData}
      createCustomPanel={createCustomPanel}
      setBreadcrumbs={setBreadcrumbs}
      parentBreadcrumbs={parentBreadcrumb}
      renameCustomPanel={renameCustomPanel}
      cloneCustomPanel={cloneCustomPanel}
      deleteCustomPanelList={deleteCustomPanelList}
      addSamplePanels={addSamplePanels}
    />
  );

  const customPanelData: CustomPanelListType[] = panelsData.panels;
  const wrapper = mount(
    <CustomPanelTable
      loading={loading}
      fetchCustomPanels={fetchCustomPanels}
      customPanels={customPanelData}
      createCustomPanel={createCustomPanel}
      setBreadcrumbs={setBreadcrumbs}
      parentBreadcrumbs={parentBreadcrumb}
      renameCustomPanel={renameCustomPanel}
      cloneCustomPanel={cloneCustomPanel}
      deleteCustomPanelList={deleteCustomPanelList}
      addSamplePanels={addSamplePanels}
    />
  );

  it('renders empty panel table container', async () => {
    wrapperEmptyPanel.update();
    await waitFor(() => {
      expect(wrapperEmptyPanel).toMatchSnapshot();
    });
  });

  it('renders panel table container to simulate create panel in empty table', async () => {
    wrapperEmptyPanel
      .find('button[data-test-subj="customPanels__emptyCreateNewPanels"]')
      .simulate('click');
  });

  it('renders panel table container to simulate add samples in empty table', async () => {
    wrapperEmptyPanel.find('button[data-test-subj="customPanels__addSamples"]').simulate('click');
  });

  it('renders panel table container', async () => {
    wrapper.update();
    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('renders panel table container to simulate create panel', async () => {
    wrapper.find('button[data-test-subj="customPanels__createNewPanels"]').simulate('click');
  });

  it('renders panel table container to simulate popover', async () => {
    wrapper.find('button[data-test-subj="operationalPanelsActionsButton"]').simulate('click');
  });

  it('renders panel table container to simulate create search bar', async () => {
    wrapper.find('input[data-test-subj="operationalPanelSearchBar"]').simulate('click');
  });
});
