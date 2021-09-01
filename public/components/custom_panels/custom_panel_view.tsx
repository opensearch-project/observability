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
  EuiBreadcrumb,
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
  EuiSuperDatePickerProps,
  EuiTitle,
  htmlIdGenerator,
  ShortDate,
} from '@elastic/eui';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { CoreStart } from '../../../../../src/core/public';
import { EmptyPanelView } from './panel_modules/empty_panel';
import { AddVizView } from './panel_modules/add_visualization';
import {
  RENAME_VISUALIZATION_MESSAGE,
  CREATE_PANEL_MESSAGE,
  CUSTOM_PANELS_API_PREFIX,
  VisualizationType,
} from '../../../common/constants/custom_panels';
import { PanelGrid } from './panel_modules/panel_grid';
import {
  DeletePanelModal,
  DeleteVisualizationModal,
  getCustomModal,
} from './helpers/modal_containers';
import PPLService from '../../services/requests/ppl';
import { convertDateTime, getNewVizDimensions, onTimeChange } from './helpers/utils';
import { DurationRange } from '@elastic/eui/src/components/date_picker/types';
import { UI_DATE_FORMAT } from '../../../common/constants/shared';
import { ChangeEvent } from 'react';

/*
 * "CustomPanelsView" module used to render an Operational Panel
 * panelId: Name of the panel opened
 * http: http core service
 * pplService: ppl requestor service
 * chrome: chrome core service
 * parentBreadcrumb: parent breadcrumb
 * renameCustomPanel: Rename function for the panel
 * deleteCustomPanel: Delete function for the panel
 * setToast: create Toast function
 */

type Props = {
  panelId: string;
  http: CoreStart['http'];
  pplService: PPLService;
  chrome: CoreStart['chrome'];
  parentBreadcrumb: EuiBreadcrumb[];
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
  setToast,
}: Props) => {
  const [openPanelName, setOpenPanelName] = useState('');
  const [panelCreatedTime, setPanelCreatedTime] = useState('');
  const [filterBarValue, setFilterBarValue] = useState('');
  const [onRefresh, setOnRefresh] = useState(false);

  const [inputDisabled, setInputDisabled] = useState(true);
  const [addVizDisabled, setAddVizDisabled] = useState(false);
  const [editDisabled, setEditDisabled] = useState(false);
  const [showVizPanel, setShowVizPanel] = useState(false);
  const [panelVisualizations, setPanelVisualizations] = useState<Array<VisualizationType>>([]);
  const [editMode, setEditMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal Toggle
  const [modalLayout, setModalLayout] = useState(<EuiOverlayMask></EuiOverlayMask>); // Modal Layout

  // DateTimePicker States
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState<DurationRange[]>([]);
  const [start, setStart] = useState<ShortDate>('now-30m');
  const [end, setEnd] = useState<ShortDate>('now');

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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const onRefreshFilters = () => {
    setOnRefresh(!onRefresh);
  };

  const cloneVisualization = (
    newVisualizationTitle: string,
    pplQuery: string,
    newVisualizationType: string
  ) => {
    setModalLayout(
      getCustomModal(
        onCloneVisualization,
        closeModal,
        'Name',
        'Duplicate Panel',
        'Cancel',
        'Duplicate',
        newVisualizationTitle + ' (copy)',
        RENAME_VISUALIZATION_MESSAGE,
        pplQuery,
        newVisualizationType
      )
    );
    showModal();
  };

  const onCloneVisualization = (
    newVisualizationTitle: string,
    pplQuery: string,
    newVisualizationType: string
  ) => {
    const newDimensions = getNewVizDimensions(panelVisualizations);
    setPanelVisualizations([
      ...panelVisualizations,
      {
        id: htmlIdGenerator()(),
        title: newVisualizationTitle,
        query: pplQuery,
        type: newVisualizationType,
        ...newDimensions,
      },
    ]);

    //NOTE: Make a backend call to Clone Visualization
    closeModal();
  };

  const deleteVisualization = (visualizationId: string, visualizationName: string) => {
    setModalLayout(
      <DeleteVisualizationModal
        onConfirm={onDeleteVisualization}
        onCancel={closeModal}
        visualizationId={visualizationId}
        visualizationName={visualizationName}
        panelName={openPanelName}
      />
    );
    showModal();
  };

  const onDeleteVisualization = (visualizationId: string) => {
    const filteredPanelVisualizations = panelVisualizations.filter(
      (panelVisualization) => panelVisualization.id != visualizationId
    );
    setPanelVisualizations([...filteredPanelVisualizations]);

    //NOTE: Make a backend call to Delete Visualization
    closeModal();
  };

  // Fetch the custom panel on Initial Mount
  useEffect(() => {
    fetchCustomPanel();
  }, []);

  // Check Validity of Time
  useEffect(() => {
    if (convertDateTime(end, false) < convertDateTime(start)) {
      setToast('Invalid Time Interval', 'danger');
      return;
    }
  }, [start, end]);

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
                  <EuiButton color="danger" onClick={deletePanel}>
                    Delete
                  </EuiButton>
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
                  dateFormat={UI_DATE_FORMAT}
                  start={start}
                  end={end}
                  onTimeChange={(props: Readonly<EuiSuperDatePickerProps>) =>
                    onTimeChange(
                      props.start,
                      props.end,
                      recentlyUsedRanges,
                      setRecentlyUsedRanges,
                      setStart,
                      setEnd
                    )
                  }
                  showUpdateButton={false}
                  recentlyUsedRanges={recentlyUsedRanges}
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton isDisabled={inputDisabled} onClick={onRefreshFilters}>
                  Refresh
                </EuiButton>
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
                startTime={start}
                endTime={end}
                onRefresh={onRefresh}
                cloneVisualization={cloneVisualization}
                deleteVisualization={deleteVisualization}
              />
            )}
            <>
              {showVizPanel && (
                <AddVizView
                  closeVizWindow={closeVizWindow}
                  pplService={pplService}
                  panelVisualizations={panelVisualizations}
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
