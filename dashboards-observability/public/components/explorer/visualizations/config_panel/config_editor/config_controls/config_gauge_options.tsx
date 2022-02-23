/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback } from 'react';
import { indexOf, toString } from 'lodash';
import { EuiAccordion, EuiSpacer } from '@elastic/eui';
import { PanelItem } from '../../configPanelItem';

export const ConfigGaugeValueOptions = ({
  visualizations,
  schemas,
  vizState,
  handleConfigChange,
  sectionName,
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

  const dropdownLists = {
    series: fields,
    value: [],
  };

  const numericalTypes = ['short', 'integer', 'long', 'float', 'double'];

  if (vizState?.series && vizState?.series[0]?.type) {
    dropdownLists.value = [
      ...vizData[vizState?.series[0]?.name].map((val) => ({
        name: indexOf(numericalTypes, vizState?.series[0]?.type) > 0 ? toString(val) : val,
        type: vizState?.series[0]?.type,
      })),
    ];
  }

  const dimensions = useMemo(() => {
    return schemas.map((schema, index) => {
      const DimensionComponent = schema.component || PanelItem;
      const params = {
        paddingTitle: schema.name,
        advancedTitle: 'advancedTitle',
        dropdownList: dropdownLists[schema.mapTo].map((item) => ({ ...item })),
        onSelectChange: handleConfigurationChange(schema.mapTo),
        isSingleSelection: schema.isSingleSelection,
        selectedAxis: vizState[schema.mapTo],
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
    <EuiAccordion
      initialIsOpen
      id={`configPanel__${sectionName}`}
      buttonContent={sectionName}
      paddingSize="s"
    >
      {dimensions}
    </EuiAccordion>
  );
};
