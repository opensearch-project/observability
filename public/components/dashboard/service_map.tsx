import {
  EuiButtonGroup,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPanel,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import React, { useState } from 'react';
import { PanelTitle } from '../common/panel_title';

export function ServiceMap() {
  const idPrefix = 'service-map-button-id-';
  const toggleButtons = [
    {
      id: `${idPrefix}0`,
      label: 'Latency',
    },
    {
      id: `${idPrefix}1`,
      label: 'Error rate',
    },
    {
      id: `${idPrefix}2`,
      label: 'Throughput',
    },
  ];

  const [toggleIdSelected, setToggleIdSelected] = useState<string>(`${idPrefix}0`);

  return (
    <>
      <EuiPanel>
        <PanelTitle title="Service map" />
        <EuiSpacer size="m" />
        <EuiButtonGroup
          options={toggleButtons}
          idSelected={toggleIdSelected}
          onChange={(id) => setToggleIdSelected(id)}
          buttonSize="s"
          color="text"
        />
        <EuiHorizontalRule margin="m" />
        <EuiFlexGroup alignItems="center" gutterSize="s">
          <EuiFlexItem grow={false}>
            <EuiText>Zoom in to</EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFieldSearch placeholder="Service name" value={''} onChange={() => {}} />
          </EuiFlexItem>
        </EuiFlexGroup>
        <div style={{ width: 650, height: 490 }} />
      </EuiPanel>
    </>
  );
}
