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
  EuiButtonEmpty,
  EuiCodeBlock,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiGlobalToastList,
  EuiHorizontalRule,
  EuiLink,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiPanel,
  EuiRadio,
  EuiRadioGroup,
  EuiSelect,
  EuiSpacer,
  EuiSuperDatePicker,
  EuiSwitch,
  EuiText,
  EuiTextArea,
  EuiTitle,
  htmlIdGenerator,
} from '@elastic/eui';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
import _ from 'lodash';
import React, { Fragment, ReactChild, useEffect, useState } from 'react';
import { CoreStart } from '../../../../../src/core/public';
import { EmptyPanelView } from './sub_components/empty_panel_view';
import {AddVizView} from './sub_components/add_viz_view'
import {
  CUSTOM_PANELS_API_PREFIX,
  CUSTOM_PANELS_DOCUMENTATION_URL,
} from '../../../common/constants/custom_panels';

// "CustomPanelsView" module used to render saved Custom Operational Panels

type Props = {
  panelId: string;
  panelType: string;
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  parentBreadcrumb: { text: string; href: string }[];
};

// const idPrefix = htmlIdGenerator()();

export const CustomPanelView = ({ panelId, panelType, http, chrome, parentBreadcrumb }: Props) => {
  const [openPanelName, setOpenPanelName] = useState('Sample Panel');
  const [toasts, setToasts] = useState<Array<Toast>>([]);
  const [filterBarValue, setFilterBarValue] = useState('');
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');
  const [isPaused, setIsPaused] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState();
  const [inputDisabled, setInputDisabled] = useState(true);
  const [showVizPanel, setShowVizPanel] = useState(false);
  const [isPanelEmpty, setIsPanelEmpty] = useState(true);

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

  const onRefresh = ({ start, end, refreshInterval }) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 100);
    }).then(() => {
      console.log(start, end, refreshInterval);
    });
  };

  const onStartInputChange = (e) => {
    setStart(e.target.value);
  };

  const onEndInputChange = (e) => {
    setEnd(e.target.value);
  };

  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const onRefreshChange = ({ isPaused, refreshInterval }) => {
    setIsPaused(isPaused);
    setRefreshInterval(refreshInterval);
  };

  const setToast = (title: string, color = 'success', text?: ReactChild) => {
    if (!text) text = '';
    setToasts([...toasts, { id: new Date().toISOString(), title, text, color } as Toast]);
  };

  const fecthCustomPanel = async () => {
    // fetch custom panel by Id from the backend
  };


  const closeVizWindow = () =>{
    setShowVizPanel(false);
    setIsPanelEmpty(true);
  }
  
  const addVizWindow = () => {
    setShowVizPanel(true);
    setIsPanelEmpty(false);
  };

  useEffect(() => {
    fecthCustomPanel();
    chrome.setBreadcrumbs([
      ...parentBreadcrumb,
      { text: openPanelName, href: `${_.last(parentBreadcrumb).href}${panelId}` },
    ]);
  }, []);

  const onChange = (e) => {
    setFilterBarValue(e.target.value);
  };

  return (
    <div>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={(removedToast) => {
          setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
        }}
        toastLifeTimeMs={6000}
      />
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
              Created on 08/20/2020 05:29:29
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem>
                  <EuiButton color="danger">Delete</EuiButton>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiButton>Export</EuiButton>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiButton>Edit name</EuiButton>
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
                  // onRefresh={onRefresh}
                  // isPaused={isPaused}
                  // refreshInterval={refreshInterval}
                  // onRefreshChange={onRefreshChange}
                  // recentlyUsedRanges={recentlyUsedRanges}
                  isDisabled={inputDisabled}
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton isDisabled={inputDisabled}>Refresh</EuiButton>
              </EuiFlexItem>
              <EuiFlexItem grow={false} onClick={addVizWindow}>
                <EuiButton fill>Add visualization</EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="l" />
            {isPanelEmpty ? (
              <EmptyPanelView addVizWindow={addVizWindow}/>
            ) : (
              <></>
            )}
            <>
            {showVizPanel && <AddVizView closeVizWindow={closeVizWindow}/>}
            </>
          </EuiPageContentBody>
        </EuiPageBody>
      </EuiPage>
    </div>
  );
};
