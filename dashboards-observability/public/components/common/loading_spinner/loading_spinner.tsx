/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiLoadingSpinner, EuiTitle, EuiSpacer } from '@elastic/eui';
import { FormattedMessage } from '@osd/i18n/react';

export function LoadingSpinner() {
  return (
    <>
      <EuiTitle size="s" data-test-subj="loadingSpinnerText">
        <h2>
          <FormattedMessage id="discover.searchingTitle" defaultMessage="Searching" />
        </h2>
      </EuiTitle>
      <EuiSpacer size="m" />
      <EuiLoadingSpinner size="l" data-test-subj="loadingSpinner" />
    </>
  );
}
