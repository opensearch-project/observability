/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback, useState, Fragment } from 'react';
import { EuiAccordion, EuiButtonGroup, EuiRange, EuiSpacer, EuiTitle } from '@elastic/eui';
import { StyleItem } from './config_style_item';

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

  const [styleGroup, interpolationGroup, lineWidth, fillOpacity] = schemas;

  const [sliderRange, setValue] = useState({
    lineWidth: lineWidth.defaultState,
    opacity: fillOpacity.defaultState
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setValue(state => ({ ...state, [name]: value }));
  };

  const dimensions = useMemo(() => {
    return [styleGroup, interpolationGroup].map((schema, index) => {
      const DimensionComponent = schema.component || StyleItem;
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
  }, [schemas, vizState, handleConfigurationChange])

  console.log("visualization:: ", visualizations)
  console.log("vizState::", vizState)
  return (
    <EuiAccordion
      initialIsOpen
      id={`configPanel__${sectionId}`}
      buttonContent={sectionName}
      paddingSize="s"
    >
      {dimensions}

      <EuiSpacer size="s" />
      <EuiTitle size="xxs">
        <h3>{lineWidth.name}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiRange
        id="inputRangeSlider"
        max={lineWidth.max}
        name="lineWidth"
        value={sliderRange.lineWidth}
        onChange={onChange}
        showInput
        aria-label="change lineWidth slider"
      />

      <EuiSpacer size="s" />
      <EuiTitle size="xxs">
        <h3>{fillOpacity.name}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiRange
        id="inputRangeSlider"
        max={fillOpacity.max}
        name="opacity"
        value={sliderRange.opacity}
        onChange={onChange}
        showInput
        aria-label="fillOpacity Slider"
      />

    </EuiAccordion>
  );
};
