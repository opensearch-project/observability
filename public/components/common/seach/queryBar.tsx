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
    description: "search source=<index> [boolean-expression]"},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'source',
    description: "source=<index>"}
]
const pipeCommands: EuiSuggestItemProps[] = [
  {type: {iconType: 'search', color: 'tint1'} ,label: 'dedup',
    description: "dedup [int] <field-list> [keepempty=<bool>] [consecutive=<bool>]"},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'eval',
    description: `eval <field>=<expression> ["," <field>=<expression> ]...`},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'fields',
    description: "field [+|-] <field-list>"},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'head',
    description: "head [N]"},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'rare',
      description: "rare <field-list> [by-clause]"},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'rename',
    description: `rename <source-field> AS <target-field>["," <source-field> AS <target-field>]...`},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'sort',
    description: "sort <[+|-] sort-field>..."},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'stats',
    description: "stats <aggregation>... [by-clause]..."},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'top',
    description: "top [N] <field-list> [by-clause]"},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'where',
    description: "where <boolean-expression>"},
]

const indices: EuiSuggestItemProps[] = [
  {type: {iconType: 'kqlField', color: 'tint4'} ,label: 'opensearch_dashboards_sample_data_ecommerce'},
  {type: {iconType: 'kqlField', color: 'tint4'} ,label: 'opensearch_dashboards_sample_data_flights'},
  {type: {iconType: 'kqlField', color: 'tint4'} ,label: 'opensearch_dashboards_sample_data_logs'}
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
  const [inputValue, setInputValue] = useState(query && query[RAW_QUERY] ? query[RAW_QUERY] : '');
  //const [inputValue, setInputValue] = useState("");
  
  const splittedModel = inputValue.split(' ');
  const prefix = splittedModel[splittedModel.length - 1];

  // Function to grab suggestions
  const getSuggestions = () => {
    // First commands should either be search or source
    // source should be followed by an available index
    if (prefix.startsWith("source=")) {
      return getIndices(prefix.replace("source=",""));
    }
    if (splittedModel.length === 1) {
      return firstCommand;
    }
    // TODO: (Grammar implementation) Get commands based on grammar from backend
    // Contextual suggestions are hardcoded for now
    else if (splittedModel.length > 1) {
      // Possible pipe commands
      if (splittedModel[splittedModel.length - 2] === "|"){
        return pipeCommands.filter(
          ( { label } ) => label.startsWith(prefix) && prefix !== label 
        );
      }
      // If user didn't input any spaces before pipe
      else if (prefix.includes("|")) {
        return pipeCommands.filter(
          ( { label } ) => label.startsWith(prefix.replace(prefix.substring(0, prefix.lastIndexOf("|") + 1), "")) && prefix.replace(prefix.substring(0, prefix.lastIndexOf("|") + 1), "") !== label
        )
      }
      // search should be followed by source and an available index
      else if (splittedModel[splittedModel.length - 2] === "search") {
        return [  {type: {iconType: 'search', color: 'tint1'} ,label: 'source',
        description: "source=<index>"} ]
      }
      // In case there are no spaces between 'source' and '='
      else if (splittedModel.length > 2 && splittedModel[splittedModel.length - 3] === "source") {
        return indices.filter(
          ( { label } ) => label.startsWith(prefix) &&  prefix !== label
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
      if (label.startsWith('opensearch')) {
        setInputValue(inputValue + label);
      }
      else {
        setInputValue(inputValue.substring(0, inputValue.lastIndexOf(prefix)) + label);
      }
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
