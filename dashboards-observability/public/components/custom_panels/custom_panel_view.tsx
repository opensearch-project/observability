/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */

import './custom_panels.scss';
import {
  EuiBadge,
  EuiBreadcrumb,
  EuiButton,
  EuiContextMenu,
  EuiContextMenuPanelDescriptor,
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
  EuiTitle,
  OnTimeChangeProps,
  ShortDate,
} from '@elastic/eui';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { DurationRange } from '@elastic/eui/src/components/date_picker/types';
import moment from 'moment';
import DSLService from '../../services/requests/dsl';
import { CoreStart } from '../../../../../src/core/public';
import { EmptyPanelView } from './panel_modules/empty_panel';
import {
  CREATE_PANEL_MESSAGE,
  CUSTOM_PANELS_API_PREFIX,
} from '../../../common/constants/custom_panels';
import { SavedVisualizationType, VisualizationType } from '../../../common/types/custom_panels';
import { PanelGrid } from './panel_modules/panel_grid';
import { DeletePanelModal, getCustomModal } from './helpers/modal_containers';
import PPLService from '../../services/requests/ppl';
import {
  isDateValid,
  convertDateTime,
  onTimeChange,
  isPPLFilterValid,
  fetchVisualizationById,
} from './helpers/utils';
import { UI_DATE_FORMAT } from '../../../common/constants/shared';
import { VisaulizationFlyout } from './panel_modules/visualization_flyout';
import { uiSettingsService } from '../../../common/utils';
import { PPLReferenceFlyout } from '../common/helpers';
import { Autocomplete } from '../common/search/autocomplete';
import {
  getSuggestionsAfterSource,
  onItemSelect,
  parseForIndices,
} from '../common/search/autocomplete_logic';

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
  page: 'app' | 'operationalPanels';
  appId?: string;
  appName?: string;
  http: CoreStart['http'];
  pplService: PPLService;
  dslService: DSLService;
  chrome: CoreStart['chrome'];
  parentBreadcrumb: EuiBreadcrumb[];
  renameCustomPanel: (editedCustomPanelName: string, editedCustomPanelId: string) => Promise<void>;
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
  switchToEvent?: any;
  switchToEditViz?: any;
}

export const CustomPanelView = ({
  panelId,
  page,
  appId,
  appName,
  http,
  pplService,
  dslService,
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
  switchToEvent,
  switchToEditViz,
}: Props) => {
  const [openPanelName, setOpenPanelName] = useState('');
  const [panelCreatedTime, setPanelCreatedTime] = useState('');
  const [pplFilterValue, setPPLFilterValue] = useState('');
  const [baseQuery, setBaseQuery] = useState('');
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

  const appPanel = page === 'app';

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

  const handleQueryChange = (newQuery: string) => {
    setPPLFilterValue(newQuery);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
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
    setEditMode(!editMode);
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

  const buildBaseQuery = async () => {
    const indices: string[] = [];
    for (let i = 0; i < panelVisualizations.length; i++) {
      const visualizationId = panelVisualizations[i].savedVisualizationId;
      // TODO: create route to get list of visualizations in one call
      const visData: SavedVisualizationType = await fetchVisualizationById(
        http,
        visualizationId,
        (value: string) => setToast(value, 'danger')
      );
      const moreIndices = parseForIndices(visData.query);
      for (let j = 0; j < moreIndices.length; j++) {
        if (!indices.includes(moreIndices[j])) {
          indices.push(moreIndices[j]);
        }
      }
    }
    setBaseQuery('source = ' + indices.join(', '));
    return;
  };

  const onRefreshFilters = (start: ShortDate, end: ShortDate) => {
    if (!isDateValid(convertDateTime(start), convertDateTime(end, false), setToast)) {
      return;
    }

    if (!isPPLFilterValid(pplFilterValue, setToast)) {
      return;
    }

    const panelFilterBody = {
      panelId,
      query: pplFilterValue,
      language: 'ppl',
      to: end,
      from: start,
    };

    http
      .post(`${CUSTOM_PANELS_API_PREFIX}/panels/filter`, {
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
          panelId,
          savedVisualizationId,
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

  // Add Visualization Button
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

  // Set saved object id to empty when redirect away from events tab
  useEffect(() => {
    if (appPanel) {
      switchToEditViz('');
    }
  });

  // Fetch the custom panel on Initial Mount
  useEffect(() => {
    fetchCustomPanel();
  }, [panelId]);

  // Toggle input type (disabled or not disabled)
  // Disabled when there no visualizations in panels or when the panel is in edit mode
  useEffect(() => {
    checkDisabledInputs();
  }, [editMode]);

  // Build base query with all of the indices included in the current visualizations
  useEffect(() => {
    checkDisabledInputs();
    buildBaseQuery();
  }, [panelVisualizations]);

  // Edit the breadcrumb when panel name changes
  useEffect(() => {
    let newBreadcrumb;
    if (appPanel) {
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
      ];
    } else {
      newBreadcrumb = [
        ...parentBreadcrumb,
        {
          text: openPanelName,
          href: `${_.last(parentBreadcrumb).href}${panelId}`,
        },
      ];
    }
    chrome.setBreadcrumbs(newBreadcrumb);
  }, [panelId, openPanelName]);

  return (
    <div>
      <EuiPage id={`panelView${appPanel ? 'InApp' : ''}`}>
        <EuiPageBody component="div">
          <EuiPageHeader>
            {appPanel || (
              <EuiPageHeaderSection>
                <EuiTitle size="l">
                  <h1>{openPanelName}</h1>
                </EuiTitle>
                <EuiFlexItem>
                  <EuiSpacer size="s" />
                </EuiFlexItem>
                Created on {moment(panelCreatedTime).format(UI_DATE_FORMAT)}
              </EuiPageHeaderSection>
            )}
            {appPanel || (
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
                      button={panelActionsButton}
                      isOpen={panelsMenuPopover}
                      closePopover={() => setPanelsMenuPopover(false)}
                    >
                      <EuiContextMenu initialPanelId={0} panels={panelActionsMenu} />
                    </EuiPopover>
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
              </EuiPageHeaderSection>
            )}
          </EuiPageHeader>
          <EuiPageContentBody>
            <EuiFlexGroup gutterSize="s">
              <EuiFlexItem>
                <Autocomplete
                  key={'autocomplete-search-bar'}
                  query={pplFilterValue}
                  tempQuery={pplFilterValue}
                  baseQuery={baseQuery}
                  handleQueryChange={handleQueryChange}
                  handleQuerySearch={() => onRefreshFilters(startTime, endTime)}
                  dslService={dslService}
                  getSuggestions={getSuggestionsAfterSource}
                  onItemSelect={onItemSelect}
                  tabId={'panels-filter'}
                  placeholder={
                    "Use PPL 'where' clauses to add filters on all visualizations [where Carrier = 'OpenSearch-Air']"
                  }
                  restrictedCommands={[{ label: 'where' }]}
                />
                <EuiBadge
                  className={`ppl-link ${
                    uiSettingsService.get('theme:darkMode') ? 'ppl-link-dark' : 'ppl-link-light'
                  }`}
                  color="hollow"
                  onClick={() => showHelpFlyout()}
                  onClickAriaLabel={'ppl-info'}
                >
                  PPL
                </EuiBadge>
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
              {appPanel && (
                <>
                  {editMode ? (
                    <>
                      <EuiFlexItem grow={false}>
                        <EuiButton
                          iconType="cross"
                          color="danger"
                          onClick={() => editPanel('cancel')}
                        >
                          Cancel
                        </EuiButton>
                      </EuiFlexItem>
                      <EuiFlexItem grow={false}>
                        <EuiButton iconType="save" onClick={() => editPanel('save')}>
                          Save
                        </EuiButton>
                      </EuiFlexItem>
                    </>
                  ) : (
                    <EuiFlexItem grow={false}>
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
                    <EuiButton
                      iconType="plusInCircle"
                      onClick={switchToEvent}
                      isDisabled={addVizDisabled}
                    >
                      Add
                    </EuiButton>
                  </EuiFlexItem>
                </>
              )}
            </EuiFlexGroup>
            <EuiSpacer size="l" />
            {panelVisualizations.length === 0 && (
              <EmptyPanelView
                addVizDisabled={addVizDisabled}
                page={page}
                getVizContextPanels={getVizContextPanels}
                switchToEvent={switchToEvent}
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
              fromApp={appPanel}
              onRefresh={onRefresh}
              cloneVisualization={cloneVisualization}
              pplFilterValue={pplFilterValue}
              showFlyout={showFlyout}
              editActionType={editActionType}
              switchToEditViz={switchToEditViz}
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
