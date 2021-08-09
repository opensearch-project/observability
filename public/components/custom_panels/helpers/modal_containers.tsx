/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import React, { useState } from 'react';
import {
  EuiOverlayMask,
  EuiConfirmModal,
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiText,
  EuiSpacer
} from '@elastic/eui';
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
  openPanelName?: string,
  helpText?: string,
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
        title="Clone custom panel"
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel"
        confirmButtonText="Yes"
        defaultFocusedButton="confirm"
      >
        <p>Do you want to clone this custom panel?</p>
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
  confirmMessage?: string,
) => {
  return (
    <EuiOverlayMask>
      <EuiConfirmModal
        title={title}
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel"
        confirmButtonText={confirmMessage || "Delete"}
        buttonColor="danger"
        defaultFocusedButton="confirm"
      >
        {message}
      </EuiConfirmModal>
    </EuiOverlayMask>
  );
};

export const DeletePanelModal = ({
  onCancel,
  onConfirm,
  title,
  message,
}: {
  onCancel: (
    event?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onConfirm: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title: string;
  message: string;
}) => {
  const [value, setValue] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <EuiOverlayMask>
      <EuiModal onClose={onCancel} initialFocus="[name=input]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>{title}</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <EuiText>
            {message}
          </EuiText>
          <EuiText>
            The action cannot be undone.
          </EuiText>
          <EuiSpacer />
          <EuiForm>
            <EuiFormRow label={"To confirm deletion, enter \"delete\" in the text field"}>
              <EuiFieldText name="input" placeholder="delete" value={value} onChange={(e) => onChange(e)} />
            </EuiFormRow>
          </EuiForm>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={onCancel}>Cancel</EuiButtonEmpty>
          <EuiButton
            onClick={() => onConfirm()}
            color="danger"
            fill
            disabled={value !== 'delete'}>
            Delete
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );
};
