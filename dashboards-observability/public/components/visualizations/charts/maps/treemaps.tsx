/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { indexOf, isEmpty, isEqual, isNull, uniq } from 'lodash';

import { Plt } from '../../plotly/plot';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { NUMERICAL_FIELDS } from '../../../../../common/constants/shared';
import {
  DEFAULT_PALETTE,
  MULTI_COLOR_PALETTE,
  SINGLE_COLOR_PALETTE,
} from '../../../../../common/constants/colors';

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

  const colorField =
    dataConfig?.chartStyles && dataConfig?.chartStyles.colorTheme
      ? dataConfig?.chartStyles.colorTheme
      : { name: DEFAULT_PALETTE };

  const tilingAlgorithm =
    dataConfig?.treemapOptions &&
    dataConfig?.treemapOptions.tilingAlgorithm &&
    !isEmpty(dataConfig?.treemapOptions.tilingAlgorithm)
      ? dataConfig?.treemapOptions.tilingAlgorithm[0]
      : 'squarify';

  if (
    isEmpty(data[childField.name]) ||
    isEmpty(data[valueField.name]) ||
    (!isNull(parentField) && isEmpty(data[parentField.name])) ||
    isEqual(childField.name, parentField?.name) ||
    indexOf(NUMERICAL_FIELDS, valueField.type) < 0
  )
    return <EmptyPlaceholder icon={visualizations?.vis?.iconType} />;

  const [treemapData, mergedLayout] = useMemo(() => {
    let labelsArray, parentsArray, valuesArray, colorsArray;

    if (parentField === null) {
      labelsArray = [...data[childField.name]];
      parentsArray = [...Array(labelsArray.length).fill('')];
      valuesArray = [...data[valueField.name]];
      if (colorField.name === MULTI_COLOR_PALETTE) {
        colorsArray = [...Array(data[childField.name].length).fill(colorField.childColor)];
      }
    } else {
      const uniqueParents = uniq(data[parentField.name]);
      labelsArray = [...data[childField.name], ...uniqueParents];
      parentsArray = [...data[parentField.name], ...Array(uniqueParents.length).fill('')];
      valuesArray = [...data[valueField.name], ...Array(uniqueParents.length).fill(0)];
      if (colorField.name === MULTI_COLOR_PALETTE) {
        colorsArray = [
          ...Array(data[childField.name].length).fill(colorField.childColor),
          ...Array(uniqueParents.length).fill(colorField.parentColor),
        ];
      }
    }

    if (colorField.name === SINGLE_COLOR_PALETTE) {
      colorsArray = [...Array(valuesArray.length).fill(colorField.childColor)];
    }

    const markerColors =
      colorField.name === MULTI_COLOR_PALETTE
        ? {
            colors: colorsArray,
          }
        : ![DEFAULT_PALETTE, SINGLE_COLOR_PALETTE].includes(colorField.name)
        ? {
            colorscale: colorField.name,
            colorbar: {
              len: 1,
            },
          }
        : {};

    const colorway = colorField.name === SINGLE_COLOR_PALETTE ? colorsArray : {};

    const mapLayout = {
      ...layout,
      ...(layoutConfig.layout && layoutConfig.layout),
      title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
      treemapcolorway: colorway,
    };

    const mapData = [
      {
        type: 'treemap',
        labels: labelsArray,
        parents: parentsArray,
        values: valuesArray,
        textinfo: 'label+value+percent parent+percent entry',
        tiling: {
          packing: tilingAlgorithm.value,
        },
        marker: markerColors,
      },
    ];

    return [mapData, mapLayout];
  }, [
    data,
    childField,
    valueField,
    parentField,
    colorField,
    tilingAlgorithm,
    dataConfig,
    layoutConfig,
  ]);

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={treemapData} layout={mergedLayout} config={mergedConfigs} />;
};
