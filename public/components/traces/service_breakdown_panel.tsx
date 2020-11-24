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
  EuiFlexGroup,
  EuiFlexItem,
  EuiHealth,
  EuiHorizontalRule,
  EuiPanel,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { PanelTitle, renderBenchmark } from '../common';
import { Plt } from '../common/plots/plt';

export function ServiceBreakdownPanel(props: { data: Plotly.Data[] }) {
  const layout = useMemo(
    () =>
      ({
        height: 200,
        width: 200,
        showlegend: false,
        margin: {
          l: 5,
          r: 5,
          b: 5,
          t: 5,
        },
      } as Partial<Plotly.Layout>),
    [props.data]
  );

  const renderStats = () => {
    return props.data.length > 0 ? (
      <EuiFlexGroup responsive={false} style={{ maxHeight: 260, overflowY: 'auto' }}>
        <EuiFlexItem>
          <EuiFlexGroup direction="column" alignItems="flexStart" gutterSize="m" responsive={false}>
            {props.data[0].marker.colors.map((color, i) => (
              <EuiFlexItem key={`label-${i}`}>
                <EuiHealth color={color}>
                  <div style={{ whiteSpace: 'nowrap' }}>{props.data[0].labels[i]}</div>
                </EuiHealth>
              </EuiFlexItem>
            ))}
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem />
        <EuiFlexItem />
        <EuiFlexItem>
          <EuiFlexGroup direction="column" alignItems="flexEnd" gutterSize="m" responsive={false}>
            {props.data[0].values.map((value, i) => (
              <EuiFlexItem key={`value-${i}`}>
                <EuiText size="s">{_.round(value, 2)}%</EuiText>
              </EuiFlexItem>
            ))}
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    ) : null;
  };

  const stats = useMemo(() => renderStats(), [props.data]);

  return (
    <>
      <EuiPanel>
        <PanelTitle title="Time spent by service" />
        <EuiHorizontalRule margin="m" />
        <EuiFlexGroup direction="column" alignItems="center">
          <EuiFlexItem>
            {props.data?.length > 0 ? <Plt data={props.data} layout={layout} /> : null}
          </EuiFlexItem>
          <EuiSpacer />
          <EuiFlexItem>{stats}</EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
      </EuiPanel>
    </>
  );
}
