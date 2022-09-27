/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useState, useEffect } from 'react';
import { EuiFieldText, EuiForm, EuiFormRow, EuiTextArea, EuiAccordion } from '@elastic/eui';
import { VIS_CHART_TYPES } from '../../../../../../../../common/constants/shared';
import { DEFAULT_GAUGE_CHART_PARAMETERS } from '../../../../../../../../common/constants/explorer';
import { ConfigPanelOptionGauge } from './config_panel_option_gauge';

const helpText = 'Name your visualization.';

export const ConfigPanelOptions = ({ visualizations, handleConfigChange, vizState }: any) => {
  const { dataConfig = {} } = visualizations?.data?.userConfigs;
  const { name } = visualizations?.vis;

  const [panelOptionsValues, setPanelOptionsValues] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    setPanelOptionsValues({
      title: vizState?.title || '',
      description: vizState?.description || '',
      ...(visualizations?.vis?.name?.toLowerCase() === VIS_CHART_TYPES.Gauge && {
        numberOfGauges:
          vizState?.numberOfGauges || DEFAULT_GAUGE_CHART_PARAMETERS.DisplayDefaultGauges,
      }),
    });
  }, [name, vizState?.title, vizState?.description, vizState?.numberOfGauges]);

  const handleTextChange = ({ target }) => {
    setPanelOptionsValues({ ...panelOptionsValues, [target.name]: target.value });
  };

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
            name="title"
            onChange={handleTextChange}
            onBlur={() => handleConfigChange(panelOptionsValues)}
            value={panelOptionsValues.title}
            placeholder={'Title'}
          />
        </EuiFormRow>
        <EuiFormRow label="Description">
          <EuiTextArea
            name="description"
            aria-label="Use aria labels when no actual label is in use"
            placeholder={'Description'}
            value={panelOptionsValues.description}
            onChange={handleTextChange}
            onBlur={() => handleConfigChange(panelOptionsValues)}
          />
        </EuiFormRow>
        {visualizations?.vis?.name?.toLowerCase() === VIS_CHART_TYPES.Gauge && (
          <ConfigPanelOptionGauge
            onChange={handleTextChange}
            handleConfigChange={handleConfigChange}
            visualizations={visualizations}
            vizState={vizState}
            panelOptionsValues={panelOptionsValues}
          />
        )}
      </EuiForm>
    </EuiAccordion>
  );
};
