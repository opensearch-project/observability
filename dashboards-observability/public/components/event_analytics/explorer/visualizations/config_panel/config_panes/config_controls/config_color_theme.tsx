/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Fragment, useCallback } from 'react';
import {
  EuiButton,
  EuiAccordion,
  EuiFormRow,
  EuiColorPicker,
  EuiSpacer,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  htmlIdGenerator,
  EuiComboBox,
} from '@elastic/eui';
import { isEmpty } from 'lodash';
import { ADD_BUTTON_TEXT, AGGREGATIONS } from '../../../../../../../../common/constants/explorer';
import { VIS_CHART_TYPES } from '../../../../../../../../common/constants/shared';
import { getPropName } from '../../../../../../../components/event_analytics/utils/utils';

export const ConfigColorTheme = ({
  visualizations,
  schemas,
  vizState = [],
  handleConfigChange,
  sectionName = 'Color theme',
}: any) => {
  const { data, vis } = visualizations;
  const { defaultAxes = {} } = data;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;
  const { dataConfig = {} } = data?.userConfigs;
  const addButtonText = ADD_BUTTON_TEXT;
  const getColorThemeRow = () => ({
    ctid: htmlIdGenerator('ct')(),
    name: '',
    color: '#FC0505',
  });

  const options = (dataConfig[AGGREGATIONS] && dataConfig[AGGREGATIONS].length !== 0
    ? dataConfig[AGGREGATIONS]
    : vis.name === VIS_CHART_TYPES.Histogram
    ? defaultAxes.yaxis ?? []
    : fields
  ).map((item) => ({
    ...item,
    label: vis.name === VIS_CHART_TYPES.Histogram ? item.name : getPropName(item),
    className: 'color-theme-combo-box-option',
  }));

  const getUpdatedOptions = () =>
    options.filter((option) => !vizState.some((vizOpt) => option.label === vizOpt?.name?.label));

  const handleAddColorTheme = useCallback(() => {
    const res = isEmpty(vizState) ? [] : vizState;
    handleConfigChange([getColorThemeRow(), ...res]);
  }, [vizState, handleConfigChange]);

  const handleColorThemeChange = useCallback(
    (ctId, ctName) => (event) => {
      handleConfigChange([
        ...vizState.map((ct) => {
          if (ctId !== ct.ctid) return ct;
          return {
            ...ct,
            [ctName]: (ctName === 'color' ? event : event[0]) || '',
          };
        }),
      ]);
    },
    [vizState, handleConfigChange]
  );

  const handleColorThemeDelete = useCallback(
    (ctId) => (event) => handleConfigChange([...vizState.filter((ct) => ct.ctid !== ctId)]),
    [vizState, handleConfigChange]
  );
  return (
    <EuiAccordion
      initialIsOpen
      id={`configPanel__${sectionName}`}
      buttonContent={sectionName}
      paddingSize="s"
    >
      <EuiButton fullWidth size="s" onClick={handleAddColorTheme}>
        {addButtonText}
      </EuiButton>
      <EuiSpacer size="s" />
      {!isEmpty(vizState) &&
        vizState.map((ct) => {
          return (
            <Fragment key={ct.ctid}>
              <EuiFormRow fullWidth label="">
                <EuiFlexGroup alignItems="center" gutterSize="xs">
                  <EuiFlexItem grow={3}>
                    <EuiFormRow helpText="Color">
                      <EuiColorPicker
                        fullWidth
                        onChange={handleColorThemeChange(ct.ctid, 'color')}
                        color={ct.color}
                      />
                    </EuiFormRow>
                  </EuiFlexItem>
                  <EuiFlexItem grow={4}>
                    <EuiFormRow helpText="Field">
                      <EuiComboBox
                        id={ct.ctid}
                        placeholder="Select a field"
                        options={getUpdatedOptions()}
                        singleSelection
                        selectedOptions={ct.name !== '' ? [ct.name] : []}
                        onChange={handleColorThemeChange(ct.ctid, 'name')}
                        aria-label="Use aria labels when no actual label is in use"
                      />
                    </EuiFormRow>
                  </EuiFlexItem>
                  <EuiFlexItem grow={1}>
                    <EuiFormRow>
                      <EuiIcon type="trash" onClick={handleColorThemeDelete(ct.ctid)} />
                    </EuiFormRow>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFormRow>
            </Fragment>
          );
        })}
    </EuiAccordion>
  );
};
