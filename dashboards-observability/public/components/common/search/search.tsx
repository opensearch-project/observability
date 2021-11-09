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

import './search.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { 
  EuiFlexGroup,
  EuiButton,
  EuiFlexItem,
  EuiPopover,
  EuiButtonEmpty,
  EuiPopoverFooter,
  EuiIcon,
  EuiButtonIcon
} from '@elastic/eui';
import _ from 'lodash';
import { DatePicker } from './date_picker';
import '@algolia/autocomplete-theme-classic';
import { Autocomplete } from './autocomplete';
import { SavePanel } from '../../explorer/save_panel';
import { useCallback } from 'react';

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
    explorerData,
    selectedPanelName,
    selectedCustomPanelOptions,
    setSelectedPanelName,
    setSelectedCustomPanelOptions,
    handleSavingObject,
    isPanelTextFieldInvalid,
    savedObjects,
    showSavePanelOptionsList,
    showSaveButton = true,
    setToast,
    runButtonText
  } = props;

  const [isSavePanelOpen, setIsSavePanelOpen] = useState(false);

  const saveButton = (
    <EuiButton
      onClick={() => {
                setIsSavePanelOpen((staleState) => {
                  return !staleState;
                })
              }}
      data-test-subj="saved-query-management-popover-button"
    >
      <EuiIcon size="m" type="save" className="euiQuickSelectPopover__buttonText" />
      <EuiIcon type="arrowDown" />
    </EuiButton>
  );

  return (
    <div className="globalQueryBar">
      <EuiFlexGroup gutterSize="s" justifyContent="flexStart" alignItems='center'>
        <EuiFlexItem
          key="search-bar"
        >
          <Autocomplete
            key={"autocomplete-search-bar"}
            query={query}
            tempQuery={tempQuery}
            handleQueryChange={handleQueryChange}
            handleQuerySearch={handleQuerySearch}
            dslService={dslService}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
        <EuiButtonIcon aria-label="ppl-info" iconType="iInCircle" iconSize="l" target="_blank" href="https://opensearch.org/docs/latest/search-plugins/ppl/commands/"/>
        </EuiFlexItem>
        <EuiFlexItem
          className="euiFlexItem--flexGrowZero event-date-picker"
        >
          <DatePicker
            startTime={startTime}
            endTime={endTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            setIsOutputStale={setIsOutputStale}
            liveStreamChecked={props.liveStreamChecked}
            onLiveStreamChange={props.onLiveStreamChange}
            handleTimePickerChange={ (timeRange: Array<string>) => handleTimePickerChange(timeRange) }
          />
        </EuiFlexItem>
        <EuiFlexItem
          key={"search-run"}
          className="euiFlexItem--flexGrowZero"
        >
          <EuiButton
            size='m'
            iconType={ isEmpty(explorerData) ? 'play': 'refresh' }
            fill={ isEmpty(explorerData) ? true : false }
            onClick={() => {
              handleQuerySearch();
            }}
          >
            { runButtonText ? runButtonText : isEmpty(explorerData) ? 'Run' : 'Refresh' }
          </EuiButton>
        </EuiFlexItem>
        { showSaveButton && (
          <>
            <EuiFlexItem
              key={"search-save-"}
              className="euiFlexItem--flexGrowZero"
            >
              <EuiPopover
                button={ saveButton }
                isOpen={isSavePanelOpen}
                closePopover={() => setIsSavePanelOpen(false)}
              >
                <SavePanel
                  selectedOptions={ selectedCustomPanelOptions }
                  handleNameChange={ setSelectedPanelName }
                  handleOptionChange={ setSelectedCustomPanelOptions }
                  savedObjects={ savedObjects }
                  isTextFieldInvalid={ isPanelTextFieldInvalid }
                  savePanelName={ selectedPanelName }
                  showOptionList={ showSavePanelOptionsList }
                />
                <EuiPopoverFooter>
                  <EuiFlexGroup
                    justifyContent="flexEnd"
                  >
                    <EuiFlexItem grow={false}>
                      <EuiButtonEmpty
                        size="s"
                        onClick={() => setIsSavePanelOpen(false)}>
                        { "Cancel" }
                      </EuiButtonEmpty>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <EuiButton
                        size="s"
                        fill
                        onClick={() => { 
                          handleSavingObject();
                          setIsSavePanelOpen(false);
                        }}>
                        { "Save" }
                      </EuiButton>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPopoverFooter>
              </EuiPopover>
            </EuiFlexItem>
          </>
        )}
      </EuiFlexGroup>
    </div>
  );
};

Search.propTypes = {
  handleQueryChange: PropTypes.func,
  handleQuerySearch: PropTypes.func,
};
