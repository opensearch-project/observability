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
