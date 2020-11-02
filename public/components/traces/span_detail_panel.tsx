import {
  EuiButtonGroup,
  EuiHorizontalRule,
  EuiInMemoryTable,
  EuiPanel,
  EuiTableFieldDataColumnType,
} from '@elastic/eui';
import moment from 'moment';
import React, { useState } from 'react';
import { DATE_FORMAT } from '../../../common';
import { PanelTitle, renderBenchmark } from '../common';
import { Plt } from '../common/plots/plt';

const getSpanDetailLayout = (plotTraces: Plotly.Data[], maxX: number): Partial<Plotly.Layout> => {
  // get unique labels from traces
  const yLabels = plotTraces
    .map((d) => d.y[0])
    .filter((label, i, self) => self.indexOf(label) === i);
  // remove uuid when displaying y-ticks
  const yTexts = yLabels.map((label) => label.substring(0, label.length - 36));

  return {
    height: 25 * plotTraces.length + 60,
    width: 800,
    margin: {
      l: 260,
      r: 5,
      b: 30,
      t: 30, // 10
    },
    xaxis: {
      ticksuffix: ' ms',
      side: 'top',
      color: '#91989c',
      showline: true,
      range: [0, maxX * 1.2],
    },
    yaxis: {
      showgrid: false,
      tickvals: yLabels,
      ticktext: yTexts,
    },
  };
};

// this is for the benchmark table, which is not ready yet
const columns = [
  {
    field: 'service_name',
    name: 'Service name',
    align: 'left',
    sortable: true,
  },
  {
    field: 'span_id',
    name: 'Span ID',
    align: 'left',
    sortable: true,
  },
  {
    field: 'latency',
    name: 'Latency',
    align: 'left',
    sortable: true,
    dataType: 'number',
  },
  {
    field: 'error',
    name: 'Error',
    align: 'left',
    sortable: true,
  },
  {
    field: 'start_time',
    name: 'Start time',
    align: 'left',
    sortable: true,
    render: (item) => moment(item).format(DATE_FORMAT),
  },
  {
    field: 'end_time',
    name: 'End time',
    align: 'left',
    sortable: true,
    render: (item) => moment(item).format(DATE_FORMAT),
  },
] as Array<EuiTableFieldDataColumnType<any>>;

export function SpanDetailPanel(props) {
  return (
    <>
      <EuiPanel>
        <PanelTitle title="Span detail" />
        <EuiHorizontalRule margin="m" />
        <div style={{ overflowY: 'auto', maxHeight: 500 }}>
          <Plt data={props.data.gantt} layout={getSpanDetailLayout(props.data.gantt, props.data.ganttMaxX)} />
        </div>
      </EuiPanel>
    </>
  );
}
