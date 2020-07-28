import React, { useState } from 'react'
import { EuiPanel } from '@elastic/eui'
import { PanelTitle } from '../common/panel_title'
import { EuiButtonGroup } from '@elastic/eui'
import { EuiSpacer } from '@elastic/eui';
import { EuiHorizontalRule } from '@elastic/eui';
import { EuiFlexGroup } from '@elastic/eui';
import { EuiFlexItem } from '@elastic/eui';
import { EuiText } from '@elastic/eui';
import { EuiFieldSearch } from '@elastic/eui';

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
        <PanelTitle title='Service map' />
        <EuiSpacer size='m' />
        <EuiButtonGroup
          options={toggleButtons}
          idSelected={toggleIdSelected}
          onChange={id => setToggleIdSelected(id)}
          buttonSize='s'
          color='text'
        />
        <EuiHorizontalRule margin='m' />
        <EuiFlexGroup alignItems='center' gutterSize='s'>
          <EuiFlexItem grow={false}>
            <EuiText>Zoom in to</EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFieldSearch
              placeholder='Service name'
              value={''}
              onChange={() => { }}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <div style={{ width: 650, height: 490 }}></div>
      </EuiPanel>
    </>
  )
}
