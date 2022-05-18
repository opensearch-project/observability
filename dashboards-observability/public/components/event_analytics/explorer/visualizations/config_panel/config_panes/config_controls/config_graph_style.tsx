/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback } from 'react';
import { EuiAccordion, EuiButtonGroup, EuiSpacer, EuiTitle } from '@elastic/eui';
import { PanelItem } from './config_panel_item';
import { visChartTypes } from 'common/constants/shared';

interface options {
  id: string;
  label: string;
}
interface Props {
  title: string
  legend: string
  options: options[]
  idSelected: string
  onChange: React.ChangeEvent<HTMLInputElement>
}


export const ConfigGraphStyle = ({
  visualizations,
  schemas,
  vizState,
  handleConfigChange,
  sectionName,
  sectionId
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

  const handleChange = (id) => {}
  const toggleStyeButtons = schemas[0].props.options.map((btn: any) => ({ id: btn.modeId, label: btn.name }));

 

  const EuiToggleButtonGroup: React.FC<Props> = ({ title, legend, options, idSelected, onChange }) => {
    return (
      <>
        <EuiTitle size="xxs">
          <h3>{title}</h3>
        </EuiTitle>
        <EuiSpacer size="m" />

        <EuiButtonGroup
          legend={legend}
          options={options}
          idSelected={idSelected}
          onChange={onChange}
        />
      </>)
  }
  console.log("schemas:", schemas);

  return (
    <EuiAccordion
      initialIsOpen
      id={`configPanel__${sectionId}`}
      buttonContent={sectionName}
      paddingSize="s"
    >
      <EuiToggleButtonGroup
        title="Style"
        legend="Line Style button group"
        options={toggleStyeButtons}
        idSelected={schemas[0].props.options[0].modeId}
        onChange={(id: string) => handleChange(id)}
      />

    </EuiAccordion>
  );
};
