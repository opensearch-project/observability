/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback } from 'react';
import { EuiAccordion, EuiSpacer, EuiForm } from '@elastic/eui';
import { PanelItem } from './config_panel_item';

export const ConfigChartOptions = ({
  visualizations,
  schemas,
  vizState,
  handleConfigChange,
}: any) => {
  const { data } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;

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

  const dimensions = useMemo(() => {
    return schemas.map((schema, index) => {
      let params = {};
      const DimensionComponent = schema.component || PanelItem;
      if (schema.eleType === 'treemapColorPicker') {
        params = {
          title: schema.name,
          selectedColor: vizState[schema.mapTo] || schema?.defaultState,
          colorPalettes: schema.options || [],
          showParentColorPicker:
            dataConfig?.valueOptions?.parentField !== undefined &&
            dataConfig?.valueOptions?.parentField.length > 0,
          onSelectChange: handleConfigurationChange(schema.mapTo),
          vizState,
          ...schema.props,
        };
      } else if (schema.eleType === 'colorpicker') {
        params = {
          title: schema.name,
          selectedColor: vizState[schema.mapTo] || schema?.defaultState,
          colorPalettes: schema.options || [],
          onSelectChange: handleConfigurationChange(schema.mapTo),
          vizState,
          ...schema.props,
        };
      } else {
        params = {
          paddingTitle: schema.name,
          advancedTitle: 'advancedTitle',
          dropdownList:
            schema?.options?.map((option) => ({ ...option })) ||
            fields.map((item) => ({ ...item })),
          onSelectChange: handleConfigurationChange(schema.mapTo),
          isSingleSelection: schema.isSingleSelection,
          selectedAxis: vizState[schema.mapTo] || schema.defaultState,
          vizState,
          ...schema.props,
        };
      }
      return (
        <>
          <EuiForm component="form">
            <DimensionComponent key={`viz-series-${index}`} {...params} />
            <EuiSpacer size="s" />
          </EuiForm>
        </>
      );
    });
  }, [vizState, handleConfigurationChange]);

  return (
    <EuiAccordion
      initialIsOpen
      id="configPanel__chartStyles"
      buttonContent="Chart Styles"
      paddingSize="s"
    >
      {dimensions}
    </EuiAccordion>
  );
};
