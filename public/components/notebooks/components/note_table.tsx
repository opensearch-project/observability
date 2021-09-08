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

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

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
  EuiTitle
} from '@elastic/eui';
import CSS from 'csstype';
import _ from 'lodash';
import moment from 'moment';
import React, { ReactElement, useEffect, useState } from 'react';
import { ChromeBreadcrumb } from '../../../../../../src/core/public';
import {
  CREATE_NOTE_MESSAGE,
  DATE_FORMAT,
  DOCUMENTATION_URL
} from '../../../../common/constants/notebooks';
import {
  DeleteNotebookModal,
  getCustomModal,
  getSampleNotebooksModal
} from './helpers/modal_containers';
import { NotebookType } from './main';

const pageStyles: CSS.Properties = {
  float: 'left',
  width: '100%',
  maxWidth: '1130px',
};

type NoteTableProps = {
  loading: boolean;
  fetchNotebooks: () => void;
  addSampleNotebooks: () => void;
  notebooks: Array<NotebookType>;
  createNotebook: (newNoteName: string) => void;
  renameNotebook: (newNoteName: string, noteId: string) => void;
  cloneNotebook: (newNoteName: string, noteId: string) => void;
  deleteNotebook: (noteId: string, noteName?: string, showToast?: boolean) => void;
  setBreadcrumbs: (newBreadcrumbs: ChromeBreadcrumb[]) => void;
  setToast: (title: string, color?: string, text?: string) => void;
};

export function NoteTable(props: NoteTableProps) {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal Toggle
  const [modalLayout, setModalLayout] = useState(<EuiOverlayMask></EuiOverlayMask>); // Modal Layout
  const [isActionsPopoverOpen, setIsActionsPopoverOpen] = useState(false);
  const [selectedNotebooks, setSelectedNotebooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { notebooks, createNotebook, renameNotebook, cloneNotebook, deleteNotebook } = props;

  useEffect(() => {
    props.setBreadcrumbs([
      {
        text: 'Notebooks',
        href: '#',
      },
    ]);
    props.fetchNotebooks();
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const onCreate = async (newNoteName: string) => {
    createNotebook(newNoteName);
    closeModal();
  };

  const onRename = async (newNoteName: string) => {
    renameNotebook(newNoteName, selectedNotebooks[0].id);
    closeModal();
  };

  const onClone = async (newName: string) => {
    cloneNotebook(newName, selectedNotebooks[0].id);
    closeModal();
  };

  const onDelete = async () => {
    const toastMessage = `Notebook${
      selectedNotebooks.length > 1 ? 's' : ' ' + selectedNotebooks[0].path
    } successfully deleted!`;
    Promise.all(selectedNotebooks.map((notebook) => deleteNotebook(notebook.id, undefined, false)))
      .then(() => props.setToast(toastMessage))
      .catch((err) => {
        props.setToast(
          'Error deleting notebooks, please make sure you have the correct permission.',
          'danger'
        );
        console.error(err.body.message);
      });
    closeModal();
  };

  const createNote = () => {
    setModalLayout(
      getCustomModal(
        onCreate,
        closeModal,
        'Name',
        'Create notebook',
        'Cancel',
        'Create',
        undefined,
        CREATE_NOTE_MESSAGE
      )
    );
    showModal();
  };

  const renameNote = () => {
    setModalLayout(
      getCustomModal(
        onRename,
        closeModal,
        'Name',
        'Rename notebook',
        'Cancel',
        'Rename',
        selectedNotebooks[0].path,
        CREATE_NOTE_MESSAGE
      )
    );
    showModal();
  };

  const cloneNote = () => {
    setModalLayout(
      getCustomModal(
        onClone,
        closeModal,
        'Name',
        'Duplicate notebook',
        'Cancel',
        'Duplicate',
        selectedNotebooks[0].path + ' (copy)',
        CREATE_NOTE_MESSAGE
      )
    );
    showModal();
  };

  const deleteNote = () => {
    const notebookString = `notebook${selectedNotebooks.length > 1 ? 's' : ''}`;
    setModalLayout(
      <DeleteNotebookModal
        onConfirm={onDelete}
        onCancel={closeModal}
        title={`Delete ${selectedNotebooks.length} ${notebookString}`}
        message={`Are you sure you want to delete the selected ${selectedNotebooks.length} ${notebookString}?`}
      />
    );
    showModal();
  };

  const addSampleNotebooks = async () => {
    setModalLayout(
      getSampleNotebooksModal(closeModal, async () => {
        closeModal();
        await props.addSampleNotebooks();
      })
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
      disabled={notebooks.length === 0 || selectedNotebooks.length !== 1}
      onClick={() => {
        setIsActionsPopoverOpen(false);
        renameNote();
      }}
    >
      Rename
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="duplicate"
      disabled={notebooks.length === 0 || selectedNotebooks.length !== 1}
      onClick={() => {
        setIsActionsPopoverOpen(false);
        cloneNote();
      }}
    >
      Duplicate
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="delete"
      disabled={notebooks.length === 0 || selectedNotebooks.length === 0}
      onClick={() => {
        setIsActionsPopoverOpen(false);
        deleteNote();
      }}
    >
      Delete
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="addSample"
      onClick={() => {
        setIsActionsPopoverOpen(false);
        addSampleNotebooks();
      }}
    >
      Add sample notebooks
    </EuiContextMenuItem>,
  ];

  const tableColumns = [
    {
      field: 'path',
      name: 'Name',
      sortable: true,
      truncateText: true,
      render: (value, record) => (
        <EuiLink href={`#${record.id}`}>{_.truncate(value, { length: 100 })}</EuiLink>
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
      path: string;
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
                <h1>Notebooks</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent id="notebookArea">
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle size="s">
                  <h3>
                    Notebooks<span className="panel-header-count"> ({notebooks.length})</span>
                  </h3>
                </EuiTitle>
                <EuiSpacer size="s" />
                <EuiText size="s" color="subdued">
                  Use Notebooks to interactively and collaboratively develop rich reports backed by
                  live data. Common use cases for notebooks includes creating postmortem reports,
                  designing run books, building live infrastructure reports, or even documentation.{' '}
                  <EuiLink external={true} href={DOCUMENTATION_URL} target="blank">
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
                    <EuiButton fill onClick={() => createNote()}>
                      Create notebook
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiHorizontalRule margin="m" />
            <EuiFieldSearch
              fullWidth
              placeholder="Search notebook name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <EuiHorizontalRule margin="m" />
            {notebooks.length > 0 ? (
              <EuiInMemoryTable
                loading={props.loading}
                items={
                  searchQuery
                    ? notebooks.filter((notebook) =>
                        notebook.path.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                    : notebooks
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
                  onSelectionChange: (items) => setSelectedNotebooks(items),
                }}
              />
            ) : (
              <>
                <EuiSpacer size="xxl" />
                <EuiText textAlign="center">
                  <h2>No notebooks</h2>
                  <EuiSpacer size="m" />
                  <EuiText color="subdued">
                    Use notebooks to create post-mortem reports, build live infrastructure
                    <br />
                    reports, or foster explorative collaborations with data.
                  </EuiText>
                </EuiText>
                <EuiSpacer size="m" />
                <EuiFlexGroup justifyContent="center">
                  <EuiFlexItem grow={false}>
                    <EuiButton fullWidth={false} onClick={() => createNote()}>
                      Create notebook
                    </EuiButton>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiButton fullWidth={false} onClick={() => addSampleNotebooks()}>
                      Add sample notebooks
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
