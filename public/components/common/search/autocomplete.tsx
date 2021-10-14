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
import React, { 
  createElement,
  Fragment,
  useEffect,
  useRef 
} from 'react';
import { render } from 'react-dom';
import { autocomplete } from '@algolia/autocomplete-js';
import { IQueryBarProps } from './search';
import { RAW_QUERY } from '../../../../common/constants/explorer';
import { createPPLSuggestionsPlugin } from './autocomplete_plugin';

export function Autocomplete(props: IQueryBarProps) {
  const containerRef = useRef(null);
  const { query, handleQueryChange, handleQuerySearch, dslService } = props;

  const PPLSuggestionPlugin = createPPLSuggestionsPlugin({
    query,
    handleQueryChange: props.handleQueryChange,
    handleQuerySearch: props.handleQuerySearch,
    dslService: props.dslService,
  });

  useEffect(() => {

    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment },
      render({ children }, root) {
        render(children, root);
      },
      initialState: { query: query[RAW_QUERY] },
      openOnFocus: true,
      placeholder: 'Enter PPL query to retrieve log, traces, and metrics',
      plugins: [PPLSuggestionPlugin],
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, []);

  return <div ref={containerRef} />;
}
