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

export function DocViewTableRowIconNoMapping() {
  const ariaLabel = i18n.translate('discover.docViews.table.noCachedMappingForThisFieldAriaLabel', {
    defaultMessage: 'Warning',
  });
  const tooltipContent = i18n.translate(
    'discover.docViews.table.noCachedMappingForThisFieldTooltip',
    {
      defaultMessage:
        'No cached mapping for this field. Refresh field list from the Management > Index Patterns page',
    }
  );
  return (
    <EuiIconTip
      aria-label={ariaLabel}
      color="warning"
      content={tooltipContent}
      iconProps={{
        className: 'osdDocViewer__warning',
        'data-test-subj': 'noMappingWarning',
      }}
      size="s"
      type="alert"
    />
  );
}
