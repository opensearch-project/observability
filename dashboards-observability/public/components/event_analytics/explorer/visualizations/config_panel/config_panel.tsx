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
  EuiComboBoxOptionOption,
  EuiTabbedContentTab,
} from '@elastic/eui';
import { reset as resetVisualizationConfig } from '../../../redux/slices/viualization_config_slice';
import { getDefaultSpec } from '../visualization_specs/default_spec';
import { TabContext } from '../../../hooks';
import { DefaultEditorControls } from './config_panel_footer';
import { getVisType } from '../../../../visualizations/charts/vis_types';
import { ENABLED_VIS_TYPES } from '../../../../../../common/constants/shared';

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

interface PanelTabType {
  id: string;
  name: string;
  mapTo: string;
  editor: any;
  section?: any;
  content?: any;
}

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
    availabilityConfig: {},
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
    } catch (e: any) {
      setToast(`Invalid visualization configurations. error: ${e.message}`, 'danger');
    }
  }, [tabId, vizConfigs, changeVisualizationConfig, dispatch, setToast, curVisId]);

  const handleConfigChange = (configSchema: string) => {
    return (configChanges: any) => {
      setVizConfigs((staleState) => {
        return {
          ...staleState,
          [configSchema]: configChanges,
        };
      });
    };
  };

  const params = useMemo(() => {
    return {
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
      availabilityConfig: {
        visualizations,
        curVisId,
        onConfigChange: handleConfigChange('availabilityConfig'),
        vizState: vizConfigs.availabilityConfig,
      },
    };
  }, [visualizations, vizConfigs, setToast, curVisId]);

  const tabs: EuiTabbedContentTab[] = useMemo(() => {
    return vis.editorConfig.panelTabs.map((tab: PanelTabType) => {
      const Editor = tab.editor;
      return {
        id: tab.id,
        name: tab.name,
        content: <Editor {...params[tab.mapTo]} tabProps={{ ...tab }} />,
      };
    });
  }, [vis.editorConfig.panelTabs, params]);

  const [currTabId, setCurrTabId] = useState(tabs[0].id);

  // const switchToAvailability = () => {
  //   setCurrTabId('availability-panel');
  // };

  const onTabClick = (selectedTab: EuiTabbedContentTab) => {
    setCurrTabId(selectedTab.id);
  };

  const handleDiscardConfig = () => {
    dispatch(
      resetVisualizationConfig({
        tabId,
      })
    );
  };

  const memorizedVisualizationTypes = useMemo(() => {
    return ENABLED_VIS_TYPES.map((vs: string) => {
      const visDefinition = getVisType(vs);
      return {
        ...visDefinition,
      };
    });
  }, []);

  const vizSelectableItemRenderer = (option: EuiComboBoxOptionOption<any>) => {
    const { iconType = 'empty', label = '' } = option;

    return (
      <div className="configPanel__vizSelector-item">
        <EuiIcon className="lnsChartSwitch__chartIcon" type={iconType} size="m" />
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

  const vizTypeList = useMemo(() => {
    return memorizedVisualizationTypes.filter((type) => type.id !== 'horizontal_bar');
  }, [memorizedVisualizationTypes]);

  return (
    <>
      <EuiFlexGroup
        className="visEditorSidebar"
        direction="column"
        justifyContent="spaceBetween"
        gutterSize="none"
        responsive={false}
      >
        <EuiFlexItem data-test-subj="configPane__vizTypeSelector">
          <EuiSpacer size="s" />
          <EuiComboBox
            aria-label="config chart selector"
            placeholder="Select a chart"
            options={vizTypeList}
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
              className="vis-config-tabs"
              tabs={tabs}
              selectedTab={tabs.find((tab) => tab.id === currTabId) || tabs[0]}
              onTabClick={onTabClick}
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
