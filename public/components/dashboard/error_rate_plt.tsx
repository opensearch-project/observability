import { EuiHorizontalRule, EuiPanel, EuiSpacer } from '@elastic/eui';
import React from 'react';
import { PanelTitle } from '../common/panel_title';

export function ErrorRatePlt() {
  return (
    <>
      <EuiPanel>
        <PanelTitle title="Error rate over time" />
        <EuiSpacer size="m" />
        <EuiHorizontalRule />
        <div style={{ width: 400, height: 200 }} />
      </EuiPanel>
    </>
  );
}
