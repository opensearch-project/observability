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

import {
  EuiButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiOverlayMask,
  EuiPage,
  EuiPageBody,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiSpacer,
  EuiSuperDatePicker,
  EuiTitle,
} from '@elastic/eui';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { CoreStart } from '../../../../../src/core/public';
import { EmptyPanelView } from './panel_modules/empty_panel';
import { AddVizView } from './panel_modules/add_visualization';
import { CREATE_PANEL_MESSAGE, CUSTOM_PANELS_API_PREFIX, VisualizationType } from '../../../common/constants/custom_panels';
import { PanelGrid } from './panel_modules/panel_grid';
import { DeletePanelModal, getCustomModal } from './helpers/modal_containers';
import PPLService from '../../services/requests/ppl';

// "CustomPanelsView" module used to render saved Custom Operational Panels

type Props = {
  panelId: string;
  http: CoreStart['http'];
  pplService: PPLService;
  chrome: CoreStart['chrome'];
  parentBreadcrumb: { text: string; href: string }[];
  renameCustomPanel: (newCustomPanelName: string, customPanelId: string) => void;
  deleteCustomPanel: (customPanelId: string, customPanelName?: string, showToast?: boolean) => void;
  setToast: (title: string, color?: string, text?: string) => void;
};

export const CustomPanelView = ({
  panelId,
  http,
  pplService,
  chrome,
  parentBreadcrumb,
  renameCustomPanel,
  deleteCustomPanel,
  setToast
}: Props) => {
  const [openPanelName, setOpenPanelName] = useState('');
  const [panelCreatedTime, setPanelCreatedTime] = useState('');
  const [filterBarValue, setFilterBarValue] = useState('');
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');

  const [inputDisabled, setInputDisabled] = useState(true);
  const [addVizDisabled, setAddVizDisabled] = useState(false);
  const [editDisabled, setEditDisabled] = useState(false);
  const [showVizPanel, setShowVizPanel] = useState(false);
  const [panelVisualizations, setPanelVisualizations] = useState<Array<VisualizationType>>([]);
  const [editMode, setEditMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal Toggle
  const [modalLayout, setModalLayout] = useState(<EuiOverlayMask></EuiOverlayMask>); // Modal Layout

  const onTimeChange = ({ start, end }) => {
    const recentlyUsedRange = recentlyUsedRanges.filter((recentlyUsedRange) => {
      const isDuplicate = recentlyUsedRange.start === start && recentlyUsedRange.end === end;
      return !isDuplicate;
    });
    recentlyUsedRange.unshift({ start, end });
    setStart(start);
    setEnd(end);
    setRecentlyUsedRanges(
      recentlyUsedRange.length > 10 ? recentlyUsedRange.slice(0, 9) : recentlyUsedRange
    );
    setIsLoading(true);
    startLoading();
  };

  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  // Fetch Panel by id
  const fetchCustomPanel = async () => {
    return http
      .get(`${CUSTOM_PANELS_API_PREFIX}/panels/${panelId}`)
      .then((res) => {
        setOpenPanelName(res.panel.name);
        setPanelCreatedTime(res.panel.dateCreated);
        setPanelVisualizations(res.panel.visualizations);
      })
      .catch((err) => {
        console.error('Issue in fetching the operational panels', err);
      });
  };


  const onChange = (e) => {
    setFilterBarValue(e.target.value);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onDelete = async () => {
    const toastMessage = `Operational Panel ${openPanelName} successfully deleted!`;
    deleteCustomPanel(panelId, openPanelName);
    closeModal();
  };

  const deletePanel = () => {
    setModalLayout(
      <DeletePanelModal
        onConfirm={onDelete}
        onCancel={closeModal}
        title={`Delete ${openPanelName}`}
        message={`Are you sure you want to delete this Operational Panel?`}
      />
    );
    showModal();
  };

  const onRename = async (newCustomPanelName: string) => {
    renameCustomPanel(newCustomPanelName, panelId);
    closeModal();
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
        openPanelName,
        CREATE_PANEL_MESSAGE
      )
    );
    showModal();
  };

  // toggle between panel edit mode
  const editPanel = () => {
    setEditMode(!editMode);
    setShowVizPanel(false);
  };

  const closeVizWindow = () => {
    setShowVizPanel(false);
    setAddVizDisabled(false);
    checkDisabledInputs();
  };

  const addVizWindow = () => {
    setShowVizPanel(true);
    setAddVizDisabled(true);
    setInputDisabled(true);
  };

  // Fetch the custom panel on Initial Mount
  useEffect(() => {
    fetchCustomPanel();
  }, []);

  const checkDisabledInputs = () => {
    if (panelVisualizations.length == 0) {
      setEditDisabled(true);
      setInputDisabled(true);
    } else {
      setEditDisabled(false);
      if (editMode) setInputDisabled(true);
      else setInputDisabled(false);
    }
    if (editMode) setAddVizDisabled(true);
    else setAddVizDisabled(false);
  };

  // Toggle input type (disabled or not disabled)
  // Disabled when there no visualizations in panels or when the panel is in edit mode
  useEffect(() => {
    checkDisabledInputs();
  }, [panelVisualizations, editMode]);

  // Edit the breadcurmb when panel name changes
  useEffect(() => {
    chrome.setBreadcrumbs([
      ...parentBreadcrumb,
      { text: openPanelName, href: `${_.last(parentBreadcrumb).href}${panelId}` },
    ]);
  }, [openPanelName]);


  return (
    <div>
      <EuiPage>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>{openPanelName}</h1>
              </EuiTitle>
              <EuiFlexItem>
                <EuiSpacer size="s" />
              </EuiFlexItem>
              Created on {panelCreatedTime}
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem>
                  <EuiButton color="danger" onClick={deletePanel}>Delete</EuiButton>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiButton onClick={renamePanel}>Rename</EuiButton>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiButton>Export</EuiButton>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiButton
                    iconType={editMode ? 'save' : 'pencil'}
                    onClick={editPanel}
                    disabled={editDisabled}
                  >
                    {editMode ? 'Save' : 'Edit'}
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContentBody>
            <EuiFlexGroup gutterSize="s">
              <EuiFlexItem>
                <EuiFieldText
                  placeholder="Use PPL to query log indices below. Use “source=” to quickly switch to a different index."
                  value={filterBarValue}
                  fullWidth={true}
                  onChange={(e) => onChange(e)}
                  disabled={inputDisabled}
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiSuperDatePicker
                  isLoading={isLoading}
                  start={start}
                  end={end}
                  onTimeChange={onTimeChange}
                  showUpdateButton={false}
                  isDisabled={inputDisabled}
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton isDisabled={inputDisabled}>Refresh</EuiButton>
              </EuiFlexItem>
              <EuiFlexItem grow={false} onClick={addVizWindow}>
                <EuiButton disabled={addVizDisabled} fill>
                  Add visualization
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="l" />
            {panelVisualizations.length == 0 ? (
              !showVizPanel && (
                <EmptyPanelView addVizWindow={addVizWindow} addVizDisabled={addVizDisabled} />
              )
            ) : (
              <PanelGrid
              chrome={chrome}
                panelVisualizations={panelVisualizations}
                editMode={editMode}
                pplService={pplService}
              />
            )}
            <>
              {showVizPanel && (
                <AddVizView
                  closeVizWindow={closeVizWindow}
                  pplService={pplService}
                  setPanelVisualizations={setPanelVisualizations}
                  setToast={setToast}
                />
              )}
            </>
          </EuiPageContentBody>
        </EuiPageBody>
      </EuiPage>
      {isModalVisible && modalLayout}
    </div>
  );
};
