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
