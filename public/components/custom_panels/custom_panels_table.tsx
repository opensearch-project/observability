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

import CSS from 'csstype';
import {
  EuiButton,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFieldSearch,
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
import React, { CSSProperties, ReactElement, useEffect, useState } from 'react';
import { ChromeBreadcrumb } from '../../../../../src/core/public';
import { CustomPanelListType } from './home';
import {
  CREATE_PANEL_MESSAGE,
  DATE_FORMAT,
  CUSTOM_PANELS_DOCUMENTATION_URL,
} from '../../../common/constants/custom_panels';
import { getCustomModal, DeletePanelModal } from './helpers/modal_containers';
import moment from 'moment';
import _ from 'lodash';

const pageStyles: CSSProperties = {
  float: 'left',
  width: '100%',
  maxWidth: '1130px',
};

type Props = {
  loading: boolean;
  fetchCustomPanels: () => void;
  customPanels: Array<CustomPanelListType>;
  createCustomPanel: (newCustomPanelName: string) => void;
  setBreadcrumbs: (newBreadcrumbs: ChromeBreadcrumb[]) => void;
  parentBreadcrumb: { text: string; href: string }[];
  renameCustomPanel: (newCustomPanelName: string, customPanelId: string) => void;
  cloneCustomPanel: (newCustomPanelName: string, customPanelId: string) => void;
  deleteCustomPanel: (customPanelId: string, customPanelName?: string, showToast?: boolean) => void;
  setToast: (title: string, color?: string, text?: string) => void;
};

export const CustomPanelTable = ({
  loading,
  fetchCustomPanels,
  customPanels,
  createCustomPanel,
  setBreadcrumbs,
  parentBreadcrumb,
  renameCustomPanel,
  cloneCustomPanel,
  deleteCustomPanel,
  setToast,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal Toggle
  const [modalLayout, setModalLayout] = useState(<EuiOverlayMask></EuiOverlayMask>); // Modal Layout
  const [isActionsPopoverOpen, setIsActionsPopoverOpen] = useState(false);
  const [selectedCustomPanels, setselectedCustomPanels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setBreadcrumbs(parentBreadcrumb);
    fetchCustomPanels();
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onCreate = async (newCustomPanelName: string) => {
    createCustomPanel(newCustomPanelName);
    closeModal();
  };

  const onRename = async (newCustomPanelName: string) => {
    renameCustomPanel(newCustomPanelName, selectedCustomPanels[0].id);
    closeModal();
  };

  const onClone = async (newName: string) => {
    cloneCustomPanel(newName, selectedCustomPanels[0].id);
    closeModal();
  };

  const onDelete = async () => {
    const toastMessage = `Custom Panels ${
      selectedCustomPanels.length > 1 ? 's' : ' ' + selectedCustomPanels[0].path
    } successfully deleted!`;
    Promise.all(
      selectedCustomPanels.map((customPanel) => deleteCustomPanel(customPanel.id, undefined, false))
    )
      .then(() => setToast(toastMessage))
      .catch((err) => {
        setToast(
          'Error deleting Custom Panels, please make sure you have the correct permission.',
          'danger'
        );
        console.error(err.body.message);
      });
    closeModal();
  };

  const createPanel = () => {
    setModalLayout(
      getCustomModal(
        onCreate,
        closeModal,
        'Name',
        'Create custom panel',
        'Cancel',
        'Create',
        undefined,
        CREATE_PANEL_MESSAGE
      )
    );
    showModal();
  };

  const renamePanel = () => {
    setModalLayout(
      getCustomModal(
        onRename,
        closeModal,
        'Name',
        'Rename Panel',
        'Cancel',
        'Rename',
        selectedCustomPanels[0].path,
        CREATE_PANEL_MESSAGE
      )
    );
    showModal();
  };

  const clonePanel = () => {
    setModalLayout(
      getCustomModal(
        onClone,
        closeModal,
        'Name',
        'Duplicate Panel',
        'Cancel',
        'Duplicate',
        selectedCustomPanels[0].path + ' (copy)',
        CREATE_PANEL_MESSAGE
      )
    );
    showModal();
  };

  const deletePanel = () => {
    const customPanelString = `custom panel${selectedCustomPanels.length > 1 ? 's' : ''}`;
    setModalLayout(
      <DeletePanelModal
        onConfirm={onDelete}
        onCancel={closeModal}
        title={`Delete ${selectedCustomPanels.length} ${customPanelString}`}
        message={`Are you sure you want to delete the selected ${selectedCustomPanels.length} ${customPanelString}?`}
      />
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
      disabled={customPanels.length === 0 || selectedCustomPanels.length !== 1}
      onClick={() => {
        setIsActionsPopoverOpen(false);
        renamePanel();
      }}
    >
      Rename
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="duplicate"
      disabled={customPanels.length === 0 || selectedCustomPanels.length !== 1}
      onClick={() => {
        setIsActionsPopoverOpen(false);
        clonePanel();
      }}
    >
      Duplicate
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="delete"
      disabled={customPanels.length === 0 || selectedCustomPanels.length === 0}
      onClick={() => {
        setIsActionsPopoverOpen(false);
        deletePanel();
      }}
    >
      Delete
    </EuiContextMenuItem>,
  ];

  const tableColumns = [
    {
      field: 'name',
      name: 'Name',
      sortable: true,
      truncateText: true,
      render: (value, record) => (
        <EuiLink href={`${_.last(parentBreadcrumb).href}${record.id}`}>{_.truncate(value, { length: 100 })}</EuiLink>
      ),
    },
    {
      field: 'dateModified',
      name: 'Last updated',
      sortable: true,
      render: (value) => moment(value).format(DATE_FORMAT),
    },
    {
      field: 'dateCreated',
      name: 'Created',
      sortable: true,
      render: (value) => moment(value).format(DATE_FORMAT),
    },
  ] as Array<
    EuiTableFieldDataColumnType<{
      name: string;
      id: string;
      dateCreated: string;
      dateModified: string;
    }>
  >;

  return (
    <div style={pageStyles}>
      <EuiPage>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Operational panels</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent id="customPanelArea">
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle size="s">
                  <h3>
                    Panels<span className="panel-header-count"> ({customPanels.length})</span>
                  </h3>
                </EuiTitle>
                <EuiSpacer size="s" />
                <EuiText size="s" color="subdued">
                  Operational panels provide users with the ability to create and view
                  different visualizations on ingested observability data, using PPL queries.{' '}
                  <EuiLink external={true} href={CUSTOM_PANELS_DOCUMENTATION_URL} target="blank">
                    Learn more
                  </EuiLink>
                </EuiText>
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
                    <EuiButton fill onClick={() => createPanel()}>
                      Create Custom Panel
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiHorizontalRule margin="m" />
            <EuiFieldSearch
              fullWidth
              placeholder="Search custom panel name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <EuiHorizontalRule margin="m" />
            {customPanels.length > 0 ? (
              <EuiInMemoryTable
                loading={loading}
                items={
                  searchQuery
                    ? customPanels.filter((customPanel) =>
                        customPanel.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                    : customPanels
                }
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
                  onSelectionChange: (items) => setselectedCustomPanels(items),
                }}
              />
            ) : (
              <>
                <EuiSpacer size="xxl" />
                <EuiText textAlign="center">
                  <h2>No Custom Panels</h2>
                  <EuiSpacer size="m" />
                  <EuiText color="subdued">
                    Use custom operational panels to dive deeper into observability
                    <br />
                    using PPL queries and insightful visualizations
                  </EuiText>
                </EuiText>
                <EuiSpacer size="m" />
                <EuiFlexGroup justifyContent="center">
                  <EuiFlexItem grow={false}>
                    <EuiButton fullWidth={false} onClick={() => createPanel()}>
                      Create Custom Panel
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
};
