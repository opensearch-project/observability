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
import { handlePplRequest } from '../../../requests/ppl';
import { getDataValueQuery } from './queries/data_queries';
import { handleDslRequest } from './request_handler';

// Possible suggestions (hardcoded)
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

const indices = [
  { label: 'opensearch_dashboards_sample_data_ecommerce' },
  { label: 'opensearch_dashboards_sample_data_flights' },
  { label: 'opensearch_dashboards_sample_data_logs' },
];

let inFieldsCommaLoop = false;
let hasFields = false;
let inStatsCommaLoop = false;
let inStatsCommand = false;
const fieldsFromBackend = [];

// Function to grab suggestions
export function getSuggestions(str: string, http) {
  const splittedModel = str.split(' ');
  const prefix = splittedModel[splittedModel.length - 1];
  let itemSuggestions = [];
  const fullSuggestions = [];

  // First commands should either be search or source
  // source should be followed by an available index
  if (prefix.startsWith('source=')) {
    const test = handleDslRequest(http, getDataValueQuery());
    return getIndices(prefix.replace('source=', ''));
  }
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
      inStatsCommaLoop = false;
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
      if (inStatsCommaLoop) {
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
        inStatsCommand = true;
        return fullSuggestions;
      }
      return fullSuggestions;
    } else if (splittedModel[splittedModel.length - 2] === 'source') {
      return [{ label: str + '=', input: str, suggestion: '=' }].filter(
        ({ label }) => label.startsWith(prefix) && prefix !== label
      );
    } else if (splittedModel[splittedModel.length - 2].startsWith('opensearch_dashboards')) {
      fetchFields(str, http);
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
      inStatsCommand = true;
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
    // In case there are no spaces between 'source' and '='
    else if (splittedModel.length > 2 && splittedModel[splittedModel.length - 3] === 'source') {
      itemSuggestions = indices.filter(({ label }) => label.startsWith(prefix) && prefix !== label);
      for (let i = 0; i < itemSuggestions.length; i++) {
        fullSuggestions.push({
          label: str.substring(0, str.lastIndexOf(prefix)) + itemSuggestions[i].label,
          input: str,
          suggestion: itemSuggestions[i].label.substring(prefix.length),
        });
      }
      return fullSuggestions;
    }
    else if (inStatsCommand) {
      if (splittedModel[splittedModel.length - 2] === 'by'){
        itemSuggestions = fieldsFromBackend;
        if (splittedModel[splittedModel.length - 3] !== 'count') {
          itemSuggestions = fieldsFromBackend.filter(
            ({ label, type }) => type === 'float' && label.startsWith(prefix) && prefix !== label
          )
        }
        else {
          itemSuggestions = fieldsFromBackend.filter(
            ({ label }) => label.startsWith(prefix) && prefix !== label
          );
        }
        for (let i = 0; i < itemSuggestions.length; i++) {
          fullSuggestions.push({
            label: str.substring(0, str.lastIndexOf(prefix)) + itemSuggestions[i].label,
            input: str,
            suggestion: itemSuggestions[i].label.substring(prefix.length),
          });
        }
        inStatsCommaLoop = true;
        inStatsCommand = false;
        return fullSuggestions;
      }
      else {
        return [{ label: str + 'by', input: str, suggestion: 'by'}].filter(
          ({ label }) => label.startsWith(prefix) && prefix !== label
        );
      }
    } else if (inFieldsCommaLoop || inStatsCommaLoop) {
      return [
        { label: str.substring(0, str.length - 1) + ',', input: str.substring(0, str.length - 1), suggestion: ',' },
        { label: str.substring(0, str.length) + '|', input: str, suggestion: '|' },
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

// Function to grab available indices
// TODO: Get indices from backend
const getIndices = (str: string) => {
  return indices.filter(({ label }) => label.includes(str) && str !== label);
};

const fetchFields = async (str, http) => {
  if (!hasFields && str.includes('opensearch_dashboards')) {
    const res = await handlePplRequest(http, { query: str });
    for (let i = 0; i < res?.schema.length; i++) {
      fieldsFromBackend.push({ label: res?.schema[i].name, type: res?.schema[i].type });
    }
    console.log(fieldsFromBackend);
    hasFields = true;
  }
};

export function Autocomplete(props: IQueryBarProps) {
  const { query, handleQueryChange, handleQuerySearch, http } = props;

  const onItemSelect = async ({ setIsOpen, setQuery, item, qry, http }) => {
    fetchFields(item.label, http);
    setQuery(item.label + ' ');
  };

  useEffect(() => {
    const search = autocomplete({
      container: '#autocomplete',
      tagName: '#autocomplete',
      openOnFocus: true,
      minLength: 0,
      placeholder: 'Enter PPL query to retrieve log, traces, and metrics',
      onSubmit: ({ state }) => {
        handleQueryChange(state.query);
        handleQuerySearch();
      },
      // onStateChange: ({state}) => {
      //   console.log('hello');
      // },
      getSources({ query, setQuery }) {
        return [
          {
            getItems({ query }) {
              return getSuggestions(query, http);
            },
            tagName: 'test',
            onSelect: ({ setQuery, setIsOpen, item, state }) => {
              onItemSelect({
                setIsOpen,
                setQuery,
                item,
                qry: state.query,
                http,
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
  }, []);

  return <div id="autocomplete" />;
}
