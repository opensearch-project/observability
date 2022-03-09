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

export const ConfigThresholds = ({
  visualizations,
  schemas,
  vizState = [],
  handleConfigChange,
  sectionName = 'Thresholds',
}: any) => {
  let addButtonText = '+ Add threadshold';
  const getThresholdUnit = () => {
    return {
      thid: htmlIdGenerator('thr'),
      name: '',
      color: '#FC0505',
      value: 0,
      ...(hasSpanInApp && { expression: '=' }),
    };
  };

  const expressionOptions = [
    { value: '>', text: '>' },
    { value: '<', text: '<' },
    { value: '=', text: '=' },
  ];

  const hasSpanInApp =
    visualizations.data.query.finalQuery.search(PPL_SPAN_REGEX) > 0 &&
    visualizations.data.appData.fromApp;
  if (hasSpanInApp) {
    sectionName = 'Availability Levels';
    addButtonText = '+ Add availability level';
  }

  const handleAddThreshold = useCallback(() => {
    let res = vizState;
    if (isEmpty(vizState)) res = [];
    handleConfigChange([getThresholdUnit(), ...res]);
  }, [vizState, handleConfigChange]);

  const handleThresholdChange = useCallback(
    (thrId, thrName) => {
      return (event) => {
        handleConfigChange([
          ...vizState.map((th) => {
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

  const handleThresholdDelete = useCallback(
    (thrId) => {
      return (event) => {
        handleConfigChange([...vizState.filter((th) => th.thid !== thrId)]);
      };
    },
    [vizState, handleConfigChange]
  );

  return (
    <EuiAccordion
      initialIsOpen
      id={`configPanel__${sectionName}`}
      buttonContent={sectionName}
      paddingSize="s"
    >
      <EuiButton fullWidth size="s" onClick={handleAddThreshold}>
        {addButtonText}
      </EuiButton>
      <EuiSpacer size="s" />
      {!isEmpty(vizState) &&
        vizState.map((thr) => {
          return (
            <>
              <EuiFormRow fullWidth label="">
                <EuiFlexGroup alignItems="center" gutterSize="xs">
                  <EuiFlexItem grow={3}>
                    <EuiFormRow helpText="color">
                      <EuiColorPicker
                        fullWidth
                        onChange={handleThresholdChange(thr.thid, 'color')}
                        color={thr.color}
                      />
                    </EuiFormRow>
                  </EuiFlexItem>
                  <EuiFlexItem grow={5}>
                    <EuiFormRow helpText="name">
                      <EuiFieldText
                        onChange={handleThresholdChange(thr.thid, 'name')}
                        value={thr.name || ''}
                        arial-label="Input threshold name"
                        data-test-subj="nameFieldText"
                      />
                    </EuiFormRow>
                  </EuiFlexItem>
                  {hasSpanInApp && (
                    <EuiFormRow helpText="expression">
                      <EuiFlexItem grow={4}>
                        <EuiSelect
                          options={expressionOptions}
                          value={thr.expression || ''}
                          onChange={handleThresholdChange(thr.thid, 'expression')}
                          aria-label="Select threshold expression"
                          data-test-subj="expressionSelect"
                        />
                      </EuiFlexItem>
                    </EuiFormRow>
                  )}
                  <EuiFlexItem grow={5}>
                    <EuiFormRow helpText="value">
                      <EuiFieldNumber
                        fullWidth
                        placeholder="threshold value"
                        value={thr.value}
                        onChange={handleThresholdChange(thr.thid, 'value')}
                        aria-label="Input threshold value"
                        data-test-subj="valueFieldNumber"
                      />
                    </EuiFormRow>
                  </EuiFlexItem>
                  <EuiFlexItem grow={1}>
                    <EuiFormRow>
                      <EuiIcon type="trash" onClick={handleThresholdDelete(thr.thid)} />
                    </EuiFormRow>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFormRow>
            </>
          );
        })}
    </EuiAccordion>
  );
};
