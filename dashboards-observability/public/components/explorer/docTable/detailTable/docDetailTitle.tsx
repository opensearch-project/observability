/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
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