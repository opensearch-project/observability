import { EuiHorizontalRule, EuiPanel } from '@elastic/eui';
import React from 'react';
import { PanelTitle } from '../common';
import { Plt } from '../common/plt';
import { dashboardErrorRateData, dashboardErrorRateLayout } from '../../data/dashboard_data';

export function ErrorRatePlt() {
  return (
    <>
      <EuiPanel>
        <PanelTitle title="Error rate over time" />
        <EuiHorizontalRule margin="m" />
        <Plt data={dashboardErrorRateData} layout={dashboardErrorRateLayout} />
      </EuiPanel>
    </>
  );
}
