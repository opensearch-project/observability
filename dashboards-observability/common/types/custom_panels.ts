/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CustomPanelListType {
  name: string;
  id: string;
  dateCreated: number;
  dateModified: number;
  applicationId?: string;
}

export interface VisualizationType {
  id: string;
  savedVisualizationId: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface PanelType {
  name: string;
  visualizations: VisualizationType[];
  timeRange: { to: string; from: string };
  queryFilter: { query: string; language: string };
  applicationId?: string;
}

export interface SavedVisualizationType {
  id: string;
  name: string;
  query: string;
  type: string;
  timeField: string;
  application_id?: string;
  user_configs: any;
}

export interface pplResponse {
  data: any;
  metadata: any;
  size: number;
  status: number;
}
