/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiButton, EuiContextMenu, EuiPopover } from '@elastic/eui';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { EmptyPanelView } from '../empty_panel';

describe('Empty panel view component', () => {
  configure({ adapter: new Adapter() });

  it('renders empty panel view with disabled popover', () => {
    const addVizDisabled = true;
    const onPopoverClick = jest.fn();
    const isVizPopoverOpen = false;
    const closeVizPopover = jest.fn();
    const getVizContextPanels = jest.fn();
    const addVisualizationButton = (
      <EuiButton
        iconType="arrowDown"
        iconSide="right"
        disabled={addVizDisabled}
        onClick={onPopoverClick}
      >
        Add Visualization
      </EuiButton>
    );

    const addVisualizationPopover = (
      <EuiPopover
        id="addVisualizationContextMenu"
        button={addVisualizationButton}
        isOpen={isVizPopoverOpen}
        closePopover={closeVizPopover}
        panelPaddingSize="none"
        anchorPosition="downLeft"
      >
        <EuiContextMenu initialPanelId={0} panels={getVizContextPanels(closeVizPopover)} />
      </EuiPopover>
    );
    const wrapper = mount(<EmptyPanelView addButton={addVisualizationPopover} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('EuiButton').prop('disabled')).toBe(true);
  });

  it('renders empty panel view with enabled popover', () => {
    const addVizDisabled = false;
    const onPopoverClick = jest.fn();
    const isVizPopoverOpen = false;
    const closeVizPopover = jest.fn();
    const getVizContextPanels = jest.fn();
    const addVisualizationButton = (
      <EuiButton
        iconType="arrowDown"
        iconSide="right"
        disabled={addVizDisabled}
        onClick={onPopoverClick}
      >
        Add Visualization
      </EuiButton>
    );

    const addVisualizationPopover = (
      <EuiPopover
        id="addVisualizationContextMenu"
        button={addVisualizationButton}
        isOpen={isVizPopoverOpen}
        closePopover={closeVizPopover}
        panelPaddingSize="none"
        anchorPosition="downLeft"
      >
        <EuiContextMenu initialPanelId={0} panels={getVizContextPanels(closeVizPopover)} />
      </EuiPopover>
    );
    const wrapper = mount(<EmptyPanelView addButton={addVisualizationPopover} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('EuiButton').prop('disabled')).toBe(false);
  });
});
