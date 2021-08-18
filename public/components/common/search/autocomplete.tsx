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
import React, { createElement, Fragment, useEffect, useRef, useState } from 'react';

import { autocomplete } from '@algolia/autocomplete-js';
import { RAW_QUERY } from '../../../common/constants/explorer';
import { IQueryBarProps } from './search';
import { getDataValueQuery } from './queries/data_queries';
import { IndicesGetMappingParams } from 'elasticsearch';


export function Autocomplete(props: IQueryBarProps) {
  const { query, handleQueryChange, handleQuerySearch, pplService, dslService } = props;

  const firstCommand = [{ label: 'search' }, { label: 'source' }];
  

  const pipeCommands = [
    { label: 'dedup' },
    { label: 'eval' },
    { label: 'fields' },
    { label: 'head' },
    { label: 'rare' },
    { label: 'rename' },
    { label: 'sort' },
    { label: 'stats' },
    { label: 'top' },
    { label: 'where' },
  ];
  
  const statsCommands = [
    { label: 'count()' },
    { label: 'sum()' },
    { label: 'avg()' },
    { label: 'max()' },
    { label: 'min()' },
  ];
  
  
  let currIndex = '';
  let currField = ''
  let inFieldsCommaLoop = false;
  
  let hasIndices = false;
  let hasFields = false;

  const fieldsFromBackend = [];
  const indicesFromBackend = [];
  
  let inWherePipe = 0;
  let nextWhere = ''
  
  // Function to grab suggestions
  const getSuggestions = async (str: string) => {
    // const pipes = str.split('|')
    const splittedModel = str.split(' ');
    const prefix = splittedModel[splittedModel.length - 1];
    let itemSuggestions = [];
    const fullSuggestions = [];
  
    // First commands should either be search or source
    // source should be followed by an available index
    if (splittedModel.length === 1) {
      itemSuggestions = firstCommand.filter(
        ({ label }) => label.startsWith(prefix) && prefix !== label
      );
      for (let i = 0; i < itemSuggestions.length; i++) {
        fullSuggestions.push({
          label: str.substring(0, str.lastIndexOf(prefix)) + itemSuggestions[i].label,
          input: str,
          suggestion: itemSuggestions[i].label.substring(prefix.length),
        });
      }
      getIndices();
      return fullSuggestions;
    }
  
    if (prefix.includes(';')) {
      return [];
    }
    // TODO: (Grammar implementation) Get commands based on grammar from backend
    // Contextual suggestions are hardcoded for now
    else if (splittedModel.length > 1) {
      // Possible pipe commands
      if (splittedModel[splittedModel.length - 2] === '|') {
        itemSuggestions = pipeCommands.filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        );
        for (let i = 0; i < itemSuggestions.length; i++) {
          fullSuggestions.push({
            label: str.substring(0, str.lastIndexOf(prefix)) + itemSuggestions[i].label,
            input: str,
            suggestion: itemSuggestions[i].label.substring(prefix.length),
          });
        }
        inFieldsCommaLoop = false;
        return fullSuggestions;
      } else if (splittedModel[splittedModel.length - 2].includes(',')) {
        if (inFieldsCommaLoop) {
          itemSuggestions = fieldsFromBackend;
          for (let i = 0; i < itemSuggestions.length; i++) {
            fullSuggestions.push({
              label: str.substring(0, str.lastIndexOf(prefix)) + itemSuggestions[i].label,
              input: str,
              suggestion: itemSuggestions[i].label.substring(prefix.length),
            });
          }
        }
        return fullSuggestions;
      } else if (splittedModel[splittedModel.length - 2] === 'source') {
        return [{ label: str + '=', input: str, suggestion: '=' }].filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        );
      } else if (splittedModel[splittedModel.length - 2].includes('opensearch_dashboards')) {
        getFields();
        return [{ label: str + '|', input: str, suggestion: '|' }].filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        );
      }
      // If user didn't input any spaces before pipe
      else if (prefix.includes('|')) {
        itemSuggestions = pipeCommands.filter(
          ({ label }) =>
            label.startsWith(prefix.replace(prefix.substring(0, prefix.lastIndexOf('|') + 1), '')) &&
            prefix.replace(prefix.substring(0, prefix.lastIndexOf('|') + 1), '') !== label
        );
        for (let i = 0; i < itemSuggestions.length; i++) {
          fullSuggestions.push({
            label: str.substring(0, str.lastIndexOf(prefix)) + itemSuggestions[i].label,
            input: str,
            suggestion: itemSuggestions[i].label.substring(prefix.length),
          });
        }
        return fullSuggestions;
      }
      // search should be followed by source and an available index
      else if (splittedModel[splittedModel.length - 2] === 'search') {
        return [
          { label: 'search source', input: str, suggestion: 'search source'.substring(str.length) },
        ].filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        );
      } else if (splittedModel[splittedModel.length - 2] === 'stats') {
        itemSuggestions = statsCommands.filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        );
        for (let i = 0; i < itemSuggestions.length; i++) {
          fullSuggestions.push({
            label: str.substring(0, str.lastIndexOf(prefix)) + itemSuggestions[i].label,
            input: str,
            suggestion: itemSuggestions[i].label.substring(prefix.length),
          });
        }
        return fullSuggestions;
      } else if (splittedModel[splittedModel.length - 2] === 'fields') {
        itemSuggestions = fieldsFromBackend.filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        );
        for (let i = 0; i < itemSuggestions.length; i++) {
          fullSuggestions.push({
            label: str.substring(0, str.lastIndexOf(prefix)) + itemSuggestions[i].label,
            input: str,
            suggestion: itemSuggestions[i].label.substring(prefix.length),
          });
        }
        inFieldsCommaLoop = true;
        return fullSuggestions;
      }
      else if (splittedModel[splittedModel.length - 2] === 'dedup') {
        itemSuggestions = fieldsFromBackend.filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        );
        for (let i = 0; i < itemSuggestions.length; i++) {
          fullSuggestions.push({
            label: str.substring(0, str.lastIndexOf(prefix)) + itemSuggestions[i].label,
            input: str,
            suggestion: itemSuggestions[i].label.substring(prefix.length),
          });
        }
        return fullSuggestions;
      }
      else if (splittedModel[splittedModel.length - 2] === 'where') {
        itemSuggestions = fieldsFromBackend.filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        );
        for (let i = 0; i < itemSuggestions.length; i++) {
          fullSuggestions.push({
            label: str.substring(0, str.lastIndexOf(prefix)) + itemSuggestions[i].label,
            input: str,
            suggestion: itemSuggestions[i].label.substring(prefix.length)
          })
        }
        nextWhere = '='
        return fullSuggestions;
      }
      else if (nextWhere === '=') {
        fullSuggestions.push({
          label: str + '=', 
          input: str,
          suggestion: '='
        })
        nextWhere = 'value'
        currField = splittedModel[splittedModel.length - 2];
        return fullSuggestions;
      }
      else if (nextWhere === 'value') {
        itemSuggestions = (await getDataValues(currIndex, currField)).filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        );
        for (let i = 0; i < itemSuggestions.length; i++) {
          fullSuggestions.push({
            label: str.substring(0, str.lastIndexOf(prefix)) + itemSuggestions[i].label,
            input: str,
            suggestion: itemSuggestions[i].label.substring(prefix.length)
          })
        }
        return fullSuggestions;
      }
      // In case there are no spaces between 'source' and '='
      else if (splittedModel.length > 2 && splittedModel[splittedModel.length - 3] === 'source') {
        itemSuggestions = indicesFromBackend.filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        );
        for (let i = 0; i < itemSuggestions.length; i++) {
          fullSuggestions.push({
            label: str.substring(0, str.lastIndexOf(prefix)) + itemSuggestions[i].label,
            input: str,
            suggestion: itemSuggestions[i].label.substring(prefix.length)
          })
        }
        return fullSuggestions;
      } else if (inFieldsCommaLoop) {
        return [
          { label: str.substring(0, str.length - 1) + ',', input: str.substring(0, str.length - 1), suggestion: ',' },
          { label: str + '|', input: str, suggestion: '|' },
        ].filter(({ label }) => label.startsWith(prefix) && prefix !== label);
      }
      // TODO: (Grammar implementation) Catch user typos and fix them based on their previous inputs.
      // Ex: First command isn't search or source, user didn't input pipe after command, etc.
      // For now, just display pipeCommands
      return pipeCommands.filter(
        ({ label }) => label.startsWith(prefix) && prefix !== label && prefix !== ''
      );
    }
  }

  const getIndices = async () => {
    if(!hasIndices) {
      const indices = (await dslService.fetchIndices()).filter(
        ({ index }) => !index.startsWith('.')
      )
      for (let i = 0; i < indices.length; i++) {
        indicesFromBackend.push({
          label: indices[i].index
        })
      }
      hasIndices = true;
    }
  }
  
  const getFields = async () => {
    if (!hasFields && currIndex !== '') {
      const res = await dslService.fetchFields(currIndex);
      for (let element in res?.[currIndex].mappings.properties) {
        if (res?.[currIndex].mappings.properties[element].type === 'keyword') {
          fieldsFromBackend.push({ label: element, type: 'string' });  
        }
        else {
        fieldsFromBackend.push({ label: element, type: res?.[currIndex].mappings.properties[element].type });
        }
      }
      console.log(fieldsFromBackend)
      hasFields = true;
    }
  }
  
  const onItemSelect = async ({ setIsOpen, setQuery, item, qry, pplService }) => {
    if (!hasFields && item.label.includes('opensearch_dashboards')){
      const splittedModel = item.label.split(' ')
      currIndex = splittedModel.pop()
      getFields();
    }
    setQuery(item.label + ' ');
  };

  const getDataValues = async (index: string, field: string) => {
    const res = (await dslService.fetch(getDataValueQuery(index, field))).aggregations.autocomplete.buckets;
    const dataValues = [];
    res.forEach( (e) => {
      dataValues.push({label: e.key, doc_count: e.doc_count});
    })
    return dataValues;
  }

  // ------------------ REFACTORING
  const getSuggestions2 = (str: string) => {
    //const pipes = str.split('|');

  }
  // ------------------

  useEffect(() => {
    const search = autocomplete({
      container: '#autocomplete',
      tagName: '#autocomplete',
      initialState: {
        query: query
      },
      openOnFocus: true,
      autoFocus: true,
      minLength: 0,
      placeholder: 'Enter PPL query to retrieve log, traces, and metrics',
      onStateChange: ({ state }) => {
        // if (state.query === 'source') {
        //   handleQueryChange(state.query)
        // }
      },
      onSubmit: ({ state }) => {
        handleQueryChange(state.query);
        handleQuerySearch();
      },
      getSources({ query, setQuery }) {
        return [
          {
            getItems({ query }) {
              return getSuggestions(query);
            },
            tagName: 'test',
            onSelect: ({ setQuery, setIsOpen, item, state }) => {
              onItemSelect({
                setIsOpen,
                setQuery,
                item,
                qry: state.query,
                pplService,
              });
            },
            templates: {
              item({ item, createElement, Fragment }) {
                return createElement('div', {
                  dangerouslySetInnerHTML: {
                    __html: `<div>
                      ${item.input}<span class=styling>${item.suggestion}</span>
                    </div>`,
                  },
                });
              },
            },
          },
        ];
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [query,
      handleQueryChange,
      handleQuerySearch,
      pplService,
      ]);

  return <div id="autocomplete" />;
}
