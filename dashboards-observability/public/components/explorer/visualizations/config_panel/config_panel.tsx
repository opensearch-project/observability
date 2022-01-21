/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './config_panel.scss';

import React, { useContext } from 'react';
import { isEmpty } from 'lodash';
import hjson from 'hjson';
import Mustache from 'mustache';
import { batch, useDispatch, useSelector } from 'react-redux';
import { EuiTabbedContent } from '@elastic/eui';
import {
  selectVisualizationConfig,
  change as changeVisualizationConfig,
} from '../../slices/viualization_config_slice';
import { ConfigEditor } from './config_editor/config_editor';
import { getDefaultSpec } from '../visualization_specs/default_spec';
import { VizDataMappingPanel } from './config_raw_data/config_raw_data';
import { TabContext } from '../../hooks';

const CONFIG_LAYOUT_TEMPLATE = `
{
  "layout": {},
  "config": {
    "scrollZoom": {{config.scrollZoom}},
    "editable": {{config.editable}},
    "staticPlot": {{config.staticPlot}},
    "displayModeBar": {{config.displayModeBar}},
    "responsive": {{config.responsive}},
    "doubleClickDelay": {{config.doubleClickDelay}}
  }
}
`;

const HJSON_PARSE_OPTIONS = {
  keepWsc: true,
};

const HJSON_STRINGIFY_OPTIONS = {
  keepWsc: true,
  condense: 1,
  bracesSameLine: true,
};

export const ConfigPanel = ({ vizVectors }: any) => {
  const {
    tabId,
    curVisId,
    dispatch,
    changeVisualizationConfig,
    explorerVisualizations,
    setToast,
  } = useContext(TabContext);
  const customVizConfigs = useSelector(selectVisualizationConfig)[tabId];

  const handleConfigUpdate = (payload) => {
    try {
      dispatch(
        changeVisualizationConfig({
          tabId,
          data: {
            ...payload,
          },
        })
      );
    } catch (e) {
      setToast(`Invalid visualization configurations. error: ${e.message}`, 'danger');
    }
  };

  const handleDataConfigChange = (hjsonConfig) => {
    const payload = {
      data: [...hjson.parse(hjsonConfig, HJSON_PARSE_OPTIONS)],
    };
    handleConfigUpdate(payload);
  };

  const handleLayoutConfigChange = (hjsonConfig) => {
    const jsonConfig = hjson.parse(hjsonConfig, HJSON_PARSE_OPTIONS);
    console.log('jsonConfig: ', jsonConfig);
    const output = Mustache.render(CONFIG_LAYOUT_TEMPLATE, jsonConfig);
    // const renderedConfig = Mustache.render(CONFIG_TEMPLATE, { ...jsonConfig.config });
    console.log('typeof output: ', typeof output);
    // console.log('JSON.parse(renderedConfig): ', JSON.parse(renderedConfig));
    try {
      const payload = {
        ...JSON.parse(output),
        // ...Object(renderedConfig),
      };
      handleConfigUpdate(payload);
    } catch (e) {
      console.log(e.message);
    }
  };

  // const getSpec = (jsonSpec) => {
  //   if (isEmpty()) return getDefaultSpec();
  //   return {

  //   };
  // };

  const tabs = [
    {
      id: 'style-panel',
      name: 'Layout',
      content: (
        <ConfigEditor
          // customVizConfigs={customVizConfigs}
          onConfigUpdate={handleLayoutConfigChange}
          // spec={getDefaultSpec(customVizConfigs)}
          spec={
            customVizConfigs?.layout || customVizConfigs?.config
              ? hjson.stringify(
                  {
                    layout: { ...customVizConfigs?.layout },
                    config: { ...customVizConfigs?.config },
                  },
                  HJSON_STRINGIFY_OPTIONS
                )
              : getDefaultSpec('layout')
          }
          setToast={setToast}
        />
      ),
    },
    {
      id: 'raw-data-panel',
      name: 'Data Mapping',
      content: (
        <VizDataMappingPanel
          queriedVizRes={explorerVisualizations}
          customVizConfigs={customVizConfigs}
        />
      ),
      // content: (
      //   <ConfigEditor
      //     // customVizConfigs={customVizConfigs}
      //     onConfigUpdate={handleDataConfigChange}
      //     spec={
      //       customVizConfigs?.data
      //         ? hjson.stringify(customVizConfigs?.data, HJSON_STRINGIFY_OPTIONS)
      //         : getDefaultSpec('data')
      //     }
      //     setToast={setToast}
      //   />
      // ),
      // content: (
      //   <VizRawDataPanel spec={customVizConfigs?.data ? hjson.stringify(customVizConfigs?.data) : getDefaultSpec('data')} onConfigUpdate={handleConfigUpdate} setToast={setToast} vizVectors={vizVectors?.jsonData} columns={vizVectors?.metadata?.fields} />
      // ),
    },
  ];

  return (
    <EuiTabbedContent
      id="vis-config-tabs"
      tabs={tabs}
      initialSelectedTab={tabs[0]}
      autoFocus="selected"
    />
  );
};
