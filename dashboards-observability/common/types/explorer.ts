/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
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
 import { CoreStart, HttpStart, NotificationsStart } from '../../../../src/core/public';
 import SavedObjects from '../../public/services/saved_objects/event_analytics/saved_objects';
 import TimestampUtils from '../../public/services/timestamp/timestamp';
 import PPLService from '../../public/services/requests/ppl';
 import DSLService from '../../public/services/requests/dsl';
 import { History } from 'history';

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

export type EmptyTabParams = {
  tabIds: Array<string> | undefined,
  queries: any | undefined,
  explorerData: any | undefined
};

export interface ILogExplorerProps {
  pplService: PPLService;
  dslService: DSLService;
  savedObjects: SavedObjects;
  http: HttpStart;
  history: History;
  notifications: NotificationsStart;
  timestampUtils: TimestampUtils;
  setToast: (
    title: string,
    color?: string,
    text?: React.ReactChild | undefined,
    side?: string | undefined
  ) => void;
  savedObjectId: string;
  getExistingEmptyTab: (params: EmptyTabParams) => string;
}

export interface IExplorerProps {
  pplService: PPLService;
  dslService: DSLService;
  tabId: string;
  savedObjects: SavedObjects;
  timestampUtils: TimestampUtils;
  history: History;
  notifications: NotificationsStart;
  savedObjectId: string;
  setToast: (
    title: string,
    color?: string,
    text?: React.ReactChild | undefined,
    side?: string | undefined
  ) => void;
  http: CoreStart['http'];
}