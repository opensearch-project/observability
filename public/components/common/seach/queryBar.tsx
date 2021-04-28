/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import React from 'react';
import {
  EuiFieldSearch,
  EuiFlexItem,
} from '@elastic/eui';
import {
  IQueryBarProps
} from './search';

export function QueryBar(props: IQueryBarProps) {

  const {
    handleQueryChange,
    handleQuerySearch
  } = props;

  return (
    <EuiFlexItem>
      <EuiFieldSearch
        fullWidth
        isClearable={false}
        placeholder="Enter PPL to retrieve log, traces and metrics"
        data-test-subj="search-bar-input-box"
        //value={query}
        onChange={(e) => {
          handleQueryChange(e.target.value);
        }}
        onSearch={() => {
          handleQuerySearch();
        }}
      />
    </EuiFlexItem>
  );
}