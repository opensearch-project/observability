/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Fragment, useCallback, useMemo } from 'react';
import { EuiAccordion, EuiSpacer } from '@elastic/eui';
import { ButtonGroupItem } from './config_button_group';
import { IConfigPanelOptionSection } from '../../../../../../../../common/types/explorer';
import { DefaultChartStyles } from '../../../../../../../../common/constants/shared';
import { FILTER_CHART_LEGEND_FIELDS } from '../../../../../../../../common/constants/explorer';

const { ShowLegend } = DefaultChartStyles;
export const ConfigLegend = ({ schemas, vizState, handleConfigChange }: any) => {
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
  /* filter out legend position and legend size if legend visibility is off*/
  const currentSchemas = useMemo(() => {
    if (vizState.hasOwnProperty('showLegend') && vizState.showLegend !== ShowLegend) {
      return schemas.filter(
        (schema: IConfigPanelOptionSection) => !FILTER_CHART_LEGEND_FIELDS.includes(schema.mapTo)
      );
    } else {
      return schemas;
    }
  }, [vizState]);

  const dimensions = useMemo(() => {
    return (
      currentSchemas &&
      currentSchemas.map((schema: IConfigPanelOptionSection, index: number) => {
        const DimensionComponent = schema.component || ButtonGroupItem;
        let params = {
          title: schema.name,
          vizState,
          ...schema.props,
        };
        if (schema.eleType === 'input') {
          params = {
            ...params,
            currentValue: vizState[schema.mapTo] || '',
            numValue: vizState[schema.mapTo] || '',
            handleInputChange: handleConfigurationChange(schema.mapTo),
          };
        } else {
          params = {
            ...params,
            legend: schema.name,
            groupOptions: schema?.props?.options.map((btn: { name: string }) => ({
              ...btn,
              label: btn.name,
            })),
            idSelected: vizState[schema.mapTo] || schema?.props?.defaultSelections[0]?.id,
            handleButtonChange: handleConfigurationChange(schema.mapTo),
          };
        }
        return (
          <Fragment key={`viz-series-${index}`}>
            <DimensionComponent {...params} />
            <EuiSpacer size="s" />
          </Fragment>
        );
      })
    );
  }, [schemas, vizState, handleConfigurationChange]);

  return (
    <EuiAccordion initialIsOpen id="configPanel__legend" buttonContent="Legend" paddingSize="s">
      {dimensions}
    </EuiAccordion>
  );
};
