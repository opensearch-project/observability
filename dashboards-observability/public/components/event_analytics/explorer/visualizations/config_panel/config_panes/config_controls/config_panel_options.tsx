/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback } from 'react';
import {
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiTextArea,
  EuiAccordion,
} from '@elastic/eui';
import { visChartTypes } from '../../../../../../../../common/constants/shared';
import { ConfigPanelOptionGauge } from './config_panel_option_gauge';
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
    <EuiAccordion
      initialIsOpen
      id="configPanel__panelOptions"
      buttonContent="Panel options"
      paddingSize="s"
    >
      <EuiForm component="form">
        <EuiFormRow fullWidth label="Title" helpText={`${helpText}`}>
          <EuiFieldText
            name="first"
            onChange={(e) => handleConfigurationChange('title')(e.target.value)}
            value={vizState?.title || ''}
            placeholder={'Title'}
          />
        </EuiFormRow>
        <EuiFormRow label="Description">
          <EuiTextArea
            aria-label="Use aria labels when no actual label is in use"
            placeholder={'Description'}
            value={vizState?.description || ''}
            onChange={(e) => handleConfigurationChange('description')(e.target.value)}
          />
        </EuiFormRow>
        {visualizations?.vis?.name?.toLowerCase() === visChartTypes.Gauge && (
          <ConfigPanelOptionGauge
            handleConfigurationChange={handleConfigurationChange}
            visualizations={visualizations}
            vizState={vizState}
          />
        )}
      </EuiForm>
    </EuiAccordion>
  );
};
