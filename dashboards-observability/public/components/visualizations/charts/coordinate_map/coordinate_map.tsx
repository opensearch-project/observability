/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useContext, useMemo } from 'react';

import { Plt } from '../../plotly/plot';
import { TabContext } from '../../../event_analytics/hooks';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { isInvalidCoordinateMapConfig } from '../../../../components/event_analytics/utils/utils';
import { DEFAULT_SCL, MAP_COLORS } from '../../../../../common/constants/colors';
import { SHOW, TextPosition } from '../../../../../common/constants/explorer';
import { visChartTypes } from '../../../../../common/constants/shared';

export const CoordinateMap = ({ visualizations }: any) => {
  const { explorerData } = useContext<any>(TabContext);
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;
  const dataConfiguration = visualizations?.data?.rawVizData?.scattergeo?.dataConfig;
  const rawData = explorerData.jsonData;

  const fetchPlotNames = () =>
    rawData.map((data: any) => data?.[dataConfiguration?.metrics[0]?.plotName]);

  const fetchLocationLats = () =>
    rawData.map((data: any) => JSON.parse(data?.[dataConfiguration?.dimensions[0]?.name])?.lat);

  const fetchLocationLons = () =>
    rawData.map((data: any) => JSON.parse(data?.[dataConfiguration?.dimensions[0]?.name])?.lon);

  const fetchColorDetectorField = () =>
    rawData.map((data: any) => data?.[dataConfiguration?.metrics[0]?.name]);

  if (
    isInvalidCoordinateMapConfig(dataConfiguration) ||
    rawData === undefined ||
    rawData.length === 0 ||
    fetchPlotNames()[0] === undefined ||
    fetchLocationLats()[0] === undefined ||
    fetchLocationLons()[0] === undefined ||
    fetchColorDetectorField()[0] === undefined
  ) {
    return <EmptyPlaceholder icon={visualizations?.vis?.icontype} />;
  }

  const showText = dataConfig?.text?.showText
    ? dataConfig.text.showText === SHOW
    : visualizations.vis.showtext;
  const textPosition = dataConfig?.text?.position ? dataConfig.text.position : TextPosition.TOP;
  const fontSize = dataConfig?.chartStyles?.labelSize
    ? dataConfig.chartStyles.labelSize
    : visualizations.vis.fontsize;
  const latitudeRange = dataConfig?.chartStyles?.latitudeRange
    ? dataConfig.chartStyles.latitudeRange
    : visualizations.vis.latrange;
  const longitudeRange = dataConfig?.chartStyles?.longitudeRange
    ? dataConfig.chartStyles.longitudeRange
    : visualizations.vis.lonrange;

  const data = useMemo(
    () => [
      {
        type: visChartTypes.CoordinateMap,
        mode: `markers${showText ? '+text' : ''}`,
        text: fetchPlotNames(),
        lon: fetchLocationLons(),
        lat: fetchLocationLats(),
        marker: {
          size: 10,
          line: { width: 1 },
          reversescale: true,
          autocolorscale: false,
          colorscale: DEFAULT_SCL,
          cmin: 0,
          color: fetchColorDetectorField(),
          colorbar: {
            title: 'Range',
          },
        },
        locationmode: 'country names',
        name: 'Coordinate Map',
        textposition: textPosition,
        hovertemplate:
          '<b>Latitude: </b> %{lat} <br><b>Longitude: </b> %{lon} <br><extra>%{text}</extra>',
        hoverlabel: {
          align: 'auto',
          bgcolor: 'white',
          bordercolor: 'black',
          font: {
            color: 'black',
            size: 18,
          },
        },
      },
    ],
    [rawData, dataConfiguration, showText, textPosition]
  );

  const layoutMap = {
    title: {
      text: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
      y: 0.99,
    },
    height: 600,
    font: {
      family: 'Droid Serif, serif',
      size: fontSize,
    },
    geo: {
      scope: 'world',
      resolution: '50',
      lonaxis: { range: longitudeRange },
      lataxis: { range: latitudeRange },
      showrivers: true,
      rivercolor: MAP_COLORS.waterColor,
      showlakes: true,
      lakecolor: MAP_COLORS.waterColor,
      showland: true,
      landcolor: MAP_COLORS.landColor,
      countrycolor: MAP_COLORS.unitColor,
      countrywidth: 1.5,
      subunitcolor: MAP_COLORS.unitColor,
    },
  };

  return <Plt data={data} layout={layoutMap} />;
};
