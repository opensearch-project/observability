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
import { DefaultChartStyles } from '../../../../../common/constants/shared';

export const TreeMap = ({ visualizations, layout, config }: any) => {
  const { DefaultSortSectors } = DefaultChartStyles;

  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;

  const childField =
    dataConfig?.valueOptions?.dimensions && dataConfig.valueOptions.dimensions[0].childField
      ? dataConfig.valueOptions.dimensions[0].childField
      : fields[fields.length - 1];

  const parentFields =
    dataConfig?.valueOptions?.dimensions && dataConfig.valueOptions.dimensions[0].parentFields
      ? dataConfig.valueOptions.dimensions[0].parentFields
      : [];
  const tooltipMode =
    dataConfig?.tooltipOptions?.tooltipMode !== undefined
      ? dataConfig.tooltipOptions.tooltipMode
      : 'show';
  const tooltipText =
    dataConfig?.tooltipOptions?.tooltipText !== undefined
      ? dataConfig?.tooltipOptions?.tooltipText
      : 'all';

  const valueField =
    dataConfig?.valueOptions?.metrics && dataConfig.valueOptions.metrics[0].valueField
      ? dataConfig.valueOptions.metrics[0].valueField
      : fields[0];

  const colorField =
    dataConfig?.chartStyles && dataConfig.chartStyles.colorTheme
      ? dataConfig.chartStyles.colorTheme
      : { name: DEFAULT_PALETTE };

  const tilingAlgorithm =
    dataConfig?.treemapOptions &&
    dataConfig.treemapOptions.tilingAlgorithm &&
    !isEmpty(dataConfig.treemapOptions.tilingAlgorithm)
      ? dataConfig.treemapOptions.tilingAlgorithm[0]
      : 'squarify';

  const sortSectorsField = dataConfig?.treemapOptions?.sort_sectors || DefaultSortSectors;
  const showColorscale = dataConfig?.legend?.showLegend ?? 'show';

  const areParentFieldsInvalid =
    new Set([...parentFields.map((field) => field.name)]).size !== parentFields.length ||
    parentFields.some((field) => isEmpty(data[field.name]) || isEqual(childField.name, field.name));

  if (
    isEmpty(data[childField.name]) ||
    isEmpty(data[valueField.name]) ||
    indexOf(NUMERICAL_FIELDS, valueField.type) < 0 ||
    areParentFieldsInvalid
  )
    return <EmptyPlaceholder icon={visualizations?.vis?.icontype} />;

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
                ? [
                    ...Array(uniqueParents.length).fill(
                      colorField.parentColors[currentLevel] ?? '#000000'
                    ),
                  ]
                : [];
          } else {
            const currentParentIndices = uniqueParents.map((parent) =>
              data[field.name].findIndex((index) => index === parent)
            );
            const lastParents = currentParentIndices.map(
              (index) => data[lastParentField.name][index]
            );
            parentsArray = [...parentsArray, ...lastParents];
            valuesArray = [...valuesArray, ...Array(lastParents.length).fill(0)];
            colorsArray =
              colorField.name === MULTI_COLOR_PALETTE
                ? [
                    ...colorsArray,
                    ...Array(lastParents.length).fill(
                      colorField.parentColors[currentLevel] ?? '#000000'
                    ),
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
            showscale: showColorscale === 'show',
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
        hoverinfo: tooltipMode === 'hidden' ? 'none' : tooltipText,
        textinfo: 'label+value+percent parent+percent entry',
        tiling: {
          packing: tilingAlgorithm.value,
        },
        marker: markerColors,
        sort: sortSectorsField === DefaultSortSectors,
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
