/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiButton,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiLink,
  EuiMarkdownFormat,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { PPL_DOCUMENTATION_URL } from '../../../../common/constants/shared';
import _ from 'lodash';
import React, { useState } from 'react';
import { FlyoutContainers } from '../flyout_containers';
import { Group1, Group2, Group3 } from './ppl_docs/groups';
import { overview } from './ppl_docs/overview';

type Props = {
  module: string;
  closeFlyout: () => void;
};

export const PPLReferenceFlyout = ({ module, closeFlyout }: Props) => {
  const allOptionsStatic = [{ label: 'Overview', value: overview }, Group1, Group2, Group3];
  const defaultOption =
    module === 'explorer' ? [allOptionsStatic[0]] : [_.find(Group1.options, ['label', 'where'])];
  const [selectedOptions, setSelected] = useState(defaultOption);
  const [flyoutContent, setFlyoutContent] = useState(
    <EuiMarkdownFormat>{defaultOption[0].value}</EuiMarkdownFormat>
  );

  const onChange = (selectedOptions: any) => {
    setSelected(selectedOptions);

    const newContent = selectedOptions.map((option: EuiComboBoxOptionOption<string>) => (
      <EuiMarkdownFormat>{option.value}</EuiMarkdownFormat>
    ));
    setFlyoutContent(newContent);
  };

  const flyoutHeader = (
    <EuiFlyoutHeader hasBorder>
      <EuiTitle size="m">
        <h2 id="pplReferenceFlyout">OpenSearch PPL Reference Manual</h2>
      </EuiTitle>
    </EuiFlyoutHeader>
  );

  const flyoutBody = (
    <EuiFlyoutBody>
      <EuiFlexGroup component="span">
        <EuiFlexItem>
          <EuiComboBox
            placeholder="Refer commands, functions and language structures"
            options={allOptionsStatic}
            selectedOptions={selectedOptions}
            onChange={onChange}
          />
        </EuiFlexItem>
        <EuiFlexItem style={{ justifyContent: 'center' }}>
          <EuiText size="s" color="subdued">
            <EuiLink target="_blank" href={PPL_DOCUMENTATION_URL} external>
              Learn More
            </EuiLink>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="l" />
      {flyoutContent}
    </EuiFlyoutBody>
  );

  const flyoutFooter = (
    <EuiFlyoutFooter>
      <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiButton onClick={closeFlyout}>Close</EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlyoutFooter>
  );

  return (
    <FlyoutContainers
      closeFlyout={closeFlyout}
      flyoutHeader={flyoutHeader}
      flyoutBody={flyoutBody}
      flyoutFooter={flyoutFooter}
      ariaLabel="pplReferenceFlyout"
    />
  );
};
