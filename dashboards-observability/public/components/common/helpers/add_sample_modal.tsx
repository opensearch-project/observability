/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiOverlayMask, EuiConfirmModal } from '@elastic/eui';

export const getSampleDataModal = (
  onCancel: (
    event?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void,
  onConfirm: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
) => {
  return (
    <EuiOverlayMask>
      <EuiConfirmModal
        title="Add samples"
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel"
        confirmButtonText="Yes"
        defaultFocusedButton="confirm"
      >
        <p>
          Do you want to add sample data? This will also add Dashboards sample flights and logs
          data if they have not been added.
        </p>
      </EuiConfirmModal>
    </EuiOverlayMask>
  );
};
