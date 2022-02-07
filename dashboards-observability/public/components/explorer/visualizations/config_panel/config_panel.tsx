/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './config_panel.scss';

import React, { useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { isEmpty } from 'lodash';
import hjson from 'hjson';
import Mustache from 'mustache';
import { batch, useDispatch, useSelector } from 'react-redux';
import { EuiTabbedContent, EuiFlexGroup, EuiFlexItem, EuiButtonIcon } from '@elastic/eui';
import {
  selectVisualizationConfig,
  change as changeVisualizationConfig,
  reset as resetVisualizationConfig,
} from '../../slices/viualization_config_slice';
import { ConfigEditor } from './config_editor/config_editor';
import { getDefaultSpec } from '../visualization_specs/default_spec';
import { VizDataPanel as DefaultVisEditor } from './config_raw_data/config_raw_data';
import { TabContext } from '../../hooks';
import { DefaultEditorControls } from './DefaultEditorControls';
import { PanelItem } from './configPanelItem';

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

export const ConfigPanel = ({ vizVectors, visualizations }: any) => {
  const {
    tabId,
    curVisId,
    dispatch,
    changeVisualizationConfig,
    explorerVisualizations,
    setToast,
  } = useContext(TabContext);
  const { data, vis } = visualizations;
  const { fields } = visualizations?.data?.rawResponse?.metadata || { fields: [] };
  const { rawResponse, customVizConfigs } = data;
  const VisEditor = vis?.editorConfig?.editor || DefaultVisEditor;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hjsonLayoutConfig, setHjsonLayoutConfig] = useState(() => {
    return customVizConfigs?.layout || customVizConfigs?.config
      ? hjson.stringify(
          {
            layout: { ...customVizConfigs?.layout },
            config: { ...customVizConfigs?.config },
          },
          HJSON_STRINGIFY_OPTIONS
        )
      : getDefaultSpec();
  });
  const [axeSelections, setAxeSelections] = useState({
    xaxis: [],
    yaxis: [],
  });

  useEffect(() => {
    const labelAddedFields = explorerVisualizations?.metadata?.fields.map((field) => {
      return {
        ...field,
        label: field.name,
      };
    });
    const needsRotate = curVisId === 'horizontal_bar';
    if (labelAddedFields) {
      if (needsRotate) {
        setAxeSelections((staleState) => {
          return {
            ...staleState,
            xaxis: labelAddedFields.slice(0, labelAddedFields.length - 1),
            yaxis: [labelAddedFields[labelAddedFields.length - 1]],
          };
        });
      } else {
        setAxeSelections((staleState) => {
          return {
            ...staleState,
            xaxis: [labelAddedFields[labelAddedFields.length - 1]],
            yaxis: labelAddedFields.slice(0, labelAddedFields.length - 1),
          };
        });
      }
    }
  }, [curVisId, explorerVisualizations]);

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
          data: {
            ...axeSelections,
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
    axeSelections,
    getParsedLayoutConfig,
    changeVisualizationConfig,
    dispatch,
    setToast,
  ]);

  // const handleDataConfigChange = (hjsonConfig) => {
  //   const payload = {
  //     data: [...hjson.parse(hjsonConfig, HJSON_PARSE_OPTIONS)],
  //   };
  //   handleConfigUpdate(payload);
  // };

  // const getParsedLayoutConfig = (hjsonConfig) => {
  //   const jsonConfig = hjson.parse(hjsonConfig, HJSON_PARSE_OPTIONS);
  //   console.log('jsonConfig: ', jsonConfig);
  //   const output = Mustache.render(CONFIG_LAYOUT_TEMPLATE, jsonConfig);
  //   // const renderedConfig = Mustache.render(CONFIG_TEMPLATE, { ...jsonConfig.config });
  //   console.log('typeof output: ', typeof output);
  //   return {
  //     ...JSON.parse(output),
  //   };
  //   // console.log('JSON.parse(renderedConfig): ', JSON.parse(renderedConfig));
  //   // try {
  //   //   const payload = {
  //   //     ...JSON.parse(output),
  //   //     // ...Object(renderedConfig),
  //   //   };
  //   //   handleConfigUpdate(payload);
  //   // } catch (e) {
  //   //   console.log(e.message);
  //   // }
  // };

  const setXaxisSelections = (selections) => {
    console.log('x selections: ', selections);
    setAxeSelections((staleState) => {
      return {
        ...staleState,
        xaxis: [...selections],
      };
    });
  };

  const setYaxisSelections = (selections) => {
    console.log('y selections: ', selections);
    setAxeSelections((staleState) => {
      return {
        ...staleState,
        yaxis: [...selections],
      };
    });
  };

  const handleLayoutConfigChange = (config) => {
    setHjsonLayoutConfig(config);
  };

  const handlers = {
    setXaxisSelections: () => setXaxisSelections,
    setYaxisSelections: () => setYaxisSelections,
  };

  const dimensions = useMemo(() => {
    return vis.editorConfig.schemas.map((schema, index) => {
      const DimensionComponent = schema.component || PanelItem;
      const params = {
        paddingTitle: schema.name,
        advancedTitle: 'advancedTitle',
        dropdownList: fields,
        onSelectChange: handlers[schema.onChangeHandler](),
        isSingleSelection: schema.isSingleSelection,
        selectedAxis: axeSelections[schema.mapTo],
      };
      return <DimensionComponent key={`viz-series-${index}`} {...params} />;
    });
  }, [vis, handlers, fields, axeSelections, curVisId]);

  const tabs = useMemo(() => {
    return [
      {
        id: 'data-panel',
        name: 'Data',
        content: (
          <VisEditor
            visualizations={visualizations}
            curVisId={curVisId}
            onConfigUpdate={handleConfigUpdate}
            dimensions={dimensions}
          />
        ),
      },
      {
        id: 'style-panel',
        name: 'Layout',
        content: (
          <ConfigEditor
            onConfigEditorChange={handleLayoutConfigChange}
            spec={
              customVizConfigs?.layout || customVizConfigs?.config
                ? hjson.stringify(
                    {
                      layout: { ...customVizConfigs?.layout },
                      config: { ...customVizConfigs?.config },
                    },
                    HJSON_STRINGIFY_OPTIONS
                  )
                : hjsonLayoutConfig
            }
            setToast={setToast}
          />
        ),
      },
    ];
  }, [explorerVisualizations, curVisId, setToast, handleLayoutConfigChange]);

  const onClickCollapse = () => {
    setIsCollapsed((staleState) => !staleState);
  };

  const handleDiscardConfig = () => {
    dispatch(
      resetVisualizationConfig({
        tabId,
      })
    );
  };

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
          <EuiTabbedContent
            id="vis-config-tabs"
            tabs={tabs}
            initialSelectedTab={tabs[0]}
            autoFocus="selected"
          />
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
