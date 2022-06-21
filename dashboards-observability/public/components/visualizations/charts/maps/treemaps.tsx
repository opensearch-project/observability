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

  const parentFields =
    dataConfig?.valueOptions && dataConfig.valueOptions?.parentFields
      ? dataConfig?.valueOptions.parentFields
      : [];

  const valueField =
    dataConfig?.valueOptions &&
    dataConfig.valueOptions?.valueField &&
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

  const areParentFieldsInvalid =
    new Set([...parentFields.map((x) => x.name)]).size !== parentFields.length ||
    parentFields.some((x) => isEmpty(data[x.name]) || isEqual(childField.name, x.name));

  if (
    isEmpty(data[childField.name]) ||
    isEmpty(data[valueField.name]) ||
    indexOf(NUMERICAL_FIELDS, valueField.type) < 0 ||
    areParentFieldsInvalid
  )
    return <EmptyPlaceholder icon={visualizations?.vis?.iconType} />;

  const [treemapData, mergedLayout] = useMemo(() => {
    let labelsArray: string[] = [],
      parentsArray: string[] = [],
      valuesArray: number[] = [],
      colorsArray: string[] = [];

    if (parentFields.length === 0) {
      labelsArray = [...data[childField.name]];
      parentsArray = [...Array(labelsArray.length).fill('')];
      valuesArray = [...data[valueField.name]];
      if (colorField.name === MULTI_COLOR_PALETTE) {
        colorsArray = [...Array(data[childField.name].length).fill(colorField.childColor)];
      }
    } else {
      let currentLevel = parentFields.length - 1;
      let lastParentField = {};
      parentFields
        .slice(0)
        .reverse()
        .map((field, i) => {
          const uniqueParents = uniq(data[field.name]) as string[];
          labelsArray = [...labelsArray, ...uniqueParents];
          if (i === 0) {
            parentsArray = [...Array(uniqueParents.length).fill('')];
            valuesArray = [...Array(uniqueParents.length).fill(0)];
            colorsArray =
              colorField.name === MULTI_COLOR_PALETTE
                ? [...Array(uniqueParents.length).fill(colorField.parentColors[currentLevel])]
                : [];
          } else {
            const parentIndices = uniqueParents.map((parent) =>
              data[field.name].findIndex((index) => index === parent)
            );
            const grandparents = parentIndices.map((x) => data[lastParentField.name][x]);
            parentsArray = [...parentsArray, ...grandparents];
            valuesArray = [...valuesArray, ...Array(grandparents.length).fill(0)];
            colorsArray =
              colorField.name === MULTI_COLOR_PALETTE
                ? [
                    ...colorsArray,
                    ...Array(grandparents.length).fill(colorField.parentColors[currentLevel]),
                  ]
                : [];
          }
          currentLevel = currentLevel - 1;
          lastParentField = field;
        });

      labelsArray = [...labelsArray, ...data[childField.name]];
      valuesArray = [...valuesArray, ...data[valueField.name]];
      parentsArray = [...parentsArray, ...data[lastParentField.name]];
      colorsArray =
        colorField.name === MULTI_COLOR_PALETTE
          ? [...colorsArray, ...Array(data[childField.name].length).fill(colorField.childColor)]
          : [];
    }

    if (colorField.name === SINGLE_COLOR_PALETTE) {
      colorsArray = [...Array(valuesArray.length).fill(colorField.childColor)];
    }

    const markerColors =
      colorField.name === MULTI_COLOR_PALETTE
        ? { colors: colorsArray }
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
    parentFields,
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
