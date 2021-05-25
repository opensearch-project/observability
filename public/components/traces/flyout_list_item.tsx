/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import {
  EuiButtonIcon,
  EuiDescriptionList,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
  EuiToolTip,
} from '@elastic/eui';
import React, { useState } from 'react';

interface FlyoutListItemProps {
  title: React.ReactNode;
  description: React.ReactNode;
  addSpanFilter: () => void;
}

export function FlyoutListItem(props: FlyoutListItemProps) {
  const [hover, setHover] = useState(false);

  const descriptionComponent =
    props.description !== '-' ? (
      <EuiFlexGroup gutterSize="none">
        <EuiFlexItem>
          <EuiText size="s" style={{ wordBreak: 'break-all', wordWrap: 'break-word', whiteSpace: 'pre-line' }}>
            <b>{props.description}</b>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          {hover && (
            <EuiToolTip position="top" content="Filter spans on this value">
              <EuiButtonIcon
                aria-label="span-flyout-filter-icon"
                iconType="filter"
                onClick={props.addSpanFilter}
                style={{ margin: -5 }}
              />
            </EuiToolTip>
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
    ) : (
      <EuiText size="s" style={{ wordBreak: 'break-all', wordWrap: 'break-word', whiteSpace: 'pre-line' }}>
        <b>{props.description}</b>
      </EuiText>
    );
  return (
    <>
      <div onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <EuiDescriptionList
          listItems={[
            {
              title: (
                <EuiText
                  size="s"
                  color="subdued"
                  style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}
                >
                  {props.title}
                </EuiText>
              ),
              description: descriptionComponent,
            },
          ]}
          type="column"
          align="center"
          compressed
        />
      </div>
      <EuiSpacer size="s" />
    </>
  );
}
