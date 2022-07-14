/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useMemo } from 'react';
import { EuiAccordion, EuiSpacer } from '@elastic/eui';
import { ButtonGroupItem } from './config_button_group';
import { IConfigPanelOptionSection } from '../../../../../../../../common/types/explorer';

export const ConfigLegend = ({ schemas, vizState, handleConfigChange }: any) => {
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
      const DimensionComponent = schema.component || ButtonGroupItem;
      let params = {
        title: schema.name,
        vizState,
        ...schema.props,
      };
      if (schema.eleType === 'input') {
        params = {
          ...params,
          currentValue: vizState[schema.mapTo] || '',
          numValue: vizState[schema.mapTo] || '',
          handleInputChange: handleConfigurationChange(schema.mapTo),
        };
      } else {
        params = {
          ...params,
          legend: schema.name,
          groupOptions: schema?.props?.options.map((btn: { name: string }) => ({
            ...btn,
            label: btn.name,
          })),
          idSelected: vizState[schema.mapTo] || schema?.props?.defaultSelections[0]?.id,
          handleButtonChange: handleConfigurationChange(schema.mapTo),
        };
      }
      return (
        <>
          <DimensionComponent key={`viz-series-${index}`} {...params} />
          <EuiSpacer size="s" />
        </>
      );
    });
  }, [schemas, vizState, handleConfigurationChange]);

  return (
    <EuiAccordion initialIsOpen id="configPanel__legend" buttonContent="Legend" paddingSize="s">
      {dimensions}
    </EuiAccordion>
  );
};
