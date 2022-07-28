/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiCodeBlock } from '@elastic/eui';
import { i18n } from '@osd/i18n';
import { IDocType } from '../docViewRow';

export function JsonCodeBlock({ hit }: { hit: IDocType }) {
  const label = i18n.translate('discover.docViews.json.codeEditorAriaLabel', {
    defaultMessage: 'Read only JSON view of an elasticsearch document',
  });
  return (
    <EuiCodeBlock aria-label={label} language="json" isCopyable paddingSize="s">
      {JSON.stringify(hit, null, 2)}
    </EuiCodeBlock>
  );
}
