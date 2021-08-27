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
import { IQueryBarProps } from './search';
import { getDataValueQuery } from './queries/data_queries';




export function Autocomplete(props: IQueryBarProps) {
  const { query, handleQueryChange, handleQuerySearch, pplService, dslService } = props;
  
  let currIndex = '';
  
  const fieldsFromBackend = [];
  const indicesFromBackend = [];
  const dataValuesFromBackend =[];
  let currField = ''
  let currFieldType = '';
  let inFieldsCommaLoop = false;
  let nextWhere = 99999;
  let nextStats = '';
  let indexList = [];
  
  const firstCommand = [
    { label: 'index' },
    { label: 'search' },
    { label: 'source' }
  ];
  

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
    { label: 'sum(' },
    { label: 'avg(' },
    { label: 'max(' },
    { label: 'min(' },
  ];
  
  const fillSuggestions = ( str: string, word: string, items ) => {
    const filteredList = items.filter(
      ({ label }) => label.startsWith(word) && word !== label
    )
    const suggestionList = []
    for (let i = 0; i < filteredList.length; i++ ) {
      suggestionList.push({
        label: str.substring(0, str.lastIndexOf(word)) + filteredList[i].label,
        input: str,
        suggestion: filteredList[i].label.substring(word.length)
      })
    }
    return suggestionList;
  }
  
  const getFirstPipe = async (str: string) => {
    const splittedModel = str.split(' ');
    const prefix = splittedModel[splittedModel.length - 1];
    getIndices();
    return fillSuggestions(str, prefix, firstCommand)
  }

  const getCommands = async (str: string) => {
    const splittedModel = str.split(' ');
    const prefix = splittedModel[splittedModel.length - 1];
    const itemSuggestions = pipeCommands.filter(
      ({ label }) => label.startsWith(prefix) && prefix !== label
    );
    return fillSuggestions(str, prefix, itemSuggestions)
  }
  
  // Function to grab suggestions
  const getSuggestions = async (str: string) => {
  

    const splittedModel = str.split(' ');
    const prefix = splittedModel[splittedModel.length - 1];
    let itemSuggestions = [];
    const fullSuggestions = [];
  
    if (splittedModel.length === 1) {
      currField = ''
      currIndex = ''
      return getFirstPipe(str);
    }
  
    if (prefix.includes(';')) {
      return [];
    }

    else if (splittedModel.length > 1) {
      if (splittedModel[splittedModel.length - 2] === '|') {
        inFieldsCommaLoop = false;
        nextWhere = 99999;
        dataValuesFromBackend.length = 0;
        return fillSuggestions(str, prefix, pipeCommands);
      } else if (splittedModel[splittedModel.length - 2].includes(',')) {
        if (inFieldsCommaLoop) {
          return fillSuggestions(str, prefix, fieldsFromBackend)
        }
        return fullSuggestions;
      } else if (splittedModel[splittedModel.length - 2] === 'source' || splittedModel[splittedModel.length - 2] === 'index') {
        return [{ label: str + '=', input: str, suggestion: '=' }].filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        );
      } else if (indexList.includes(splittedModel[splittedModel.length - 2])) {
        // console.log('getting fields')
        currIndex = splittedModel[splittedModel.length - 2]
        getFields();
        return [{ label: str + '|', input: str, suggestion: '|' }].filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        );
      }
      else if (splittedModel[splittedModel.length - 2] === 'search') {
        return [
          { label: 'search source', input: str, suggestion: 'search source'.substring(str.length) },
        ].filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        );
      } else if (splittedModel[splittedModel.length - 2] === 'stats') {
        nextStats = 'fields';
        return fillSuggestions(str, prefix, statsCommands);
      }
      else if (nextStats === 'fields') {
        if (splittedModel[splittedModel.length - 2] !== 'count()'){
          itemSuggestions = fieldsFromBackend.filter(
            ({ label, type }) => label.startsWith(prefix) && prefix !== label && (type === 'float' || type === 'integer')
          );
          for (let i = 0; i < itemSuggestions.length; i++) {
            fullSuggestions.push({
              label: str.substring(0, str.lastIndexOf(prefix) - 1) + itemSuggestions[i].label + ')',
              input: str.substring(0, str.length - 1),
              suggestion: itemSuggestions[i].label.substring(prefix.length) + ')',
            });
          }
          return fillSuggestions(str, prefix, itemSuggestions);
        }
        nextStats = 'by';
      }
      else if (splittedModel[splittedModel.length - 2] === 'fields') {
        inFieldsCommaLoop = true;
        return fillSuggestions(str, prefix, fieldsFromBackend);
      }
      else if (splittedModel[splittedModel.length - 2] === 'dedup') {
        return fillSuggestions(str, prefix, fieldsFromBackend);
      }
      else if (splittedModel[splittedModel.length - 2] === 'where') {
        nextWhere = splittedModel.length;
        dataValuesFromBackend.length = 0;
        return fillSuggestions(str, prefix, fieldsFromBackend);
      }
      else if (nextWhere + 1 === splittedModel.length) {
        fullSuggestions.push({
          label: str + '=', 
          input: str,
          suggestion: '='
        })
        currField = splittedModel[splittedModel.length - 2];
        currFieldType = fieldsFromBackend.find( field => field.label === currField).type;
        return fullSuggestions.filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        );
      }
      else if (nextWhere + 2 === splittedModel.length) {
        console.log('in nextWhere === value')
        return fillSuggestions(str, prefix, await getDataValues(currIndex, currField, currFieldType, dataValuesFromBackend))
      }
      else if (nextWhere + 3 === splittedModel.length) {
        return [{label: str + '|', input: str, suggestion: '|'}].filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        )
      }
      else if (splittedModel.length > 2 && splittedModel[splittedModel.length - 3] === 'source'
        || splittedModel[splittedModel.length - 3] === 'index') {
        return fillSuggestions(str, prefix, indicesFromBackend);
      } else if (inFieldsCommaLoop) {
        return [
          { label: str.substring(0, str.length - 1) + ',', input: str.substring(0, str.length - 1), suggestion: ',' },
          { label: str + '|', input: str, suggestion: '|' },
        ].filter(({ label }) => label.startsWith(prefix) && prefix !== label);
      }
      return pipeCommands.filter(
        ({ label }) => label.startsWith(prefix) && prefix !== label && prefix !== ''
      );
    }
  }

  const getIndices = async () => {
    if(indicesFromBackend.length === 0) {
      // console.log('getting indices')
      const indices = (await dslService.fetchIndices()).filter(
        ({ index }) => !index.startsWith('.')
      )
      for (let i = 0; i < indices.length; i++) {
        indicesFromBackend.push({
          label: indices[i].index
        });
        indexList.push(indices[i].index);
      }
    }
  }
  
  const getFields = async () => {
    console.log('fieldsFromBackend.length: ', fieldsFromBackend.length)
    console.log('currIndex: ', currIndex)
    if (fieldsFromBackend.length === 0 && currIndex !== '') {
      console.log('in getFields()')
      const res = await dslService.fetchFields(currIndex);
      console.log(res)
      for (let element in res?.[currIndex].mappings.properties) {
        if (res?.[currIndex].mappings.properties[element].type === 'keyword') {
          fieldsFromBackend.push({ label: element, type: 'string' });  
        }
        else {
        fieldsFromBackend.push({ label: element, type: res?.[currIndex].mappings.properties[element].type });
        }
      }
    }
  }
  
  const onItemSelect = async ({ setIsOpen, setQuery, item, qry, pplService }) => {
    if (fieldsFromBackend.length === 0 && indexList.includes(item.label)){
      const splittedModel = item.label.split(' ')
      console.log(item.label)
      currIndex = splittedModel.pop()
      getFields();
    }
    setQuery(item.label + ' ');
  };

  const getDataValues = async (index: string, field: string, fieldType: string, dataValues: any) => {
    const res = (await dslService.fetch(getDataValueQuery(index, field))).aggregations.top_tags.buckets;
    res.forEach( (e) => {
      if (fieldType === 'string'){
        dataValues.push({label: '"' + e.key + '"', doc_count: e.doc_count});
      }
      else if (fieldType !== 'geo_point'){
        dataValues.push({label: String(e.key), doc_count: e.doc_count});
      }
    })
  }

  useEffect(() => {
    const search = autocomplete({
      container: '#autocomplete',
      tagName: '#autocomplete',
      initialState: {
        query: query
      },
      openOnFocus: true,
      minLength: 0,
      placeholder: 'Enter PPL query to retrieve log, traces, and metrics',
      onStateChange: ({ state }) => {
        // if (state.query === 'source') {
        //   handleQueryChange(state.query)
        // }
      },
      onSubmit: ({ state }) => {
        console.log('hit enter')
        handleQueryChange(state.query);
        console.log('state.query: ', state.query)
        console.log('query: ', query);
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
