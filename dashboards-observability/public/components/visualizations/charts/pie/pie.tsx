/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { take, merge, isEmpty } from 'lodash';
import { Plt } from '../../plotly/plot';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';

export const Pie = ({ visualizations, layout, config }: any) => {
  const { vis } = visualizations;
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { defaultAxes } = visualizations.data;
  const { dataConfig = {} } = visualizations?.data?.userConfigs;
  const xaxis =
    dataConfig?.valueOptions && dataConfig?.valueOptions.xaxis
      ? dataConfig?.valueOptions.xaxis
      : [];
  const yaxis =
    dataConfig?.valueOptions && dataConfig?.valueOptions.xaxis
      ? dataConfig?.valueOptions.yaxis
      : [];
  const lastIndex = fields.length - 1;

  let valueSeries;
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    valueSeries = [...yaxis];
  } else {
    valueSeries = defaultAxes.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);
  }

  const pies = valueSeries.map((field: any) => {
    return {
      labels: data[xaxis ? xaxis[0]?.label : fields[lastIndex].name],
      values: data[field.name],
      type: 'pie',
      name: field.name,
    };
  });

  return (
    <Plt
      data={pies}
      layout={{
        ...layout,
        title: dataConfig?.panelOptions?.title || '',
      }}
      config={config}
    />
  );
};
