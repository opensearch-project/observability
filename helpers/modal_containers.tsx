/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import React from 'react';
import { EuiOverlayMask, EuiConfirmModal } from '@elastic/eui';
import { CustomInputModal } from './custom_modals/custom_input_modal';

/* The file contains helper functions for modal layouts
 * getCustomModal - returns modal with input field
 * getCloneModal - returns a confirm-modal with clone option
 * getDeleteModal - returns a confirm-modal with delete option
 */

export const getCustomModal = (
  runModal: (value: string) => void,
  closeModal: (
    event?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void,
  labelTxt: string,
  titletxt: string,
  btn1txt: string,
  btn2txt: string,
  openNoteName?: string
) => {
  return (
    <CustomInputModal
      runModal={runModal}
      closeModal={closeModal}
      labelTxt={labelTxt}
      titletxt={titletxt}
      btn1txt={btn1txt}
      btn2txt={btn2txt}
      openNoteName={openNoteName}
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
        title="Clone Notebook"
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel"
        confirmButtonText="Yes"
        defaultFocusedButton="confirm"
      >
        <p>Do you want to clone this notebook?</p>
      </EuiConfirmModal>
    </EuiOverlayMask>
  );
};

export const getDeleteModal = (
  onCancel: (
    event?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void,
  onConfirm: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
) => {
  return (
    <EuiOverlayMask>
      <EuiConfirmModal
        title="Delete Notebook"
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel"
        confirmButtonText="Yes, Delete"
        buttonColor="danger"
        defaultFocusedButton="confirm"
      >
        <p>Are you sure you want to delete this notebook?</p>
      </EuiConfirmModal>
    </EuiOverlayMask>
  );
};
