import { EuiHorizontalRule, EuiPanel, EuiSpacer, EuiFlexItem, EuiFlexGroup, EuiText } from '@elastic/eui';
import React, { useState } from 'react';
import { PanelTitle, renderBenchmark } from '../common';
import { Plt } from '../common/plt';
import { EuiButtonGroup } from '@elastic/eui';
import { EuiInMemoryTable } from '@elastic/eui';

const getSpanDetailLayout = (plotTraces) => {
  // get unique labels from traces
  const yLabels = plotTraces.map(d => d.y[0]).filter((label, i, self) => self.indexOf(label) === i);
  // remove uuid when displaying y-ticks
  const yTexts = yLabels.map(label => label.substring(0, label.length - 36))

  return {
    height: 25 * plotTraces.length + 60,
    width: 800,
    margin: {
      l: 200,
      r: 5,
      b: 30,
      t: 30,  // 10
    },
    xaxis: {
      autorange: true,
      ticksuffix: " ms",
      side: 'top',
      color: '#91989c',
      showline: true,
    },
    yaxis: {
      showgrid: false,
      tickvals: yLabels,
      ticktext: yTexts,
    }
  }
}

const columns = [
  {
    field: 'service_name',
    name: 'Service name',
    align: 'left',
    sortable: true,
    // render: (item) => item ? (
    //   <EuiLink href="#">
    //     {truncateText(item)}
    //   </EuiLink>
    // ) : ('-'),
  },
  {
    field: 'span_id',
    name: 'Span ID',
    align: 'left',
    sortable: false,
    // render: (item) => {
    //   return item ? (
    //     // expand ranges by 4 to accomondate scale
    //     <BoxPlt plotParams={{ min: -2, max: 82, left: item[0], mid: item[1], right: item[2] }} />
    //   ) : ('-');
    // },
  },
  {
    field: 'latency',
    name: 'Latency',
    align: 'left',
    sortable: true,
    dataType: 'number',
    // render: (item) => item === 0 || item ? _.round(item, 2) : ('-'),
  },
  {
    field: 'vs_benchmark',
    name: 'vs benchmark',
    align: 'left',
    sortable: true,
    // render: (item) => item === 0 || item ? renderBenchmark(item) : ('-'),
  },
  {
    field: 'error',
    name: 'Error',
    align: 'left',
    sortable: false,
    // render: (item) => item ? <LatencyTrendCell item={item} /> : ('-'),
  },
  {
    field: 'start_time',
    name: 'Start time',
    align: 'left',
    sortable: true,
    // render: (item) => item === 0 || item ? <EuiText size="s">{`${_.round(item, 2)}%`}</EuiText> : ('-'),
  },
  {
    field: 'end_time',
    name: 'End time',
    align: 'left',
    sortable: true,
    // render: (item) => (
    //   <EuiLink href="#traces">
    //     <EuiI18nNumber value={item} />
    //   </EuiLink>
    // ),
  },
];

export function SpanDetailPanel(props) {
  const options = [
    {
      id: 'timeline',
      label: 'Timeline',
    },
    {
      id: 'compare_to_benchmark',
      label: 'Compare to benchmark',
    },
  ];
  const [selectedId, setSelectedId] = useState<string>('timeline');

  return (
    <>
      <EuiPanel>
        <PanelTitle title="Span detail" />
        <EuiHorizontalRule margin="m" />
        <EuiButtonGroup
          options={options}
          idSelected={selectedId}
          onChange={(id) => setSelectedId(id)}
        />
        {selectedId === 'timeline' ? (
          <div style={{ overflowY: 'auto', maxHeight: 500 }}>
            <Plt data={props.data.gantt} layout={getSpanDetailLayout(props.data.gantt)} />
          </div>
        ) : (
            <EuiInMemoryTable
              items={props.data.table}
              columns={columns}
              pagination={{
                initialPageSize: 8,
                pageSizeOptions: [8, 10, 13],
              }}
              sorting={true}
              tableLayout="auto"
            />
          )}
      </EuiPanel>
    </>
  );
}
