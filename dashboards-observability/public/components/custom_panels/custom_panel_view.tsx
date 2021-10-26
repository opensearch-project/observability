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
  EuiContextMenu,
  EuiContextMenuPanelDescriptor,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiOverlayMask,
  EuiPage,
  EuiPageBody,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPopover,
  EuiSpacer,
  EuiSuperDatePicker,
  EuiSuperDatePickerProps,
  EuiTitle,
  OnTimeChangeProps,
  ShortDate,
} from '@elastic/eui';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { CoreStart } from '../../../../../src/core/public';
import { EmptyPanelView } from './panel_modules/empty_panel';
import {
  CREATE_PANEL_MESSAGE,
  CUSTOM_PANELS_API_PREFIX,
} from '../../../common/constants/custom_panels';
import { VisualizationType } from '../../../common/types/custom_panels';
import { PanelGrid } from './panel_modules/panel_grid';
import { DeletePanelModal, getCustomModal } from './helpers/modal_containers';
import PPLService from '../../services/requests/ppl';
import { isDateValid, convertDateTime, onTimeChange, isPPLFilterValid } from './helpers/utils';
import { DurationRange } from '@elastic/eui/src/components/date_picker/types';
import { UI_DATE_FORMAT } from '../../../common/constants/shared';
import { ChangeEvent } from 'react';
import moment from 'moment';
import { VisaulizationFlyout } from './panel_modules/visualization_flyout';

/*
 * "CustomPanelsView" module used to render an Operational Panel
 *
 * Props taken in as params are:
 * panelId: Name of the panel opened
 * http: http core service
 * pplService: ppl requestor service
 * chrome: chrome core service
 * parentBreadcrumb: parent breadcrumb
 * renameCustomPanel: Rename function for the panel
 * cloneCustomPanel: Clone function for the panel
 * deleteCustomPanel: Delete function for the panel
 * setToast: create Toast function
 */

type Props = {
  panelId: string;
  http: CoreStart['http'];
  pplService: PPLService;
  chrome: CoreStart['chrome'];
  parentBreadcrumb: EuiBreadcrumb[];
  renameCustomPanel: (
    editedCustomPanelName: string,
    editedCustomPanelId: string
  ) => Promise<void> | undefined;
  deleteCustomPanel: (customPanelId: string, customPanelName: string) => Promise<any>;
  cloneCustomPanel: (clonedCustomPanelName: string, clonedCustomPanelId: string) => Promise<string>;
  setToast: (
    title: string,
    color?: string,
    text?: React.ReactChild | undefined,
    side?: string | undefined
  ) => void;
};

export const CustomPanelView = ({
  panelId,
  http,
  pplService,
  chrome,
  parentBreadcrumb,
  renameCustomPanel,
  deleteCustomPanel,
  cloneCustomPanel,
  setToast,
}: Props) => {
  const [openPanelName, setOpenPanelName] = useState('');
  const [panelCreatedTime, setPanelCreatedTime] = useState('');
  const [pplFilterValue, setPPLFilterValue] = useState('');
  const [onRefresh, setOnRefresh] = useState(false);

  const [inputDisabled, setInputDisabled] = useState(true);
  const [addVizDisabled, setAddVizDisabled] = useState(false);
  const [editDisabled, setEditDisabled] = useState(false);
  const [dateDisabled, setDateDisabled] = useState(false);
  const [panelVisualizations, setPanelVisualizations] = useState<Array<VisualizationType>>([]);
  const [editMode, setEditMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal Toggle
  const [modalLayout, setModalLayout] = useState(<EuiOverlayMask></EuiOverlayMask>); // Modal Layout
  const [isVizPopoverOpen, setVizPopoverOpen] = useState(false); // Add Visualization Popover
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false); // Add Visualization Flyout
  const [isFlyoutReplacement, setisFlyoutReplacement] = useState<boolean | undefined>(false);
  const [replaceVisualizationId, setReplaceVisualizationId] = useState<string | undefined>('');
  const [panelsMenuPopover, setPanelsMenuPopover] = useState(false);
  const [editActionType, setEditActionType] = useState('');

  // DateTimePicker States
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState<DurationRange[]>([]);
  const [start, setStart] = useState<ShortDate>('now-30m');
  const [end, setEnd] = useState<ShortDate>('now');

  const getVizContextPanels = (closeVizPopover?: () => void) => {
    return [
      {
        id: 0,
        title: 'Add Visualization',
        items: [
          {
            name: 'Select Existing Visualization',
            onClick: () => {
              if (closeVizPopover != null) {
                closeVizPopover();
              }
              showFlyout();
            },
          },
          {
            name: 'Create New Visualization',
            onClick: () => {
              advancedVisualization();
            },
          },
        ],
      },
    ];
  };

  const advancedVisualization = () => {
    closeVizPopover();
    window.location.assign('#/event_analytics/explorer');
  };

  // Fetch Panel by id
  const fetchCustomPanel = async () => {
    return http
      .get(`${CUSTOM_PANELS_API_PREFIX}/panels/${panelId}`)
      .then((res) => {
        setOpenPanelName(res.operationalPanel.name);
        setPanelCreatedTime(res.createdTimeMs);
        setPPLFilterValue(res.operationalPanel.queryFilter.query);
        setStart(res.operationalPanel.timeRange.from);
        setEnd(res.operationalPanel.timeRange.to);
        setPanelVisualizations(res.operationalPanel.visualizations);
      })
      .catch((err) => {
        console.error('Issue in fetching the operational panels', err);
      });
  };

  const onPopoverClick = () => {
    setVizPopoverOpen(!isVizPopoverOpen);
  };

  const closeVizPopover = () => {
    setVizPopoverOpen(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPPLFilterValue(e.target.value);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onRefreshFilters();
  };

  const onDatePickerChange = (props: OnTimeChangeProps) => {
    onTimeChange(
      props.start,
      props.end,
      recentlyUsedRanges,
      setRecentlyUsedRanges,
      setStart,
      setEnd
    );
    onRefreshFilters();
  };

  const onDelete = async () => {
    deleteCustomPanel(panelId, openPanelName).then((res) => {
      setTimeout(() => {
        window.location.assign(`${_.last(parentBreadcrumb).href}`);
      }, 1000);
    });
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
    renameCustomPanel(newCustomPanelName, panelId).then(() => {
      setOpenPanelName(newCustomPanelName);
    });
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

  const onClone = async (newCustomPanelName: string) => {
    cloneCustomPanel(newCustomPanelName, panelId).then((id: string) => {
      setTimeout(() => {
        window.location.assign(`${_.last(parentBreadcrumb).href}${id}`);
      }, 1000);
    });
    closeModal();
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
        openPanelName + ' (copy)',
        CREATE_PANEL_MESSAGE
      )
    );
    showModal();
  };

  // toggle between panel edit mode
  const editPanel = (editType: string) => {
    editMode ? setEditMode(false) : setEditMode(true);
    if (editType === 'cancel') fetchCustomPanel();
    setEditActionType(editType);
  };

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
    setAddVizDisabled(false);
    checkDisabledInputs();
  };

  const showFlyout = (isReplacement?: boolean, replaceVizId?: string) => {
    setisFlyoutReplacement(isReplacement);
    setReplaceVisualizationId(replaceVizId);
    setIsFlyoutVisible(true);
    setAddVizDisabled(true);
    setInputDisabled(true);
  };

  const checkDisabledInputs = () => {
    // When not in edit mode and panel has no visualizations
    if (panelVisualizations.length === 0 && !editMode) {
      setEditDisabled(true);
      setInputDisabled(true);
      setAddVizDisabled(false);
      setDateDisabled(false);
    }

    // When panel has visualizations
    if (panelVisualizations.length > 0) {
      setEditDisabled(false);
      setInputDisabled(false);
      setAddVizDisabled(false);
      setDateDisabled(false);
    }

    // When in edit mode
    if (editMode) {
      setEditDisabled(false);
      setInputDisabled(true);
      setAddVizDisabled(true);
      setDateDisabled(true);
    }
  };

  const onRefreshFilters = () => {
    if (!isDateValid(convertDateTime(start), convertDateTime(end, false), setToast)) {
      return;
    }

    if (!isPPLFilterValid(pplFilterValue, setToast)) {
      return;
    }

    const panelFilterBody = {
      panelId: panelId,
      query: pplFilterValue,
      language: 'ppl',
      to: end,
      from: start,
    };

    http
      .patch(`${CUSTOM_PANELS_API_PREFIX}/panels/filter`, {
        body: JSON.stringify(panelFilterBody),
      })
      .then((res) => {
        setOnRefresh(!onRefresh);
      })
      .catch((err) => {
        setToast('Error is adding filters to the operational panel', 'danger');
        console.error(err.body.message);
      });
  };

  const cloneVisualization = (visualzationTitle: string, savedVisualizationId: string) => {
    http
      .post(`${CUSTOM_PANELS_API_PREFIX}/visualizations`, {
        body: JSON.stringify({
          panelId: panelId,
          savedVisualizationId: savedVisualizationId,
        }),
      })
      .then(async (res) => {
        setPanelVisualizations(res.visualizations);
        setToast(`Visualization ${visualzationTitle} successfully added!`, 'success');
      })
      .catch((err) => {
        setToast(`Error in adding ${visualzationTitle} visualization to the panel`, 'danger');
        console.error(err);
      });
  };

  //Add Visualization Button
  const addVisualizationButton = (
    <EuiButton
      iconType="arrowDown"
      iconSide="right"
      disabled={addVizDisabled}
      onClick={onPopoverClick}
      fill
    >
      Add Visualization
    </EuiButton>
  );

  let flyout;
  if (isFlyoutVisible) {
    flyout = (
      <VisaulizationFlyout
        panelId={panelId}
        closeFlyout={closeFlyout}
        pplFilterValue={pplFilterValue}
        start={start}
        end={end}
        setToast={setToast}
        http={http}
        pplService={pplService}
        setPanelVisualizations={setPanelVisualizations}
        isFlyoutReplacement={isFlyoutReplacement}
        replaceVisualizationId={replaceVisualizationId}
      />
    );
  }

  const panelActionsMenu: EuiContextMenuPanelDescriptor[] = [
    {
      id: 0,
      title: 'Panel actions',
      items: [
        {
          name: 'Rename panel',
          onClick: () => {
            setPanelsMenuPopover(false);
            renamePanel();
          },
        },
        {
          name: 'Duplicate panel',
          onClick: () => {
            setPanelsMenuPopover(false);
            clonePanel();
          },
        },
        {
          name: 'Delete panel',
          onClick: () => {
            setPanelsMenuPopover(false);
            deletePanel();
          },
        },
      ],
    },
  ];

  // Fetch the custom panel on Initial Mount
  useEffect(() => {
    fetchCustomPanel();
  }, [panelId]);

  // Check Validity of Time
  useEffect(() => {
    isDateValid(convertDateTime(start), convertDateTime(end, false), setToast);
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
      {
        text: openPanelName,
        href: `${_.last(parentBreadcrumb).href}${panelId}`,
      },
    ]);
  }, [panelId, openPanelName]);

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
              Created on {moment(panelCreatedTime).format(UI_DATE_FORMAT)}
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
              <EuiFlexGroup gutterSize="s">
                {editMode ? (
                  <>
                    <EuiFlexItem>
                      <EuiButton
                        iconType="cross"
                        color="danger"
                        onClick={() => editPanel('cancel')}
                      >
                        Cancel
                      </EuiButton>
                    </EuiFlexItem>
                    <EuiFlexItem>
                      <EuiButton iconType="save" onClick={() => editPanel('save')}>
                        Save
                      </EuiButton>
                    </EuiFlexItem>
                  </>
                ) : (
                  <EuiFlexItem>
                    <EuiButton
                      iconType="pencil"
                      onClick={() => editPanel('edit')}
                      disabled={editDisabled}
                    >
                      Edit
                    </EuiButton>
                  </EuiFlexItem>
                )}
                <EuiFlexItem grow={false}>
                  <EuiPopover
                    panelPaddingSize="none"
                    withTitle
                    button={
                      <EuiButton
                        iconType="arrowDown"
                        iconSide="right"
                        onClick={() => setPanelsMenuPopover(true)}
                      >
                        Panel actions
                      </EuiButton>
                    }
                    isOpen={panelsMenuPopover}
                    closePopover={() => setPanelsMenuPopover(false)}
                  >
                    <EuiContextMenu initialPanelId={0} panels={panelActionsMenu} />
                  </EuiPopover>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContentBody>
            <EuiFlexGroup gutterSize="s">
              <EuiFlexItem>
                <EuiFieldText
                  placeholder="Use PPL 'where' clauses to add filters on all visualizations [where Carrier = 'OpenSearch-Air']"
                  value={pplFilterValue}
                  fullWidth={true}
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                  disabled={inputDisabled}
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiSuperDatePicker
                  dateFormat={UI_DATE_FORMAT}
                  start={start}
                  end={end}
                  onTimeChange={onDatePickerChange}
                  showUpdateButton={false}
                  recentlyUsedRanges={recentlyUsedRanges}
                  isDisabled={dateDisabled}
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton isDisabled={inputDisabled} onClick={onRefreshFilters}>
                  Refresh
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiPopover
                  id="addVisualizationContextMenu"
                  button={addVisualizationButton}
                  isOpen={isVizPopoverOpen}
                  closePopover={closeVizPopover}
                  panelPaddingSize="none"
                  anchorPosition="downLeft"
                >
                  <EuiContextMenu
                    initialPanelId={0}
                    panels={getVizContextPanels(closeVizPopover)}
                  />
                </EuiPopover>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="l" />
            {panelVisualizations.length === 0 ? (
              <EmptyPanelView
                addVizDisabled={addVizDisabled}
                getVizContextPanels={getVizContextPanels}
              />
            ) : (
              <></>
            )}
            <PanelGrid
              http={http}
              panelId={panelId}
              chrome={chrome}
              panelVisualizations={panelVisualizations}
              setPanelVisualizations={setPanelVisualizations}
              editMode={editMode}
              pplService={pplService}
              startTime={start}
              endTime={end}
              onRefresh={onRefresh}
              cloneVisualization={cloneVisualization}
              pplFilterValue={pplFilterValue}
              showFlyout={showFlyout}
              editActionType={editActionType}
            />
          </EuiPageContentBody>
        </EuiPageBody>
      </EuiPage>
      {isModalVisible && modalLayout}
      {flyout}
    </div>
  );
};
