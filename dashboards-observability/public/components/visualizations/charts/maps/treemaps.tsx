/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { indexOf, isEmpty, isEqual, isNull, uniq } from 'lodash';

import { Plt } from '../../plotly/plot';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { NUMERICAL_FIELDS } from '../../../../../common/constants/shared';

export const TreeMap = ({ visualizations, layout, config }: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;

  const childField =
    dataConfig?.valueOptions &&
    dataConfig?.valueOptions.childField &&
    !isEmpty(dataConfig?.valueOptions.childField)
      ? dataConfig?.valueOptions.childField[0]
      : fields[fields.length - 1];

  const parentField =
    dataConfig?.valueOptions &&
    dataConfig?.valueOptions.parentField &&
    !isEmpty(dataConfig?.valueOptions.parentField)
      ? dataConfig?.valueOptions.parentField[0]
      : null;

  const valueField =
    dataConfig?.valueOptions &&
    dataConfig?.valueOptions.valueField &&
    !isEmpty(dataConfig?.valueOptions.valueField)
      ? dataConfig?.valueOptions.valueField[0]
      : fields[0];

  if (
    isEmpty(data[childField.name]) ||
    isEmpty(data[valueField.name]) ||
    (!isNull(parentField) && isEmpty(data[parentField.name])) ||
    isEqual(childField, parentField) ||
    indexOf(NUMERICAL_FIELDS, valueField.type) < 0
  )
    return <EmptyPlaceholder icon={visualizations?.vis?.iconType} />;

  const treemapData = useMemo(() => {
    let labelsArray, parentsArray, valuesArray;

    if (parentField === null) {
      labelsArray = [...data[childField.name]];
      parentsArray = [...Array(labelsArray.length).fill('')];
      valuesArray = [...data[valueField.name]];
    } else {
      const uniqueParents = uniq(data[parentField.name]);
      labelsArray = [...data[childField.name], ...uniqueParents];
      parentsArray = [...data[parentField.name], ...Array(uniqueParents.length).fill('')];
      valuesArray = [...data[valueField.name], ...Array(uniqueParents.length).fill(0)];
    }

    return [
      {
        type: 'treemap',
        labels: labelsArray,
        parents: parentsArray,
        values: valuesArray,
        textinfo: 'label+value+percent parent+percent entry',
      },
    ];
  }, [data, childField, valueField, parentField]);

  const mergedLayout = {
    ...layout,
    ...layoutConfig.layout,
    title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
  };

  const mergedConfigs = {
    ...config,
    ...layoutConfig.config,
  };

  return <Plt data={treemapData} layout={mergedLayout} config={mergedConfigs} />;
};
