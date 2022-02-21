/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback } from 'react';
import { EuiMarkdownEditor, EuiAccordion } from '@elastic/eui';

export const ConfigText = ({ visualizations, schemas, vizState, handleConfigChange }) => {
  const handleTextChange = useCallback(
    (stateFiledName) => {
      return (changes) => {
        handleConfigChange({
          ...vizState,
          [stateFiledName]: changes,
        });
      };
    },
    [handleConfigChange, vizState]
  );

  return (
    <EuiAccordion id="configPanel__textOptions" buttonContent="Text" paddingSize="s">
      <EuiMarkdownEditor
        aria-label="EUI markdown editor demo"
        placeholder="Your markdown here..."
        value={vizState.markdown || ''}
        onChange={handleTextChange('markdown')}
        height={400}
      />
    </EuiAccordion>
  );
};
