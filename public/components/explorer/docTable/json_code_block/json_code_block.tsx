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
import { EuiCodeBlock } from '@elastic/eui';
import { i18n } from '@osd/i18n';
// import { DocViewRenderProps } from '../../doc_views/doc_views_types';

export function JsonCodeBlock({ hit }: any) {
  const label = i18n.translate('discover.docViews.json.codeEditorAriaLabel', {
    defaultMessage: 'Read only JSON view of an elasticsearch document',
  });
  return (
    <EuiCodeBlock aria-label={label} language="json" isCopyable paddingSize="s">
      {JSON.stringify(hit, null, 2)}
    </EuiCodeBlock>
  );
}
