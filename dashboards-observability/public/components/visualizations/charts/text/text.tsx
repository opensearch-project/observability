/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiMarkdownFormat } from '@elastic/eui';

const DEFAULT_MARKDOWN = `## Text

Welcome to text editor!

With text editor, you are able to add text description(s) to your dashboards.`;

export const Text = ({ visualizations }: any) => {
  const { dataConfig = {} } = visualizations?.data?.userConfigs;

  return (
    <div data-test-subj="workspace__viz_markdown">
      <EuiMarkdownFormat>
        {dataConfig.text?.markdown ? dataConfig.text?.markdown : DEFAULT_MARKDOWN}
      </EuiMarkdownFormat>
    </div>
  );
};
