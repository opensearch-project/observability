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
} from '@elastic/eui';
import _ from 'lodash';
import { DatePicker } from './date_picker';
import '@algolia/autocomplete-theme-classic';
import { Autocomplete } from './autocomplete';
import { SavePanel } from '../../explorer/save_panel';
import { useCallback } from 'react';

export interface IQueryBarProps {
  query: any;
  handleQueryChange: (query: string, index: string) => void;
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
    showSaveButton = true
  } = props;

  const [isSavePanelOpen, setIsSavePanelOpen] = useState<boolean>(false);

  const memorizedHandleQuerySearch = useCallback(() => {
    handleQuerySearch();
  }, [
    query,
    startTime,
    endTime
  ]);

  function renderAutocomplete({
    query,
    handleQueryChange,
    handleQuerySearch,
    dslService,
  }: IQueryBarProps) {
    return (
      <Autocomplete
        query={query}
        handleQueryChange={handleQueryChange}
        handleQuerySearch={handleQuerySearch}
        dslService={dslService}
      />
    );
  }

  const button = (
    <EuiButton 
      iconType='heart'
      onClick={
        () => {
          setIsSavePanelOpen((staleState) => {
            return !staleState;
          })
        }
      }
    >
      { "Save" }
    </EuiButton>
  );

  return (
    <div className="globalQueryBar">
      <EuiFlexGroup gutterSize="s" justifyContent="flexEnd">
        <div className="autocomplete">
          {renderAutocomplete({ query, handleQueryChange, handleQuerySearch, dslService })}
        </div>
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
        <EuiFlexItem
          key={"search-run"}
          className="euiFlexItem--flexGrowZero"
        >
          <EuiButton 
            iconType={ isEmpty(explorerData) ? 'play': 'refresh' }
            fill={ isEmpty(explorerData) ? true : false }
            onClick={() => {
              memorizedHandleQuerySearch();
            }}
          >
            { isEmpty(explorerData) ? 'Run' : 'Refresh' }
          </EuiButton>
        </EuiFlexItem>
        { showSaveButton && (
          <>
            <EuiFlexItem
              key={"search-save-"}
              className="euiFlexItem--flexGrowZero"
            >
              <EuiPopover
                button={ button }
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
                        onClick={() => handleSavingObject()}>
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
