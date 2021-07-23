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

import React, { createElement, Fragment, useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';

import {autocomplete} from '@algolia/autocomplete-js'
import {
    RAW_QUERY
  } from '../../../common/constants/explorer';
import { IQueryBarProps } from './search';
import { http } from '../../explorer/logExplorer'
import { handlePplRequest } from '../../../requests/ppl';

// Possible suggestions (hardcoded)
const firstCommand = [
    {label: "search"},
    {label: "source"}
]

const pipeCommands = [
  {label: "dedup"},
  {label: "eval"},
  {label: "fields"},
  {label: "head"},
  {label: "rare"},
  {label: "rename"},
  {label: "sort"},
  {label: "stats"},
  {label: "top"},
  {label: "where"}
]

const statsCommands = [
  {label: "count()"},
  {label: "sum()"},
  {label: "avg()"},
  {label: "max()"},
  {label: "min()"}
]

const indices = [
    {label: "opensearch_dashboards_sample_data_ecommerce"},
    {label: "opensearch_dashboards_sample_data_flights"},
    {label: "opensearch_dashboards_sample_data_logs"}
]

// Function to grab suggestions
export function getSuggestions(str: string) {
    const splittedModel = str.split(' ');
    const prefix = splittedModel[splittedModel.length - 1];

    // First commands should either be search or source
    // source should be followed by an available index
    if (prefix.startsWith("source=")) {
        return getIndices(prefix.replace("source=",""));
    }
    if (splittedModel.length === 1) {
        return firstCommand;
    }
    if (prefix.includes(";")){
        return [];
    }
    // TODO: (Grammar implementation) Get commands based on grammar from backend
    // Contextual suggestions are hardcoded for now
    else if (splittedModel.length > 1) {
        // Possible pipe commands
        if (splittedModel[splittedModel.length - 2] === "|"){
            return pipeCommands.filter(
                    ( { label } ) => label.startsWith(prefix) && prefix !== label 
                );
        }
        else if (splittedModel[splittedModel.length - 2] === "source") {
            return [{label: "="}]
        }
        else if (splittedModel[splittedModel.length - 2].startsWith("opensearch_dashboards")){
          return [{label: "|"}]
        }
        // If user didn't input any spaces before pipe
        else if (prefix.includes("|")) {
            return pipeCommands.filter(
                ( { label } ) => label.startsWith(prefix.replace(prefix.substring(0, prefix.lastIndexOf("|") + 1), "")) && prefix.replace(prefix.substring(0, prefix.lastIndexOf("|") + 1), "") !== label
            )
        }
        // search should be followed by source and an available index
        else if (splittedModel[splittedModel.length - 2] === "search") {
            return [  {type: {iconType: 'search', color: 'tint1'} ,label: 'source',
                description: "source=<index>"} ]
        }
        else if (splittedModel[splittedModel.length - 2] === "stats") {
          return statsCommands.filter(
            ( { label } ) => label.startsWith(prefix) && prefix !== label
          )
        }
        // In case there are no spaces between 'source' and '='
        else if (splittedModel.length > 2 && splittedModel[splittedModel.length - 3] === "source") {
            return indices.filter(
                ( { label } ) => label.startsWith(prefix) &&  prefix !== label
            );
        }
        // TODO: (Grammar implementation) Catch user typos and fix them based on their previous inputs. 
        // Ex: First command isn't search or source, user didn't input pipe after command, etc.
        // For now, just display pipeCommands
        return pipeCommands.filter(
            ( { label } ) => label.startsWith(prefix) && prefix !== label && prefix !== ""
        );
    }
};

// Function to grab available indices
// TODO: Get indices from backend
const getIndices = (str: string) => {
    return indices.filter(
        ( { label } ) => label.includes(str) && str !== label
    );
}

export function Autocomplete(props: IQueryBarProps) {
    const {
        query,
        handleQueryChange,
        handleQuerySearch
    } = props;

    const onItemSelect = ({ setIsOpen, setQuery, item, qry }) => {
        const splittedModel = qry.split(' ');
        const prefix = splittedModel[splittedModel.length - 1];

        if (item.label.includes('opensearch_dashboards') || pipeCommands.includes(prefix)){
            //setQuery(query.substring(0, query.lastIndexOf(prefix)) + item.label + " | ")
            console.log("hey")
            const res = handlePplRequest(http, qry);
        }
        else {
            //setQuery(query.substring(0, query.lastIndexOf(prefix)) + item.label + " ")
        }
        setQuery(qry.substring(0, qry.lastIndexOf(prefix)) + item.label + " ");
        setIsOpen(false);
    }

    useEffect(() => {
        const search = 
            autocomplete({
              container: '#autocomplete',
              tagName: '#autocomplete',
              openOnFocus: true,
              panelPlacement: "full-width",
              placeholder: "Enter PPL query to retrieve log, traces, and metrics",
              onSubmit: ({ state }) => {
                handleQueryChange(state.query);
                handleQuerySearch();
              },
              onStateChange: ({ state }) => {
                handleQueryChange(state.query);
              },
              getSources({ query, setQuery }) {
                  return [
                      {
                          sourceId: 'links',
                          getItems({ query }) {
                              return getSuggestions(query);
                        },
                        templates: {
                            item({ item }) {
                                return item.label;
                            },
                        },
                        tagName: 'test',
                        onSelect: ({setQuery, setIsOpen, item, state}) => {
                            onItemSelect({
                                setIsOpen,
                                setQuery,
                                item,
                                qry: state.query
                            })
                        },
                    },
                ];
              },
              ... props,
            });

        return () => {
            search.destroy();
        }
    }, [])

    return <div id="autocomplete" />
}