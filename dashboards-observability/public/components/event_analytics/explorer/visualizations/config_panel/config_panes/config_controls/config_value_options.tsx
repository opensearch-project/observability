/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback } from 'react';
import { EuiAccordion, EuiSpacer } from '@elastic/eui';
import { PanelItem } from './config_panel_item';
import { TIMESTAMP, TIME_SERIES, X_AXIS } from '../../../../../../../../common/constants/explorer';

export const ConfigValueOptions = ({
  visualizations,
  schemas,
  vizState,
  handleConfigChange,
  sectionName,
  sectionId = 'valueOptions'
}: any) => {
  const { data, vis } = visualizations;
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
 
  const getDropdownList = (schema) => {
    let dropDownOptions = [];
    if (schema?.options) {
      dropDownOptions = schema?.options?.map((option) => ({ name: option }));
    } else if (vis.name === 'time_series') {
      // to filter out timestamp fields to category axis (xaxis)
      dropDownOptions = fields.filter((item) => schema.name === 'X-axis' ? item.type === 'timestamp' : item.type !== 'timestamp');
    } else {
      dropDownOptions = fields.map((item) => ({ ...item }));
    }
    return dropDownOptions;
  }

  // get dropDownOptions list
  // If chat is time-series then filter out timestamp fields to category axis (xaxis)
  const getDropdownList = (schema) => schema?.options?.map((option) => ({ name: option })) ||
    vis.name === TIME_SERIES ? fields.filter((item) => schema.name === X_AXIS ? item.type === TIMESTAMP : item.type !== TIMESTAMP)
    : fields.map((item) => ({ ...item }));

  const dimensions = useMemo(() => {
    return schemas.map((schema, index) => {
      const DimensionComponent = schema.component || PanelItem;
      const params = {
        paddingTitle: schema.name,
        advancedTitle: 'advancedTitle',
        dropdownList: getDropdownList(schema),
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
      id={`configPanel__${sectionId}`}
      buttonContent={sectionName}
      paddingSize="s"
    >
      {dimensions}
    </EuiAccordion>
  );
};
