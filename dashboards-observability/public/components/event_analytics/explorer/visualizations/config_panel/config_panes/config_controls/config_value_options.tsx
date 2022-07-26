/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback } from 'react';
import { EuiAccordion, EuiSpacer } from '@elastic/eui';
import { PanelItem } from './config_panel_item';

export const ConfigValueOptions = ({
  visualizations,
  schemas,
  vizState,
  handleConfigChange,
  sectionName,
  sectionId = 'valueOptions',
}: any) => {
  const { data } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;
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
      const DimensionComponent = schema.component || PanelItem;
      let params = {
        title: schema.name,
        vizState,
        ...schema.props,
      };

      if (schema.eleType === 'buttons') {
        params = {
          legend: schema.name,
          groupOptions: schema?.props?.options.map((btn: { name: string }) => ({
            ...btn,
            label: btn.name,
          })),
          idSelected: vizState[schema.mapTo] || schema?.props?.defaultSelections[0]?.id,
          handleButtonChange: handleConfigurationChange(schema.mapTo),
          vizState,
          ...schema.props,
        };
      } else {
        params = {
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
      }
      return (
        <>
          <DimensionComponent key={`viz-series-${index}`} {...params} />
          <EuiSpacer size="s" />
        </>
      );
    });
  }, [schemas, fields, vizState, handleConfigurationChange]);

  return (
    <EuiAccordion
      initialIsOpen
      id={`configPanel__${sectionId}`}
      buttonContent={sectionName}
      paddingSize="s"
    >
      {dimensions}
    </EuiAccordion>
  );
};
