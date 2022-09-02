/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback, Fragment } from 'react';
import { indexOf } from 'lodash';
import { EuiAccordion, EuiSpacer } from '@elastic/eui';
import { PanelItem } from './config_panel_item';
import { NUMERICAL_FIELDS } from '../../../../../../../../common/constants/shared';

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

  if (vizState?.series && vizState?.series[0]?.type) {
    if (indexOf(NUMERICAL_FIELDS, vizState?.series[0]?.type) > 0) {
      dropdownLists.value = [...fields];
    } else {
      dropdownLists.value = [
        ...vizData[vizState?.series[0]?.name].map((val) => ({
          name: val,
          type: vizState?.series[0]?.type,
        })),
      ];
    }
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
        <Fragment key={`viz-series-${index}`}>
          <DimensionComponent  {...params} />
          <EuiSpacer size="s" />
        </Fragment>
      );
    });
  }, [schemas, vizState, handleConfigurationChange, dropdownLists]);

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
