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

import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment';
import dateMath from '@elastic/datemath';
import { CoreStart } from '../../../../src/core/public';
import { DiscoverHistogram } from '../../../../src/plugins/discover/public/application/angular/directives/histogram';
import { handlePplRequest } from '../requests/ppl';
import Search from './common/seach/search';
import { QueryDataGrid } from './dataGrid';

interface IExplorerProps {
  http: CoreStart['http']
}
interface IPPLResult {}

export const Explorer: React.FC<IExplorerProps> = (props) => {
  
  const { http } = props;
  const [query, setQuery] = useState<string>('search source=kibana_sample_data_flights');
  const [data, setData] = useState<IPPLResult>({});
  const columns = data && data.schema ? createQueryColumns(data.schema) : [];
  const queryData = data && data.datarows ? getQueryOutputData(data) : [];
  const [visibleColumns, setVisibleColumns] = useState<any>(() =>
    columns.map(({ id }) => id)
  );
  const [startTime, setStartTime] = useState<string>('now-15m');
  const [endTime, setEndTime] = useState<string>('now');

  useEffect(() => {
    handleSearch();
  }, [startTime, endTime]);

  const getDefaultQuery = (startTime: string, endTime: string) => {
    if (startTime && endTime && startTime === endTime) {
      endTime = 'now';
    }
    return `search source=kibana_sample_data_flights | where timestamp > timestamp('${moment(dateMath.parse(startTime)).format('yyyy-MM-DD HH:mm:ss')}') and timestamp < timestamp('${moment(dateMath.parse(endTime)).format('yyyy-MM-DD HH:mm:ss')}')`;

  };
  
  const handleSearch = async () => {
    const res = await handlePplRequest(http, 
      { query: query ? query.trim() : getDefaultQuery(startTime, endTime) }
    );
    setData(res);
  };

  const handleTimeChange = (startTime: string, endTime: string) => {
    handleSearch();
  };

  function createQueryColumns (jsonColumns: any[]) {
    let index = 0;
    let datagridColumns = [];
    for (index = 0; index < jsonColumns.length; ++index) {
      const datagridColumnObject = {
        id: jsonColumns[index].name,
        displayAsText: jsonColumns[index].name
      }
      datagridColumns.push(datagridColumnObject);
    }
    return datagridColumns;
  }

  function getQueryOutputData (queryObject: any) {
    const data = [];
    let index = 0;
    let schemaIndex = 0;
    for (index = 0; index < queryObject.datarows.length; ++index) {
      let datarowValue = {};
      for (schemaIndex = 0; schemaIndex < queryObject.schema.length; ++schemaIndex) {
        const columnName = queryObject.schema[schemaIndex].name;
        if (typeof(queryObject.datarows[index][schemaIndex]) === 'object') {
          datarowValue[columnName] = JSON.stringify(queryObject.datarows[index][schemaIndex]);
        }
        else if (typeof(queryObject.datarows[index][schemaIndex]) === 'boolean') {
          datarowValue[columnName] = queryObject.datarows[index][schemaIndex].toString();
        }
        else {
          datarowValue[columnName] = queryObject.datarows[index][schemaIndex];
        }
      }
      data.push(datarowValue);
    }
    return data;
  }

  return (
    <>
      <Search 
        handleQueryChange={ setQuery }
        handleQuerySearch={ handleSearch }
        startTime={ startTime }
        endTime={ endTime }
        setStartTime={ setStartTime }
        setEndTime={ setEndTime }
        setIsOutputStale={ () => {} }
      />
      { 
        !_.isEmpty(data) ?  <QueryDataGrid 
        // key={key}
        rowCount={ data?.datarows?.length || 0 }
        queryColumns={ createQueryColumns(data.schema) }
        visibleColumns={ visibleColumns }
        setVisibleColumns={ setVisibleColumns }
        dataValues={ queryData }
      /> : null
      }
    </>
    
  );
};