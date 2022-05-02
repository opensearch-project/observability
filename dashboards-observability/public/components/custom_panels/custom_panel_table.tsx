/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  EuiBreadcrumb,
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
import React, { ReactElement, useEffect, useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { ChromeBreadcrumb } from '../../../../../src/core/public';
import {
  CREATE_PANEL_MESSAGE,
  CUSTOM_PANELS_DOCUMENTATION_URL,
} from '../../../common/constants/custom_panels';
import { UI_DATE_FORMAT } from '../../../common/constants/shared';
import { getCustomModal, DeletePanelModal } from './helpers/modal_containers';
import { CustomPanelListType } from '../../../common/types/custom_panels';
import { getSampleDataModal } from '../common/helpers/add_sample_modal';
import { pageStyles } from '../../../common/constants/shared';

/*
 * "CustomPanelTable" module, used to view all the saved panels
 *
 * Props taken in as params are:
 * loading: loader bool for the table
 * fetchCustomPanels: fetch panels function
 * customPanels: List of panels available
 * createCustomPanel: create panel function
 * setBreadcrumbs: setter for breadcrumbs on top panel
 * parentBreadcrumb: parent breadcrumb
 * renameCustomPanel: rename function for the panel
 * cloneCustomPanel: clone function for the panel
 * deleteCustomPanelList: delete function for the panels
 */

interface Props {
  loading: boolean;
  fetchCustomPanels: () => void;
  customPanels: CustomPanelListType[];
  createCustomPanel: (newCustomPanelName: string) => void;
  setBreadcrumbs: (newBreadcrumbs: ChromeBreadcrumb[]) => void;
  parentBreadcrumbs: EuiBreadcrumb[];
  renameCustomPanel: (newCustomPanelName: string, customPanelId: string) => void;
  cloneCustomPanel: (newCustomPanelName: string, customPanelId: string) => void;
  deleteCustomPanelList: (customPanelIdList: string[], toastMessage: string) => any;
  addSamplePanels: () => void;
}

export const CustomPanelTable = ({
  loading,
  fetchCustomPanels,
  customPanels,
  createCustomPanel,
  setBreadcrumbs,
  parentBreadcrumbs,
  renameCustomPanel,
  cloneCustomPanel,
  deleteCustomPanelList,
  addSamplePanels,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal Toggle
  const [modalLayout, setModalLayout] = useState(<EuiOverlayMask />); // Modal Layout
  const [isActionsPopoverOpen, setIsActionsPopoverOpen] = useState(false);
  const [selectedCustomPanels, setselectedCustomPanels] = useState<CustomPanelListType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setBreadcrumbs(parentBreadcrumbs);
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
      selectedCustomPanels.length > 1 ? 's' : ' ' + selectedCustomPanels[0].name
    } successfully deleted!`;
    const PanelList = selectedCustomPanels.map((panel) => panel.id);
    deleteCustomPanelList(PanelList, toastMessage);
    closeModal();
  };

  const createPanel = () => {
    setModalLayout(
      getCustomModal(
        onCreate,
        closeModal,
        'Name',
        'Create operational panel',
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
        selectedCustomPanels[0].name,
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
        selectedCustomPanels[0].name + ' (copy)',
        CREATE_PANEL_MESSAGE
      )
    );
    showModal();
  };

  const deletePanel = () => {
    const customPanelString = `operational panel${selectedCustomPanels.length > 1 ? 's' : ''}`;
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

  const addSampledata = async () => {
    setModalLayout(
      getSampleDataModal(closeModal, async () => {
        closeModal();
        await addSamplePanels();
      })
    );
    showModal();
  };

  const popoverButton = (
    <EuiButton
      data-test-subj="operationalPanelsActionsButton"
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
      data-test-subj="deleteContextMenuItem"
      disabled={customPanels.length === 0 || selectedCustomPanels.length === 0}
      onClick={() => {
        setIsActionsPopoverOpen(false);
        deletePanel();
      }}
    >
      Delete
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="addSample"
      data-test-subj="addSampleContextMenuItem"
      onClick={() => {
        setIsActionsPopoverOpen(false);
        addSampledata();
      }}
    >
      Add samples
    </EuiContextMenuItem>,
  ];

  const tableColumns = [
    {
      field: 'name',
      name: 'Name',
      sortable: true,
      truncateText: true,
      render: (value, record) => (
        <EuiLink href={`${_.last(parentBreadcrumbs)!.href}${record.id}`}>
          {_.truncate(value, { length: 100 })}
        </EuiLink>
      ),
    },
    {
      field: 'dateModified',
      name: 'Last updated',
      sortable: true,
      render: (value) => moment(new Date(value)).format(UI_DATE_FORMAT),
    },
    {
      field: 'dateCreated',
      name: 'Created',
      sortable: true,
      render: (value) => moment(new Date(value)).format(UI_DATE_FORMAT),
    },
  ] as Array<EuiTableFieldDataColumnType<CustomPanelListType>>;

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
                    Panels
                    <span className="panel-header-count"> ({customPanels.length})</span>
                  </h3>
                </EuiTitle>
                <EuiSpacer size="s" />
                <EuiText size="s" color="subdued">
                  Use Operational panels to create and view different visualizations on ingested
                  observability data, using PPL (Piped Processing Language) queries.{' '}
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
                    <EuiButton
                      fill
                      onClick={() => createPanel()}
                      data-test-subj="customPanels__createNewPanels"
                    >
                      Create panel
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiHorizontalRule margin="m" />
            {customPanels.length > 0 ? (
              <>
                <EuiFieldSearch
                  fullWidth
                  data-test-subj="operationalPanelSearchBar"
                  placeholder="Search operational panel name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <EuiHorizontalRule margin="m" />
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
              </>
            ) : (
              <>
                <EuiSpacer size="xxl" />
                <EuiText textAlign="center">
                  <h2>No Operational Panels</h2>
                  <EuiSpacer size="m" />
                  <EuiText color="subdued">
                    Use operational panels to dive deeper into observability
                    <br />
                    using PPL queries and insightful visualizations
                  </EuiText>
                </EuiText>
                <EuiSpacer size="m" />
                <EuiFlexGroup justifyContent="center">
                  <EuiFlexItem grow={false}>
                    <EuiButton
                      data-test-subj="customPanels__emptyCreateNewPanels"
                      fullWidth={false}
                      onClick={() => createPanel()}
                    >
                      Create panel
                    </EuiButton>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiButton fullWidth={false} onClick={() => addSampledata()}>
                      Add samples
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
