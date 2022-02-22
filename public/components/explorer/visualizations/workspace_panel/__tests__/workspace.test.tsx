/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import { forEach } from 'lodash';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { ChartSwitch } from '../chart_switch';
import { Bar } from '../../../../visualizations/charts/bar/bar';
import { HorizontalBar } from '../../../../visualizations/charts/horizontal_bar';
import { Line } from '../../../../visualizations/charts/lines/line';
import { LensIconChartBar } from '../../../../visualizations/assets/chart_bar';
import { LensIconChartBarHorizontal } from '../../../../visualizations/assets/chart_bar_horizontal';
import { LensIconChartLine } from '../../../../visualizations/assets/chart_line';
import {
  VISUALIZATION_TYPES,
  SAMPLE_VISUALIZATIONS,
} from '../../../../../../test/event_analytics_constants';
import { WorkspacePanel } from '../workspace_panel';
import { WorkspacePanelWrapper } from '../workspace_panel_wrapper';

const attachVisualizationComponents = () => {
  VISUALIZATION_TYPES[0].chart = () => <Bar />;
  VISUALIZATION_TYPES[0].icon = () => <LensIconChartBar />;
  VISUALIZATION_TYPES[1].chart = () => <HorizontalBar />;
  VISUALIZATION_TYPES[1].icon = () => <LensIconChartBarHorizontal />;
  VISUALIZATION_TYPES[2].chart = () => <Line />;
  VISUALIZATION_TYPES[2].icon = () => <LensIconChartLine />;
};

describe.skip('Visualization chart switch components', () => {
  configure({ adapter: new Adapter() });
  beforeAll(() => {
    attachVisualizationComponents();
  });

  it('Renders workspace with bar component', async () => {
    const setVis = jest.fn();
    const wrapper = mount(
      <ChartSwitch
        setVis={setVis}
        vis={VISUALIZATION_TYPES[0]}
        visualizationTypes={VISUALIZATION_TYPES}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders workspace with horionzontal bar component', async () => {
    const setVis = jest.fn();
    const wrapper = mount(
      <ChartSwitch
        setVis={setVis}
        vis={VISUALIZATION_TYPES[1]}
        visualizationTypes={VISUALIZATION_TYPES}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders workspace with line bar component', async () => {
    const setVis = jest.fn();
    const wrapper = mount(
      <ChartSwitch
        setVis={setVis}
        vis={VISUALIZATION_TYPES[2]}
        visualizationTypes={VISUALIZATION_TYPES}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe.skip('Visualization workspace panel', () => {
  it('Renders workspace panel', async () => {
    const setCurVisId = jest.fn();

    const wrapper = mount(
      <WorkspacePanel
        curVisId="bar"
        setCurVisId={setCurVisId}
        visualizations={SAMPLE_VISUALIZATIONS}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe.skip('Visualization workspace panel wrapper', () => {
  it('Renders workspace panel wrapper', async () => {
    const setVis = jest.fn();

    const wrapper = mount(
      <WorkspacePanelWrapper
        curVisId="bar"
        title=""
        vis={VISUALIZATION_TYPES[1]}
        visualizationTypes={VISUALIZATION_TYPES}
        emptyExpression={true}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
