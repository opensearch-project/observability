/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback } from 'react';
import { EuiAccordion, EuiSpacer } from '@elastic/eui';
import { ButtonGroupItem } from './config_button_group';
import { SliderConfig } from './config_style_slider';

export const ConfigGraphStyle = ({
  visualizations,
  schemas,
  vizState,
  handleConfigChange,
  sectionName,
  sectionId = 'graphStyle'
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

  const [orientationMode, styleGroup, interpolationGroup, lineWidth, fillOpacity] = schemas;

  const dimensions = useMemo(() => {
    return [orientationMode, styleGroup, interpolationGroup].map((schema, index) => {
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
  }, [schemas, vizState, handleConfigurationChange]);

  const sliderItem = useMemo(() => {
    return [lineWidth, fillOpacity].map((schema, index) => {
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
  }, [schemas, vizState, handleConfigurationChange]);

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
