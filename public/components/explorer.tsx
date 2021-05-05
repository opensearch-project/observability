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

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { 
  FormattedMessage 
} from '@kbn/i18n/react';
import dateMath from '@elastic/datemath';
import { 
  EuiButtonIcon 
} from '@elastic/eui';
import classNames from 'classnames';
import { CoreStart } from '../../../../src/core/public';
// import { DiscoverSidebar as Sidebar } from './sidebar';
// import { DocTableLegacy } from '../../../../src/plugins/discover/public/application/angular/doc_table/create_doc_table_react';
// import { DiscoverHistogram } from '../../../../src/plugins/discover/public/application/angular/directives/histogram';
import { handlePplRequest } from '../requests/ppl';
import Search from './common/seach/search';
import { LoadingSpinner } from './common/loading_spinner/loading_spinner';
import { QueryDataGrid } from './dataGrid';

interface IExplorerProps {
  http: CoreStart['http'],
  plugins: any
}
interface IPPLResult {}

const resultState = 'READY';

export const Explorer: React.FC<any> = (props) => {
  const { 
    http,
    plugins
   } = props;
  const [query, setQuery] = useState<string>('search source=kibana_sample_data_flights');
  const [data, setData] = useState<IPPLResult>({});
  const columns = data && data.schema ? createQueryColumns(data.schema) : [];
  const queryData = data && data.datarows ? getQueryOutputData(data) : [];
  const [visibleColumns, setVisibleColumns] = useState<any>(() =>
    columns.map(({ id }) => id)
  );
  const [startTime, setStartTime] = useState<string>('now-15m');
  const [endTime, setEndTime] = useState<string>('now');
  const [liveStreamChecked, setLiveStreamChecked] = useState<Boolean>(false);

  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [fixedScrollEl, setFixedScrollEl] = useState<HTMLElement | undefined>();
  const fixedScrollRef = useCallback(
    (node: HTMLElement) => {
      if (node !== null) {
        setFixedScrollEl(node);
      }
    },
    [setFixedScrollEl]
  );

  // useEffect(() => {
  //   handleSearch();
  // }, [startTime, endTime]);

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

  const handleLiveStreamChecked = (e) => {
    setLiveStreamChecked(!liveStreamChecked);
  };

  const sidebarClassName = classNames({
    closed: isSidebarClosed,
  });

  const mainSectionClassName = classNames({
    'col-md-10': !isSidebarClosed,
    'col-md-12': isSidebarClosed,
  });

  return (
    <div className="dscAppContainer">
      <h1 className="euiScreenReaderOnly">testing</h1>
      <Search 
        handleQueryChange={ setQuery }
        handleQuerySearch={ handleSearch }
        startTime={ startTime }
        endTime={ endTime }
        setStartTime={ setStartTime }
        setEndTime={ setEndTime }
        setIsOutputStale={ () => {} }
        liveStreamChecked={liveStreamChecked}
        onLiveStreamChange={ handleLiveStreamChecked }
      />
      <main className="container-fluid">
        <div className="row">
          <div
              className={`col-md-2 dscSidebar__container dscCollapsibleSidebar ${sidebarClassName}`}
              id="discover-sidebar"
              data-test-subj="discover-sidebar"
            >
              {!isSidebarClosed && (
                <div className="dscFieldChooser">
                  sidebar placehorder
                </div>
              )}
              <EuiButtonIcon
                iconType={isSidebarClosed ? 'menuRight' : 'menuLeft'}
                iconSize="m"
                size="s"
                onClick={() => setIsSidebarClosed(!isSidebarClosed)}
                data-test-subj="collapseSideBarButton"
                aria-controls="discover-sidebar"
                aria-expanded={isSidebarClosed ? 'false' : 'true'}
                aria-label="Toggle sidebar"
                className="dscCollapsibleSidebar__collapseButton"
              />
          </div>
          <div className={`dscWrapper ${mainSectionClassName}`}>
          { resultState === 'READY' && (
            <div className="dscWrapper__content">
              <div className="dscResults">
                <section
                  className="dscTable dscTableFixedScroll"
                  aria-labelledby="documentsAriaLabel"
                  ref={fixedScrollRef}
                >
                  <h2 className="euiScreenReaderOnly" id="documentsAriaLabel">
                    <FormattedMessage
                      id="discover.documentsAriaLabel"
                      defaultMessage="Documents"
                    />
                  </h2>
                  { !_.isEmpty(data) && (
                    <div className="dscDiscover">
                      <QueryDataGrid 
                        // key={key}
                        rowCount={ data?.datarows?.length || 0 }
                        queryColumns={ createQueryColumns(data.schema) }
                        visibleColumns={ visibleColumns }
                        setVisibleColumns={ setVisibleColumns }
                        dataValues={ queryData }
                        plugins={ plugins }
                      />
                      <a tabIndex={0} id="discoverBottomMarker">
                        &#8203;
                      </a>
                    </div>
                  )}
                </section>
              </div>
            </div>
          )}
          </div>
        </div>
      </main>
      {/* {
        <Sidebar
          columns={["_source"]}
          fieldCounts={{}}
          hits={[]}
          indexPatternList={[]}
          onAddField={() => {}}
          onAddFilter={() => {}}
          onRemoveField={() => {}}
          setIndexPattern={() => {}}
        />
      } */}
      {/* { 
        !_.isEmpty(data) ?  <QueryDataGrid 
        // key={key}
        rowCount={ data?.datarows?.length || 0 }
        queryColumns={ createQueryColumns(data.schema) }
        visibleColumns={ visibleColumns }
        setVisibleColumns={ setVisibleColumns }
        dataValues={ queryData }
      /> : null
      } */}
    </div>
    
  );
};