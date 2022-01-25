/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  EuiOverlayMask,
  EuiConfirmModal,
} from '@elastic/eui';

/* The file contains helper functions for modal layouts
 * getClearModal - returns a confirm-modal with clear option
 */

export const getClearModal = (
  onCancel: (
    event?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void,
  onConfirm: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  title: string,
  message: string,
  confirmMessage?: string
) => {
  return (
    <EuiOverlayMask>
      <EuiConfirmModal
        title={title}
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel"
        confirmButtonText={confirmMessage || 'Delete'}
        buttonColor="danger"
        defaultFocusedButton="confirm"
      >
        {message}
      </EuiConfirmModal>
    </EuiOverlayMask>
  );
};
