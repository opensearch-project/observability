/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  EuiOverlayMask,
  EuiModal,
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';

export const DeleteModal = ({
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
          <EuiText>{message}</EuiText>
          <EuiText>The action cannot be undone.</EuiText>
          <EuiSpacer />
          <EuiForm>
            <EuiFormRow label={'To confirm deletion, enter "delete" in the text field'}>
              <EuiFieldText
                name="input"
                placeholder="delete"
                value={value}
                onChange={(e) => onChange(e)}
                data-test-subj="popoverModal__deleteTextInput"
              />
            </EuiFormRow>
          </EuiForm>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={onCancel}>Cancel</EuiButtonEmpty>
          <EuiButton
            onClick={() => onConfirm()}
            color="danger"
            fill
            disabled={value !== 'delete'}
            data-test-subj="popoverModal__deleteButton"
          >
            Delete
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );
};
