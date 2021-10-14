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