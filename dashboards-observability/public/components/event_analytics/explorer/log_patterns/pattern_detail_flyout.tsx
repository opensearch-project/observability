/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Direction,
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiInMemoryTable,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import moment from 'moment';
import React, { useState } from 'react';
import { PatternData } from 'common/types/explorer';
import { FlyoutContainers } from '../../../../components/common/flyout_containers/flyout_containers';
import { UI_DATE_FORMAT } from '../../../../../common/constants/shared';

interface PatternDetailFlyoutProps {
  pattern: PatternData;
  closeFlyout: () => void;
  renamePattern: (newName: string) => void;
  openEventFlyout: () => void;
}

export function PatternDetailFlyout(props: PatternDetailFlyoutProps) {
  const { openEventFlyout, renamePattern, closeFlyout, pattern } = props;

  const [toggleSize, setToggleSize] = useState(true);

  const patternDetails = [
    {
      title: 'Pattern:',
      description: pattern.puncSignature,
    },
    {
      title: 'Count:',
      description: pattern.count,
    },
    {
      title: 'Ratio:',
      description: pattern.ratio,
    },
    {
      title: 'Pattern length:',
      description: pattern.puncSignature.length,
    },
    {
      title: 'Earliest time:',
      description: moment(new Date(pattern.firstTimestamp)).format(UI_DATE_FORMAT),
    },
    {
      title: 'Recent time:',
      description: moment(new Date(pattern.lastTimestamp)).format(UI_DATE_FORMAT),
    },
  ];

  const patternDetailsList = (
    <EuiFlexGroup gutterSize="none">
      {patternDetails.map((detail) => {
        return (
          <EuiFlexGroup gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiText size="xs">
                <h3>{detail.title}</h3>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText size="xs">
                <p>{detail.description}</p>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
        );
      })}
    </EuiFlexGroup>
  );

  const search = {
    box: {
      incremental: true,
    },
  };

  const dummyEventsData = [
    {
      timestamp: Date.now(),
      message:
        '[nginx][access] 50.116.6.118 0.006 "GET /node_modules/@kbn/ui-framework/dist/kui_light.css HTTP/1.1" 200 13313',
    },
    {
      timestamp: Date.now(),
      message:
        '[mongodb.log][I] received client metadata from 127.0.0.1:39128 conn10128200: { application: { name: "MongoDB Shell" }, driver: { name: "MongoDB Internal Client", version: "3.6.22" }, os: { type: "Linux", name: "PRETTY_NAME="Debian GNU/Linux 9 (stretch)"", ',
    },
    {
      timestamp: Date.now(),
      message:
        '[nginx][access] 50.116.6.118 0.006 "GET /node_modules/@kbn/ui-framework/dist/kui_light.css HTTP/1.1" 200 13313',
    },
    {
      timestamp: Date.now(),
      message:
        '[mongodb.log][I] received client metadata from 127.0.0.1:39128 conn10128200: { application: { name: "MongoDB Shell" }, driver: { name: "MongoDB Internal Client", version: "3.6.22" }, os: { type: "Linux", name: "PRETTY_NAME="Debian GNU/Linux 9 (stretch)"", ',
    },
    {
      timestamp: Date.now(),
      message:
        '[nginx][access] 50.116.6.118 0.006 "GET /node_modules/@kbn/ui-framework/dist/kui_light.css HTTP/1.1" 200 13313',
    },
    {
      timestamp: Date.now(),
      message:
        '[mongodb.log][I] received client metadata from 127.0.0.1:39128 conn10128200: { application: { name: "MongoDB Shell" }, driver: { name: "MongoDB Internal Client", version: "3.6.22" }, os: { type: "Linux", name: "PRETTY_NAME="Debian GNU/Linux 9 (stretch)"", ',
    },
  ];

  const sorting = {
    sort: {
      field: 'timestamp',
      direction: 'desc' as Direction,
    },
    allowNeutralSort: true,
    enableAllColumns: true,
  };

  const eventsTableColumns = [
    {
      field: 'timestamp',
      name: 'Timestamp',
      sortable: true,
      width: '15%',
      render: (value: any) => (
        <EuiLink onClick={openEventFlyout}>
          {moment(new Date(value)).format(UI_DATE_FORMAT)}
        </EuiLink>
      ),
    },
    {
      field: 'message',
      name: 'Message',
      sortable: true,
    },
  ];

  const patternEventsTable = (
    <EuiPanel>
      <EuiTitle size="s">
        <h3>
          Events
          <span className="panel-header-count"> ({dummyEventsData.length})</span>
        </h3>
      </EuiTitle>
      <EuiSpacer size="m" />
      <EuiInMemoryTable
        items={dummyEventsData}
        columns={eventsTableColumns}
        sorting={sorting}
        pagination={true}
        search={search}
      />
    </EuiPanel>
  );

  const flyoutBody = (
    <EuiFlyoutBody>
      {patternDetailsList}
      <EuiSpacer size="m" />
      {patternEventsTable}
    </EuiFlyoutBody>
  );

  const flyoutHeader = (
    <EuiFlyoutHeader>
      <EuiFlexGroup gutterSize="m" justifyContent="spaceBetween">
        <EuiFlexItem>
          <EuiTitle>
            <h5>&nbsp;&nbsp;{pattern.patternName}</h5>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonIcon
            className="patterns-flyout-resize"
            color="text"
            size="m"
            aria-label="Resize"
            title="Resize"
            iconType={toggleSize ? 'menuRight' : 'menuLeft'}
            aria-pressed={toggleSize}
            onClick={() => {
              setToggleSize((isOn) => !isOn);
            }}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlyoutHeader>
  );

  const flyoutFooter = <></>;

  return (
    <FlyoutContainers
      closeFlyout={closeFlyout}
      flyoutHeader={flyoutHeader}
      flyoutBody={flyoutBody}
      flyoutFooter={flyoutFooter}
      ariaLabel={'eventsDocFyout'}
      size={toggleSize ? 'l' : 'm'}
    />
  );
}
