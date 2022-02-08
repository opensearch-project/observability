/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiBreadcrumb,
  EuiButton,
  EuiContextMenu,
  EuiContextMenuPanelDescriptor,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiOverlayMask,
  EuiPage,
  EuiPageBody,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPopover,
  EuiSpacer,
  EuiSuperDatePicker,
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
import { uiSettingsService } from '../../../common/utils';
import { PPLReferenceFlyout } from '../common/helpers';

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

interface Props {
  panelId: string;
  page?: string;
  appId?: string;
  appName?: string;
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
  startTime: string;
  endTime: string;
  setStartTime: any;
  setEndTime: any;
}

export const CustomPanelView = ({
  panelId,
  page,
  appId,
  appName,
  http,
  pplService,
  chrome,
  parentBreadcrumb,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
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
  const [panelVisualizations, setPanelVisualizations] = useState<VisualizationType[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal Toggle
  const [modalLayout, setModalLayout] = useState(<EuiOverlayMask />); // Modal Layout
  const [isVizPopoverOpen, setVizPopoverOpen] = useState(false); // Add Visualization Popover
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false); // Add Visualization Flyout
  const [isFlyoutReplacement, setisFlyoutReplacement] = useState<boolean | undefined>(false);
  const [replaceVisualizationId, setReplaceVisualizationId] = useState<string | undefined>('');
  const [panelsMenuPopover, setPanelsMenuPopover] = useState(false);
  const [editActionType, setEditActionType] = useState('');
  const [isHelpFlyoutVisible, setHelpIsFlyoutVisible] = useState(false);

  const closeHelpFlyout = () => {
    setAddVizDisabled(false);
    setHelpIsFlyoutVisible(false);
  };

  const showHelpFlyout = () => {
    setAddVizDisabled(true);
    setHelpIsFlyoutVisible(true);
  };

  // DateTimePicker States
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState<DurationRange[]>([]);

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
        setStartTime(startTime ? startTime : res.operationalPanel.timeRange.from);
        setEndTime(endTime ? endTime : res.operationalPanel.timeRange.to);
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
    if (e.key === 'Enter') onRefreshFilters(startTime, endTime);
  };

  const onDatePickerChange = (props: OnTimeChangeProps) => {
    onTimeChange(
      props.start,
      props.end,
      recentlyUsedRanges,
      setRecentlyUsedRanges,
      setStartTime,
      setEndTime
    );
    onRefreshFilters(props.start, props.end);
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
      window.location.assign(`${_.last(parentBreadcrumb).href}${id}`);
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

  const onRefreshFilters = (start: ShortDate, end: ShortDate) => {
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
    >
      Add Visualization
    </EuiButton>
  );

  // Panel Actions Button
  const panelActionsButton = (
    <EuiButton
      iconType="arrowDown"
      iconSide="right"
      onClick={() => setPanelsMenuPopover(true)}
      disabled={addVizDisabled}
    >
      Panel actions
    </EuiButton>
  );

  let flyout;
  if (isFlyoutVisible) {
    flyout = (
      <VisaulizationFlyout
        panelId={panelId}
        closeFlyout={closeFlyout}
        pplFilterValue={pplFilterValue}
        start={startTime}
        end={endTime}
        setToast={setToast}
        http={http}
        pplService={pplService}
        setPanelVisualizations={setPanelVisualizations}
        isFlyoutReplacement={isFlyoutReplacement}
        replaceVisualizationId={replaceVisualizationId}
      />
    );
  }

  let helpFlyout;
  if (isHelpFlyoutVisible) {
    helpFlyout = <PPLReferenceFlyout module="panels" closeFlyout={closeHelpFlyout} />;
  }

  const panelActionsMenu: EuiContextMenuPanelDescriptor[] = [
    {
      id: 0,
      title: 'Panel actions',
      items: [
        {
          name: 'Reload panel',
          onClick: () => {
            setPanelsMenuPopover(false);
            fetchCustomPanel();
          },
        },
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

  // Toggle input type (disabled or not disabled)
  // Disabled when there no visualizations in panels or when the panel is in edit mode
  useEffect(() => {
    checkDisabledInputs();
  }, [panelVisualizations, editMode]);

  // Edit the breadcrumb when panel name changes
  useEffect(() => {
    let newBreadcrumb;
    if (page === "app") {
      newBreadcrumb = [
        ...parentBreadcrumb,
        {
          text: 'Application analytics',
          href: '#/application_analytics',
        },
        {
          text: appName,
          href: `${_.last(parentBreadcrumb).href}${appId}`,
        },
      ]
    } else {
      newBreadcrumb = [
        ...parentBreadcrumb,
        {
          text: openPanelName,
          href: `${_.last(parentBreadcrumb).href}${panelId}`,
        }
      ];
    }
    chrome.setBreadcrumbs(newBreadcrumb);
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
                {
                  page === "app" || (
                  <EuiFlexItem grow={false}>
                    <EuiPopover
                      panelPaddingSize="none"
                      withTitle
                      button={panelActionsButton}
                      isOpen={panelsMenuPopover}
                      closePopover={() => setPanelsMenuPopover(false)}
                    >
                      <EuiContextMenu initialPanelId={0} panels={panelActionsMenu} />
                    </EuiPopover>
                  </EuiFlexItem>
                  )
                }
                {
                  page === "app" ? (
                  <EuiFlexItem grow={false}>
                    <EuiButton isDisabled={addVizDisabled}>
                      Add Visualization
                    </EuiButton>
                  </EuiFlexItem>
                  ) : (
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
                  )
                }
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
                  append={
                    <EuiLink
                      aria-label="ppl-info"
                      onClick={showHelpFlyout}
                      style={{ padding: '10px' }}
                    >
                      PPL
                    </EuiLink>
                  }
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiSuperDatePicker
                  dateFormat={uiSettingsService.get('dateFormat')}
                  start={startTime}
                  end={endTime}
                  onTimeChange={onDatePickerChange}
                  recentlyUsedRanges={recentlyUsedRanges}
                  isDisabled={dateDisabled}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="l" />
            {panelVisualizations.length === 0 && (
              <EmptyPanelView
                addVizDisabled={addVizDisabled}
                page={page}
                getVizContextPanels={getVizContextPanels}
              />
            )}
            <PanelGrid
              http={http}
              panelId={panelId}
              chrome={chrome}
              panelVisualizations={panelVisualizations}
              setPanelVisualizations={setPanelVisualizations}
              editMode={editMode}
              pplService={pplService}
              startTime={startTime}
              endTime={endTime}
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
      {helpFlyout}
    </div>
  );
};
