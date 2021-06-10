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
import { EuiSkipLink } from '@elastic/eui';
import { FormattedMessage, I18nProvider } from '@osd/i18n/react';

export interface SkipBottomButtonProps {
  /**
   * Action to perform on click
   */
  onClick: () => void;
}

export function SkipBottomButton({ onClick }: SkipBottomButtonProps) {
  return (
    <I18nProvider>
      <EuiSkipLink
        size="s"
        // @ts-ignore
        onClick={(event) => {
          // prevent the anchor to reload the page on click
          event.preventDefault();
          // The destinationId prop cannot be leveraged here as the table needs
          // to be updated first (angular logic)
          onClick();
        }}
        className="dscSkipButton"
        destinationId=""
        data-test-subj="discoverSkipTableButton"
      >
        <FormattedMessage
          id="discover.skipToBottomButtonLabel"
          defaultMessage="Skip to end of table"
        />
      </EuiSkipLink>
    </I18nProvider>
  );
}
