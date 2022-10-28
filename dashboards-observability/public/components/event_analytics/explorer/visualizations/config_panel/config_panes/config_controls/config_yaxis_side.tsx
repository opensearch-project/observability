/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Fragment, useCallback } from 'react';
import {
  EuiButton,
  EuiAccordion,
  EuiFormRow,
  EuiSpacer,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  htmlIdGenerator,
  EuiComboBox,
} from '@elastic/eui';
import { isEmpty } from 'lodash';
import {
  ADD_SERIES_POSITION_TEXT,
  AGGREGATIONS,
  SERIES_POSITION_OPTIONS,
} from '../../../../../../../../common/constants/explorer';
import { getPropName } from '../../../../../utils/utils';

export const ConfigYAxisSide = ({
  visualizations,
  schemas,
  vizState = [],
  handleConfigChange,
  sectionName = 'Series position',
}: any) => {
  const { data } = visualizations;
  const { metadata: { fields = [] } = {} } = data?.rawVizData;
  const { dataConfig = {} } = data?.userConfigs;

  const options = (dataConfig[AGGREGATIONS] && dataConfig[AGGREGATIONS].length !== 0
    ? dataConfig[AGGREGATIONS]
    : fields
  ).map((optionItem) => ({
    ...optionItem,
    label: getPropName(optionItem),
    side: 'left',
    className: 'color-theme-combo-box-option',
    ctid: htmlIdGenerator('ct')(),
  }));

  const getUpdatedOptions = () =>
    options.filter((option) => !vizState.some((vizOpt) => option.label === vizOpt?.label));

  const handleColorThemeChange = useCallback(
    (ctId, ctName) => (event) => {
      const value = event.length ? event[0][ctName] : '';
      handleConfigChange([
        ...vizState.map((ct) => {
          if (ctId !== ct.ctid) return ct;
          return {
            ...ct,
            [ctName]: value,
          };
        }),
      ]);
    },
    [vizState, handleConfigChange]
  );

  const handleDeletePosition = useCallback(
    (ctId) => (event) => handleConfigChange([...vizState.filter((ct) => ct.ctid !== ctId)]),
    [vizState, handleConfigChange]
  );

  const handleAddPosition = useCallback(() => {
    const res = isEmpty(vizState)
      ? [options.length ? options[0] : { id: htmlIdGenerator('ct')(), label: '', side: 'left' }]
      : [
          ...vizState,
          ...options.filter((option) => !vizState.some((vizOpt) => option.label === vizOpt?.label)),
        ];
    handleConfigChange(res);
  }, [vizState, handleConfigChange]);

  return (
    <EuiAccordion
      initialIsOpen
      id={`configPanel__${sectionName}`}
      buttonContent={sectionName}
      paddingSize="s"
    >
      <EuiButton fullWidth size="s" onClick={handleAddPosition}>
        {ADD_SERIES_POSITION_TEXT}
      </EuiButton>
      <EuiSpacer size="s" />
      {!isEmpty(vizState) &&
        vizState.map((ct) => {
          return (
            <Fragment key={ct.ctid}>
              <EuiFormRow fullWidth label="">
                <EuiFlexGroup alignItems="center" gutterSize="xs">
                  <EuiFlexItem grow={4}>
                    <EuiFormRow helpText="Field">
                      <EuiComboBox
                        id={ct.ctid}
                        placeholder="Select a field"
                        options={getUpdatedOptions()}
                        singleSelection
                        selectedOptions={ct.label !== '' ? [ct] : []}
                        onChange={handleColorThemeChange(ct.ctid, 'label')}
                        aria-label="series-dropdown"
                      />
                    </EuiFormRow>
                  </EuiFlexItem>
                  <EuiFlexItem grow={3}>
                    <EuiFormRow helpText="Position">
                      <EuiComboBox
                        id={ct.ctid}
                        placeholder="Select position"
                        options={SERIES_POSITION_OPTIONS}
                        singleSelection
                        selectedOptions={
                          ct.side !== ''
                            ? SERIES_POSITION_OPTIONS.filter(
                                (positionItem) => positionItem.side === ct.side
                              )
                            : []
                        }
                        onChange={handleColorThemeChange(ct.ctid, 'side')}
                        aria-label="series-position-dropdown"
                      />
                    </EuiFormRow>
                  </EuiFlexItem>
                  <EuiFlexItem grow={1}>
                    <EuiFormRow>
                      <EuiIcon type="trash" onClick={handleDeletePosition(ct.ctid)} />
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
