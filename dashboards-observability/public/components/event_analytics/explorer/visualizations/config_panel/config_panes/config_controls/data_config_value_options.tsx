/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback, useState } from 'react';
import { EuiAccordion, EuiButton, EuiComboBox, EuiFieldText, EuiFlexItem, EuiFormRow, EuiIcon, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui';
import { DataConfigPanelItem } from './data_config_panel_item';

export const DataConfigValueOptions = ({
  visualizations,
  schemas,
  vizState,
  handleConfigChange,
  sectionName,
  sectionId = 'valueOptions'
}: any) => {
  const { data } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;
  console.log('fields ', fields)

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
      const DimensionComponent = schema.component || DataConfigPanelItem;
      const params = {
        paddingTitle: schema.name,
        advancedTitle: 'advancedTitle',
        dropdownList:
          schema?.options?.map((option) => ({ ...option })) ||
          fields.map((item) => ({ ...item })),
        onSelectChange: handleConfigurationChange(schema.mapTo),
        isSingleSelection: schema.isSingleSelection,
        selectedAxis: vizState[schema.mapTo] || schema?.defaultState,
        vizState,
        ...schema.props,
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
    <>
      <EuiAccordion
        initialIsOpen
        id={`configPanel__${sectionId}`}
        buttonContent={sectionName}
        paddingSize="s"
      >
        {dimensions}
     
      </EuiAccordion>
    </>
  );
};
