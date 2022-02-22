/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback } from 'react';
import { EuiFieldText, EuiForm, EuiFormRow, EuiTextArea, EuiAccordion } from '@elastic/eui';

const helpText = 'Name your visualization.';

export const ConfigPanelOptions = ({ visualizations, handleConfigChange, vizState }: any) => {
  const { dataConfig = {} } = visualizations?.data?.userConfigs;

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

  return (
    <EuiAccordion id="configPanel__panelOptions" buttonContent="Panel options" paddingSize="s">
      <EuiForm component="form">
        <EuiFormRow fullWidth label="Title" helpText={`${helpText}`}>
          <EuiFieldText
            name="first"
            onChange={(e) => handleConfigurationChange('title')(e.target.value)}
            placeholder={dataConfig.panelOptions?.title || vizState?.title || 'title'}
          />
        </EuiFormRow>
        <EuiFormRow label="Description">
          <EuiTextArea
            aria-label="Use aria labels when no actual label is in use"
            placeholder={dataConfig.panelOptions?.description || 'Visualization description'}
            onChange={(e) => handleConfigurationChange('description')(e.target.value)}
          />
        </EuiFormRow>
      </EuiForm>
    </EuiAccordion>
  );
};
