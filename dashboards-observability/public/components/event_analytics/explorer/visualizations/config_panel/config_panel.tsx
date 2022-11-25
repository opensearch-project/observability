/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiIcon,
  EuiTabbedContent,
  EuiTabbedContentTab,
} from '@elastic/eui';
import hjson from 'hjson';
import { find } from 'lodash';
import Mustache from 'mustache';
import { ENABLED_VIS_TYPES } from '../../../../../../common/constants/shared';
import { getVisTypeData } from '../../../../visualizations/charts/helpers/viz_types';
import { TabContext } from '../../../hooks';
import { reset as resetVisualizationConfig } from '../../../redux/slices/viualization_config_slice';
import { getDefaultSpec } from '../visualization_specs/default_spec';
import './config_panel.scss';

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

export const ConfigPanel = ({ visualizations, setCurVisId, callback }: any) => {
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

  const handleConfigUpdate = useCallback(
    (updatedConfigs) => {
      try {
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
          options={memorizedVisualizationTypes}
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
