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
      if (schema.eleType === 'colorpicker') {
        params = {
          title: schema.name,
          selectedColor: vizState[schema.mapTo] || schema?.defaultState,
          colorPalettes: schema.options || [],
          onSelectChange: handleConfigurationChange(schema.mapTo),
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
