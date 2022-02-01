/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export type CustomPanelListType = {
  name: string;
  id: string;
  dateCreated: number;
  dateModified: number;
  applicationId?: string;
};

export type VisualizationType = {
  id: string;
  savedVisualizationId: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type PanelType = {
  name: string;
  visualizations: VisualizationType[];
  timeRange: { to: string; from: string };
  queryFilter: { query: string; language: string };
  applicationId?: string;
};

export type SavedVisualizationType = {
  id: string;
  name: string;
  query: string;
  type: string;
  timeField: string;
};

export type pplResponse = {
  data: any;
  metadata: any;
  size: number;
  status: number;
};
