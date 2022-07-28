/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback, Fragment } from 'react';
import { EuiAccordion, EuiSpacer, EuiForm } from '@elastic/eui';
import { PanelItem } from './config_panel_item';
import { SPECTRUM, OPACITY } from '../../../../../../../../common/constants/colors';

export const ConfigChartOptions = ({
  visualizations,
  schemas,
  vizState,
  handleConfigChange,
}: any) => {
  const { data } = visualizations;
  const {  metadata: { fields = [] } = {}, tree_map } = data?.rawVizData;

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

  const currentSchemas = useMemo(() => {
    if (vizState.colorMode === undefined || vizState.colorMode[0].name === SPECTRUM) {
      return schemas.filter((schema) => schema.mapTo !== 'color');
    }
    if (vizState.colorMode && vizState.colorMode[0].name === OPACITY) {
      return schemas.filter((schema) => schema.mapTo !== 'scheme');
    }
    return schemas;
  }, [vizState]);

  const dimensions = useMemo(() => {
    return (
      currentSchemas &&
      currentSchemas.map((schema, index) => {
        let params = {
          title: schema.name,
          vizState,
          ...schema.props,
        };
        const DimensionComponent = schema.component || PanelItem;
        if (schema.eleType === 'palettePicker') {
          params = {
            ...params,
            colorPalettes: schema.options || [],
            selectedColor: vizState[schema.mapTo] || schema.defaultState,
            onSelectChange: handleConfigurationChange(schema.mapTo),
          };
        } else if (schema.eleType === 'singleColorPicker') {
          params = {
            ...params,
            selectedColor: vizState[schema.mapTo] || schema.defaultState,
            onSelectChange: handleConfigurationChange(schema.mapTo),
          };
        } else if (schema.eleType === 'colorpicker') {
          params = {
            ...params,
            selectedColor: vizState[schema.mapTo] || schema?.defaultState,
            colorPalettes: schema.options || [],
            onSelectChange: handleConfigurationChange(schema.mapTo),
          };
        } else if (schema.eleType === 'treemapColorPicker') {
          params = {
            ...params,
            selectedColor: vizState[schema.mapTo] || schema?.defaultState,
            colorPalettes: schema.options || [],
            numberOfParents:
              (tree_map?.dataConfig?.dimensions !== undefined &&
                tree_map?.dataConfig.dimensions[0].parentFields.length) | 0,
            onSelectChange: handleConfigurationChange(schema.mapTo),
          };
        } else if (schema.eleType === 'input') {
          params = {
            ...params,
            currentValue: vizState[schema.mapTo] || '',
            numValue: vizState[schema.mapTo] || '',
            handleInputChange: handleConfigurationChange(schema.mapTo),
          };
        } else if (schema.eleType === 'slider') {
          params = {
            ...params,
            maxRange: schema.props.max,
            currentRange: vizState[schema.mapTo] || schema?.defaultState,
            handleSliderChange: handleConfigurationChange(schema.mapTo),
          };
        } else if (schema.eleType === 'switchButton') {
          params = {
            ...params,
            title: schema.name,
            currentValue: vizState[schema.mapTo],
            onToggle: handleConfigurationChange(schema.mapTo),
          };
        } else if (schema.eleType === 'buttons') {
          params = {
            ...params,
            title: schema.name,
            legend: schema.name,
            groupOptions: schema?.props?.options.map((btn: { name: string }) => ({
              ...btn,
              label: btn.name,
            })),
            idSelected: vizState[schema.mapTo] || schema?.props?.defaultSelections[0]?.id,
            handleButtonChange: handleConfigurationChange(schema.mapTo),
          };
        } else {
          params = {
            ...params,
            paddingTitle: schema.name,
            advancedTitle: 'advancedTitle',
            dropdownList:
              schema?.options?.map((option) => ({ ...option })) ||
              fields.map((item) => ({ ...item })),
            onSelectChange: handleConfigurationChange(schema.mapTo),
            isSingleSelection: schema.isSingleSelection,
            selectedAxis: vizState[schema.mapTo] || schema.defaultState,
          };
        }

        return (
          <Fragment key={`viz-series-${index}`}>
            <EuiForm component="form">
              <DimensionComponent  {...params} />
              <EuiSpacer size="s" />
            </EuiForm>
          </Fragment>
        );
      })
    );
  }, [currentSchemas, vizState, handleConfigurationChange]);

  return (
    <EuiAccordion
      initialIsOpen
      id="configPanel__chartStyles"
      buttonContent="Chart Styles"
      paddingSize="s"
    >
      {dimensions}
    </EuiAccordion>
  );
};
