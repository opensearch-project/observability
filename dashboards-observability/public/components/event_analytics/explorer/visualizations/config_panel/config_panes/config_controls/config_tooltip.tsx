/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useMemo } from 'react';
import { EuiAccordion, EuiSpacer, htmlIdGenerator } from '@elastic/eui';
import { ButtonGroupItem } from './config_button_group';
import { IConfigPanelOptionSection } from '../../../../../../../../common/types/explorer';

export const ConfigTooltip = ({ schemas, vizState, handleConfigChange }: any) => {
  const handleConfigurationChange = useCallback(
    (stateFiledName) => {
      return (changes: any) => {
        handleConfigChange({
          ...vizState,
          [stateFiledName]: changes,
        });
      };
    },
    [handleConfigChange, vizState]
  );

  const dimensions = useMemo(() => {
    return schemas.map((schema: IConfigPanelOptionSection, index: number) => {
      const DimensionComponent = schema.component || ButtonGroupItem;
      const params = {
        title: schema.name,
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
      return (
        <div id={htmlIdGenerator('dimension__component')()}>
          <DimensionComponent key={`viz-series-${index}`} {...params} />
          <EuiSpacer size="s" />
        </div>
      );
    });
  }, [schemas, vizState, handleConfigurationChange]);

  return (
    <EuiAccordion
      initialIsOpen
      id={htmlIdGenerator('configPanel__tooltip')()}
      buttonContent="Tooltip options"
      paddingSize="s"
    >
      {dimensions}
    </EuiAccordion>
  );
};
