import { EuiHorizontalRule, EuiPanel } from '@elastic/eui';
import React, { useMemo } from 'react';
import { PanelTitle } from '../common';
import { Plt } from '../common/plots/plt';

export function SpanDetailPanel(props: {
  data: { gantt: Plotly.Data[]; table: any[]; ganttMaxX: number };
}) {
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

  const layout = useMemo(() => getSpanDetailLayout(props.data.gantt, props.data.ganttMaxX), [
    props.data.gantt,
    props.data.ganttMaxX,
  ]);

  return (
    <>
      <EuiPanel>
        <PanelTitle title="Span detail" />
        <EuiHorizontalRule margin="m" />
        <div style={{ overflowY: 'auto', maxHeight: 500 }}>
          <Plt data={props.data.gantt} layout={layout} />
        </div>
      </EuiPanel>
    </>
  );
}
