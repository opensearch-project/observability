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
import { ENABLED_VIS_TYPES, VIS_CHART_TYPES } from '../../../../../../common/constants/shared';
import { VIZ_CONTAIN_XY_AXIS } from '../../../../../../common/constants/explorer';
import { getVisTypeData } from '../../../../visualizations/charts/helpers/viz_types';

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

export const ConfigPanel = ({
  visualizations,
  setCurVisId,
  callback,
  changeIsValidConfigOptionState,
}: any) => {
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
    const { TreeMap, Gauge, HeatMap, Stats } = VIS_CHART_TYPES;
    const isValidValueOptionsXYAxes =
      VIZ_CONTAIN_XY_AXIS.includes(curVisId) &&
      valueOptions?.xaxis?.length !== 0 &&
      valueOptions?.yaxis?.length !== 0;

    const isValid_valueOptions: { [key: string]: boolean } = {
      tree_map:
        curVisId === TreeMap &&
        valueOptions?.childField?.length !== 0 &&
        valueOptions?.valueField?.length !== 0,
      gauge: curVisId === Gauge && valueOptions?.yaxis?.length !== 0,
      heatmap: Boolean(
        curVisId === HeatMap && valueOptions?.metrics && valueOptions.metrics?.length !== 0
      ),
      bar: isValidValueOptionsXYAxes,
      line: isValidValueOptionsXYAxes,
      histogram: isValidValueOptionsXYAxes,
      pie: isValidValueOptionsXYAxes,
      scatter: isValidValueOptionsXYAxes,
      logs_view: true,
      stats: curVisId === Stats && valueOptions?.yaxis?.length !== 0,
      horizontal_bar: isValidValueOptionsXYAxes,
    };
    return isValid_valueOptions[curVisId];
  }, [vizConfigs.dataConfig]);

  useEffect(() => changeIsValidConfigOptionState(Boolean(isValidValueOptionConfigSelected)), [
    isValidValueOptionConfigSelected,
  ]);

  const handleConfigUpdate = useCallback(
    (updatedConfigs) => {
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
    },
    [tabId, changeVisualizationConfig, dispatch, setToast, curVisId]
  );

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
    return vis.editorconfig.panelTabs.map((tab: PanelTabType) => {
      const Editor = tab.editor;
      return {
        id: tab.id,
        name: tab.name,
        content: <Editor {...params[tab.mapTo]} tabProps={{ ...tab }} />,
      };
    });
  }, [vis.editorconfig.panelTabs, params]);

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

  const memorizedVisualizationTypes = useMemo(
    () => ENABLED_VIS_TYPES.map((vs: string) => getVisTypeData(vs)),
    []
  );

  const vizSelectableItemRenderer = (option: EuiComboBoxOptionOption<any>) => {
    const { icontype = 'empty', label = '' } = option;

    return (
      <div className="configPanel__vizSelector-item">
        <EuiIcon className="lnsChartSwitch__chartIcon" type={icontype} size="m" />
        &nbsp;&nbsp;
        <span>{label}</span>
      </div>
    );
  };

  const getSelectedVisDById = useCallback(
    (visId) => {
      const selectedOption = find(memorizedVisualizationTypes, (v) => {
        return v.id === visId;
      });
      selectedOption.iconType = selectedOption.icontype;
      return selectedOption;
    },
    [memorizedVisualizationTypes]
  );

  return (
    <div className="cp__rightContainer">
      <div className="cp__rightHeader">
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
      </div>
      <div className="cp__rightSettings">
        <EuiTabbedContent
          className="vis-config-tabs"
          tabs={tabs}
          selectedTab={tabs.find((tab) => tab.id === currTabId) || tabs[0]}
          onTabClick={onTabClick}
        />
      </div>
    </div>
  );
};
