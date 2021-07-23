/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import './config_panel.scss';

import React, { useMemo, memo } from 'react';
import { uniqueId} from 'lodash';
import { 
  EuiForm,
  EuiSpacer,
  EuiTabbedContent
} from '@elastic/eui';
import { i18n } from '@osd/i18n';
import { PanelItem } from './configPanelItem'
// import { Visualization } from '../../../types';
// import { LayerPanel } from './layer_panel';
// import { trackUiEvent } from '../../../lens_ui_telemetry';
// import { generateId } from '../../../id_generator';
// import { removeLayer, appendLayer } from './layer_actions';
import { ConfigPanelWrapperProps } from './types';
import { ToolbarButton } from '../shared_components/toolbar_button';

export const ConfigPanelWrapper = memo(function ConfigPanelWrapper(props: ConfigPanelWrapperProps) {
  // const activeVisualization = props.visualizationMap[props.activeVisualizationId || ''];
  // const { visualizationState } = props;

  // return (
  //   activeVisualization &&
  //   visualizationState && <LayerPanels {...props} activeVisualization={activeVisualization} />
  // );
  return <LayerPanels {...props} />;
});

function LayerPanels(
  props: ConfigPanelWrapperProps & {
    activeDatasourceId: string;
    // activeVisualization: Visualization;
  }
) {
  const {
    // activeVisualization,
    // visualizationState,
    dispatch,
    queryResults
    // activeDatasourceId,
    // datasourceMap,
  } = props;
  const setVisualizationState = useMemo(
    () => (newState: unknown) => {
      // dispatch({
      //   type: 'UPDATE_VISUALIZATION_STATE',
      //   visualizationId: activeVisualization.id,
      //   newState,
      //   clearStagedPreview: false,
      // });
    },
    // [dispatch, activeVisualization]
    []
  );
  const updateDatasource = useMemo(
    () => (datasourceId: string, newState: unknown) => {
      dispatch({
        type: 'UPDATE_DATASOURCE_STATE',
        updater: () => newState,
        datasourceId,
        clearStagedPreview: false,
      });
    },
    [dispatch]
  );
  const updateAll = useMemo(
    () => (datasourceId: string, newDatasourceState: unknown, newVisualizationState: unknown) => {
      dispatch({
        type: 'UPDATE_STATE',
        subType: 'UPDATE_ALL_STATES',
        updater: (prevState) => {
          return {
            ...prevState,
            datasourceStates: {
              ...prevState.datasourceStates,
              [datasourceId]: {
                state: newDatasourceState,
                isLoading: false,
              },
            },
            visualization: {
              ...prevState.visualization,
              state: newVisualizationState,
            },
            stagedPreview: undefined,
          };
        },
      });
    },
    [dispatch]
  );

  const panelItems = [
    {
      paddingTitle: 'X-axis',
      advancedTitle: 'advanced',
      dropdownList: queryResults && queryResults.schema ? queryResults.schema : []
    },
    {
      paddingTitle: 'Y-axis',
      advancedTitle: 'advanced',
      dropdownList: []
    }
  ];

  const ConfigPanelItems = (props) => {
    const {
      panelItems
    } = props;
    return (
      <EuiForm className="lnsConfigPanel">
        { panelItems.map((item) => {
          return (
            <>
              <PanelItem
                paddingTitle={ item.paddingTitle }
                advancedTitle={ item.advancedTitle }
                dropdownList={ item.dropdownList }
              >
                here goes advanced setting
              </PanelItem>
              <EuiSpacer size="s" />
            </>
          );
        }) }
      </EuiForm>
    );
  }

  const tabs = [
    {
      id: 'setting-panel',
      name: 'Settings',
      content: <ConfigPanelItems 
                panelItems={ panelItems }
              />
    }
  ];

  return (
    <EuiTabbedContent
      id="vis-config-tabs"
      tabs={ tabs }
      initialSelectedTab={ tabs[1] }
      autoFocus="selected"
    />
  );
}
