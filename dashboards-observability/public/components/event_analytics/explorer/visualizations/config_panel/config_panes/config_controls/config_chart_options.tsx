/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback, Fragment } from 'react';
import { EuiAccordion, EuiSpacer, EuiForm } from '@elastic/eui';
import { PanelItem } from './config_panel_item';
import { SPECTRUM, OPACITY } from '../../../../../../../../common/constants/colors';
import {
  ConfigChartOptionsEnum,
  NUMBER_INPUT_MIN_LIMIT,
} from '../../../../../../../../common/constants/explorer';

export const ConfigChartOptions = ({
  visualizations,
  schemas,
  vizState,
  handleConfigChange,
}: any) => {
  const { data } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {}, tree_map } = data?.rawVizData;

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

        switch (schema.eleType) {
          case ConfigChartOptionsEnum.palettePicker:
            params = {
              ...params,
              colorPalettes: schema.options || [],
              selectedColor: vizState[schema.mapTo] || schema.defaultState,
              onSelectChange: handleConfigurationChange(schema.mapTo, schema?.props?.max),
            };
            break;

          case ConfigChartOptionsEnum.singleColorPicker:
            params = {
              ...params,
              selectedColor: vizState[schema.mapTo] || schema.defaultState,
              onSelectChange: handleConfigurationChange(schema.mapTo, schema?.props?.max),
            };
            break;

          case ConfigChartOptionsEnum.colorpicker:
            params = {
              ...params,
              selectedColor: vizState[schema.mapTo] || schema?.defaultState,
              colorPalettes: schema.options || [],
              onSelectChange: handleConfigurationChange(schema.mapTo, schema?.props?.max),
            };
            break;

          case ConfigChartOptionsEnum.treemapColorPicker:
            params = {
              ...params,
              selectedColor: vizState[schema.mapTo] || schema?.defaultState,
              colorPalettes: schema.options || [],
              numberOfParents:
                (tree_map?.dataConfig?.dimensions !== undefined &&
                  tree_map?.dataConfig.dimensions[0].parentFields.length) | 0,
              onSelectChange: handleConfigurationChange(schema.mapTo, schema?.props?.max),
            };
            break;

          case ConfigChartOptionsEnum.input:
            params = {
              ...params,
              currentValue: vizState[schema.mapTo] || '',
              numValue: vizState[schema.mapTo] || '',
              handleInputChange: handleConfigurationChange(schema.mapTo, schema?.props?.max),
              minLimit: schema.props?.hasOwnProperty('minLimit')
                ? schema.props.minLimit
                : NUMBER_INPUT_MIN_LIMIT,
            };
            break;

          case ConfigChartOptionsEnum.textInput:
            params = {
              ...params,
              currentValue: vizState[schema.mapTo] || '',
              name: schema.mapTo,
              handleInputChange: handleConfigurationChange(schema.mapTo, schema?.props?.max),
            };
            break;

          case ConfigChartOptionsEnum.slider:
            params = {
              ...params,
              maxRange: schema.props.max,
              currentRange: vizState[schema.mapTo] || schema?.defaultState,
              handleSliderChange: handleConfigurationChange(schema.mapTo, schema?.props?.max),
            };
            break;

          case ConfigChartOptionsEnum.switchButton:
            params = {
              ...params,
              title: schema.name,
              currentValue: vizState[schema.mapTo],
              onToggle: handleConfigurationChange(schema.mapTo, schema?.props?.max),
            };
            break;

          case ConfigChartOptionsEnum.buttons:
            params = {
              ...params,
              title: schema.name,
              legend: schema.name,
              groupOptions: schema?.props?.options.map((btn: { name: string }) => ({
                ...btn,
                label: btn.name,
              })),
              idSelected: vizState[schema.mapTo] || schema?.props?.defaultSelections[0]?.id,
              handleButtonChange: handleConfigurationChange(schema.mapTo, schema?.props?.max),
            };
            break;

          default:
            params = {
              ...params,
              paddingTitle: schema.name,
              advancedTitle: 'advancedTitle',
              dropdownList: schema?.options || fields,
              onSelectChange: handleConfigurationChange(schema.mapTo, schema?.props?.max),
              isSingleSelection: schema.isSingleSelection,
              selectedAxis: vizState[schema.mapTo] || schema.defaultState,
            };
            break;
        }

        return (
          <Fragment key={`viz-series-${index}`}>
            <EuiForm component="form">
              <DimensionComponent {...params} />
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
      buttonContent="Chart styles"
      paddingSize="s"
    >
      {dimensions}
    </EuiAccordion>
  );
};
