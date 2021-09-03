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

import { 
  EuiOverlayMask, 
  EuiModal, 
  EuiModalHeader, 
  EuiTitle, 
  EuiText, 
  EuiModalBody, 
  EuiSpacer, 
  EuiFlexGroup, 
  EuiFlexItem, 
  EuiLoadingSpinner, 
  EuiButton 
} from "@elastic/eui";
import React, { useState } from "react";

export function GenerateReportLoadingModal(props: { setShowLoading: any; }) {
  const {
    setShowLoading
  } = props;
  
  const [isModalVisible, setIsModalVisible] = useState(true);

  const closeModal = () => {
    setIsModalVisible(false);
    setShowLoading(false);
  };
  const showModal = () => setIsModalVisible(true);

  return (
    <div>
      <EuiOverlayMask>
        <EuiModal
          onClose={closeModal}
          style={{ maxWidth: 350, minWidth: 300 }}
          id="downloadInProgressLoadingModal"
        >
          <EuiModalHeader>
            <EuiTitle>
              <EuiText textAlign="right">
                <h2>Generating report</h2>
              </EuiText>
            </EuiTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiText>Preparing your file for download.</EuiText>
            <EuiText>
              You can close this dialog while we continue in the background.
            </EuiText>
            <EuiSpacer />
            <EuiFlexGroup justifyContent="center" alignItems="center">
              <EuiFlexItem grow={false}>
                <EuiLoadingSpinner
                  size="xl"
                  style={{ minWidth: 75, minHeight: 75 }}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="l" />
            <EuiFlexGroup alignItems="flexEnd" justifyContent="flexEnd">
              <EuiFlexItem grow={false}>
                <EuiButton onClick={closeModal}>Close</EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiModalBody>
        </EuiModal>
      </EuiOverlayMask>
    </div>
  );
};