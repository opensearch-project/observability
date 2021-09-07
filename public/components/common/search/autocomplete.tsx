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
import React, { useEffect } from 'react';
import { autocomplete } from '@algolia/autocomplete-js';
import { IQueryBarProps } from './search';
import { RAW_QUERY } from '../../../../common/constants/explorer';
import { createPPLSuggestionsPlugin } from './autocomplete_plugin';

export function Autocomplete(props: IQueryBarProps) {
  const { query, handleQueryChange, handleQuerySearch, dslService } = props;

  const PPLSuggestionPlugin = createPPLSuggestionsPlugin({
    handleQueryChange: props.handleQueryChange,
    handleQuerySearch: props.handleQuerySearch,
    dslService: props.dslService
  });

  useEffect(() => {
    const search = autocomplete({
      container: '#autocomplete',
      initialState: { query: props.query[RAW_QUERY] },
      openOnFocus: true,
      onStateChange: ({state}) => {
        // console.log(state);
      },
      placeholder: 'Enter PPL query to retrieve log, traces, and metrics',
      plugins: [PPLSuggestionPlugin],
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, []);

  return <div id="autocomplete" />;
}