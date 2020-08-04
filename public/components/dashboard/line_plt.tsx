import React from 'react'
import { Plt } from '../common/plt'

export default function LinePlt(props) {
  const layout = {
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
      pad: 0
    },
    height: 20,
    width: 60,
  }
  return (
    <Plt data={props.data} layout={layout} />
  )
}