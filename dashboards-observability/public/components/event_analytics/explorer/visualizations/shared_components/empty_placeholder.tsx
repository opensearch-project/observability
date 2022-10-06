/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiIcon, EuiText, EuiSpacer } from '@elastic/eui';
import { FormattedMessage } from '@osd/i18n/react';
import './empty_placeholder.scss';

export const EmptyPlaceholder = (props: { icon: string }) => (
  <>
    <EuiText
      className="lnsChart__empty"
      textAlign="center"
      color="subdued"
      size="xs"
      data-test-subj="vizWorkspace__noData"
      style={{ height: '100%' }}
    >
      <EuiIcon type={props.icon} color="subdued" size="xxl" />
      <EuiSpacer size="l" />
      <p>
        <FormattedMessage id="visualization_noData" defaultMessage="No results found" />
      </p>
    </EuiText>
  </>
);
