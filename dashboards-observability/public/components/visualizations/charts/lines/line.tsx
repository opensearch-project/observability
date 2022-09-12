/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { take, isEmpty, last } from 'lodash';
import { Plt } from '../../plotly/plot';
import { AvailabilityUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import {
  DefaultChartStyles,
  FILLOPACITY_DIV_FACTOR,
  PLOTLY_COLOR,
  visChartTypes,
} from '../../../../../common/constants/shared';
import { hexToRgb } from '../../../../components/event_analytics/utils/utils';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';

export const Line = ({ visualizations, layout, config }: any) => {
  const {
    DefaultModeLine,
    Interpolation,
    LineWidth,
    FillOpacity,
    MarkerSize,
    LegendPosition,
    ShowLegend,
    DefaultModeScatter,
    LabelAngle,
  } = DefaultChartStyles;
  const {
    data = {},
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { defaultAxes } = visualizations.data;
  const {
    dataConfig = {},
    layoutConfig = {},
    availabilityConfig = {},
  } = visualizations?.data?.userConfigs;

  const xaxis = dataConfig?.valueOptions?.dimensions
    ? dataConfig.valueOptions.dimensions.filter((item) => item.label)
    : [];
  const yaxis = dataConfig?.valueOptions?.metrics
    ? dataConfig.valueOptions.metrics.filter((item) => item.label)
    : [];
  const tooltipMode =
    dataConfig?.tooltipOptions?.tooltipMode !== undefined
      ? dataConfig.tooltipOptions.tooltipMode
      : 'show';
  const tooltipText =
    dataConfig?.tooltipOptions?.tooltipText !== undefined
      ? dataConfig.tooltipOptions.tooltipText
      : 'all';

  const lastIndex = fields.length - 1;

  const visType: string = visualizations.vis.name;
  const mode =
    dataConfig?.chartStyles?.style ||
    (visType === visChartTypes.Line ? DefaultModeLine : DefaultModeScatter);
  const lineShape = dataConfig?.chartStyles?.interpolation || Interpolation;
  const lineWidth = dataConfig?.chartStyles?.lineWidth || LineWidth;
  const showLegend = !(
    dataConfig?.legend?.showLegend && dataConfig.legend.showLegend !== ShowLegend
  );
  const legendPosition = dataConfig?.legend?.position || LegendPosition;
  const markerSize = dataConfig?.chartStyles?.pointSize || MarkerSize;
  const fillOpacity =
    dataConfig?.chartStyles?.fillOpacity !== undefined
      ? dataConfig?.chartStyles?.fillOpacity / FILLOPACITY_DIV_FACTOR
      : FillOpacity / FILLOPACITY_DIV_FACTOR;
  const tickAngle = dataConfig?.chartStyles?.rotateLabels || LabelAngle;
  const labelSize = dataConfig?.chartStyles?.labelSize;
  const legendSize = dataConfig?.legend?.legendSize;

  const getSelectedColorTheme = (field: any, index: number) =>
    (dataConfig?.colorTheme?.length > 0 &&
      dataConfig.colorTheme.find((colorSelected) => colorSelected.name.name === field.name)
        ?.color) ||
    PLOTLY_COLOR[index % PLOTLY_COLOR.length];

  if (isEmpty(xaxis) || isEmpty(yaxis))
    return <EmptyPlaceholder icon={visualizations?.vis?.icontype} />;

  let valueSeries;
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    valueSeries = [...yaxis];
  } else {
    valueSeries = (
      defaultAxes.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1)
    ).map((item, i) => ({ ...item, side: i === 0 ? 'left' : 'right' }));
  }

  const isDimensionTimestamp = isEmpty(xaxis)
    ? defaultAxes?.xaxis?.length && defaultAxes.xaxis[0].type === 'timestamp'
    : xaxis.length === 1 && xaxis[0].type === 'timestamp';

  let multiMetrics = {};
  const [calculatedLayout, lineValues] = useMemo(() => {
    const isBarMode = mode === 'bar';
    let calculatedLineValues = valueSeries.map((field: any, index: number) => {
      const selectedColor = getSelectedColorTheme(field, index);
      const fillColor = hexToRgb(selectedColor, fillOpacity);
      const barMarker = {
        color: fillColor,
        line: {
          color: selectedColor,
          width: lineWidth,
        },
      };
      const fillProperty = {
        fill: 'tozeroy',
        fillcolor: fillColor,
      };
      const multiYaxis = { yaxis: `y${index + 1}` };
      multiMetrics = {
        ...multiMetrics,
        [`yaxis${index > 0 ? index + 1 : ''}`]: {
          titlefont: {
            color: selectedColor,
          },
          tickfont: {
            color: selectedColor,
            ...(labelSize && {
              size: labelSize,
            }),
          },
          ...(index > 0 && { overlaying: 'y' }),
          side: field.side,
        },
      };

      return {
        x: data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name],
        y: data[field.label],
        type: isBarMode ? 'bar' : 'scatter',
        name: field.label,
        mode,
        ...(!['bar', 'markers'].includes(mode) && fillProperty),
        line: {
          shape: lineShape,
          width: lineWidth,
          color: selectedColor,
        },
        hoverinfo: tooltipMode === 'hidden' ? 'none' : tooltipText,
        marker: {
          size: markerSize,
          ...(isBarMode && barMarker),
        },
        ...(index >= 1 && multiYaxis),
      };
    });

    const layoutForBarMode = {
      barmode: 'group',
    };
    const mergedLayout = {
      ...layout,
      ...layoutConfig.layout,
      title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
      legend: {
        ...layout.legend,
        orientation: legendPosition,
        ...(legendSize && {
          font: {
            size: legendSize,
          },
        }),
      },
      xaxis: {
        tickangle: tickAngle,
        automargin: true,
        tickfont: {
          ...(labelSize && {
            size: labelSize,
          }),
        },
      },
      showlegend: showLegend,
      ...(isBarMode && layoutForBarMode),
      ...(multiMetrics && multiMetrics),
    };

    if (dataConfig.thresholds || availabilityConfig.level) {
      const thresholdTraces = {
        x: [],
        y: [],
        mode: 'text',
        text: [],
      };
      const thresholds = dataConfig.thresholds ? dataConfig.thresholds : [];
      const levels = availabilityConfig.level ? availabilityConfig.level : [];

      const mapToLine = (list: ThresholdUnitType[] | AvailabilityUnitType[], lineStyle: any) => {
        return list.map((thr: ThresholdUnitType) => {
          thresholdTraces.x.push(
            data[!isEmpty(xaxis) ? xaxis[xaxis.length - 1]?.label : fields[lastIndex].name][0]
          );
          thresholdTraces.y.push(thr.value * (1 + 0.06));
          thresholdTraces.text.push(thr.name);
          return {
            type: 'line',
            x0: data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name][0],
            y0: thr.value,
            x1: last(data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name]),
            y1: thr.value,
            name: thr.name || '',
            opacity: 0.7,
            line: {
              color: thr.color,
              width: 3,
              ...lineStyle,
            },
          };
        });
      };

      mergedLayout.shapes = [
        ...mapToLine(thresholds, { dash: 'dashdot' }),
        ...mapToLine(levels, {}),
      ];
      calculatedLineValues = [...calculatedLineValues, thresholdTraces];
    }
    return [mergedLayout, calculatedLineValues];
  }, [data, fields, lastIndex, layout, layoutConfig, xaxis, yaxis, mode, valueSeries]);

  const mergedConfigs = useMemo(
    () => ({
      ...config,
      ...(layoutConfig.config && layoutConfig.config),
    }),
    [config, layoutConfig.config]
  );

  return isDimensionTimestamp ? (
    <Plt data={lineValues} layout={calculatedLayout} config={mergedConfigs} />
  ) : (
    <EmptyPlaceholder icon={visualizations?.vis?.icontype} />
  );
};
