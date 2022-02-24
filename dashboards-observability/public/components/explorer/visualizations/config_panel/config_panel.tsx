/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './config_panel.scss';

import React, { useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { find } from 'lodash';
import hjson from 'hjson';
import Mustache from 'mustache';
import {
  EuiTabbedContent,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiComboBox,
  EuiPanel,
  EuiIcon,
} from '@elastic/eui';
import { reset as resetVisualizationConfig } from '../../slices/viualization_config_slice';
import { getDefaultSpec } from '../visualization_specs/default_spec';
import { VizDataPanel as DefaultVisEditor } from './config_editor/default_vis_editor';
import { TabContext } from '../../hooks';
import { DefaultEditorControls } from './DefaultEditorControls';
import { getVisType } from '../../../visualizations/charts/vis_types';

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

const ENABLED_VIS_TYPES = ['bar', 'line', 'pie', 'gauge', 'heatmap', 'text'];

export const ConfigPanel = ({ visualizations, setCurVisId }: any) => {
  const {
    tabId,
    curVisId,
    dispatch,
    changeVisualizationConfig,
    explorerVisualizations,
    setToast,
  } = useContext<any>(TabContext);
  const { data, vis } = visualizations;
  const { fields } = visualizations?.data?.rawVizData?.metadata || { fields: [] };
  const { rawVizData, userConfigs } = data;
  const VisEditor = vis?.editorConfig?.editor || DefaultVisEditor;
  const [hjsonLayoutConfig, setHjsonLayoutConfig] = useState(() => {
    return userConfigs?.layout || userConfigs?.config
      ? hjson.stringify(
          {
            layout: { ...userConfigs?.layout },
            config: { ...userConfigs?.config },
          },
          HJSON_STRINGIFY_OPTIONS
        )
      : getDefaultSpec();
  });
  const [vizConfigs, setVizConfigs] = useState({});

  const getParsedLayoutConfig = useCallback(
    (hjsonConfig) =>
      JSON.parse(
        Mustache.render(CONFIG_LAYOUT_TEMPLATE, hjson.parse(hjsonConfig, HJSON_PARSE_OPTIONS))
      ),
    []
  );

  const handleConfigUpdate = useCallback(() => {
    try {
      dispatch(
        changeVisualizationConfig({
          tabId,
          vizId: curVisId,
          data: {
            ...vizConfigs,
            ...getParsedLayoutConfig(hjsonLayoutConfig),
          },
        })
      );
    } catch (e) {
      setToast(`Invalid visualization configurations. error: ${e.message}`, 'danger');
    }
  }, [
    tabId,
    hjsonLayoutConfig,
    vizConfigs,
    getParsedLayoutConfig,
    changeVisualizationConfig,
    dispatch,
    setToast,
    curVisId,
  ]);

  const handleLayoutConfigChange = (config: string) => setHjsonLayoutConfig(config);

  const handleConfigChange = (configSchema) => {
    return (configChanges) => {
      setVizConfigs((staleState) => {
        return {
          ...staleState,
          [configSchema]: configChanges,
        };
      });
    };
  };

  const params = {
    dataConfig: {
      visualizations,
      curVisId,
      onConfigChange: handleConfigChange('dataConfig'),
      vizState: vizConfigs.dataConfig,
    },
    layoutConfig: {
      onConfigChange: handleConfigChange('layoutConfig'),
      spec: hjsonLayoutConfig,
      setToast,
      vizState: vizConfigs.layoutConfig,
    },
  };

  const tabs = useMemo(() => {
    return vis.editorConfig.panelTabs.map((tab) => {
      const Editor = tab.editor;
      return {
        id: tab.id,
        name: tab.name,
        content: <Editor {...params[tab.mapTo]} tabProps={{ ...tab }} />,
      };
    });
  }, [vis.editorConfig.panelTabs, params]);

  const handleDiscardConfig = () => {
    dispatch(
      resetVisualizationConfig({
        tabId,
      })
    );
  };

  const memorizedVisualizationTypes = useMemo(() => {
    return ENABLED_VIS_TYPES.map((vs: any) => {
      const visDefinition = getVisType(vs);
      return {
        ...visDefinition,
      };
    });
  }, []);

  const vizSelectableItemRenderer = (option, searchValue, contentClassName) => {
    const { icon, label } = option;
    return (
      <div className="configPanel__vizSelector-item">
        <EuiIcon className="lnsChartSwitch__chartIcon" type={icon || 'empty'} size="m" />
        &nbsp;&nbsp;
        <span>{label}</span>
      </div>
    );
  };

  const getSelectedVisDById = useCallback(
    (visId) => {
      return find(memorizedVisualizationTypes, (v) => {
        return v.id === visId;
      });
    },
    [memorizedVisualizationTypes]
  );

  return (
    <>
      <EuiFlexGroup
        className="visEditorSidebar"
        direction="column"
        justifyContent="spaceBetween"
        gutterSize="none"
        responsive={false}
      >
        <EuiFlexItem>
          <EuiSpacer size="s" />
          <EuiComboBox
            aria-label="config chart selector"
            placeholder="Select a chart"
            options={memorizedVisualizationTypes}
            selectedOptions={[getSelectedVisDById(curVisId)]}
            singleSelection
            onChange={(visType) => {
              setCurVisId(visType[0].id);
            }}
            fullWidth
            renderOption={vizSelectableItemRenderer}
          />
          <EuiSpacer size="xs" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="s">
            <EuiTabbedContent
              id="vis-config-tabs"
              tabs={tabs}
              initialSelectedTab={tabs[0]}
              autoFocus="selected"
            />
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <DefaultEditorControls
            isDirty={true}
            isInvalid={false}
            onConfigUpdate={handleConfigUpdate}
            onConfigDiscard={handleDiscardConfig}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
