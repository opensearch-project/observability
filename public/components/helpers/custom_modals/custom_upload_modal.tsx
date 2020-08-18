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
  EuiButton,
  EuiFilePicker,
} from '@elastic/eui';

/*
 * "CustomUploadModalProps" component is used to create a modal with an upload json file functionality
 *
 * Props taken in as params are:
 * runModal - function to fetch input field value and trigger closing modal
 * closeModal - function to trigger closing modal
 */
type CustomUploadModalProps = {
  runModal: (file: FileList) => void;
  closeModal: (
    event?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};
export const CustomUploadModal = (props: CustomUploadModalProps) => {
  const { runModal, closeModal } = props;
  const [allowUpload, setAllowUpload] = useState(false); // Boolean to allow upload
  const [file, setFiles] = useState(null); // sets uploaded file

  const fileChange = (file: FileList) => {
    setFiles(file);
    if (file.length > 0 && file[0].name.split('.').pop() === 'json') {
      setAllowUpload(true);
    } else {
      setAllowUpload(false);
    }
  };

  return (
    <EuiOverlayMask>
      <EuiModal onClose={closeModal} initialFocus="[name=input]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>Upload Notebook File</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <EuiForm>
            <EuiFormRow label="Import File">
              <EuiFilePicker
                id="filepick"
                initialPromptText="Select or drag a file"
                onChange={(file) => fileChange(file)}
              />
            </EuiFormRow>
          </EuiForm>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>
          <EuiButton isDisabled={!allowUpload} onClick={() => runModal(file)} fill>
            Upload
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );
};
