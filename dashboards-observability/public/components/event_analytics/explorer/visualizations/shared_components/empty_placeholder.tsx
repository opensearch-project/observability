/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiIcon, EuiText, EuiSpacer } from '@elastic/eui';
import { FormattedMessage } from '@osd/i18n/react';
import './empty_placeholder.scss';

export const EmptyPlaceholder = (props: { icon: string; customMessage?: string }) => (
  <>
    <EuiText
      className="lnsChart__empty"
      textAlign="center"
      color="subdued"
      size="xs"
      data-test-subj="vizWorkspace__noData"
    >
      <EuiIcon type={props.icon} color="subdued" size="xxl" />
      <EuiSpacer size="l" />
      <p>
        <FormattedMessage
          id="visualization_noData"
          defaultMessage={
            props.customMessage === undefined ? 'No results found' : props.customMessage
          }
        />
      </p>
    </EuiText>
  </>
);
