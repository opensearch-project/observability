/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiButton } from '@elastic/eui';
import { PlotlyVizEditor } from '../../shared_components/plotly_viz_editor';

export const ConfigEditor = ({ spec, onConfigUpdate, setToast }: any) => {
  const [hjsonConfig, setHjsonConfig] = useState(spec);

  useEffect(() => {
    setHjsonConfig(spec);
  }, [spec]);

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
          <PlotlyVizEditor
            spec={hjsonConfig}
            onVizConfigChange={setHjsonConfig}
            setToast={setToast}
          />
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
                    onConfigUpdate(hjsonConfig);
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
