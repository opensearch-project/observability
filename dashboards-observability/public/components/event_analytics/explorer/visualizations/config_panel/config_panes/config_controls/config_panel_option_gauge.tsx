/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EuiFormRow, EuiFieldNumber } from '@elastic/eui';
import { find } from 'lodash';
import {
  DEFAULT_GAUGE_CHART_PARAMETERS,
  GROUPBY,
} from '../../../../../../../../common/constants/explorer';
import { IVisualizationContainerProps } from '../../../../../../../../common/types/explorer';

const helpText = `Limit number of gauges.`;

export const ConfigPanelOptionGauge = ({
  visualizations,
  vizState,
  panelOptionsValues,
  handleConfigChange,
}: any) => {
  const {
    data: { rawVizData: { metadata: { fields = [] } = {} } = {}, userConfigs },
  }: IVisualizationContainerProps = visualizations;

  const { dataConfig = {} } = userConfigs;
  let dimensions = dataConfig[GROUPBY] ?? [];
  const [numberOfGauges, setNumberOfGauges] = useState<number>(
    DEFAULT_GAUGE_CHART_PARAMETERS.DisplayDefaultGauges
  );

  const timestampField = find(fields, (field) => field.type === 'timestamp');

  if (dataConfig.span && dataConfig.span.time_field && timestampField) {
    dimensions = [timestampField, ...dimensions];
  }

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
            numberOfGauges,
          };
          handleConfigChange(newPanelOptions);
        }}
        placeholder={'Number of gauges'}
        readOnly={dimensions.length === 0}
      />
    </EuiFormRow>
  );
};
