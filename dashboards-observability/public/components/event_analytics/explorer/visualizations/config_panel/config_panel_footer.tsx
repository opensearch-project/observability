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
  EuiToolTip,
} from '@elastic/eui';

export const DefaultEditorControls = ({
  isInvalid,
  isDirty,
  onConfigUpdate,
  onConfigDiscard,
}: any) => {
  return (
    <div className="visEditorSidebar__controls">
      <EuiFlexGroup justifyContent="spaceBetween" gutterSize="none" responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiButtonEmpty
            data-test-subj="visualizeEditorResetButton"
            disabled={!isDirty}
            iconType="cross"
            onClick={onConfigDiscard}
            size="s"
          >
            Reset
          </EuiButtonEmpty>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          {isInvalid ? (
            <EuiToolTip content={'Errors in the highlighted fields need to be resolved.'}>
              <EuiButton color="danger" iconType="alert" size="s" disabled>
                Preview
              </EuiButton>
            </EuiToolTip>
          ) : (
            <EuiButton
              data-test-subj="visualizeEditorRenderButton"
              disabled={!isDirty}
              iconType="play"
              onClick={onConfigUpdate}
              size="s"
            >
              Preview
            </EuiButton>
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
