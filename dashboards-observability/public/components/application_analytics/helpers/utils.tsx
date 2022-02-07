/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { EuiDescriptionList, EuiSpacer, EuiText } from '@elastic/eui';
import React from 'react';

// Name validation
export const isNameValid = (name: string) => {
  const toast: string[] = [];
  if (name.length >= 50) {
    toast.push('Name must be less than 50 characters.');
  }
  if (name.trim().length === 0) {
    toast.push('Name must not be empty.');
  }
  return toast;
};

export const getListItem = (title: string, description: string | React.ReactElement) => {
  const titleComponent = (
    <EuiText size="s" color="subdued" style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
      {title}
    </EuiText>
  );

  const descriptionComponent = (
    <EuiText
      size="s"
      style={{ wordBreak: 'break-all', wordWrap: 'break-word', whiteSpace: 'pre-line' }}
    >
      <b>{description}</b>
    </EuiText>
  );

  return (
    <div key={`list-item-${title}`}>
      <EuiDescriptionList
        listItems={[
          {
            title: titleComponent,
            description: descriptionComponent || '-',
          },
        ]}
        type="column"
        align="center"
        compressed
      />
      <EuiSpacer size="s" />
    </div>
  );
};
