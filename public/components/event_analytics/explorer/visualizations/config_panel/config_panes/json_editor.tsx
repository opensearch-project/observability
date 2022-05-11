/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PlotlyVizEditor } from '../../shared_components/plotly_viz_editor';

export const ConfigEditor = ({
  spec,
  onConfigEditorChange,
  setToast,
  visualizations,
  ...rest
}: any) => {
  return (
    <div className="visEditorSidebar__config">
      <PlotlyVizEditor
        spec={spec}
        onVizConfigChange={onConfigEditorChange}
        setToast={setToast}
        visualizations={visualizations}
        {...rest}
      />
    </div>
  );
};
