/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback, Fragment } from 'react';
import { EuiAccordion, EuiSpacer } from '@elastic/eui';
import { ButtonGroupItem } from './config_button_group';
import { IConfigPanelOptionSection } from '../../../../../../../../common/types/explorer';
import { VIS_CHART_TYPES } from '../../../../../../../../common/constants/shared';

export const ConfigLineChartStyles = ({
  visualizations,
  schemas,
  vizState,
  handleConfigChange,
  sectionName,
  sectionId = 'chartStyles',
}: any) => {
  const { data } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;

  const handleConfigurationChange = useCallback(
    (stateFiledName, max) => {
      return (changes) => {
        if (!max || changes <= max) {
          handleConfigChange({
            ...vizState,
            [stateFiledName]: changes,
          });
        } else {
          handleConfigChange({
            ...vizState,
          });
        }
      };
    },
    [handleConfigChange, vizState]
  );

  /* To update the schema options based on current style mode selection */
  const currentSchemas = useMemo(() => {
    if (vizState?.style) {
      switch (vizState.style) {
        case 'lines':
          return schemas.filter(
            (schema: IConfigPanelOptionSection) => schema.mapTo !== 'pointSize'
          );
        case 'bar':
          return schemas.filter(
            (schema: IConfigPanelOptionSection) =>
              !['interpolation', 'pointSize'].includes(schema.mapTo)
          );
        case 'markers':
          return schemas.filter((schema: IConfigPanelOptionSection) =>
            ['style', 'pointSize'].includes(schema.mapTo)
          );
        case 'lines+markers':
          return schemas.filter(
            (schema: IConfigPanelOptionSection) => schema.mapTo !== 'interpolation'
          );
      }
    } else if (visualizations?.vis?.name === VIS_CHART_TYPES.Scatter) {
      return schemas.filter((schema: IConfigPanelOptionSection) =>
        ['style', 'pointSize'].includes(schema.mapTo)
      );
    } else {
      return schemas.filter((schema: IConfigPanelOptionSection) => schema.mapTo !== 'pointSize');
    }
  }, [vizState]);

  const dimensions = useMemo(
    () =>
      currentSchemas &&
      currentSchemas.map((schema: IConfigPanelOptionSection, index: number) => {
        const DimensionComponent = schema.component || ButtonGroupItem;
        let params = {
          title: schema.name,
          vizState,
          ...schema.props,
        };
        if (schema.eleType === 'buttons') {
          params = {
            ...params,
            legend: schema.name,
            groupOptions: schema?.props?.options.map((btn: { name: string }) => ({
              ...btn,
              label: btn.name,
            })),
            idSelected: vizState[schema.mapTo] || schema?.props?.defaultSelections[0]?.id,
            handleButtonChange: handleConfigurationChange(schema.mapTo, schema?.props?.max),
          };
        } else if (schema.eleType === 'slider') {
          params = {
            ...params,
            minRange: schema?.props?.min || 0,
            maxRange: schema?.props?.max || 100,
            step: schema?.props?.step || 1,
            currentRange: vizState[schema.mapTo] || schema?.defaultState,
            ticks: schema?.props?.ticks,
            showTicks: schema?.props?.showTicks || false,
            handleSliderChange: handleConfigurationChange(schema.mapTo, schema?.props?.max),
          };
        } else if (schema.eleType === 'input') {
          params = {
            ...params,
            numValue: vizState[schema.mapTo] || '',
            handleInputChange: handleConfigurationChange(schema.mapTo, schema?.props?.max),
          };
        }
        return (
          <Fragment key={`viz-series-${index}`}>
            <DimensionComponent {...params} />
            <EuiSpacer size="s" />
          </Fragment>
        );
      }),
    [currentSchemas, vizState, handleConfigurationChange]
  );

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
