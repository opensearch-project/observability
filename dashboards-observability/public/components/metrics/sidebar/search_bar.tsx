/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiSearchBar } from '@elastic/eui';
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearSearchedMetrics, searchMetric } from '../redux/slices/metrics_slice';

interface ISearchBarProps {
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBar = (props: ISearchBarProps) => {
  const { setSearch } = props;

  const dispatch = useDispatch();

  const onChange = ({ query }: { query: any }) => {
    if (query.text !== '') {
      setSearch(true);
      dispatch(searchMetric({ id: query.text }));
    } else {
      setSearch(false);
      dispatch(clearSearchedMetrics({}));
    }
  };

  return (
    <div>
      <EuiSearchBar
        box={{
          placeholder: 'Search for metrics',
          incremental: true,
        }}
        defaultQuery={''}
        onChange={onChange}
      />
    </div>
  );
};
