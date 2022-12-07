/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */

import './search.scss';
import $ from 'jquery';
import React, { useEffect, useMemo, useState } from 'react';
import { AutocompleteState, createAutocomplete } from '@algolia/autocomplete-core';
import { EuiFieldText, EuiTextArea } from '@elastic/eui';
import DSLService from 'public/services/requests/dsl';
import { IQueryBarProps } from './search';
import { uiSettingsService } from '../../../../common/utils';
import { AutocompleteItem } from '../../../../common/constants/autocomplete';

interface AutocompleteProps extends IQueryBarProps {
  getSuggestions: (
    base: string,
    query: string,
    dslService: DSLService,
    possibleCommands: Array<{ label: string }>
  ) => Promise<AutocompleteItem[]>;
  onItemSelect: any;
  isDisabled?: boolean;
  baseQuery: string;
  tabId: string;
  placeholder?: string;
  possibleCommands?: Array<{ label: string }>;
  append?: any;
}

export const Autocomplete = (props: AutocompleteProps) => {
  const {
    query,
    tempQuery,
    handleQueryChange,
    handleQuerySearch,
    dslService,
    getSuggestions,
    onItemSelect,
    isDisabled,
    baseQuery,
    tabId = '',
    placeholder = 'Enter PPL query',
    possibleCommands,
    append,
  } = props;

  const [autocompleteState, setAutocompleteState] = useState<AutocompleteState<AutocompleteItem>>({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: tempQuery,
    activeItemId: null,
    status: 'idle',
  });

  const appLogEvents = tabId.startsWith('application-analytics-tab');
  const panelsFilter = tabId === 'panels-filter';

  useEffect(() => {
    const searchBar = document.getElementById('autocomplete-textarea');

    searchBar?.addEventListener('keydown', (e) => {
      const keyCode = e.which || e.keyCode;
      if (keyCode === 13 && e.shiftKey) {
        handleQuerySearch();
      }
      return () => {
        $('#autocomplete-textarea').unbind('keydown');
      };
    });
  }, []);

  const depArray =
    appLogEvents || panelsFilter
      ? [baseQuery, query, dslService, autocompleteState]
      : [baseQuery, query, dslService];

  const autocomplete = useMemo(() => {
    return createAutocomplete<
      AutocompleteItem,
      React.BaseSyntheticEvent,
      React.MouseEvent,
      React.KeyboardEvent
    >({
      openOnFocus: true,
      defaultActiveItemId: 0,
      onStateChange: ({ state }) => {
        setAutocompleteState({
          ...state,
        });
        handleQueryChange(state.query);
      },
      initialState: {
        ...autocompleteState,
        query: query || '',
      },
      getSources() {
        return [
          {
            sourceId: 'querySuggestions',
            // eslint-disable-next-line no-shadow
            async getItems({ query }) {
              const suggestions = await getSuggestions(
                baseQuery,
                query,
                dslService,
                possibleCommands
              );
              return suggestions;
            },
            onSelect: ({ setQuery, item }) => {
              onItemSelect(
                {
                  setQuery,
                  item,
                },
                dslService
              );
              $('#autocomplete-textarea').blur();
              $('#autocomplete-textarea').focus();
            },
          },
        ];
      },
    });
  }, depArray);

  const TextArea = panelsFilter ? EuiFieldText : EuiTextArea;

  return (
    <div className="aa-Autocomplete" {...autocomplete.getRootProps({ id: 'autocomplete-root' })}>
      <TextArea
        {...autocomplete.getInputProps({
          id: 'autocomplete-textarea',
          'data-test-subj': 'searchAutocompleteTextArea',
          placeholder,
          inputElement: null,
        })}
        {...(panelsFilter && { append, fullWidth: true })}
        disabled={isDisabled}
      />
      {autocompleteState.isOpen && (
        <div
          className={[
            'aa-Panel',
            'aa-Panel--desktop',
            autocompleteState.status === 'stalled' && 'aa-Panel--stalled',
          ]
            .filter(Boolean)
            .join(' ')}
          {...autocomplete.getPanelProps({})}
        >
          {autocompleteState.collections.map((collection, index) => {
            const { source, items } = collection;
            const filteredItems = items.filter((item, itemIndex) => {
              return items.findIndex((i) => i.itemName === item.itemName) === itemIndex;
            });
            return (
              <div
                key={`scrollable-${index}`}
                className={`aa-PanelLayout aa-Panel--scrollable ${
                  uiSettingsService.get('theme:darkMode') ? 'aa-Panel--scrollable-dark' : ''
                }`}
              >
                <div key={`source-${index}`} className="aa-Source">
                  {items.length > 0 && (
                    <ul className="aa-List" {...autocomplete.getListProps()}>
                      {filteredItems.map((item) => {
                        const fullWord = item.itemName;
                        return (
                          <li
                            key={item.__autocomplete_id}
                            className={`aa-Item ${
                              uiSettingsService.get('theme:darkMode') ? 'aa-Item-dark' : ''
                            }`}
                            {...autocomplete.getItemProps({
                              item,
                              source,
                            })}
                          >
                            <div className="aa-ItemWrapper">
                              <div className="aa-ItemContent">
                                <div className="aa-ItemContentBody">
                                  <div>
                                    <span>
                                      <b>{fullWord.slice(0, -item.suggestion.length)}</b>
                                      {item.suggestion}
                                    </span>
                                  </div>
                                  {/* <div
                                    className="aa-ItemContentTitle"
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML={{
                                      __html: `<div>
                                        <span><b>${fullWord.slice(0, -item.suggestion.length)}</b>${
                                        item.suggestion
                                      }</span>
                                      </div>`,
                                    }}
                                  /> */}
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
