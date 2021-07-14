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

import React, {Fragment, useEffect, useState, useCallback} from 'react';
import {
  EuiButtonEmpty,
  EuiFieldSearch,
  EuiFlexItem,
  EuiSuggest,
  EuiFlexGroup,
  EuiSelectableTemplateSitewide,
  EuiSelectableTemplateSitewideOption,
  EuiSuggestItem,
  EuiSuggestItemProps
} from '@elastic/eui';
import {
  IQueryBarProps
} from './search';
import {
  RAW_QUERY
} from '../../../common/constants/explorer';
import { item } from './search'

const firstCommand: EuiSuggestItemProps[] = [
  {type: {iconType: 'search', color: 'tint1'} ,label: 'search',
    description: "Using search command to retrieve document from the index."},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'source',
    description: "source=<index>"}
]
const pipeCommands: EuiSuggestItemProps[] = [
  {type: {iconType: 'search', color: 'tint1'} ,label: 'dedup',
    description: "Using dedup command to remove identical document defined by field from the search result"},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'eval',
    description: "The eval command evaluate the expression and append the result to the search result."},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'fields',
    description: "Using field command to keep or remove fields from the search result."},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'head',
    description: "The head command returns the first N number of specified results in search order."},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'rare',
      description: "Using rare command to find the least common tuple of values of all fields in the field list."},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'rename',
    description: "Using rename command to rename one or more fields in the search result."},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'sort',
    description: "Using sort command to sorts all the search result by the specified fields."},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'stats',
    description: "Using stats command to calculate the aggregation from search result."},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'top',
    description: "Using top command to find the most common tuple of values of all fields in the field list."},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'where',
    description: "The where command bool-expression to filter the search result."},
]

const indices: EuiSuggestItemProps[] = [
  {type: {iconType: 'kqlField', color: 'tint4'} ,label: 'source=opensearch_dashboards_sample_data_ecommerce'},
  {type: {iconType: 'kqlField', color: 'tint4'} ,label: 'source=opensearch_dashboards_sample_data_flights'},
  {type: {iconType: 'kqlField', color: 'tint4'} ,label: 'source=opensearch_dashboards_sample_data_logs'}
]

export function QueryBar(props: IQueryBarProps) {
  
  const {
    query,
    handleQueryChange,
    handleQuerySearch
  } = props;

  // State to keep track of current input
  // Query contains the queries to send to backend, inputValue just keeps track of what's
  // in the input bar at the time. This ensures that the query doesn't disappear when we
  // switch tabs or hit enter.
  const [inputValue, setInputValue] = useState(query[ RAW_QUERY ]);

  const splittedModel = inputValue.split(' ');
  const prefix = splittedModel[splittedModel.length - 1];

  // Function to grab suggestions
  const getSuggestions = () => {
    // First commands should either be search or source
    // source should be followed by an available index
    if (splittedModel.length === 1) {
      if (prefix.startsWith("source=")) {
        const str = prefix.replace("source=", "");
        return getIndices(str);
      }
      return firstCommand;
    }
    // TODO: (Grammar implementation) Get commands based on grammar from backend
    // Contextual suggestions are hardcoded for now
    if (splittedModel.length > 1) {
      // Possible pipe commands
      if (splittedModel[splittedModel.length - 2] === "|"){
        return pipeCommands.filter(
          ( { label } ) => label.startsWith(prefix) && prefix !== label 
        );
      }
      // search should be followed by source and an available index
      if (splittedModel[splittedModel.length - 2] === "search") {
        return indices.filter(
          ( { label } ) => label.startsWith(prefix) && prefix !== label
        );
      }
      // TODO: (Grammar implementation) Catch user typos and fix them based on their previous inputs. 
      // Ex: First command isn't search or source, user didn't input pipe after command, etc.
      // For now, just display pipeCommands
      return pipeCommands.filter(
        ( { label } ) => label.startsWith(prefix) && prefix !== label && prefix !== ""
      );
    }
  };

  // Function to grab available indices
  // TODO: Get indices from backend
  const getIndices = (str: string) => {
    return indices.filter(
      ( { label } ) => label.includes(str) && str !== label
    );
  }

  // Suggestion list to be displayed, returned by getSuggestions
  // Hardcode will be replaced eventually
  const suggestions = getSuggestions();

  // Input change and suggestion clicks only trigger a state change for inputValue
  // to reduce the number of things that are rerendered after the query is run
  const onItemClick = useCallback(
    ({ label }) => {
      setInputValue(inputValue.substring(0, inputValue.lastIndexOf(prefix)) + label);
    },
    [inputValue, prefix]
  );

  const onInputChange = useCallback((target) => {
    setInputValue(target.value);
  }, [])

  // Save query and search after enter key
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleQueryChange(inputValue);
      handleQuerySearch();
    }
  }

  // item from ./search.tsx handles adding new tabs
  // useEffect() uses item dependency to know when a new tab is created/switched
  // Query must be saved when new tab is loaded otherwise unsent queries disappear
  // after switching tabs
  useEffect(() => {
    handleQueryChange(inputValue);
  }, [item])

  return (
    <Fragment>
    <EuiFlexItem>
      <EuiSuggest
        placeholder="Enter PPL to retrieve log, traces, and metrics"
        suggestions={suggestions}
        value={inputValue}
        onInputChange={onInputChange}
        onItemClick={onItemClick}
        onKeyPress={handleKeyDown}
      />
    </EuiFlexItem>
    </Fragment>
  );
}
