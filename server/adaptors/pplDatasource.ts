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

import _ from 'lodash';

export class PPLDataSource {
  
  private pplDataSource : any = {};

  constructor(source: any) {
    this.pplDataSource = source;
    this.addSchemaRowMapping();
  }

  /**
   * Add 'schemaName: data' entries for UI rendering
   */
  private addSchemaRowMapping = () => {
    const pplRes = this.pplDataSource;
    const data: any[] = [];
    _.forEach(pplRes.datarows, (row) => {
      const record: any = {};
      for (let i = 0; i < pplRes.schema.length; i++) { 
        if (typeof(row[i]) === 'object') {
          record[pplRes.schema[i].name] = JSON.stringify(row[i]);
        } else if (typeof(row[i]) === 'boolean') {
          record[pplRes.schema[i].name] = row[i].toString();
        } else {
          record[pplRes.schema[i].name] = row[i];
        }
      }
      data.push(record);
    });
    pplRes['jsonData'] = data;
  };

  public getDataSource = () => this.pplDataSource;
}