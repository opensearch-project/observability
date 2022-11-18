/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiGlobalToastList, EuiSearchBar, EuiToast } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { pplServiceRequestor } from '../helpers/utils';

interface ISearchBarProps {
  allAvailableMetrics: any;
  handleAddMetric: any;
}

export const SearchBar = (props: ISearchBarProps) => {
  const { allAvailableMetrics, handleAddMetric } = props;

  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  const [toasts, setToasts] = useState([]);
  const addToast = (res: string) => {
    if (res === 'success') {
      const toast = {
        id: 'success',
        title: 'Metric successfully added!!',
        color: 'success',
      };
      setToasts(toasts.concat(toast));
    } else {
      const toast = {
        id: 'fail',
        title: 'Metric not found.',
        color: 'danger',
      };
      setToasts(toasts.concat(toast));
    }
  };
  const removeToast = (removedToast: any) => {
    setToasts(toasts.filter((toast: any) => toast.id !== removedToast.id));
  };

  const onChange = ({ query }) => {
    const metric = allAvailableMetrics.find((row: any) => row.name.includes(query.text));
    if (metric) {
      handleAddMetric(metric);
      addToast('success');
    } else {
      addToast('fail');
    }
  };

  return (
    <div>
      <EuiSearchBar defaultQuery={''} onChange={onChange} />
      <EuiGlobalToastList toasts={toasts} dismissToast={removeToast} toastLifeTimeMs={6000} />
    </div>
  );
};
