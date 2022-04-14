/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiIcon, EuiText, IconType, EuiSpacer } from '@elastic/eui';
import { FormattedMessage } from '@osd/i18n/react';

export const EmptyPlaceholder = (props: {icon: string}) => (
  <>
    <EuiText className="lnsChart__empty" textAlign="center" color="subdued" size="xs" data-test-subj="vizWorkspace__noData">
      <EuiIcon type={props.icon} color="subdued" size="l" />
      <EuiSpacer size="s" />
      <p>
        <FormattedMessage
          id="visualization_noData"
          defaultMessage="No results found"
        />
      </p>
    </EuiText>
  </>
);
