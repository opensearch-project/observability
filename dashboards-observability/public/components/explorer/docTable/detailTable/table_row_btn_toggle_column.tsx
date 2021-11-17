/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FormattedMessage } from '@osd/i18n/react';
import { EuiToolTip, EuiButtonIcon } from '@elastic/eui';
import { i18n } from '@osd/i18n';

export interface Props {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function DocViewTableRowBtnToggleColumn({ onClick, active, disabled = false }: Props) {
  if (disabled) {
    return (
      <EuiButtonIcon
        aria-label={i18n.translate('discover.docViews.table.toggleColumnInTableButtonAriaLabel', {
          defaultMessage: 'Toggle column in table',
        })}
        className="osdDocViewer__actionButton"
        data-test-subj="toggleColumnButton"
        disabled
        iconType={'tableOfContents'}
        iconSize={'s'}
      />
    );
  }
  return (
    <EuiToolTip
      content={
        <FormattedMessage
          id="discover.docViews.table.toggleColumnInTableButtonTooltip"
          defaultMessage="Toggle column in table"
        />
      }
    >
      <EuiButtonIcon
        aria-label={i18n.translate('discover.docViews.table.toggleColumnInTableButtonAriaLabel', {
          defaultMessage: 'Toggle column in table',
        })}
        aria-pressed={active}
        onClick={onClick}
        className="osdDocViewer__actionButton"
        data-test-subj="toggleColumnButton"
        iconType={'tableOfContents'}
        iconSize={'s'}
      />
    </EuiToolTip>
  );
}
