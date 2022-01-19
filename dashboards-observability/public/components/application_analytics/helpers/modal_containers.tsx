/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  EuiOverlayMask,
  EuiConfirmModal,
} from '@elastic/eui';
import { CustomInputModal } from '../../../../public/components/custom_panels/helpers/custom_input_modal';

/* The file contains helper functions for modal layouts
 * getDeleteModal - returns a confirm-modal with clear option
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