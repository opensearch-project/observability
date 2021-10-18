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

export type CustomPanelListType = {
  name: string;
  id: string;
  dateCreated: string;
  dateModified: string;
};

export type VisualizationType = {
  id: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  query: string;
  type: string;
  timeField: string;
};

export type PanelType = {
  name: string;
  visualizations: VisualizationType[];
  timeRange: { to: string; from: string };
  queryFilter: { query: string; language: string };
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
