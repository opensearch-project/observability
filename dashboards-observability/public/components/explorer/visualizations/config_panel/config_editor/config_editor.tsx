/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiButton } from '@elastic/eui';
import { PlotlyVizEditor } from '../../shared_components/plotly_viz_editor';

export const ConfigEditor = ({ spec, onConfigEditorChange, setToast }: any) => {
  return (
    <div className="visEditorSidebar__config">
      <PlotlyVizEditor spec={spec} onVizConfigChange={onConfigEditorChange} setToast={setToast} />
    </div>
  );
};
