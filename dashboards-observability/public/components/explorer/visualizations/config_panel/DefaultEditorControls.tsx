/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiButtonEmpty,
  EuiButtonToggle,
  EuiToolTip,
} from '@elastic/eui';

export const DefaultEditorControls = ({ isInvalid, isDirty }: any) => {
  return (
    <div className="visEditorSidebar__controls">
      <EuiFlexGroup justifyContent="spaceBetween" gutterSize="none" responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiButtonEmpty
            data-test-subj="visualizeEditorResetButton"
            disabled={!isDirty}
            iconType="cross"
            onClick={() => {}}
            size="s"
          >
            Discard
          </EuiButtonEmpty>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          {isInvalid ? (
            <EuiToolTip content={'Errors in the highlighted fields need to be resolved.'}>
              <EuiButton color="danger" iconType="alert" size="s" disabled>
                Update
              </EuiButton>
            </EuiToolTip>
          ) : (
            <EuiButton
              data-test-subj="visualizeEditorRenderButton"
              disabled={!isDirty}
              fill
              iconType="play"
              onClick={() => {}}
              size="s"
            >
              Update
            </EuiButton>
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
