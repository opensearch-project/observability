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
  htmlIdGenerator,
  ShortDate,
} from "@elastic/eui";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { CoreStart } from "../../../../../src/core/public";
import { EmptyPanelView } from "./panel_modules/empty_panel";
import {
  RENAME_VISUALIZATION_MESSAGE,
  CREATE_PANEL_MESSAGE,
  CUSTOM_PANELS_API_PREFIX,
} from "../../../common/constants/custom_panels";
import { VisualizationType } from "../../../common/types/custom_panels";
import { PanelGrid } from "./panel_modules/panel_grid";
import {
  DeletePanelModal,
  DeleteVisualizationModal,
  getCustomModal,
} from "./helpers/modal_containers";
import PPLService from "../../services/requests/ppl";
import {
  isDateValid,
  convertDateTime,
  getNewVizDimensions,
  onTimeChange,
  isPPLFilterValid,
} from "./helpers/utils";
import { DurationRange } from "@elastic/eui/src/components/date_picker/types";
import { UI_DATE_FORMAT } from "../../../common/constants/shared";
import { ChangeEvent } from "react";
import moment from "moment";
import { VisaulizationFlyout } from "./panel_modules/visualization_flyout";

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
  http: CoreStart["http"];
  pplService: PPLService;
  chrome: CoreStart["chrome"];
  parentBreadcrumb: EuiBreadcrumb[];
  renameCustomPanel: (
    newCustomPanelName: string,
    customPanelId: string
  ) => Promise<void>;
  deleteCustomPanel: (
    customPanelId: string,
    customPanelName?: string,
    showToast?: boolean
  ) => Promise<any>;
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
  setToast,
}: Props) => {
  const [openPanelName, setOpenPanelName] = useState("");
  const [panelCreatedTime, setPanelCreatedTime] = useState("");
  const [pplFilterValue, setPPLFilterValue] = useState("");
  const [onRefresh, setOnRefresh] = useState(false);

  const [inputDisabled, setInputDisabled] = useState(true);
  const [addVizDisabled, setAddVizDisabled] = useState(false);
  const [editDisabled, setEditDisabled] = useState(false);
  const [panelVisualizations, setPanelVisualizations] = useState<
    Array<VisualizationType>
  >([]);
  const [editMode, setEditMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal Toggle
  const [modalLayout, setModalLayout] = useState(
    <EuiOverlayMask></EuiOverlayMask>
  ); // Modal Layout
  const [isVizPopoverOpen, setVizPopoverOpen] = useState(false); // Add Visualization Popover
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false); // Add Visualization Flyout
  const [isFlyoutReplacement, setisFlyoutReplacement] = useState<
    boolean | undefined
  >(false);
  const [replaceVisualizationId, setReplaceVisualizationId] = useState<
    string | undefined
  >("");

  // DateTimePicker States
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState<DurationRange[]>(
    []
  );
  const [start, setStart] = useState<ShortDate>("now-30m");
  const [end, setEnd] = useState<ShortDate>("now");

  const getVizContextPanels = (closeVizPopover?: () => void) => {
    return [
      {
        id: 0,
        title: "Add Visualization",
        items: [
          {
            name: "Select Existing Visualization",
            onClick: () => {
              if (closeVizPopover != null) {
                closeVizPopover();
              }
              showFlyout();
            },
          },
          {
            name: "Create New Visualization",
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
    //NOTE: Add Redux functions to pass pplquery and time filters to events page
    window.location.assign("#/event_analytics/explorer");
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
        console.error("Issue in fetching the operational panels", err);
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

  const onDelete = async () => {
    deleteCustomPanel(panelId, openPanelName).then((res) => {
      window.location.assign(`${_.last(parentBreadcrumb).href}`);
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
        "Name",
        "Rename Panel",
        "Cancel",
        "Rename",
        openPanelName,
        CREATE_PANEL_MESSAGE
      )
    );
    showModal();
  };

  // toggle between panel edit mode
  const editPanel = () => {
    if (editMode) {
      // Save layout
      setEditMode(false);
    } else {
      setEditMode(true);
    }
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
    if (
      !isDateValid(
        convertDateTime(start),
        convertDateTime(end, false),
        setToast
      )
    ) {
      return;
    }

    if (!isPPLFilterValid(pplFilterValue, setToast)) {
      return;
    }

    const panelFilterBody = {
      panelId: panelId,
      query: pplFilterValue,
      language: "ppl",
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
        setToast("Error is adding filters to the operational panel", "danger");
        console.error(err.body.message);
      });
  };

  const cloneVisualization = (
    newVisualizationTitle: string,
    pplQuery: string,
    newVisualizationType: string,
    newVisualizationTimeField: string
  ) => {
    setModalLayout(
      getCustomModal(
        onCloneVisualization,
        closeModal,
        "Name",
        "Duplicate Visualization",
        "Cancel",
        "Duplicate",
        newVisualizationTitle + " (copy)",
        RENAME_VISUALIZATION_MESSAGE,
        pplQuery,
        newVisualizationType,
        newVisualizationTimeField
      )
    );
    showModal();
  };

  const onCloneVisualization = (
    newVisualizationTitle: string,
    pplQuery: string,
    newVisualizationType: string,
    newVisualizationTimeField: string
  ) => {
    const newDimensions = getNewVizDimensions(panelVisualizations);
    // setPanelVisualizations([
    //   ...panelVisualizations,
    //   {
    //     id: 'panelViz_' + htmlIdGenerator()(),
    //     title: newVisualizationTitle,
    //     query: pplQuery,
    //     type: newVisualizationType,
    //     timeField: newVisualizationTimeFiled,
    //     ...newDimensions,
    //   },
    // ]);

    //NOTE: Make a backend call to Clone Visualization
    http
      .post(`${CUSTOM_PANELS_API_PREFIX}/visualizations`, {
        body: JSON.stringify({
          panelId: panelId,
          newVisualization: {
            id: "panelViz_" + htmlIdGenerator()(),
            title: newVisualizationTitle,
            query: pplQuery,
            type: newVisualizationType,
            timeField: newVisualizationTimeField,
          },
        }),
      })
      .then(async (res) => {
        // console.log('here it is', res);
        setPanelVisualizations(res.visualizations);
        setToast(
          `Visualization ${newVisualizationTitle} successfully added!`,
          "success"
        );
      })
      .catch((err) => {
        setToast(
          `Error in adding ${newVisualizationTitle} visualization to the panel`,
          "danger"
        );
        console.error(err);
      });
    closeModal();
  };

  const removeVisualization = (
    visualizationId: string,
    visualizationName: string
  ) => {
    const newVisualizationList = _.reject(panelVisualizations, {
      id: visualizationId,
    });
    if (newVisualizationList.length === 0) {
      setEditMode(false);
      http
        .put(`${CUSTOM_PANELS_API_PREFIX}/visualizations/edit`, {
          body: JSON.stringify({
            panelId: panelId,
            visualizationParams: [],
          }),
        })
        .then(async (res) => {
          setPanelVisualizations(res.visualizations);
          console.log("edit successful");
          // setToast(`Visualization ${newVisualizationTitle} successfully added!`, 'success');
        })
        .catch((err) => {
          // setToast(`Error in adding ${newVisualizationTitle} visualization to the panel`, 'danger');
          console.error(err);
        });
    }
    setPanelVisualizations(newVisualizationList);
  };

  const deleteVisualization = (
    visualizationId: string,
    visualizationName: string
  ) => {
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
    // const filteredPanelVisualizations = panelVisualizations.filter(
    //   (panelVisualization) => panelVisualization.id != visualizationId
    // );
    // setPanelVisualizations([...filteredPanelVisualizations]);

    http
      .delete(
        `${CUSTOM_PANELS_API_PREFIX}/visualizations/${panelId}/${visualizationId}`
      )
      .then(async (res) => {
        // console.log('here it is', res);
        setPanelVisualizations(res.visualizations);
        setToast(`Visualization successfully deleted!`, "success");
      })
      .catch((err) => {
        setToast(`Error in deleting visualization to the panel`, "danger");
        console.error(err);
      });
    //NOTE: Make a backend call to Delete Visualization
    closeModal();
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
        start={start}
        end={end}
        setToast={setToast}
        http={http}
        pplService={pplService}
        panelVisualizations={panelVisualizations}
        setPanelVisualizations={setPanelVisualizations}
        isFlyoutReplacement={isFlyoutReplacement}
        replaceVisualizationId={replaceVisualizationId}
      />
    );
  }

  // Fetch the custom panel on Initial Mount
  useEffect(() => {
    fetchCustomPanel();
    // return () => {
    //   onRefreshFilters();
    // };
  }, []);

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
              Created on {moment(panelCreatedTime).format(UI_DATE_FORMAT)}
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
                  <EuiButton
                    iconType={editMode ? "save" : "pencil"}
                    onClick={editPanel}
                    disabled={editDisabled}
                  >
                    {editMode ? "Save" : "Edit"}
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContentBody>
            <EuiFlexGroup gutterSize="s">
              <EuiFlexItem>
                <EuiFieldText
                  placeholder="Use PPL 'where' clauses to add filters on all the visualizations in this panel"
                  value={pplFilterValue}
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
                <EuiButton
                  isDisabled={inputDisabled}
                  onClick={onRefreshFilters}
                >
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
                deleteVisualization={deleteVisualization}
                pplFilterValue={pplFilterValue}
                showFlyout={showFlyout}
                removeVisualization={removeVisualization}
              />
            )}
            <></>
          </EuiPageContentBody>
        </EuiPageBody>
      </EuiPage>
      {isModalVisible && modalLayout}
      {flyout}
    </div>
  );
};
