/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './search.scss';

import React, { useMemo, useRef, useState } from 'react';
import {
  EuiFlexGroup,
  EuiButton,
  EuiFlexItem,
  EuiPopover,
  EuiButtonEmpty,
  EuiPopoverFooter,
  EuiBadge,
  EuiContextMenuPanel,
  EuiText,
  EuiToolTip,
} from '@elastic/eui';
import _, { reduce } from 'lodash';
import { DatePicker } from './date_picker';
import '@algolia/autocomplete-theme-classic';
import { Autocomplete } from './autocomplete';
import { SavePanel } from '../../explorer/save_panel';
import { PPLReferenceFlyout } from '../helpers';
import { uiSettingsService } from '../../../../common/utils';
import { HitsCounter } from '../../explorer/hits_counter';
import { APP_ANALYTICS_TAB_ID_REGEX } from '../../../../common/constants/explorer';
export interface IQueryBarProps {
  query: string;
  tempQuery: string;
  handleQueryChange: (query: string) => void;
  handleQuerySearch: () => void;
  dslService: any;
}

export interface IDatePickerProps {
  startTime: string;
  endTime: string;
  setStartTime: () => void;
  setEndTime: () => void;
  setTimeRange: () => void;
  setIsOutputStale: () => void;
  handleTimePickerChange: (timeRange: string[]) => any;
}

export const Search = (props: any) => {
  const {
    query,
    tempQuery,
    handleQueryChange,
    handleQuerySearch,
    handleTimePickerChange,
    dslService,
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    setIsOutputStale,
    selectedPanelName,
    selectedCustomPanelOptions,
    setSelectedPanelName,
    setSelectedCustomPanelOptions,
    handleSavingObject,
    isPanelTextFieldInvalid,
    savedObjects,
    showSavePanelOptionsList,
    showSaveButton = true,
    handleTimeRangePickerRefresh,
    liveTailButton,
    isLiveTailPopoverOpen,
    closeLiveTailPopover,
    popoverItems,
    isLiveTailOn,
    countDistribution,
    selectedSubTabId,
    searchBarConfigs = {},
    getSuggestions,
    onItemSelect,
    tabId = '',
    baseQuery = '',
  } = props;

  const appLogEvents = tabId.match(APP_ANALYTICS_TAB_ID_REGEX);

  const [isSavePanelOpen, setIsSavePanelOpen] = useState(false);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [liveHits, setLiveHits] = useState(0);
  const liveHitsRef = useRef(0);
  liveHitsRef.current = liveHits;

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };

  const showFlyout = () => {
    setIsFlyoutVisible(true);
  };

  let flyout;
  if (isFlyoutVisible) {
    flyout = <PPLReferenceFlyout module="explorer" closeFlyout={closeFlyout} />;
  };

  const Savebutton = (
    <EuiButton
      iconSide="right"
      onClick={() => {
        setIsSavePanelOpen((staleState) => {
          return !staleState;
        });
      }}
      data-test-subj="eventExplorer__saveManagementPopover"
      iconType="arrowDown"
    >
      Save
    </EuiButton>
  );

  const totalHits = useMemo(() => {
   if (isLiveTailOn && countDistribution?.data) {    
    let hits = reduce(
      countDistribution['data']['count()'],
      (sum, n) => {
        return sum + n;
      },
      liveHits
      )
      setLiveHits(hits);
      return hits
  }} , [countDistribution?.data]);

  return (
    <div className="globalQueryBar">
      <EuiFlexGroup gutterSize="s" justifyContent="flexStart" alignItems="flexStart">
        {appLogEvents && (
          <EuiFlexItem style={{ minWidth: 110 }} grow={false}>
            <EuiToolTip position="top" content={baseQuery}>
              <EuiBadge className="base-query-popover" color="hollow">
                Base Query
              </EuiBadge>
            </EuiToolTip>
          </EuiFlexItem>
        )}
        <EuiFlexItem key="search-bar" className="search-area">
          <Autocomplete
            key={'autocomplete-search-bar'}
            query={query}
            tempQuery={tempQuery}
            baseQuery={baseQuery}
            handleQueryChange={handleQueryChange}
            handleQuerySearch={handleQuerySearch}
            dslService={dslService}
            getSuggestions={getSuggestions}
            onItemSelect={onItemSelect}
            tabId={tabId}
          />
          <EuiBadge
            className={`ppl-link ${
              uiSettingsService.get('theme:darkMode') ? 'ppl-link-dark' : 'ppl-link-light'
            }`}
            color="hollow"
            onClick={() => showFlyout()}
            onClickAriaLabel={'pplLinkShowFlyout'}
          >
            PPL
          </EuiBadge>
        </EuiFlexItem>
        <EuiFlexItem grow={false} />
        <EuiFlexItem className="euiFlexItem--flexGrowZero event-date-picker" grow={false}>
          {isLiveTailOn && countDistribution?.data ? (
            <EuiFlexGroup justifyContent="center" alignItems="center">
              <EuiText size="s" textAlign="left" color="default">
                <h3>Live - </h3>
              </EuiText>
              <EuiFlexItem grow={false}>
                <HitsCounter
                  hits={totalHits}
                  showResetButton={false}
                  onResetQuery={() => { } } />
              </EuiFlexItem>
            </EuiFlexGroup>
          ) : (
            <DatePicker
              startTime={startTime}
              endTime={endTime}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              setIsOutputStale={setIsOutputStale}
              liveStreamChecked={props.liveStreamChecked}
              onLiveStreamChange={props.onLiveStreamChange}
              handleTimePickerChange={(timeRange: string[]) => handleTimePickerChange(timeRange)}
              handleTimeRangePickerRefresh={handleTimeRangePickerRefresh} />
          )}
          </EuiFlexItem>
          <EuiFlexItem className="euiFlexItem--flexGrowZero live-tail">
            <EuiPopover
              panelPaddingSize="none"
              button={liveTailButton}
              isOpen={isLiveTailPopoverOpen}
              closePopover={closeLiveTailPopover}
            >
              <EuiContextMenuPanel items={popoverItems} />
            </EuiPopover>
          </EuiFlexItem>
        {showSaveButton && searchBarConfigs[selectedSubTabId]?.showSaveButton && (
          <>
            <EuiFlexItem key={'search-save-'} className="euiFlexItem--flexGrowZero">
              <EuiPopover
                button={Savebutton}
                isOpen={isSavePanelOpen}
                closePopover={() => setIsSavePanelOpen(false)}
              >
                <SavePanel
                  selectedOptions={selectedCustomPanelOptions}
                  handleNameChange={setSelectedPanelName}
                  handleOptionChange={setSelectedCustomPanelOptions}
                  savedObjects={savedObjects}
                  isTextFieldInvalid={isPanelTextFieldInvalid}
                  savePanelName={selectedPanelName}
                  showOptionList={
                    showSavePanelOptionsList &&
                    searchBarConfigs[selectedSubTabId]?.showSavePanelOptionsList
                  }
                />
                <EuiPopoverFooter>
                  <EuiFlexGroup justifyContent="flexEnd">
                    <EuiFlexItem grow={false}>
                      <EuiButtonEmpty
                        size="s"
                        onClick={() => setIsSavePanelOpen(false)}
                        data-test-subj="eventExplorer__querySaveCancel"
                      >
                        Cancel
                      </EuiButtonEmpty>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <EuiButton
                        size="s"
                        fill
                        onClick={() => {
                          handleSavingObject();
                          setIsSavePanelOpen(false);
                        }}
                        data-test-subj="eventExplorer__querySaveConfirm"
                      >
                        Save
                      </EuiButton>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPopoverFooter>
              </EuiPopover>
            </EuiFlexItem>
          </>
        )}
      </EuiFlexGroup>
      {flyout}
    </div>
  );
};
