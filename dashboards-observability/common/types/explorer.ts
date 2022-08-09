/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { History } from 'history';
import Plotly from 'plotly.js-dist';
import {
  RAW_QUERY,
  SELECTED_FIELDS,
  UNSELECTED_FIELDS,
  AVAILABLE_FIELDS,
  QUERIED_FIELDS,
  INDEX,
  FINAL_QUERY,
  SELECTED_TIMESTAMP,
  SELECTED_DATE_RANGE,
} from '../constants/explorer';
import { CoreStart, HttpSetup, HttpStart, NotificationsStart } from '../../../../src/core/public';
import SavedObjects from '../../public/services/saved_objects/event_analytics/saved_objects';
import TimestampUtils from '../../public/services/timestamp/timestamp';
import PPLService from '../../public/services/requests/ppl';
import DSLService from '../../public/services/requests/dsl';

export interface IQueryTab {
  id: string;
  name: React.ReactNode | string;
  content: React.ReactNode;
}

export interface IField {
  name: string;
  type: string;
  label?: string;
}

export interface ITabQueryResults {
  [tabId: string]: any;
}

export interface ITabQueries {
  [tabId: string]: IQuery;
}

export interface IQuery {
  [RAW_QUERY]: string;
  [FINAL_QUERY]: string;
  [INDEX]: string;
  [SELECTED_DATE_RANGE]: string[];
  [SELECTED_TIMESTAMP]: string;
}

export interface IExplorerTabFields {
  [tabId: string]: IExplorerFields;
}

export interface IExplorerFields {
  [SELECTED_FIELDS]: IField[];
  [UNSELECTED_FIELDS]: IField[];
  [AVAILABLE_FIELDS]: IField[];
  [QUERIED_FIELDS]: IField[];
}

export interface EmptyTabParams {
  tabIds: string[] | undefined;
  queries: any | undefined;
  explorerData: any | undefined;
}

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
  curSelectedTabId: React.MutableRefObject<undefined>;
  setToast: (
    title: string,
    color?: string,
    text?: React.ReactChild | undefined,
    side?: string | undefined
  ) => void;
  http: CoreStart['http'];
  tabCreatedTypes?: any;
  searchBarConfigs?: any;
  appId?: string;
  addVisualizationToPanel?: any;
  startTime?: string;
  endTime?: string;
  setStartTime?: any;
  setEndTime?: any;
  appBaseQuery?: string;
  callback?: any;
  callbackInApp?: any;
}

export interface SavedQuery {
  description: string;
  name: string;
  query: string;
  selected_date_range: { start: string; end: string; text: string };
  selected_fields: { text: string; tokens: [{ name: string; type: string }] };
  selected_timestamp: { name: string; type: string };
}

export interface SavedVisualization {
  description: string;
  name: string;
  query: string;
  selected_date_range: { start: string; end: string; text: string };
  selected_fields: { text: string; tokens: [] };
  selected_timestamp: { name: string; type: string };
  type: string;
  application_id?: string;
}

export interface SavedQueryRes {
  createdTimeMs: number;
  lastUpdatedTimeMs: number;
  objectId: string;
  savedQuery: SavedQuery;
  tenant: string;
}

export interface SavedVizRes {
  createdTimeMs: number;
  lastUpdatedTimeMs: number;
  objectId: string;
  savedVisualization: SavedVisualization;
  tenant: string;
}

export interface ExplorerDataType {
  jsonData: object[];
  jsonDataAll: object[];
}

export interface Query {
  finalQuery: string;
  index: string;
  isLoaded: boolean;
  objectType: string;
  rawQuery: string;
  savedObjectId: string;
  selectedDateRange: string[];
  selectedTimestamp: string;
  tabCreatedType: string;
}

export interface ExplorerData {
  explorerData?: ExplorerDataType;
  explorerFields?: IExplorerFields;
  query?: Query;
  http?: HttpSetup;
  pplService?: PPLService;
}

export interface IVisualizationContainerPropsData {
  appData?: { fromApp: boolean };
  rawVizData?: any;
  query?: IQuery;
  indexFields?: IField[];
  userConfigs?: any;
  defaultAxes?: {
    xaxis: IField[];
    yaxis: IField[];
  };
  explorer?: ExplorerData;
}

export interface IVisualizationContainerPropsVis {
  vis: IVisualizationTypeDefination;
}

export interface IConfigPanelTab {
  id: string;
  name: string;
  mapTo: string;
  editor: React.ReactNode;
  sections: IConfigPanelOptions[];
  props?: any;
}

export interface IConfigPanelOptions {
  id: string;
  name: string;
  mapTo: string;
  editor: React.ReactNode;
  schemas: IConfigPanelOptionSection[];
}

export interface IConfigPanelOptionSection {
  name: string;
  component: null;
  mapTo: string;
  props?: any;
  isSingleSelection?: boolean;
  defaultState?: boolean | string;
  eleType?: string;
}

export interface IVisualizationTypeDefination {
  name: string;
  type: string;
  id: string;
  label: string;
  fulllabel: string;
  category: string;
  icon: React.ReactNode;
  editorconfig: {
    panelTabs: IConfigPanelTab;
  };
  visconfig: {
    layout: Partial<Plotly.Layout>;
    config: Partial<Plotly.Config>;
  };
  component: React.ReactNode;
}

export interface IVisualizationContainerProps {
  data: IVisualizationContainerPropsData;
  vis: IVisualizationContainerPropsVis;
}

export interface IDefaultTimestampState {
  hasSchemaConflict: boolean;
  default_timestamp: string;
  message: string;
}

export interface LiveTailProps {
  isLiveTailOn: boolean;
  setIsLiveTailPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  liveTailName: string;
  isLiveTailPopoverOpen: boolean;
  dataTestSubj: string;
}

export interface ConfigListEntry {
  label: string;
  aggregation: string;
  custom_label: string;
  name: string;
  side: string;
  type: string;
}
export interface HistogramConfigList {
  bucketSize: string;
  bucketOffset: string;
}

export interface ConfigList {
  dimensions?: ConfigListEntry[] | HistogramConfigList[];
  metrics?: ConfigListEntry[];
}
