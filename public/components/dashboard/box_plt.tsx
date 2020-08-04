import React from 'react'
import { Plt } from '../common/plt'

export function BoxPlt({ props }) {
  const layout = {
    plot_bgcolor: '#fafafa',
    paper_bgcolor: '#fafafa',
    // plot_bgcolor: 'rgba(0, 0, 0, 0)',
    // paper_bgcolor: 'rgba(0, 0, 0, 0)',
    xaxis: {
      range: [props.min, props.max],
      fixedrange: true,
      showgrid: false,
      visible: false,
    },
    yaxis: {
      range: [-0.35, 0.35],
      fixedrange: true,
      showgrid: false,
      visible: false,
    },
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0
    },
    height: 20,
    width: 200,
  }
  const data = [
    {
      x: [props.left],
      y: [0],
      type: 'bar',
      orientation: 'h',
      width: 0.4,
      marker: { color: 'rgba(0, 0, 0, 0)' },
      hoverinfo: 'none',
      showlegend: false,
    },
    {
      x: [props.mid - props.left],
      y: [0],
      type: 'bar',
      orientation: 'h',
      width: 0.4,
      marker: {
        color: '#ffffff',
        line: {
          color: '#957ac9',
          width: 1,
        }
      },
    },
    {
      x: [props.right - props.mid],
      y: [0],
      type: 'bar',
      orientation: 'h',
      width: 0.4,
      marker: {
        color: '#957ac9',
        line: {
          color: '#957ac9',
          width: 1,
        }
      },
    },
  ]
  return (
    <Plt data={data} layout={layout} />
  )
}
