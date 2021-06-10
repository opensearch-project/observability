/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import React from 'react';
import { EuiIcon } from '@elastic/eui';

export const DocDetailTitle : React.FC<any> = (props) => {
  return (
    <div className="euiFlexGroup euiFlexGroup--gutterLarge euiFlexGroup--directionRow euiFlexGroup--justifyContentSpaceBetween">
    <div className="euiFlexItem euiFlexItem--flexGrowZero euiText euiText--small">
      <div className="euiFlexGroup euiFlexGroup--gutterSmall euiFlexGroup--directionRow">
        <div className="euiFlexItem euiFlexItem--flexGrowZero">
          <EuiIcon type="folderOpen" size="m" />
        </div>
        <div className="euiFlexItem euiFlexItem--flexGrowZero">
          <h4
            data-test-subj="docTableRowDetailsTitle"
            className="euiTitle euiTitle--xsmall"
            i18n-id="discover.docTable.tableRow.detailHeading"
            i18n-default-message="Expanded document"
          >
            Expanded document
          </h4>
        </div>
      </div>
    </div>
    <div className="euiFlexItem euiFlexItem--flexGrowZero euiText euiText--small">
      <div className="euiFlexGroup euiFlexGroup--gutterLarge euiFlexGroup--directionRow">
        <div className="euiFlexItem euiFlexItem--flexGrowZero euiText euiText--small">
          <a
            className="euiLink"
            data-test-subj="docTableRowAction"
            i18n-id="discover.docTable.tableRow.viewSurroundingDocumentsLinkText"
            i18n-default-message="View surrounding documents"
          >
            surrounding documents
          </a>
        </div>
        <div className="euiFlexItem euiFlexItem--flexGrowZero euiText euiText--small">
          <a
            className="euiLink"
            data-test-subj="docTableRowAction"
            i18n-id="discover.docTable.tableRow.viewSingleDocumentLinkText"
            i18n-default-message="View single document"
          >
            single document
          </a>
        </div>
      </div>
    </div>
  </div>
  );
};