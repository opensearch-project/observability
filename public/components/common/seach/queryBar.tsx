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
    query,
    handleQueryChange,
    handleQuerySearch
  } = props;

  return (
    <EuiFlexItem>
      <EuiFieldSearch
        fullWidth
        isClearable={true}
        placeholder="Enter PPL to retrieve log, traces and metrics"
        data-test-subj="search-bar-input-box"
        value={ query }
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