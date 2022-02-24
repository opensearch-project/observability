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
} from '@elastic/eui';
import { uniqueId, isEmpty } from 'lodash';
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
      thid: uniqueId('thr'),
      name: '',
      color: '#FC0505',
      value: 0,
    };
  };

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
              [thrName]: event?.target?.value || event,
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
    <EuiAccordion id={`configPanel__${sectionName}`} buttonContent={sectionName} paddingSize="s">
      <EuiButton fullWidth size="s" onClick={handleAddThreshold}>
        {addButtonText}
      </EuiButton>
      <EuiSpacer size="s" />
      {!isEmpty(vizState) &&
        vizState.map((thr) => {
          return (
            <>
              <EuiFormRow fullWidth label="">
                <EuiFlexGroup>
                  <EuiFlexItem grow={5}>
                    <EuiFieldNumber
                      fullWidth
                      placeholder="Placeholder text"
                      value={thr.value || 0}
                      onChange={handleThresholdChange(thr.thid, 'value')}
                      aria-label="Use aria labels when no actual label is in use"
                    />
                  </EuiFlexItem>
                  <EuiFlexItem grow={5}>
                    <EuiColorPicker
                      fullWidth
                      onChange={handleThresholdChange(thr.thid, 'color')}
                      color={thr.color}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem grow={5}>
                    <EuiFieldText
                      onChange={handleThresholdChange(thr.thid, 'name')}
                      value={thr.name || ''}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem grow={2}>
                    <EuiIcon type="trash" onClick={handleThresholdDelete(thr.thid)} />
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFormRow>
            </>
          );
        })}
    </EuiAccordion>
  );
};
