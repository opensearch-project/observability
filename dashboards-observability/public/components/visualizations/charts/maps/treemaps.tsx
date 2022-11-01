/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { isEmpty, isEqual, uniq } from 'lodash';
import React, { useMemo } from 'react';

import {
  DEFAULT_PALETTE,
  MULTI_COLOR_PALETTE,
  SINGLE_COLOR_PALETTE,
} from '../../../../../common/constants/colors';
import { AGGREGATIONS, GROUPBY } from '../../../../../common/constants/explorer';
import { DEFAULT_CHART_STYLES, PLOT_MARGIN } from '../../../../../common/constants/shared';
import { IVisualizationContainerProps } from '../../../../../common/types/explorer';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { Plt } from '../../plotly/plot';

export const TreeMap = ({ visualizations, layout, config }: any) => {
  const { DefaultSortSectors } = DEFAULT_CHART_STYLES;
  const {
    data: {
      defaultAxes,
      indexFields,
      query,
      rawVizData: {
        data: queriedVizData,
        metadata: { fields },
      },
      userConfigs: {
        dataConfig: {
          chartStyles = {},
          legend = {},
          tooltipOptions = {},
          panelOptions = {},
          treemapOptions = {},
          [GROUPBY]: dimensions = [],
          [AGGREGATIONS]: series = [],
        },
        layoutConfig = {},
      },
    },
    vis: { icontype },
  }: IVisualizationContainerProps = visualizations;

  const childField =
    dimensions && dimensions[0]?.childField ? dimensions[0]?.childField : fields[fields.length - 1];
  const parentFields = dimensions && dimensions[0]?.parentFields ? dimensions[0]?.parentFields : [];
  const tooltipMode =
    tooltipOptions.tooltipMode !== undefined ? tooltipOptions.tooltipMode : 'show';
  const tooltipText = tooltipOptions.tooltipText !== undefined ? tooltipOptions.tooltipText : 'all';
  const valueField = series && series[0]?.valueField ? series[0]?.valueField : fields[0];
  const colorField =
    chartStyles && chartStyles.colorTheme ? chartStyles.colorTheme : { name: DEFAULT_PALETTE };

  const tilingAlgorithm =
    treemapOptions && treemapOptions.tilingAlgorithm && !isEmpty(treemapOptions.tilingAlgorithm)
      ? treemapOptions.tilingAlgorithm[0]
      : 'squarify';

  const sortSectorsField = treemapOptions.sort_sectors || DefaultSortSectors;
  const showColorscale = legend.showLegend ?? 'show';

  const areParentFieldsInvalid =
    new Set([...parentFields.map((field) => field.name)]).size !== parentFields.length ||
    parentFields.some(
      (field) => isEmpty(queriedVizData[field.name]) || isEqual(childField.name, field.name)
    );

  if (
    isEmpty(queriedVizData[childField.name]) ||
    isEmpty(queriedVizData[valueField.name]) ||
    areParentFieldsInvalid
  )
    return <EmptyPlaceholder icon={icontype} />;

  const [treemapData, mergedLayout] = useMemo(() => {
    let labelsArray: string[] = [];
    let parentsArray: string[] = [];
    let valuesArray: number[] = [];
    let colorsArray: string[] = [];

    if (parentFields.length === 0) {
      labelsArray = [...queriedVizData[childField.name]];
      parentsArray = [...Array(labelsArray.length).fill('')];
      valuesArray = [...queriedVizData[valueField.name]];
      if (colorField.name === MULTI_COLOR_PALETTE) {
        colorsArray = [
          ...Array(queriedVizData[childField.name].length).fill(colorField.childColor),
        ];
      }
    } else {
      let currentLevel = parentFields.length - 1;
      let lastParentField = {};
      parentFields
        .slice(0)
        .reverse()
        .map((field, i) => {
          const uniqueParents = uniq(queriedVizData[field.name]) as string[];
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
              queriedVizData[field.name].findIndex((index) => index === parent)
            );
            const lastParents = currentParentIndices.map(
              (index) => queriedVizData[lastParentField.name][index]
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

      labelsArray = [...labelsArray, ...queriedVizData[childField.name]];
      valuesArray = [...valuesArray, ...queriedVizData[valueField.name]];
      parentsArray = [...parentsArray, ...queriedVizData[lastParentField.name]];
      colorsArray =
        colorField.name === MULTI_COLOR_PALETTE
          ? [
              ...colorsArray,
              ...Array(queriedVizData[childField.name].length).fill(colorField.childColor),
            ]
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
      title: panelOptions.title || layoutConfig.layout?.title || '',
      treemapcolorway: colorway,
      margin: PLOT_MARGIN,
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
    queriedVizData,
    childField,
    valueField,
    parentFields,
    colorField,
    tilingAlgorithm,
    layoutConfig,
  ]);

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={treemapData} layout={mergedLayout} config={mergedConfigs} />;
};
