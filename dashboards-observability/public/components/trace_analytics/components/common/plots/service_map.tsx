/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

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
import React, { useEffect, useState } from 'react';
// @ts-ignore
import Graph from 'react-graph-vis';
import { FilterType } from '../filters/filters';
import {
  calculateTicks,
  getServiceMapGraph,
  NoMatchMessage,
  PanelTitle,
} from '../helper_functions';
import { ServiceMapScale } from './service_map_scale';

export interface ServiceObject {
  [key: string]: {
    serviceName: string;
    id: number;
    traceGroups: Array<{ traceGroup: string; targetResource: string[] }>;
    targetServices: string[];
    destServices: string[];
    latency?: number;
    error_rate?: number;
    throughput?: number;
    throughputPerMinute?: number;
    relatedServices?: string[]; // services appear in the same traces this service appears
  };
}

export function ServiceMap({
  serviceMap,
  idSelected,
  setIdSelected,
  addFilter,
  currService,
  page,
}: {
  serviceMap: ServiceObject;
  idSelected: 'latency' | 'error_rate' | 'throughput';
  setIdSelected: (newId: 'latency' | 'error_rate' | 'throughput') => void;
  addFilter?: (filter: FilterType) => void;
  currService?: string;
  page: 'app' | 'appCreate' | 'dashboard' | 'traces' | 'services' | 'serviceView' | 'detailFlyout';
}) {
  const [invalid, setInvalid] = useState(false);
  const [network, setNetwork] = useState(null);
  const [ticks, setTicks] = useState<number[]>([]);
  const [items, setItems] = useState<any>({});
  const [query, setQuery] = useState('');
  const toggleButtons = [
    {
      id: 'latency',
      label: 'Latency',
    },
    {
      id: 'error_rate',
      label: 'Error rate',
    },
    {
      id: 'throughput',
      label: 'Throughput',
    },
  ];

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      arrows: {
        to: {
          enabled: false,
        },
      },
      physics: false,
    },
    nodes: {
      shape: 'dot',
      color: '#adadad',
      borderWidth: 0,
      font: {
        size: 17,
        color: '#387ab9',
      },
    },
    interaction: {
      hover: true,
      tooltipDelay: 30,
      selectable: true,
    },
    manipulation: {
      enabled: false,
    },
    height: '434px',
    width: '100%',
    autoResize: true,
  };

  const events = {
    select: (event: any) => {
      const { nodes, edges } = event;
      if (!addFilter || !nodes) return;
      const serviceName = items?.graph.nodes.find((node: any) => node.id === nodes[0])?.label;
      if (serviceName) {
        addFilter({
          field: 'serviceName',
          operator: 'is',
          value: serviceName,
          inverted: false,
          disabled: false,
        });
        if (page !== 'appCreate') {
          window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        }
      }
    },
    hoverNode: (event: any) => {},
  };

  const onFocus = (service: string, networkInstance?: any) => {
    if (service.length === 0) {
      setInvalid(false);
    } else if (serviceMap[service]) {
      if (!networkInstance) networkInstance = network;
      networkInstance.focus(serviceMap[service].id, { animation: true });
      setInvalid(false);
    } else {
      setInvalid(true);
    }
  };

  useEffect(() => {
    if (Object.keys(serviceMap).length === 0) return;
    const values = Object.keys(serviceMap)
      .filter((service) => serviceMap[service][idSelected])
      .map((service) => serviceMap[service][idSelected]!);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const calculatedTicks = calculateTicks(min, max);
    setTicks(calculatedTicks);
    setItems(
      getServiceMapGraph(
        serviceMap,
        idSelected,
        calculatedTicks,
        currService,
        serviceMap[currService!]?.relatedServices
      )
    );
  }, [serviceMap, idSelected]);

  return (
    <>
      <EuiPanel>
        {page === 'app' ? (
          <PanelTitle title="Application Composition Map" />
        ) : (
          <PanelTitle title="Service map" />
        )}
        <EuiSpacer size="m" />
        <EuiButtonGroup
          options={toggleButtons}
          idSelected={idSelected}
          onChange={(id) => setIdSelected(id as 'latency' | 'error_rate' | 'throughput')}
          buttonSize="s"
          color="text"
        />
        <EuiHorizontalRule margin="m" />
        <EuiFlexGroup alignItems="center" gutterSize="s">
          <EuiFlexItem grow={false}>
            <EuiText>Focus on</EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFieldSearch
              placeholder="Service name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onSearch={(service) => onFocus(service)}
              isInvalid={query.length > 0 && invalid}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />

        {Object.keys(serviceMap).length > 0 ? (
          <EuiFlexGroup gutterSize="none" responsive={false}>
            <EuiFlexItem>
              {items?.graph && (
                <Graph
                  graph={items.graph}
                  options={options}
                  events={events}
                  getNetwork={(networkInstance: any) => {
                    setNetwork(networkInstance);
                    if (currService) onFocus(currService, networkInstance);
                  }}
                />
              )}
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <ServiceMapScale idSelected={idSelected} serviceMap={serviceMap} ticks={ticks} />
            </EuiFlexItem>
          </EuiFlexGroup>
        ) : (
          <div style={{ minHeight: 434 }}>
            <NoMatchMessage size="s" />
          </div>
        )}
      </EuiPanel>
    </>
  );
}
