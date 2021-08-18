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

  constructor(
    private pplDataSource: any,
    private dataType: string
  ) {
    if (this.dataType === 'jdbc') {
      this.addSchemaRowMapping();
    }
  }

  /**
   * Add 'schemaName: data' entries for UI rendering
   */
  private addSchemaRowMapping = () => {
    const data: any[] = [];

    _.forEach(this.pplDataSource.datarows, (row) => {
      const record: any = {};
      
      for (let i = 0; i < this.pplDataSource.schema.length; i++) { 
        
        const cur = this.pplDataSource.schema[i];
        
        if (typeof(row[i]) === 'object') {
          record[cur.name] = JSON.stringify(row[i]);
        } else if (typeof(row[i]) === 'boolean') {
          record[cur.name] = row[i].toString();
        } else {
          record[cur.name] = row[i];
        }
      }

      data.push(record);
    });
    this.pplDataSource['jsonData'] = data;
  };

  public getDataSource = () => this.pplDataSource;
}