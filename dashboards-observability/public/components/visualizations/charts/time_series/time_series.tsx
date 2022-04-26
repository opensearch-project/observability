/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { isEmpty, take } from 'lodash';
import { Plt } from '../../plotly/plot';
import { IField } from 'common/types/explorer';

export const TimeSeries = ({ visualizations, layout, config }: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations?.data?.rawVizData;
  const lastIndex = fields?.length - 1;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;
  const xaxis =
    dataConfig.valueOptions && dataConfig.valueOptions.xaxis ? dataConfig.valueOptions.xaxis : [];
  const yaxis =
    dataConfig.valueOptions && dataConfig.valueOptions.xaxis ? dataConfig.valueOptions?.yaxis : [];

  const { defaultAxes } = visualizations?.data;

  const mode =
  dataConfig?.chartOptions && dataConfig.chartOptions.mode && dataConfig.chartOptions.mode[0]
    ? dataConfig.chartOptions.mode[0].modeId
    : 'line';

  let valueSeries: IField[];
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    valueSeries = [...yaxis];
  } else {
    valueSeries = defaultAxes.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);
  }

  const [calculatedLayout, lineValues] = useMemo(() => {
    
    let calculatedLineValues = valueSeries.map((field: IField) => {
      return {
        x: data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name],
        y: data[field.name],
        type: 'scatter',
        name: field.name,
        mode,
      };
    });
    
    const mergedLayout = {
      ...layout,
      ...layoutConfig.layout,
      title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
    };
    return [mergedLayout, calculatedLineValues];
  }, [data, fields, lastIndex, layout, layoutConfig, xaxis, yaxis, mode, valueSeries]);

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };
  return <Plt data={lineValues} layout={calculatedLayout} config={mergedConfigs} />;
};
