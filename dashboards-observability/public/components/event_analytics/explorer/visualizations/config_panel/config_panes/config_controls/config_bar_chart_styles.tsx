/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback, Fragment } from 'react';
import { EuiAccordion, EuiSpacer } from '@elastic/eui';
import { ButtonGroupItem } from './config_button_group';
import { IConfigPanelOptionSection } from '../../../../../../../../common/types/explorer';

export const ConfigBarChartStyles = ({
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
    (stateFieldName) => {
      return (changes) => {
        handleConfigChange({
          ...vizState,
          [stateFieldName]: changes,
        });
      };
    },
    [handleConfigChange, vizState]
  );

  /* To update the schema options based on current style mode selection */
  const currentSchemas = useMemo(() => {
    if (vizState?.orientation === 'h') {
      return schemas.filter(
        (schema: IConfigPanelOptionSection) => schema.mapTo !== 'rotateBarLabels'
      );
    }
    return schemas;
  }, [vizState]);

  const dimensions = useMemo(
    () =>
      currentSchemas
        .map((schema: IConfigPanelOptionSection, index: number) => {
          let params = {
            title: schema.name,
            vizState,
            ...schema.props,
          };
          const DimensionComponent = schema.component || ButtonGroupItem;

          const createDimensionComponent = (dimProps) => (
            <Fragment key={`viz-series-${index}`}>
              <DimensionComponent {...dimProps} />
              <EuiSpacer size="s" />
            </Fragment>
          );
          if (schema.eleType === 'buttons') {
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
            return createDimensionComponent(params);
          }
          if (schema.eleType === 'input') {
            params = {
              title: schema.name,
              numValue: vizState[schema.mapTo] || '',
              handleInputChange: handleConfigurationChange(schema.mapTo),
              vizState,
              ...schema.props,
            };
            return createDimensionComponent(params);
          }
          if (schema.eleType === 'slider') {
            params = {
              ...params,
              minRange: schema?.props?.min || 0,
              maxRange: schema?.props?.max || 100,
              step: schema?.props?.step || 1,
              currentRange: vizState[schema.mapTo] || schema?.defaultState,
              ticks: schema?.props?.ticks,
              showTicks: schema?.props?.showTicks || false,
              handleSliderChange: handleConfigurationChange(schema.mapTo),
            };
            return createDimensionComponent(params);
          }
        })
        .filter((item) => item),
    [schemas, vizState, handleConfigurationChange]
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
