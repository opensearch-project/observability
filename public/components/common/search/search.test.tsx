/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Search } from './search';

describe('Search bar', () => {
  it('handles query change', () => {
    const query = 'rawQuery';
    const tempQuery = 'rawQuery';
    const handleQueryChange = jest.fn();
    const handleQuerySearch = jest.fn();
    const dslService = jest.fn();
    const handleTimePickerChange = jest.fn();
    const selectedPanelName = jest.fn();
    const selectedCustomPanelOptions = jest.fn();
    const setSelectedPanelName = jest.fn();
    const setSelectedCustomPanelOptions = jest.fn();
    const handleSavingObject = jest.fn();
    const isPanelTextFieldInvalid = jest.fn();
    const showSavePanelOptionsList = jest.fn();
    const handleTimeRangePickerRefresh = jest.fn();
    const savedObjects = jest.fn();
    const getFullSuggestions = jest.fn();
    const onItemSelect = jest.fn();
    const dateRange = ['now-15m', 'now'];
    const liveTailButton = jest.fn();
    const isLiveTailPopoverOpen = jest.fn();
    const closeLiveTailPopover = jest.fn();
    const popoverItems = jest.fn();
    const isLiveTailOn = jest.fn();
    const countDistribution = jest.fn();
    const utils = render(
      <Search
        key="search-component"
        query={query}
        tempQuery={tempQuery}
        handleQueryChange={handleQueryChange}
        handleQuerySearch={handleQuerySearch}
        dslService={dslService}
        startTime={dateRange[0]}
        endTime={dateRange[1]}
        handleTimePickerChange={handleTimePickerChange}
        selectedPanelName={selectedPanelName}
        selectedCustomPanelOptions={selectedCustomPanelOptions}
        setSelectedPanelName={setSelectedPanelName}
        setSelectedCustomPanelOptions={setSelectedCustomPanelOptions}
        handleSavingObject={handleSavingObject}
        isPanelTextFieldInvalid={isPanelTextFieldInvalid}
        savedObjects={savedObjects}
        showSavePanelOptionsList={showSavePanelOptionsList}
        handleTimeRangePickerRefresh={handleTimeRangePickerRefresh}
        getSuggestions={getFullSuggestions}
        onItemSelect={onItemSelect}
        liveTailButton={liveTailButton}
        isLiveTailPopoverOpen={isLiveTailPopoverOpen}
        closeLiveTailPopover={closeLiveTailPopover}
        popoverItems={popoverItems}
        isLiveTailOn={isLiveTailOn}
        countDistribution={countDistribution}
      />
    );

    const searchBar = utils.getByPlaceholderText('Enter PPL query');
    fireEvent.change(searchBar, { target: { value: 'new query' } });
    expect(handleQueryChange).toBeCalledWith('new query');
  });
});
