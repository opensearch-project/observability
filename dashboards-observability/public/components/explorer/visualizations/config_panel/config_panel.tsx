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
<<<<<<< HEAD
=======
import { VizDataPanel as DefaultVisEditor } from './config_editor/default_vis_editor';
>>>>>>> synced
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
  condense: 0,
  bracesSameLine: true,
};

const ENABLED_VIS_TYPES = ['bar', 'line', 'pie', 'gauge', 'heatmap', 'text'];

export const ConfigPanel = ({ visualizations, setCurVisId }: any) => {
  const { tabId, curVisId, dispatch, changeVisualizationConfig, setToast } = useContext<any>(
    TabContext
  );
  const { data, vis } = visualizations;
  const { userConfigs } = data;

  const [vizConfigs, setVizConfigs] = useState({
    dataConfig: {},
    layoutConfig: userConfigs?.layoutConfig
      ? hjson.stringify({ ...userConfigs.layoutConfig }, HJSON_STRINGIFY_OPTIONS)
      : getDefaultSpec(),
  });

  useEffect(() => {
    setVizConfigs({
      ...userConfigs,
      layoutConfig: userConfigs?.layoutConfig
        ? hjson.stringify({ ...userConfigs.layoutConfig }, HJSON_STRINGIFY_OPTIONS)
        : getDefaultSpec(),
    });
  }, [userConfigs, curVisId]);

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
            ...{
              ...vizConfigs,
              layoutConfig: hjson.parse(vizConfigs.layoutConfig),
            },
          },
        })
      );
    } catch (e) {
      setToast(`Invalid visualization configurations. error: ${e.message}`, 'danger');
    }
  }, [tabId, vizConfigs, changeVisualizationConfig, dispatch, setToast, curVisId]);

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
      onConfigEditorChange: handleConfigChange('layoutConfig'),
      spec: vizConfigs.layoutConfig,
      setToast,
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

<<<<<<< HEAD
  const vizSelectableItemRenderer = (option) => {
=======
  const vizSelectableItemRenderer = (option, searchValue, contentClassName) => {
>>>>>>> synced
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
