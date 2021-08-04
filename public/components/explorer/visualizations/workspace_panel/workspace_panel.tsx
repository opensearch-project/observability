/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useState, useEffect, useMemo, useContext, useCallback } from 'react';
import { uniqueId } from 'lodash';
import classNames from 'classnames';
import { FormattedMessage } from '@osd/i18n/react';
import { Ast } from '@osd/interpreter/common';
import { i18n } from '@osd/i18n';
import { EuiFlexGroup, EuiFlexItem, EuiIcon, EuiText, EuiButtonEmpty, EuiLink } from '@elastic/eui';
// import { CoreStart, CoreSetup } from 'kibana/public';
import { ExecutionContextSearch } from 'src/plugins/expressions';
import {
  ExpressionRendererEvent,
  ExpressionRenderError,
  ReactExpressionRendererType,
} from '../../../../../../../src/plugins/expressions/public';
// import { Action } from '../state_management';
// import {
//   Datasource,
//   Visualization,
//   FramePublicAPI,
//   isLensBrushEvent,
//   isLensFilterEvent,
// } from '../../../types';
import { DragDrop, DragContext } from '../drag_drop';
// import { getSuggestions, switchToSuggestion } from '../suggestion_helpers';
// import { buildExpression } from '../expression_helpers';
import { debouncedComponent } from '../../../common/debounced_component';
// import { trackUiEvent } from '../../../lens_ui_telemetry';
import {
  UiActionsStart,
  VisualizeFieldContext,
} from '../../../../../../../src/plugins/ui_actions/public';
// import { VIS_EVENT_TO_TRIGGER } from '../../../../../../../src/plugins/visualizations/public';
import {
  DataPublicPluginStart,
  TimefilterContract,
} from '../../../../../../../src/plugins/data/public';
import { WorkspacePanelWrapper } from './workspace_panel_wrapper';
// import { DropIllustration } from '../../../assets/drop_illustration';
// import { getOriginalRequestErrorMessage } from '../../error_helper';
import { Bar } from '../../../visualizations/charts/bar';
import { Line } from '../../../visualizations/charts/line';
import { LensIconChartBar } from '../assets/chart_bar';
import { LensIconChartLine } from '../assets/chart_line';
// import { vis } from 'src/plugins/vis_type_vislib/public/components/options/metrics_axes/mocks';

const visualizationTypes = [
  {
    id: 'bar',
    label: 'Bar',
    fullLabel: 'Bar',
    icon: LensIconChartBar,
    visualizationId: uniqueId('vis-bar-'),
    selection: {
      dataLoss: 'nothing'
    },
    chart: Bar
  },
  {
    id: 'line',
    label: 'Line',
    fullLabel: 'Line',
    icon: LensIconChartLine,
    visualizationId: uniqueId('vis-line-'), 
    selection: {
      dataLoss: 'nothing'
    },
    chart: Line
  }
];

export interface WorkspacePanelProps {
  activeVisualizationId: string | null;
  // visualizationMap: Record<string, Visualization>;
  visualizationState: unknown;
  activeDatasourceId: string | null;
  // datasourceMap: Record<string, Datasource>;
  datasourceStates: Record<
    string,
    {
      state: unknown;
      isLoading: boolean;
    }
  >;
  // framePublicAPI: FramePublicAPI;
  // dispatch: (action: Action) => void;
  ExpressionRenderer: ReactExpressionRendererType;
  // core: CoreStart | CoreSetup;
  plugins: { uiActions?: UiActionsStart; data: DataPublicPluginStart };
  title?: string;
  visualizeTriggerFieldContext?: VisualizeFieldContext;
}

interface WorkspaceState {
  expressionBuildError: string | undefined;
  expandError: boolean;
}

// Exported for testing purposes only.
export function WorkspacePanel({
  // activeDatasourceId,
  // activeVisualizationId,
  // visualizationMap,
  // visualizationState,
  // datasourceMap,
  // datasourceStates,
  // framePublicAPI,
  // dispatch,
  // core,
  // plugins,
  ExpressionRenderer: ExpressionRendererComponent,
  title,
  // visualizeTriggerFieldContext,
}: WorkspacePanelProps) {
  const dragDropContext = useContext(DragContext);

  const [vis, setVis] = useState(visualizationTypes[0]);

  console.log('outer vis: ', vis);

  function onDrop() {
    // if (suggestionForDraggedField) {
    //   trackUiEvent('drop_onto_workspace');
    //   trackUiEvent(expression ? 'drop_non_empty' : 'drop_empty');
    //   switchToSuggestion(dispatch, suggestionForDraggedField, 'SWITCH_VISUALIZATION');
    // }
  }

  function renderEmptyWorkspace() {
    return (
      <EuiText
        className={classNames('lnsWorkspacePanel__emptyContent')}
        textAlign="center"
        color="subdued"
        data-test-subj="empty-workspace"
        size="s"
      >
        <h2>
          <strong>
            {true
              ? i18n.translate('xpack.lens.editorFrame.emptyWorkspace', {
                  // defaultMessage: 'Drop some fields here to start',
                  defaultMessage: 'Use PPL stats commandin query to render visualization',
                })
              : i18n.translate('xpack.lens.editorFrame.emptyWorkspaceSimple', {
                  defaultMessage: 'Drop field here',
                })}
          </strong>
        </h2>
        {/* <DropIllustration aria-hidden={true} className="lnsWorkspacePanel__dropIllustration" /> */}
        {true === null && (
          <>
            <p>
              {i18n.translate('xpack.lens.editorFrame.emptyWorkspaceHeading', {
                defaultMessage: 'Lens is a new tool for creating visualization',
              })}
            </p>
            <p>
              <small>
                <EuiLink
                  href="https://www.elastic.co/products/kibana/feedback"
                  target="_blank"
                  external
                >
                  {i18n.translate('xpack.lens.editorFrame.goToForums', {
                    defaultMessage: 'Make requests and give feedback',
                  })}
                </EuiLink>
              </small>
            </p>
          </>
        )}
      </EuiText>
    );
  }

  function renderVisualization() {
    // we don't want to render the emptyWorkspace on visualizing field from Discover
    // as it is specific for the drag and drop functionality and can confuse the users
    // return renderEmptyWorkspace();
    // if (expression === null && !visualizeTriggerFieldContext) {
    //   return renderEmptyWorkspace();
    // }
    // return (
    //   <VisualizationWrapper
    //     expression={null}
    //     framePublicAPI={framePublicAPI}
    //     timefilter={plugins.data.query.timefilter.timefilter}
    //     onEvent={onEvent}
    //     setLocalState={setLocalState}
    //     localState={localState}
    //     ExpressionRendererComponent={ExpressionRendererComponent}
    //   />
    // );
    // console.log('vis: ', vis);
    // return <Line />;
    return vis.chart();
  }

  return (
    <WorkspacePanelWrapper
      title={title}
      // framePublicAPI={framePublicAPI}
      // dispatch={dispatch}
      // dispatch={() => {}}
      emptyExpression={true}
      setVis={ setVis }
      vis={ vis }
      visualizationTypes={ visualizationTypes }
      // visualizationState={visualizationState}
      // visualizationId={activeVisualizationId}
      // datasourceStates={datasourceStates}
      // datasourceMap={datasourceMap}
      // visualizationMap={visualizationMap}
    >
      <DragDrop
        className="lnsWorkspacePanel__dragDrop"
        data-test-subj="lnsWorkspace"
        draggable={false}
        droppable={true}
        onDrop={onDrop}
      >
        <div>
          {renderVisualization()}
          {/* {Boolean(suggestionForDraggedField) && expression !== null && renderEmptyWorkspace()} */}
          {/* {renderEmptyWorkspace()} */}
        </div>
      </DragDrop>
    </WorkspacePanelWrapper>
  );
}

export const InnerVisualizationWrapper = ({
  expression,
  framePublicAPI,
  timefilter,
  onEvent,
  setLocalState,
  localState,
  ExpressionRendererComponent,
}: {
  expression: Ast | null | undefined;
  // framePublicAPI: FramePublicAPI;
  timefilter: TimefilterContract;
  onEvent: (event: ExpressionRendererEvent) => void;
  setLocalState: (dispatch: (prevState: WorkspaceState) => WorkspaceState) => void;
  localState: WorkspaceState;
  ExpressionRendererComponent: ReactExpressionRendererType;
}) => {
  const autoRefreshFetch$ = useMemo(() => timefilter.getAutoRefreshFetch$(), [timefilter]);

  const context: ExecutionContextSearch = useMemo(
    () => ({
      query: framePublicAPI.query,
      timeRange: {
        from: framePublicAPI.dateRange.fromDate,
        to: framePublicAPI.dateRange.toDate,
      },
      filters: framePublicAPI.filters,
    }),
    [
      framePublicAPI.query,
      framePublicAPI.dateRange.fromDate,
      framePublicAPI.dateRange.toDate,
      framePublicAPI.filters,
    ]
  );

  if (localState.expressionBuildError) {
    return (
      <EuiFlexGroup style={{ maxWidth: '100%' }} direction="column" alignItems="center">
        <EuiFlexItem>
          <EuiIcon type="alert" size="xl" color="danger" />
        </EuiFlexItem>
        <EuiFlexItem data-test-subj="expression-failure">
          <FormattedMessage
            id="xpack.lens.editorFrame.expressionFailure"
            defaultMessage="An error occurred in the expression"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>{localState.expressionBuildError}</EuiFlexItem>
      </EuiFlexGroup>
    );
  }
  return (
    <div className="lnsExpressionRenderer">
      <ExpressionRendererComponent
        className="lnsExpressionRenderer__component"
        padding="m"
        expression={expression!}
        searchContext={context}
        reload$={autoRefreshFetch$}
        onEvent={onEvent}
        renderError={(errorMessage?: string | null, error?: ExpressionRenderError | null) => {
          // const visibleErrorMessage = getOriginalRequestErrorMessage(error) || errorMessage;
          return (
            <EuiFlexGroup style={{ maxWidth: '100%' }} direction="column" alignItems="center">
              <EuiFlexItem>
                <EuiIcon type="alert" size="xl" color="danger" />
              </EuiFlexItem>
              <EuiFlexItem data-test-subj="expression-failure">
                <FormattedMessage
                  id="xpack.lens.editorFrame.dataFailure"
                  defaultMessage="An error occurred when loading data."
                />
              </EuiFlexItem>
              {false ? (
                <EuiFlexItem className="eui-textBreakAll" grow={false}>
                  <EuiButtonEmpty
                    onClick={() => {
                      setLocalState((prevState: WorkspaceState) => ({
                        ...prevState,
                        expandError: !prevState.expandError,
                      }));
                    }}
                  >
                    {i18n.translate('xpack.lens.editorFrame.expandRenderingErrorButton', {
                      defaultMessage: 'Show details of error',
                    })}
                  </EuiButtonEmpty>

                  {/* {localState.expandError ? visibleErrorMessage : null} */}
                </EuiFlexItem>
              ) : null}
            </EuiFlexGroup>
          );
        }}
      />
    </div>
  );
};

export const VisualizationWrapper = debouncedComponent(InnerVisualizationWrapper);
