/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ISchema {
  name: string,
  type: string
}

export interface IPPLVisualizationDataSource {
  data: any;
  metadata: any;
  jsonData?: Array<any>;
  size: Number;
  status: Number;
}

export interface IPPLEventsDataSource {
  schema: Array<ISchema>;
  datarows: Array<any>;
  jsonData?: Array<any>;
}