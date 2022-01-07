/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useContext, useState } from 'react';
import hjson from 'hjson';
import { EuiFlexGroup, EuiFlexItem, EuiButton } from '@elastic/eui';
import { PlotlyVizEditor } from '../../shared_components/plotly_viz_editor';
import { TabContext } from '../../../hooks';

export const ConfigEditor = ({ spec, setVizConfigObj }: any) => {
  const { tabId, dispatch, changeVisualizationConfig, setToast } = useContext(TabContext);
  const [hjsonConfig, setHjsonConfig] = useState(spec);

  return (
    <>
      <EuiFlexGroup
        className="visEditorSidebar"
        direction="column"
        justifyContent="spaceBetween"
        gutterSize="none"
        responsive={false}
      >
        <EuiFlexItem className="visEditorSidebar__formWrapper">
          <PlotlyVizEditor spec={hjsonConfig} setVizConfig={setHjsonConfig} setToast={setToast} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <div className="visEditorSidebar__controls">
            <EuiFlexGroup justifyContent="spaceBetween" gutterSize="none" responsive={false}>
              <EuiFlexItem grow={false}>
                <EuiButton
                  data-test-subj="visualizeEditorRenderButton"
                  disabled={false}
                  fill
                  iconType="play"
                  onClick={() => {
                    try {
                      dispatch(
                        changeVisualizationConfig({
                          tabId,
                          data: {
                            ...hjson.parse(hjsonConfig),
                          },
                        })
                      );
                    } catch (e) {
                      setToast(
                        `Invalid visualization configurations. error: ${e.message}`,
                        'danger'
                      );
                    }
                  }}
                  size="s"
                >
                  Update
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
