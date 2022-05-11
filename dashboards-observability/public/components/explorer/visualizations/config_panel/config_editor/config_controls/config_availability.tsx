/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback } from 'react';
import {
  EuiButton,
  EuiAccordion,
  EuiFormRow,
  EuiFieldNumber,
  EuiColorPicker,
  EuiSpacer,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldText,
  EuiSelect,
  htmlIdGenerator,
} from '@elastic/eui';
import { isEmpty } from 'lodash';
import { PPL_SPAN_REGEX } from '../../../../../../../common/constants/shared';

export interface AvailabilityUnitType {
  thid: string;
  name: string;
  color: string;
  value: number;
  expression: string;
}

export const ConfigAvailability = ({ visualizations, onConfigChange, vizState = {} }: any) => {
  const addButtonText = '+ Add availability level';
  const getAvailabilityUnit = () => {
    return {
      thid: htmlIdGenerator('avl')(),
      name: '',
      color: '#FC0505',
      value: 0,
      expression: '≥',
    };
  };

  const expressionOptions = [
    { value: '≥', text: '≥' },
    { value: '≤', text: '≤' },
    { value: '>', text: '>' },
    { value: '<', text: '<' },
    { value: '=', text: '=' },
    { value: '≠', text: '≠' },
  ];

  const hasSpanInApp =
    visualizations.data.query.finalQuery.search(PPL_SPAN_REGEX) > 0 &&
    visualizations.data.appData.fromApp &&
    ['bar', 'line'].includes(visualizations.vis.id);

  const handleConfigChange = useCallback(
    (changes: any) => {
      onConfigChange({
        ...vizState,
        level: changes,
      });
    },
    [onConfigChange, vizState]
  );

  const handleAddAvailability = useCallback(() => {
    let res = vizState.level;
    if (isEmpty(vizState.level)) res = [];
    handleConfigChange([getAvailabilityUnit(), ...res]);
  }, [vizState, handleConfigChange]);

  const handleAvailabilityChange = useCallback(
    (thrId, thrName) => {
      return (event: any) => {
        handleConfigChange([
          ...vizState.level.map((th: AvailabilityUnitType) => {
            if (thrId !== th.thid) return th;
            return {
              ...th,
              [thrName]: (thrName === 'color' ? event : event?.target?.value) || '',
            };
          }),
        ]);
      };
    },
    [vizState, handleConfigChange]
  );

  const handleAvailabilityDelete = useCallback(
    (thrId) => {
      return (event: any) => {
        handleConfigChange([
          ...vizState.level.filter((th: AvailabilityUnitType) => th.thid !== thrId),
        ]);
      };
    },
    [vizState, handleConfigChange]
  );

  return (
    <>
      <EuiSpacer />
      <EuiAccordion
        initialIsOpen
        id={`configPanel__Availability`}
        buttonContent={'Availability'}
        paddingSize="s"
      >
        <EuiButton
          fullWidth
          data-test-subj="addAvailabilityButton"
          size="s"
          onClick={handleAddAvailability}
          disabled={!hasSpanInApp}
        >
          {addButtonText}
        </EuiButton>
        <EuiSpacer size="s" />
        {!isEmpty(vizState.level) &&
          vizState.level.map((thr: AvailabilityUnitType) => {
            return (
              <>
                <EuiFormRow fullWidth label="">
                  <EuiFlexGroup alignItems="center" gutterSize="xs">
                    <EuiFlexItem grow={3}>
                      <EuiFormRow helpText="color">
                        <EuiColorPicker
                          fullWidth
                          onChange={handleAvailabilityChange(thr.thid, 'color')}
                          color={thr.color}
                        />
                      </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem grow={5}>
                      <EuiFormRow helpText="name">
                        <EuiFieldText
                          onChange={handleAvailabilityChange(thr.thid, 'name')}
                          value={thr.name || ''}
                          arial-label="Input availability name"
                          data-test-subj="nameFieldText"
                        />
                      </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFormRow helpText="expression">
                      <EuiFlexItem grow={4}>
                        <EuiSelect
                          options={expressionOptions}
                          value={thr.expression || ''}
                          onChange={handleAvailabilityChange(thr.thid, 'expression')}
                          aria-label="Select availability expression"
                          data-test-subj="expressionSelect"
                        />
                      </EuiFlexItem>
                    </EuiFormRow>
                    <EuiFlexItem grow={5}>
                      <EuiFormRow helpText="value">
                        <EuiFieldNumber
                          fullWidth
                          placeholder="availability value"
                          value={thr.value || 0}
                          onChange={handleAvailabilityChange(thr.thid, 'value')}
                          aria-label="Input availability value"
                          data-test-subj="valueFieldNumber"
                        />
                      </EuiFormRow>
                    </EuiFlexItem>
                    <EuiFlexItem grow={1}>
                      <EuiFormRow>
                        <EuiIcon type="trash" onClick={handleAvailabilityDelete(thr.thid)} />
                      </EuiFormRow>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFormRow>
              </>
            );
          })}
      </EuiAccordion>
    </>
  );
};
