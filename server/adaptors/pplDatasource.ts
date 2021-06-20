/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
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