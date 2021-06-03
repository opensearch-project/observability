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
