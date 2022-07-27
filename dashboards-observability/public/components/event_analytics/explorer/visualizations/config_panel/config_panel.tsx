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
import { ENABLED_VIS_TYPES, ValueOptionsAxes, visChartTypes } from '../../../../../../common/constants/shared';
import { VIZ_CONTAIN_XY_AXIS } from '../../../../../../common/constants/explorer';

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

export const ConfigPanel = ({ visualizations, setCurVisId, callback, changeIsValidConfigOptionState }: any) => {
  const { tabId, curVisId, dispatch, changeVisualizationConfig, setToast } = useContext<any>(
    TabContext
  );
  const { data, vis } = visualizations;
  const { userConfigs } = data;

  const getDefaultAxisSelected = () => {
    let chartBasedAxes: ValueOptionsAxes = {};
    const [valueField] = data.defaultAxes?.yaxis ?? [];
    if (curVisId === visChartTypes.TreeMap) {
      chartBasedAxes["childField"] = data.defaultAxes.xaxis ?? [];
      chartBasedAxes["valueField"] = valueField && [valueField];
    } else if (curVisId === visChartTypes.HeatMap) {
      chartBasedAxes["zaxis"] = valueField && [valueField];
    } else {
      chartBasedAxes = { ...data.defaultAxes };
    }
    return {
      valueOptions: { ...(chartBasedAxes && chartBasedAxes) }
    }
  }
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
      dataConfig: { ...(userConfigs?.dataConfig ? userConfigs.dataConfig : getDefaultAxisSelected()) },
      layoutConfig: userConfigs?.layoutConfig
        ? hjson.stringify({ ...userConfigs.layoutConfig }, HJSON_STRINGIFY_OPTIONS)
        : getDefaultSpec(),
    });
    if (callback) {
      callback(() => switchToAvailability());
    }
  }, [userConfigs, curVisId]);

  const getParsedLayoutConfig = useCallback(
    (hjsonConfig) =>
      JSON.parse(
        Mustache.render(CONFIG_LAYOUT_TEMPLATE, hjson.parse(hjsonConfig, HJSON_PARSE_OPTIONS))
      ),
    []
  );

  // To check, If user empty any of the value options
  const isValidValueOptionConfigSelected = useMemo(() => {
    const valueOptions = vizConfigs.dataConfig?.valueOptions;
    const { TreeMap, Gauge, HeatMap } = visChartTypes;
    const isValidValueOptionsXYAxes = VIZ_CONTAIN_XY_AXIS.includes(curVisId) &&
      valueOptions?.xaxis?.length !== 0 && valueOptions?.yaxis?.length !== 0;

    const isValid_valueOptions: { [key: string]: boolean } = {
      tree_map: curVisId === TreeMap && valueOptions?.childField?.length !== 0 &&
        valueOptions?.valueField?.length !== 0,
      gauge: true,
      heatmap: Boolean(curVisId === HeatMap && valueOptions?.zaxis && valueOptions.zaxis?.length !== 0),
      bar: isValidValueOptionsXYAxes,
      line: isValidValueOptionsXYAxes,
      histogram: isValidValueOptionsXYAxes,
      pie: isValidValueOptionsXYAxes,
      scatter: isValidValueOptionsXYAxes,
    }
    return isValid_valueOptions[curVisId];
  }, [vizConfigs.dataConfig]);

  useEffect(() => changeIsValidConfigOptionState(Boolean(isValidValueOptionConfigSelected)), [isValidValueOptionConfigSelected]);

  const handleConfigUpdate = useCallback((updatedConfigs) => {
    try {
      if (!isValidValueOptionConfigSelected) {
        setToast(`Invalid value options configuration selected.`, 'danger');
      }
      dispatch(
        changeVisualizationConfig({
          tabId,
          vizId: curVisId,
          data: {
            ...{
              ...updatedConfigs,
              layoutConfig: hjson.parse(updatedConfigs.layoutConfig),
            },
          },
        })
      );
    } catch (e: any) {
      setToast(`Invalid visualization configurations. error: ${e.message}`, 'danger');
    }
  }, [tabId, changeVisualizationConfig, dispatch, setToast, curVisId]);

  const handleConfigChange = (configSchema: string) => {
    return (configChanges: any) => {
      const updatedVizConfigs = { ...vizConfigs, [configSchema]: configChanges };
      setVizConfigs((staleState) => {
        return {
          ...staleState,
          [configSchema]: configChanges,
        };
      });
      handleConfigUpdate(updatedVizConfigs);
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

  const switchToAvailability = () => {
    setCurrTabId('availability-panel');
  };

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
    let visDefinition = {}
    return ENABLED_VIS_TYPES.map((vs: string) => {
      if (vs === visChartTypes.Line || vs === visChartTypes.Scatter) {
        visDefinition = vs === visChartTypes.Line ? getVisType(vs, { type: visChartTypes.Line }) : getVisType(vs, { type: visChartTypes.Scatter });
      } else {
        visDefinition = getVisType(vs);
      }
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
            isClearable={false}
          />
          <EuiSpacer size="xs" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="s" className="configPane_options">
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
