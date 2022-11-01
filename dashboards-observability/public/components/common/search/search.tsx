/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './search.scss';

import React, { useState } from 'react';
import {
  EuiFlexGroup,
  EuiButton,
  EuiFlexItem,
  EuiPopover,
  EuiButtonEmpty,
  EuiPopoverFooter,
  EuiBadge,
  EuiContextMenuPanel,
  EuiToolTip,
  EuiCallOut
} from '@elastic/eui';
import { DatePicker } from './date_picker';
import '@algolia/autocomplete-theme-classic';
import { Autocomplete } from './autocomplete';
import { SavePanel } from '../../event_analytics/explorer/save_panel';
import { PPLReferenceFlyout } from '../helpers';
import { uiSettingsService } from '../../../../common/utils';
import { APP_ANALYTICS_TAB_ID_REGEX } from '../../../../common/constants/explorer';
import { LiveTailButton, StopLiveButton } from '../live_tail/live_tail_button';
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
  handleTimeRangePickerRefresh: () => any;
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
    selectedSubTabId,
    searchBarConfigs = {},
    getSuggestions,
    onItemSelect,
    tabId = '',
    baseQuery = '',
    stopLive,
    setIsLiveTailPopoverOpen,
    liveTailName,
    searchError = null,
    curVisId,
    spanValue,
    setSubType,
    setMetricMeasure,
    setMetricLabel,
  } = props;
  
  const appLogEvents = tabId.match(APP_ANALYTICS_TAB_ID_REGEX);
  const [isSavePanelOpen, setIsSavePanelOpen] = useState(false);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };

  const showFlyout = () => {
    setIsFlyoutVisible(true);
  };

  let flyout;
  if (isFlyoutVisible) {
    flyout = <PPLReferenceFlyout module="explorer" closeFlyout={closeFlyout} />;
  }

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

  const liveButton = (
    <LiveTailButton
      isLiveTailOn={isLiveTailOn}
      setIsLiveTailPopoverOpen={setIsLiveTailPopoverOpen}
      liveTailName={liveTailName}
      isLiveTailPopoverOpen={isLiveTailPopoverOpen}
      dataTestSubj="eventLiveTail"
    />
  );

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
          {!isLiveTailOn && (
            <DatePicker
              startTime={startTime}
              endTime={endTime}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              setIsOutputStale={setIsOutputStale}
              liveStreamChecked={props.liveStreamChecked}
              onLiveStreamChange={props.onLiveStreamChange}
              handleTimePickerChange={(timeRange: string[]) => handleTimePickerChange(timeRange)}
              handleTimeRangePickerRefresh={handleTimeRangePickerRefresh}
            />
          )}
        </EuiFlexItem>
        {showSaveButton && !showSavePanelOptionsList && (
          <EuiFlexItem className="euiFlexItem--flexGrowZero live-tail">
            <EuiPopover
              panelPaddingSize="none"
              button={liveButton}
              isOpen={isLiveTailPopoverOpen}
              closePopover={closeLiveTailPopover}
            >
              <EuiContextMenuPanel items={popoverItems} />
            </EuiPopover>
          </EuiFlexItem>
        )}
        {isLiveTailOn && (
          <EuiFlexItem grow={false}>
            <StopLiveButton StopLive={stopLive} dataTestSubj="eventLiveTail__off" />
          </EuiFlexItem>
        )}
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
                  curVisId={curVisId}
                  spanValue={spanValue}
                  setSubType={setSubType}
                  setMetricMeasure={setMetricMeasure}
                  setMetricLabel={setMetricLabel}
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
      { searchError && searchError.error && (
        <EuiFlexGroup gutterSize="s" justifyContent="flexStart" alignItems="flexStart">
          <EuiFlexItem>
            <EuiCallOut title={JSON.parse(searchError.message).error.reason} color="danger" iconType="alert">
              <p>
                {JSON.parse(searchError.message).error.details}
              </p>
            </EuiCallOut>
          </EuiFlexItem>
        </EuiFlexGroup>)
      }
      {flyout}
    </div>
  );
};
