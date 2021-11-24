/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './search.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  EuiFlexGroup,
  EuiButton,
  EuiFlexItem,
  EuiPopover,
  EuiButtonEmpty,
  EuiPopoverFooter,
  EuiBadge,
} from '@elastic/eui';
import _ from 'lodash';
import { DatePicker } from './date_picker';
import '@algolia/autocomplete-theme-classic';
import { Autocomplete } from './autocomplete';
import { SavePanel } from '../../explorer/save_panel';
import { PPLReferenceFlyout } from '../helpers';
import { uiSettingsService } from '../../../../common/utils';

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
  handleTimePickerChange: (timeRange: Array<string>) => any;
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
  } = props;

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

  const saveButton = (
    <EuiButton
      iconSide="right"
      onClick={() => {
        setIsSavePanelOpen((staleState) => {
          return !staleState;
        });
      }}
      data-test-subj="saved-query-management-popover-button"
      iconType="arrowDown"
    >
      Save
    </EuiButton>
  );

  return (
    <div className="globalQueryBar">
      <EuiFlexGroup gutterSize="s" justifyContent="flexStart" alignItems="flexStart">
        <EuiFlexItem key="search-bar" className="search-area">
          <Autocomplete
            key={'autocomplete-search-bar'}
            query={query}
            tempQuery={tempQuery}
            handleQueryChange={handleQueryChange}
            handleQuerySearch={handleQuerySearch}
            dslService={dslService}
          />
          <EuiBadge 
            className={`ppl-link ${uiSettingsService.get('theme:darkMode') ? "ppl-link-dark" : "ppl-link-light"}`}
            color="hollow"
            onClick={() => showFlyout()}
            onClickAriaLabel={"pplLinkShowFlyout"}
          >
            PPL
          </EuiBadge>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
        </EuiFlexItem>
        <EuiFlexItem className="euiFlexItem--flexGrowZero event-date-picker">
          <DatePicker
            startTime={startTime}
            endTime={endTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            setIsOutputStale={setIsOutputStale}
            liveStreamChecked={props.liveStreamChecked}
            onLiveStreamChange={props.onLiveStreamChange}
            handleTimePickerChange={(timeRange: Array<string>) => handleTimePickerChange(timeRange)}
            handleTimeRangePickerRefresh={handleTimeRangePickerRefresh}
          />
        </EuiFlexItem>
        {showSaveButton && (
          <>
            <EuiFlexItem key={'search-save-'} className="euiFlexItem--flexGrowZero">
              <EuiPopover
                button={saveButton}
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
                  showOptionList={showSavePanelOptionsList}
                />
                <EuiPopoverFooter>
                  <EuiFlexGroup justifyContent="flexEnd">
                    <EuiFlexItem grow={false}>
                      <EuiButtonEmpty size="s" onClick={() => setIsSavePanelOpen(false)}>
                        {'Cancel'}
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
                      >
                        {'Save'}
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

Search.propTypes = {
  handleQueryChange: PropTypes.func,
  handleQuerySearch: PropTypes.func,
};
