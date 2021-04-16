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

import React, { useState } from 'react';
import {
  EuiButtonEmpty,
  EuiForm,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiFormRow,
  EuiFieldText,
  EuiButton,
} from '@elastic/eui';

/*
 * "CustomInputModalProps" component is used to create a modal with an input filed
 *
 * Props taken in as params are:
 * runModal - function to fetch input field value and trigger closing modal
 * closeModal - function to trigger closing modal
 * titletxt - string as header for title of modal
 * labelTxt - string as header for input field
 * btn1txt - string as content to fill "close button"
 * btn2txt - string as content to fill "confirm button"
 * openNoteName - Default input value for the field
 */
type CustomInputModalProps = {
  runModal: (value: string) => void;
  closeModal: (
    event?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  labelTxt: string;
  titletxt: string;
  btn1txt: string;
  btn2txt: string;
  openNoteName: string;
  helpText: string;
};

export const CustomInputModal = (props: CustomInputModalProps) => {
  const { runModal, closeModal, labelTxt, titletxt, btn1txt, btn2txt, openNoteName, helpText } = props;
  const [value, setValue] = useState(openNoteName || ''); // sets input value

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <EuiOverlayMask>
      <EuiModal onClose={closeModal} initialFocus="[name=input]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>{titletxt}</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <EuiForm>
            <EuiFormRow label={labelTxt} helpText={helpText}>
              <EuiFieldText name="input" value={value} onChange={(e) => onChange(e)} />
            </EuiFormRow>
          </EuiForm>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={closeModal}>{btn1txt}</EuiButtonEmpty>
          <EuiButton onClick={() => runModal(value)} fill>
            {btn2txt}
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );
};
