import React from 'react'
import { Plt } from '../common/plt'

export default function BoxPlt({ props }) {
  // props.min, props.max, props.q1, props.medium, props.q3
  console.log(props)
  const layout = {
    plot_bgcolor: '#fafafa',
    paper_bgcolor: '#fafafa',
    xaxis: {
      range: [props.min, props.max],
      fixedrange: true,
      showgrid: false,
      visible: false,
    },
    yaxis: {
      range: [-0.45, 0.45],
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
    height: 30,
    width: 200,
  }
  const data = [
    {
      x: [props.q1],
      y: [0],
      type: 'bar',
      orientation: 'h',
      width: 0.4,
      marker: { color: 'rgba(255,255,255,0)' },
      hoverinfo: 'none',
      showlegend: false,
    },
    {
      x: [props.medium - props.q1],
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
      x: [props.q3 - props.medium],
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
  console.log(data)
  return (
    <Plt data={data} layout={layout} />
  )
}
