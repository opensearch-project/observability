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
import { EuiIcon, EuiText, IconType, EuiSpacer } from '@elastic/eui';
import { FormattedMessage } from '@osd/i18n/react';

export const EmptyPlaceholder = (props: { icon: IconType }) => (
  <>
    <EuiText className="lnsChart__empty" textAlign="center" color="subdued" size="xs">
      <EuiIcon type={props.icon} color="subdued" size="l" />
      <EuiSpacer size="s" />
      <p>
        <FormattedMessage
          id="xpack.lens.xyVisualization.noDataLabel"
          defaultMessage="No results found"
        />
      </p>
    </EuiText>
  </>
);
