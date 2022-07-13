/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiFormRow, EuiFieldNumber } from '@elastic/eui';
import { visChartTypes } from '../../../../../../../../common/constants/shared';
import { DefaultGaugeChartParameters } from '../../../../../../../../common/constants/explorer';

export const ConfigPanelOptionGauge = ({
  visualizations,
  handleConfigurationChange,
  vizState,
}: any) => {
  const { Gauge = {} } = visualizations?.data?.rawVizData;
  const isReadOnly = !(
    Gauge?.dataConfig?.dimensions?.length && Gauge?.dataConfig?.dimensions[0]?.name != ''
  );

  return (
    <>
      {visualizations?.vis?.name?.toLowerCase() === visChartTypes.Gauge && (
        <EuiFormRow fullWidth label="Number of gauges" helpText={`Limit number of gauges`}>
          <EuiFieldNumber
            name="numberOfGauges"
            onChange={(e) => handleConfigurationChange('numberOfGauges')(e.target.value)}
            value={
              !isReadOnly
                ? vizState?.numberOfGauges || DefaultGaugeChartParameters.DisplayDefaultGauges
                : DefaultGaugeChartParameters.DisplayDefaultGauges
            }
            placeholder={'Number of gauges'}
            readOnly={isReadOnly}
          />
        </EuiFormRow>
      )}
    </>
  );
};
