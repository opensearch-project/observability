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
import Graph from "react-graph-vis";
import { PanelTitle } from '../common/helper_functions';
import { serviceMapData } from '../../data/service_map_data';

const renderServiceMap = () => {
  return (
    <div>
    <Graph
      graph={serviceMapData.graph}
      options={serviceMapData.options}
      events={serviceMapData.events}
      getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
      />
    </div>
  );
}

const renderServiceMapScale = (id) => {

}


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
            <EuiFieldSearch placeholder="Service name" value={''} onChange={() => { }} />
          </EuiFlexItem>
        </EuiFlexGroup>
        {renderServiceMap()}
      </EuiPanel>
    </>
  );
}
