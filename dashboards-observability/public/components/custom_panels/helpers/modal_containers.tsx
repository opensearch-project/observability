/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiOverlayMask, EuiConfirmModal } from '@elastic/eui';
import { CustomInputModal } from './custom_input_modal';
import { DASHBOARD_TITLE } from '../../../../common/constants/dashboards';

/* The file contains helper functions for modal layouts
 * getCustomModal - returns modal with input field
 * getCloneModal - returns a confirm-modal with clone option
 * getDeleteModal - returns a confirm-modal with delete option
 */

export const getCustomModal = (
  runModal:
    | ((value: string, value2: string, value3: string, value4: string) => void)
    | ((value: string) => void),
  closeModal: (
    event?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void,
  labelTxt: string,
  titletxt: string,
  btn1txt: string,
  btn2txt: string,
  openPanelName?: string,
  helpText?: string,
  optionalArgs?: string[]
) => {
  return (
    <CustomInputModal
      runModal={runModal}
      closeModal={closeModal}
      labelTxt={labelTxt}
      titletxt={titletxt}
      btn1txt={btn1txt}
      btn2txt={btn2txt}
      openPanelName={openPanelName}
      helpText={helpText}
      optionalArgs={optionalArgs}
    />
  );
};

export const getCloneModal = (
  onCancel: (
    event?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void,
  onConfirm: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
) => {
  return (
    <EuiOverlayMask>
      <EuiConfirmModal
        title={`Clone ${DASHBOARD_TITLE}`}
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel"
        confirmButtonText="Yes"
        defaultFocusedButton="confirm"
      >
        <p>Do you want to clone this ${DASHBOARD_TITLE}?</p>
      </EuiConfirmModal>
    </EuiOverlayMask>
  );
};

export const getDeleteModal = (
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
