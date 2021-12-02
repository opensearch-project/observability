/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    EuiButton,
    EuiContextMenuItem,
    EuiContextMenuPanel,
    EuiFlexGroup,
    EuiFlexItem,
    EuiHorizontalRule,
    EuiInMemoryTable,
    EuiLink,
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiPopover,
    EuiSpacer,
    EuiTableFieldDataColumnType,
    EuiText,
    EuiTitle,
} from '@elastic/eui';
import CSS from 'csstype';
import _ from 'lodash';
import { TraceAnalyticsComponentDeps } from 'public/components/trace_analytics/home';
import React, { ReactElement, useEffect, useState } from 'react';
import { ApplicationType } from '../home';

const pageStyles: CSS.Properties = {
  float: 'left',
  width: '100%',
  maxWidth: '1130px',
};

interface AppTableProps extends TraceAnalyticsComponentDeps {
    loading: boolean;
    applications: Array<ApplicationType>;
  };

export function AppTable(props: AppTableProps) {
  const [isActionsPopoverOpen, setIsActionsPopoverOpen] = useState(false);
  const { applications, parentBreadcrumb } = props;

  useEffect(() => {
    props.chrome.setBreadcrumbs(
      [
      parentBreadcrumb,
      {
        text: 'Application analytics',
        href: '#/application_analytics',
      }
    ]);
  })

  const popoverButton = (
    <EuiButton
      iconType="arrowDown"
      iconSide="right"
      onClick={() => setIsActionsPopoverOpen(!isActionsPopoverOpen)}
    >
      Actions
    </EuiButton>
  );

  const popoverItems: ReactElement[] = [
    <EuiContextMenuItem
      key="rename"
      disabled={applications.length === 0}
    >
      Rename
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="duplicate"
      disabled={applications.length === 0}
    >
      Duplicate
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="delete"
      disabled={applications.length === 0}
    >
      Delete
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="addSample"
      disabled={applications.length === 0}
    >
      Add sample application
    </EuiContextMenuItem>,
  ];

  const tableColumns = [
    {
      field: 'name',
      name: 'Name',
      sortable: true,
      truncateText: true,
      render: (value, record) => (
        // <EuiLink href={`#/application_analytics/${record.id}`}>{_.truncate(value, { length: 100 })}</EuiLink>
        <EuiLink href={`#/application_analytics/id`}>{_.truncate(value, { length: 100 })}</EuiLink>
      ),
    },
    {
      field: 'composition',
      name: 'Composition',
      sortable: true,
      truncateText: true,
    },
    {
      field: 'currentAvailability',
      name: 'Current Availability',
      sortable: true,
      truncateText: true,
    },
    {
        field: 'availabilityMetrics',
        name: 'Availability Metrics',
        sortable: true,
        truncateText: true,
      },
  ] as Array<
    EuiTableFieldDataColumnType<{
      name: string;
      id: string;
      composition: string;
      currentAvailability: string;
      availabilityMetrics: string;
    }>
  >;

  return (
    <div style={pageStyles}>
      <EuiPage>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Overview</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent id="applicationArea">
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle size="s">
                  <h3>
                    Applications<span className="panel-header-count"> ({applications.length})</span>
                  </h3>
                </EuiTitle>
              </EuiPageContentHeaderSection>
              <EuiPageContentHeaderSection>
                <EuiFlexGroup gutterSize="s">
                  <EuiFlexItem>
                    <EuiPopover
                      panelPaddingSize="none"
                      button={popoverButton}
                      isOpen={isActionsPopoverOpen}
                      closePopover={() => setIsActionsPopoverOpen(false)}
                    >
                      <EuiContextMenuPanel items={popoverItems} />
                    </EuiPopover>
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiButton
                      fill
                      iconSide="left"
                      iconType="heart"
                      href={`#/application_analytics/create`}
                      >
                      Create application
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiHorizontalRule />
            {applications.length > 0 ? (
              <EuiInMemoryTable
                loading={props.loading}
                items={applications}
                itemId="id"
                columns={tableColumns}
                tableLayout="auto"
                pagination={{
                  initialPageSize: 10,
                  pageSizeOptions: [8, 10, 13],
                }}
                sorting={{
                  sort: {
                    field: 'dateModified',
                    direction: 'desc',
                  },
                }}
                allowNeutralSort={false}
                isSelectable={true}
              />
            ) : (
              <>
                <EuiSpacer size="xxl" />
                <EuiText textAlign="center">
                  <h2>No applications</h2>
                </EuiText>
                <EuiSpacer size="m" />
                <EuiFlexGroup justifyContent="center">
                  <EuiFlexItem grow={false}>
                    <EuiButton fullWidth={false}>
                      Create application
                    </EuiButton>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiButton fullWidth={false}>
                      Add sample applications
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer size="xxl" />
              </>
            )}
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </div>
  );
}