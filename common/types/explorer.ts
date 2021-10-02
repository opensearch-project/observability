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

import { 
  RAW_QUERY,
  SELECTED_FIELDS,
  UNSELECTED_FIELDS,
  AVAILABLE_FIELDS,
  QUERIED_FIELDS
 } from '../constants/explorer';

export interface IQueryTab {
  id: string;
  name: React.ReactNode | string;
  content: React.ReactNode
}

export interface IField {
  name: string;
  type: string
}

export interface ITabQueryResults {
  [tabId: string]: any
}

export interface ITabQueries {
  [tabId: string]: IQuery
}

export interface IQuery {
  [RAW_QUERY]: string
}

export interface IExplorerTabFields {
  [tabId: string]: IExplorerFields
}

export interface IExplorerFields {
  [SELECTED_FIELDS]: Array<IField>;
  [UNSELECTED_FIELDS]: Array<IField>;
  [AVAILABLE_FIELDS]: Array<IField>;
  [QUERIED_FIELDS]: Array<IField>;
}

export interface ILogExplorerProps {
  pplService: any;
  dslService: any;
}