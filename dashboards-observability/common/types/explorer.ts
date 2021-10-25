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
  QUERIED_FIELDS,
  INDEX,
  FINAL_QUERY,
  SELECTED_TIMESTAMP,
  SELECTED_DATE_RANGE
 } from '../constants/explorer';
 import { HttpStart } from '../../../../src/core/public';
 import SavedObjects from '../../public/services/saved_objects/event_analytics/saved_objects';
 import TimestampUtils from '../../public/services/timestamp/timestamp';
 import PPLService from '../../public/services/requests/ppl';
 import DSLService from '../../public/services/requests/dsl';

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
  [RAW_QUERY]: string;
  [FINAL_QUERY]: string;
  [INDEX]: string;
  [SELECTED_DATE_RANGE]: Array<string>;
  [SELECTED_TIMESTAMP]: string;
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
  pplService: PPLService;
  dslService: DSLService;
  savedObjects: SavedObjects;
  http: HttpStart;
  timestampUtils: TimestampUtils;
  setToast: (
    title: string,
    color?: string,
    text?: React.ReactChild | undefined,
    side?: string | undefined
  ) => void;
}