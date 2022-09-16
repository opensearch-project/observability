/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EuiFormRow, EuiFieldNumber } from '@elastic/eui';
import { DEFAULT_GAUGE_CHART_PARAMETERS } from '../../../../../../../../common/constants/explorer';

const helpText = `Limit number of gauges.`;

export const ConfigPanelOptionGauge = ({
  visualizations,
  vizState,
  panelOptionsValues,
  handleConfigChange,
}: any) => {
  const { dataConfig = {} } = visualizations?.data?.userConfigs;
  const dimensions = dataConfig?.dimensions
    ? dataConfig.dimensions.filter((i) => i.name !== '')
    : [];

  const [numberOfGauges, setNumberOfGauges] = useState<number>(
    DEFAULT_GAUGE_CHART_PARAMETERS.DisplayDefaultGauges
  );

  useEffect(() => {
    if (!vizState) {
      setNumberOfGauges(DEFAULT_GAUGE_CHART_PARAMETERS.DisplayDefaultGauges);
    }
  }, [vizState?.numberOfGauges]);

  return (
    <EuiFormRow fullWidth label="Number of gauges" helpText={helpText}>
      <EuiFieldNumber
        name="numberOfGauges"
        onChange={(e) => {
          setNumberOfGauges(Number(e.target.value));
        }}
        value={numberOfGauges}
        min={DEFAULT_GAUGE_CHART_PARAMETERS.DisplayDefaultGauges}
        onBlur={() => {
          const newPanelOptions = {
            ...panelOptionsValues,
            numberOfGauges: numberOfGauges,
          };
          handleConfigChange(newPanelOptions);
        }}
        placeholder={'Number of gauges'}
        readOnly={dimensions.length === 0}
      />
    </EuiFormRow>
  );
};
