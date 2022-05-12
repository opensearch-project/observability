/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback } from 'react';
import { EuiAccordion, EuiSpacer } from '@elastic/eui';
import { ButtonGroupItem } from './config_button_group';
import { SliderConfig } from './config_style_slider';
import { IConfigPanelOptionSection } from 'common/types/explorer';

export const ConfigChartStyles = ({
  visualizations,
  schemas,
  vizState,
  handleConfigChange,
  sectionName,
  sectionId = 'chartStyles'
}: any) => {
  const { data } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;
  const handleConfigurationChange = useCallback(
    (stateFiledName) => {
      return (changes) => {
        handleConfigChange({
          ...vizState,
          [stateFiledName]: changes,
        });
      };
    },
    [handleConfigChange, vizState]
  );

  const [styleGroup, interpolationGroup, barAlignment, lineWidth, fillOpacity, pointSize] = schemas;

  const dimensionOption = useMemo(() => {
    let dimensionItems: { [key: string]: IConfigPanelOptionSection[] } = { buttonOptions: [], sliderOptions: [] };
    if (!vizState?.style || vizState?.style === "lines") {
      dimensionItems.buttonOptions = [styleGroup, interpolationGroup];
      dimensionItems.sliderOptions = [lineWidth, fillOpacity];
    } else if (vizState?.style === "bar") {
      dimensionItems.buttonOptions = [styleGroup, barAlignment];
      dimensionItems.sliderOptions = [lineWidth, fillOpacity];
    } else if(vizState?.style === "markers") {
      dimensionItems.buttonOptions = [styleGroup];
      dimensionItems.sliderOptions = [pointSize];
    } else if(vizState?.style === "lines+markers"){
      dimensionItems.buttonOptions = [styleGroup];
      dimensionItems.sliderOptions = [lineWidth, pointSize];
    }
    return dimensionItems;
  }, [vizState]);

  const dimensions = useMemo(() => {
    return dimensionOption.buttonOptions.map((schema, index) => {
      const DimensionComponent = schema.component || ButtonGroupItem;
      const params = {
        title: schema.name,
        legend: schema.name,
        groupOptions: schema?.props?.options.map((btn: { name: string, modeId: string }) => ({ id: btn.modeId, label: btn.name })),
        idSelected: vizState[schema.mapTo] || schema?.props?.defaultSelections[0]?.modeId,
        handleButtonChange: handleConfigurationChange(schema.mapTo),
        vizState,
        ...schema.props,
      };
      return (
        <>
          <DimensionComponent key={`viz-series-${index}`} {...params} />
          <EuiSpacer size="s" />
        </>
      );
    });
  }, [schemas, vizState, handleConfigurationChange, dimensionOption]);

  const sliderItem = useMemo(() => {
    return dimensionOption.sliderOptions.map((schema, index) => {
      const DimensionComponent = schema.component || SliderConfig;
      const params = {
        maxRange: schema.max,
        title: schema.name,
        currentRange: vizState[schema.mapTo] || schema?.defaultState,
        handleSliderChange: handleConfigurationChange(schema.mapTo),
        vizState,
        ...schema.props,
      };
      return (
        <>
          <DimensionComponent key={`viz-series-${index}`} {...params} />
          <EuiSpacer size="s" />
        </>
      );
    });
  }, [schemas, vizState, handleConfigurationChange, dimensionOption]);

  console.log("visualization:: ", visualizations)
  console.log("vizStateeeeeeccccccc::", vizState)
  return (
    <EuiAccordion
      initialIsOpen
      id={`configPanel__${sectionId}`}
      buttonContent={sectionName}
      paddingSize="s"
    >
      {dimensions}
      {sliderItem}
    </EuiAccordion>
  );
};
