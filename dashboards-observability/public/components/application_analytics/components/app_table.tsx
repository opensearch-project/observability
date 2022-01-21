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
    EuiOverlayMask,
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
import _ from 'lodash';
import React, { ReactElement, useEffect, useState } from 'react';
import { AppAnalyticsComponentDeps } from '../home';
import { getClearModal } from '../helpers/modal_containers';
import { getCustomModal } from '../../custom_panels/helpers/modal_containers';
import { pageStyles } from '../../../../common/constants/shared';
import { ApplicationListType } from '../../../../common/constants/application_analytics';

interface AppTableProps extends AppAnalyticsComponentDeps {
    loading: boolean;
    applications: Array<ApplicationListType>;
    fetchApplications: () => void;
    renameApplication: (newAppName: string, appId: string) => void;
    deleteApplication: (appList: string[], toastMessage?: string) => void;
  };

export function AppTable(props: AppTableProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActionsPopoverOpen, setIsActionsPopoverOpen] = useState(false);
  const [modalLayout, setModalLayout] = useState(<EuiOverlayMask></EuiOverlayMask>);
  const [selectedApplications, setSelectedApplications] = useState<ApplicationListType[]>([]);
  const { chrome, applications, parentBreadcrumb, fetchApplications, renameApplication, deleteApplication } = props;

  useEffect(() => {
    chrome.setBreadcrumbs(
      [
      parentBreadcrumb,
      {
        text: 'Application analytics',
        href: '#/application_analytics',
      }
    ]);
    fetchApplications();
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onRename = async (newApplicationName: string) => {
    renameApplication(newApplicationName, selectedApplications[0].id);
    closeModal();
  };

  const onDelete = async () => {
    const toastMessage = `Application${
      selectedApplications.length > 1 ? 's' : ' "' + selectedApplications[0].name + '"'
    } successfully deleted!`;
    await deleteApplication(
      selectedApplications.map((app) => app.id),
      toastMessage
    );
    closeModal();
  };

  const renameApp = () => {
    setModalLayout(
      getCustomModal(
        onRename,
        closeModal,
        'Name',
        'Rename application',
        'Cancel',
        'Rename',
        selectedApplications[0].name
      )
    );
    showModal();
  };

  const deleteApp = () => {
    const applicationString = `application${selectedApplications.length > 1 ? 's' : ''}`;
    setModalLayout(
      getClearModal(
        closeModal,
        onDelete,
        `Delete ${selectedApplications.length} ${applicationString}`,
        `Are you sure you want to delete the selected ${selectedApplications.length} ${applicationString}?`
      )
    );
    showModal();
  };

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
      disabled={applications.length === 0 || selectedApplications.length !== 1}
      onClick={() => {
        setIsActionsPopoverOpen(false);
        renameApp();
      }}
    >
      Rename
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="duplicate"
      disabled={applications.length === 0 || selectedApplications.length !== 1}
    >
      Duplicate
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="delete"
      disabled={applications.length === 0 || selectedApplications.length === 0}
      onClick={() => {
        setIsActionsPopoverOpen(false);
        deleteApp();
      }}
    >
      Delete
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="addSample"
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
        <EuiLink href={`#/application_analytics/${record.id}`}>{_.truncate(record.name, { length: 100 })}</EuiLink>
      ),
    }
  ] as Array<EuiTableFieldDataColumnType<ApplicationListType>>;

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
                selection={{
                  onSelectionChange: (items) => setSelectedApplications(items),
                }}
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
      {isModalVisible && modalLayout}
    </div>
  );
}
