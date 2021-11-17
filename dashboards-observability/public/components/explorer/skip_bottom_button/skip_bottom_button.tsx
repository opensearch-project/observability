/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
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
