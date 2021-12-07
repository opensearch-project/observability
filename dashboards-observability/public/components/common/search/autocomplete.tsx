/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './search.scss';
import $ from 'jquery';
import React, {
  useMemo,
  useState
} from 'react';
import { 
  AutocompleteState,
  createAutocomplete
} from '@algolia/autocomplete-core';
import { EuiTextArea } from '@elastic/eui';
import { IQueryBarProps } from './search';
import { uiSettingsService } from '../../../../common/utils';
import { AutocompleteItem } from '../../../../common/constants/autocomplete';
import { getSuggestions, onItemSelect } from './autocomplete_logic';

export const Autocomplete = (props: IQueryBarProps) => {
  const {
    query,
    tempQuery,
    handleQueryChange,
    handleQuerySearch,
    dslService
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

  const searchBar = document.getElementById('autocomplete-textarea');

  searchBar?.addEventListener('keydown', function (e) {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && e.shiftKey) {
      handleQuerySearch();
    }
    return () => {
      $('#autocomplete-textarea').unbind('keydown');
    };
  })

  const autocomplete = useMemo(
    () => {
      return createAutocomplete<
        AutocompleteItem,
        React.BaseSyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >(
        {
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
                async getItems({ query }) {
                  const suggestions = await getSuggestions(query, dslService);
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
                  $("#autocomplete-textarea").blur();
                  $("#autocomplete-textarea").focus();
                }
              },
            ];
          },
        }
      );
  }, [query]);

  return (
    <div
      className="aa-Autocomplete"
      {...autocomplete.getRootProps({ 'id': 'autocomplete-root' })}
    >
      <EuiTextArea
        {...autocomplete.getInputProps({
          id: 'autocomplete-textarea',
          "data-test-subj": "searchAutocompleteTextArea",
          placeholder: 'Enter PPL query to retrieve logs',
          inputElement: null
        })}
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
              const filteredItems = items.filter((item, index) => { return items.findIndex(i => i.itemName === item.itemName) === index })
              return (
                <div key={`scrollable-${index}`} className="aa-PanelLayout aa-Panel--scrollable" style={uiSettingsService.get('theme:darkMode') ? {backgroundColor: '#1D1E24', border: '2px groove #383444'} : {}}>
                  <div key={`source-${index}`} className="aa-Source">
                    {items.length > 0 && (
                      <ul className="aa-List" {...autocomplete.getListProps()}>
                        {filteredItems.map((item, index) => {
                          const fullWord = item.itemName;
                          return (
                            <li
                              key={item.__autocomplete_id}
                              className="aa-Item"
                              {...autocomplete.getItemProps({
                                item,
                                source,
                              })}
                              style={uiSettingsService.get('theme:darkMode') ? {color: '#DFE5EF'}: {}}
                            >
                              <div className="aa-ItemWrapper">
                                <div className="aa-ItemContent">
                                  <div className="aa-ItemContentBody">
                                    <div
                                      className="aa-ItemContentTitle"
                                      dangerouslySetInnerHTML={{
                                        __html: `<div>
                                        <span><b>${fullWord.slice(0, -item.suggestion.length)}</b>${item.suggestion}</span>
                                      </div>`
                                      }}
                                    />
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
}
