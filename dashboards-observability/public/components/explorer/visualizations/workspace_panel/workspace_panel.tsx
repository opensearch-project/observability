/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useContext, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { find } from 'lodash';
import { WorkspacePanelWrapper } from './workspace_panel_wrapper';
import { TabContext } from '../../hooks';
import {
  selectVisualizationConfig,
  change as changeVisualizationConfig,
} from '../../slices/viualization_config_slice';
import { getVisType } from '../../../visualizations/charts/vis_types';
import { Visualization } from '../../../visualizations/visualization';

interface IWorkSpacePanel {
  curVisId: string;
  setCurVisId: any;
  visualizations: any;
}

const ENABLED_VIS_TYPES = ['bar', 'horizontal_bar', 'line', 'pie', 'histogram'];

export function WorkspacePanel({ curVisId, setCurVisId, visualizations }: IWorkSpacePanel) {
  const { tabId, dispatch } = useContext(TabContext);
  const [savePanelName, setSavePanelName] = useState<string>('');
  const customVizConfigs = useSelector(selectVisualizationConfig)[tabId];

  const handleDispatch = useCallback(
    (evtData) => {
      dispatch(
        changeVisualizationConfig({
          tabId,
          data: {
            ...evtData,
          },
        })
      );
    },
    [dispatch, tabId]
  );

  const memorizedVisualizationTypes = useMemo(() => {
    return ENABLED_VIS_TYPES.map((vis: any) => {
      const visDefinition = getVisType(vis);
      const subTypes = visDefinition.subTypes;
      return {
        ...subTypes[vis],
        chart: visDefinition.component,
      };
    });
  }, []);

  const getVisDefById = useCallback(
    (visId) => {
      return find(memorizedVisualizationTypes, (v) => {
        return v.id === visId;
      });
    },
    [memorizedVisualizationTypes]
  );

  const VisualizationPanel = useMemo(() => {
    const visDef = getVisDefById(curVisId);
    visDef.dispatch = handleDispatch;
    return <Visualization vis={visDef} visData={visualizations} />;
  }, [curVisId, visualizations, handleDispatch, getVisDefById]);

  return (
    <WorkspacePanelWrapper
      title={''}
      emptyExpression={true}
      setVis={setCurVisId}
      vis={getVisDefById(curVisId)}
      visualizationTypes={memorizedVisualizationTypes}
      handleSavePanelNameChange={(name: string) => {
        setSavePanelName(name);
      }}
      savePanelName={savePanelName}
    >
      {VisualizationPanel}
    </WorkspacePanelWrapper>
  );
}
