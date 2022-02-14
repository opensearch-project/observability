/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback } from 'react';
import { EuiAccordion, EuiSpacer } from '@elastic/eui';
import { PanelItem } from '../../configPanelItem';

export const ConfigValueOptions = ({
  visualizations,
  schemas,
  vizState,
  handleConfigChange,
}: any) => {
  const { data } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;
  const handleConfigurationChange = useCallback(
    (confName) => {
      return (changes) => {
        handleConfigChange({
          ...vizState,
          [confName]: changes,
        });
      };
    },
    [handleConfigChange, vizState]
  );

  const dimensions = useMemo(() => {
    return schemas.map((schema, index) => {
      const DimensionComponent = schema.component || PanelItem;
      const params = {
        paddingTitle: schema.name,
        advancedTitle: 'advancedTitle',
        dropdownList: schema?.options?.map((option) => ({ name: option })) || fields,
        onSelectChange: handleConfigurationChange(schema.mapTo),
        isSingleSelection: schema.isSingleSelection,
        selectedAxis: vizState[schema.mapTo],
      };
      return (
        <>
          <DimensionComponent key={`viz-series-${index}`} {...params} />
          <EuiSpacer size="s" />
        </>
      );
    });
  }, [schemas, fields, vizState, handleConfigurationChange]);

  return (
    <EuiAccordion id="configPanel__valueOptions" buttonContent="Value options" paddingSize="s">
      {dimensions}
    </EuiAccordion>
  );
};
