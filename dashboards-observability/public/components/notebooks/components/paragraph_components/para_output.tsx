/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiCodeBlock, EuiSpacer, EuiText } from '@elastic/eui';
import MarkdownRender from '@nteract/markdown';
import { Media } from '@nteract/outputs';
import moment from 'moment';
import React, { useState } from 'react';
import {
  DashboardContainerInput,
  DashboardStart,
} from '../../../../../../../src/plugins/dashboard/public';
import { ParaType } from '../../../../../common/types/notebooks';
import { uiSettingsService } from '../../../../../common/utils';
import { QueryDataGridMemo } from './para_query_grid';

/*
 * "ParaOutput" component is used by notebook to populate paragraph outputs for an open notebook.
 *
 * Props taken in as params are:
 * para - parsed paragraph from notebook
 *
 * Outputs component of nteract used as a container for notebook UI.
 * https://components.nteract.io/#outputs
 */
export const ParaOutput = (props: {
  para: ParaType;
  visInput: DashboardContainerInput;
  setVisInput: (input: DashboardContainerInput) => void;
  DashboardContainerByValueRenderer: DashboardStart['DashboardContainerByValueRenderer'];
}) => {
  const createQueryColumns = (jsonColumns: any[]) => {
    let index = 0;
    let datagridColumns = [];
    for (index = 0; index < jsonColumns.length; ++index) {
      const datagridColumnObject = {
        id: jsonColumns[index].name,
        displayAsText: jsonColumns[index].name,
      };
      datagridColumns.push(datagridColumnObject);
    }
    return datagridColumns;
  };

  const getQueryOutputData = (queryObject: any) => {
    const data = [];
    let index = 0;
    let schemaIndex = 0;
    for (index = 0; index < queryObject.datarows.length; ++index) {
      let datarowValue = {};
      for (schemaIndex = 0; schemaIndex < queryObject.schema.length; ++schemaIndex) {
        const columnName = queryObject.schema[schemaIndex].name;
        if (typeof queryObject.datarows[index][schemaIndex] === 'object') {
          datarowValue[columnName] = JSON.stringify(queryObject.datarows[index][schemaIndex]);
        } else if (typeof queryObject.datarows[index][schemaIndex] === 'boolean') {
          datarowValue[columnName] = queryObject.datarows[index][schemaIndex].toString();
        } else {
          datarowValue[columnName] = queryObject.datarows[index][schemaIndex];
        }
      }
      data.push(datarowValue);
    }
    return data;
  };

  const outputBody = (key: string, typeOut: string, val: string) => {
    /* Returns a component to render paragraph outputs using the para.typeOut property
     * Currently supports HTML, TABLE, IMG
     * TODO: add table rendering
     */

    if (typeOut !== undefined) {
      switch (typeOut) {
        case 'QUERY':
          const inputQuery = para.inp.substring(4, para.inp.length);
          const queryObject = JSON.parse(val);
          if (queryObject.hasOwnProperty('error')) {
            return <EuiCodeBlock key={key}>{val}</EuiCodeBlock>;
          } else {
            const columns = createQueryColumns(queryObject.schema);
            const data = getQueryOutputData(queryObject);
            const [visibleColumns, setVisibleColumns] = useState(() => columns.map(({ id }) => id));
            return (
              <div>
                <EuiText key={'query-input-key'}>
                  <b>{inputQuery}</b>
                </EuiText>
                <EuiSpacer />
                <QueryDataGridMemo
                  key={key}
                  rowCount={queryObject.datarows.length}
                  queryColumns={columns}
                  visibleColumns={visibleColumns}
                  setVisibleColumns={setVisibleColumns}
                  dataValues={data}
                />
              </div>
            );
          }
        case 'MARKDOWN':
          return (
            <EuiText key={key} className="markdown-output-text">
              <MarkdownRender source={val} />
            </EuiText>
          );
        case 'VISUALIZATION':
          const dateFormat = uiSettingsService.get('dateFormat');
          let from = moment(visInput?.timeRange?.from).format(dateFormat);
          let to = moment(visInput?.timeRange?.to).format(dateFormat);
          from = from === 'Invalid date' ? visInput.timeRange.from : from;
          to = to === 'Invalid date' ? visInput.timeRange.to : to;
          return (
            <>
              <EuiText size="s" style={{ marginLeft: 9 }}>
                {`${from} - ${to}`}
              </EuiText>
              <DashboardContainerByValueRenderer
                key={key}
                input={visInput}
                onInputUpdated={setVisInput}
              />
            </>
          );
        case 'HTML':
          return (
            <EuiText key={key}>
              <Media.HTML data={val} />
            </EuiText>
          );
        case 'TABLE':
          return <pre key={key}>{val}</pre>;
        case 'IMG':
          return <img alt="" src={'data:image/gif;base64,' + val} key={key} />;
        default:
          return <pre key={key}>{val}</pre>;
      }
    } else {
      console.log('output not supported', typeOut);
      return <pre />;
    }
  };

  const { para, DashboardContainerByValueRenderer, visInput, setVisInput } = props;

  return (
    !para.isOutputHidden ? (
      <>
        {para.typeOut.map((typeOut: string, tIdx: number) => {
          return outputBody(para.uniqueId + '_paraOutputBody', typeOut, para.out[tIdx])
        }
        )}
      </>
    ) : null
  );
};
