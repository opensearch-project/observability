/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiButtonIcon, EuiLink, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui';
import { isEmpty } from 'lodash';
import React, { Fragment } from 'react';
import { ParentUnitType, TreemapParentsProps } from '../../../../../../../../common/types/explorer';

export const ConfigTreemapParentFields = ({
  selectedAxis,
  setSelectedParentItem,
  handleUpdateParentFields,
}: TreemapParentsProps) => {
  const addButtonText = 'Add Parent';
  const initialParentState = {
    name: '',
    label: '',
    type: '',
  };

  const handleAddParent = () => {
    const arr = [...selectedAxis, initialParentState];
    handleUpdateParentFields(arr);
    setSelectedParentItem({ index: arr.length - 1, isClicked: true });
  };

  const handleEditParent = (index: number) => {
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
            <Fragment key={index}>
              <EuiSpacer size="s" />
              <EuiPanel paddingSize="s" className="panelItem_button">
                <EuiText size="s" className="field_text">
                  <EuiLink role="button" tabIndex={0} onClick={() => handleEditParent(index)}>
                    {obj.label !== '' ? obj.label : `Parent ${index + 1}`}
                  </EuiLink>
                </EuiText>
                <EuiButtonIcon
                  color="subdued"
                  iconType="cross"
                  aria-label="clear-field"
                  iconSize="s"
                  onClick={() => handleParentDelete(index)}
                />
              </EuiPanel>
            </Fragment>
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
          onClick={handleAddParent}
        />
      </EuiPanel>
    </>
  );
};
