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

import React from 'react';
import { EuiIconTip } from '@elastic/eui';
import { i18n } from '@osd/i18n';

export function DocViewTableRowIconUnderscore() {
  const ariaLabel = i18n.translate(
    'discover.docViews.table.fieldNamesBeginningWithUnderscoreUnsupportedAriaLabel',
    {
      defaultMessage: 'Warning',
    }
  );
  const tooltipContent = i18n.translate(
    'discover.docViews.table.fieldNamesBeginningWithUnderscoreUnsupportedTooltip',
    {
      defaultMessage: 'Field names beginning with {underscoreSign} are not supported',
      values: { underscoreSign: '_' },
    }
  );

  return (
    <EuiIconTip
      aria-label={ariaLabel}
      content={tooltipContent}
      color="warning"
      iconProps={{
        className: 'osdDocViewer__warning',
        'data-test-subj': 'underscoreWarning',
      }}
      size="s"
      type="alert"
    />
  );
}
