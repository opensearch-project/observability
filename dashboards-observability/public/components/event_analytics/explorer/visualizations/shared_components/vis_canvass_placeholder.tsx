/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiIcon, EuiText, EuiSpacer } from '@elastic/eui';
import './empty_placeholder.scss';

export const VisCanvassPlaceholder = (props: { message: string; icon: string }) => (
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
        { props.message }
      </p>
    </EuiText>
  </>
);
