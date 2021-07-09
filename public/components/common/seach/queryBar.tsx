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

const commands: EuiSuggestItemProps[] =[
  {type: {iconType: 'search', color: 'tint1'} ,label: 'dedup'},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'eval'},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'fields'},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'rename'},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'search'},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'sort'},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'stats'},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'where'},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'head'},
  {type: {iconType: 'search', color: 'tint1'} ,label: 'top'},
  {type: {iconType: 'search', color: 'tint1'}, label: 'source'}
]

export function QueryBar(props: IQueryBarProps) {
  
  const {
    query,
    handleQueryChange,
    handleQuerySearch
  } = props;

  const [inputValue, setInputValue] = useState('');

  const splittedModel = inputValue.split(' ');
  const prefix = splittedModel[splittedModel.length - 1];
  const suggestions = commands.filter(
    ({ label }) => label.startsWith(prefix) && prefix !== label && prefix !== ''
  );

  const onItemClick = useCallback(
    ({ label }) => {
      setInputValue(inputValue.substring(0, inputValue.lastIndexOf(prefix)) + label);
    },
    [inputValue, prefix]
  );

  const onInputChange = useCallback((target) => {
    setInputValue(target.value);
    handleQueryChange(target.value);
  }, [])

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleQuerySearch();
    }
  }

  return (
    <Fragment>
    {/* <EuiFlexItem>
      <EuiFieldSearch
        fullWidth
        isClearable={true}
        placeholder="Enter PPL to retrieve log, traces and metrics"
        data-test-subj="search-bar-input-box"
        value={ query[RAW_QUERY] }
        onChange={(e) => {
          console.log('changed value: ', e.target.value);
          handleQueryChange(e.target.value);
        }}
        onSearch={() => {
          handleQuerySearch();
        }}
      />
    </EuiFlexItem> */}
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
