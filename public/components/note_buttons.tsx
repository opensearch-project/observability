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

import React, { useState } from 'react';
import { EuiPageHeaderSection, EuiButtonEmpty, EuiOverlayMask, EuiToolTip } from '@elastic/eui';
import { getCloneModal, getDeleteModal, getCustomModal } from './helpers/modal_container';
import { CustomUploadModal } from './helpers/custom_modals/custom_upload_modal';

/*
 * "NoteButtons" component is used to populate notebook related buttons on right top of the plugin page.
 *
 * Props taken in as params are:
 * createNotebook - function to create a new notebook
 * renameNotebook -function to rename an exisiting notebook
 * closeNotebook - function to clone a notebook
 * deleteNotebook - function to delete a notebook
 * exportNotebook - function to export a notebook
 * importNotebook - function to import a notebook
 * openNoteName - current open notebook name
 * openNoteId - current open notebook id
 */
type NoteButtonsProps = {
  createNotebook: (newNoteName: string) => void;
  renameNotebook: (newNoteName: string, noteId: string) => void;
  cloneNotebook: (newNoteName: string, noteId: string) => void;
  deleteNotebook: (noteId: string) => void;
  exportNotebook: (noteName: string, noteId: string) => void;
  importNotebook: (fileObj: any) => void;
  openNoteName: string;
  openNoteId: string;
};
export const NoteButtons = (props: NoteButtonsProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal Toggle
  const [modalLayout, setModalLayout] = useState(<EuiOverlayMask></EuiOverlayMask>); // Modal Layout
  const {
    createNotebook,
    renameNotebook,
    cloneNotebook,
    deleteNotebook,
    exportNotebook,
    importNotebook,
    openNoteName,
    openNoteId,
  } = props;

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
    renameNotebook(newNoteName, openNoteId);
    closeModal();
  };

  const onClone = async () => {
    cloneNotebook(openNoteName + '_copy', openNoteId);
    closeModal();
  };

  const onDelete = async () => {
    deleteNotebook(openNoteId);
    closeModal();
  };

  const onExport = async () => {
    exportNotebook(openNoteName, openNoteId);
  };

  const onImport = async (file: FileList) => {
    const fr = new FileReader();
    let fileObject = {};
    fr.onload = function (e: ProgressEvent<FileReader>) {
      try {
        fileObject = JSON.parse(e.target.result.toString());
        importNotebook(fileObject);
      } catch {
        console.error('Imported file not valid json');
      }
    };

    fr.readAsText(file[0]);
    closeModal();
  };

  const createNote = () => {
    setModalLayout(
      getCustomModal(
        onCreate,
        closeModal,
        'New notebook name',
        'Please enter name',
        'Cancel',
        'Create'
      )
    );
    showModal();
  };

  const renameNote = () => {
    setModalLayout(
      getCustomModal(
        onRename,
        closeModal,
        'Edit notebook name',
        'Please edit name',
        'Cancel',
        'Rename',
        openNoteName
      )
    );
    showModal();
  };

  const cloneNote = () => {
    setModalLayout(getCloneModal(closeModal, onClone));
    showModal();
  };

  const deleteNote = () => {
    setModalLayout(getDeleteModal(closeModal, onDelete));
    showModal();
  };

  const importNote = () => {
    setModalLayout(<CustomUploadModal runModal={onImport} closeModal={closeModal} />);
    showModal();
  };

  return (
    <div>
      <EuiPageHeaderSection>
        <EuiToolTip delay="long" content="Create new Notebook">
          <EuiButtonEmpty
            color="primary"
            key="newNoteButton"
            onClick={() => createNote()}
            iconType="indexOpen"
            aria-label="New Note"
          />
        </EuiToolTip>
        <EuiToolTip delay="long" content="Rename Notebook">
          <EuiButtonEmpty
            color="primary"
            key="renameNotebook"
            onClick={() => renameNote()}
            iconType="indexEdit"
            aria-label="Rename Note button"
          />
        </EuiToolTip>
        <EuiToolTip delay="long" content="Clone Notebook">
          <EuiButtonEmpty
            color="primary"
            key="cloneNotebook"
            onClick={() => cloneNote()}
            iconType="copy"
            aria-label="Clone Note button"
          />
        </EuiToolTip>
        <EuiToolTip delay="long" content="Delete Notebook">
          <EuiButtonEmpty
            color="primary"
            key="deleteNotebook"
            onClick={() => deleteNote()}
            iconType="indexClose"
            aria-label="Delete Notebook"
          />
        </EuiToolTip>
        <EuiToolTip delay="long" content="Import Notebook">
          <EuiButtonEmpty
            color="primary"
            key="importNotebook"
            onClick={() => importNote()}
            iconType="importAction"
            aria-label="Import Note"
          />
        </EuiToolTip>
        <EuiToolTip delay="long" content="Export Notebook">
          <EuiButtonEmpty
            color="primary"
            key="exportNotebook"
            onClick={() => onExport()}
            iconType="exportAction"
            aria-label="Export Note"
          />
        </EuiToolTip>
      </EuiPageHeaderSection>
      {isModalVisible && modalLayout}
    </div>
  );
};
