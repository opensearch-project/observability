/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiButtonIcon, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui';
import { isEmpty } from 'lodash';
import React from 'react';

export interface ParentUnitType {
  name: string;
  label: string;
  type: string;
}

export const ConfigTreemapParentFields = ({
  selectedAxis,
  setSelectedParentItem,
  handleUpdateParentFields,
}: any) => {
  const addButtonText = 'Add Parent';
  const initialParentState = {
    name: '',
    label: '',
    type: '',
  };

  const handleAddEditParent = (isAdd: boolean, index: number) => {
    if (isAdd) {
      handleUpdateParentFields([...selectedAxis, initialParentState]);
    }
    setSelectedParentItem({ index, isClicked: true });
  };

  const handleParentDelete = (index: number) => {
    handleUpdateParentFields([
      ...selectedAxis.slice(0, index),
      ...selectedAxis.slice(index + 1, selectedAxis.length),
    ]);
  };

  return (
    <>
      {!isEmpty(selectedAxis) &&
        selectedAxis.map((obj: ParentUnitType, index: number) => {
          return (
            <>
              <EuiSpacer size="s" />
              <EuiPanel key={index} paddingSize="s" className="panelItem_button">
                <EuiText
                  size="s"
                  className="field_text"
                  onClick={() => handleAddEditParent(false, index)}
                >
                  <a role="button" tabIndex={0}>
                    {obj.label !== '' ? obj.label : `Parent ${index + 1}`}
                  </a>
                </EuiText>
                <EuiButtonIcon
                  color="subdued"
                  iconType="cross"
                  aria-label="clear-field"
                  iconSize="s"
                  onClick={() => handleParentDelete(index)}
                />
              </EuiPanel>
            </>
          );
        })}
      <EuiSpacer size="s" />
      <EuiPanel className="panelItem_button" grow>
        <EuiText size="s">{addButtonText}</EuiText>
        <EuiButtonIcon
          iconType="plusInCircle"
          aria-label="clear-field"
          iconSize="s"
          color="primary"
          onClick={() => handleAddEditParent(true, selectedAxis.length)}
        />
      </EuiPanel>
    </>
  );
};
