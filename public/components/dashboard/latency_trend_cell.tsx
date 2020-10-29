import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiPopover, EuiText } from '@elastic/eui';
import _ from 'lodash';
import React, { useState } from 'react';
import { Plt } from '../common/plt';

function LinePlt(props: { data: Plotly.Data[] }) {
  const layout = {
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
    xaxis: {
      // range: [props.min, props.max],
      fixedrange: true,
      showgrid: false,
      visible: false,
    },
    yaxis: {
      // range: [-0.45, 0.45],
      fixedrange: true,
      showgrid: false,
      visible: false,
    },
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0,
    },
    height: 15,
    width: 60,
  };
  return <Plt data={props.data} layout={layout} />;
}

function LatencyPlt(props: {
  data: Plotly.Data[];
  closePopover: () => void;
  traceGroupName: string;
}) {
  const layout = {
    xaxis: {
      showgrid: false,
      tickmode: 'auto',
      color: '#899195',
    },
    yaxis: {
      title: {
        text: 'Hourly latency (ms)',
        font: {
          size: 12,
        },
      },
      // showline: true,
      gridcolor: '#d9d9d9',
      color: '#899195',
    },
    annotations: [
      {
        x: props.data[0].x[props.data[0].x.length - 1],
        y: 0,
        showarrow: true,
        arrowhead: 0,
        xref: 'x',
        yref: 'y',
        text: `Now: ${_.round(props.data[0].y[props.data[0].y.length - 1] as number, 2)}ms`,
        ax: 0,
        ay: -140,
        borderpad: 10,
        arrowwidth: 0.7,
      },
    ],
    margin: {
      l: 50,
      r: 30,
      b: 50,
      t: 30,
      pad: 0,
    },
    height: 200,
    width: 400,
  } as Partial<Plotly.Layout>;
  return (
    <>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText size="s">24-hour latency trend</EuiText>
          <EuiText size="s">{props.traceGroupName}</EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonIcon
            aria-label="Close popover"
            iconType="cross"
            color="text"
            onClick={() => props.closePopover()}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <Plt data={props.data} layout={layout} />
    </>
  );
}

export function LatencyTrendCell({
  item,
  traceGroupName,
}: {
  item: {
    popoverData: Plotly.Data[];
    trendData: Plotly.Data[];
  };
  traceGroupName: string;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <EuiFlexGroup gutterSize="s">
      <EuiFlexItem />
      <EuiFlexItem grow={false}>
        <LinePlt data={item.trendData} />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiPopover
          ownFocus
          anchorPosition="downCenter"
          button={
            <EuiButtonIcon
              aria-label="Open popover"
              onClick={() => setIsPopoverOpen(true)}
              iconType="magnifyWithPlus"
              size="s"
            />
          }
          isOpen={isPopoverOpen}
          closePopover={() => setIsPopoverOpen(false)}
        >
          <LatencyPlt
            data={item.popoverData}
            closePopover={() => setIsPopoverOpen(false)}
            traceGroupName={traceGroupName}
          />
        </EuiPopover>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
