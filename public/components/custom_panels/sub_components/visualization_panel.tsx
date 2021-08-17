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

import {
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiPopover,
  EuiText,
} from '@elastic/eui';
import React, { useState } from 'react';

// Visualization Panel module allows view added viz modules.

type Props = {
  visualizationId: string;
  visualizationTitle: string;
  fromTime?: string;
  toTime?: string;
};

export const VisualizationPanel = ({
  visualizationId,
  visualizationTitle,
  fromTime,
  toTime,
}: Props) => {
  const [isPopoverOpen1, setIsPopoverOpen1] = useState(false);

  const onButtonClick1 = () => setIsPopoverOpen1((isPopoverOpen1) => !isPopoverOpen1);
  const closePopover1 = () => setIsPopoverOpen1(false);

  return (
    <EuiPanel style={{ width: '100%', height: '100%' }}>
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiText grow={false}>
            <h5>{visualizationTitle}</h5>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiPopover
            button={<EuiButtonIcon iconType="boxesHorizontal" onClick={onButtonClick1} />}
            isOpen={isPopoverOpen1}
            closePopover={closePopover1}
            anchorPosition="downLeft"
          >
            Popover content
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
            
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
};
