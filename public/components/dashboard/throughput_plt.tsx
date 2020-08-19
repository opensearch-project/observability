import { EuiHorizontalRule, EuiPanel, EuiSpacer } from '@elastic/eui';
import React from 'react';
import { PanelTitle } from '../common';
import { dashboardThroughputData, dashboardThroughputLayout } from '../../data/dashboard_data';
import { Plt } from '../common/plt';

export function ThroughputPlt() {
  return (
    <>
      <EuiPanel>
        <PanelTitle title="Throughput over time" />
        <EuiHorizontalRule margin='m' />
        <Plt data={dashboardThroughputData} layout={dashboardThroughputLayout} />
      </EuiPanel>
    </>
  );
}
