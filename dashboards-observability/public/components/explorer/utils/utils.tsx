/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { IExplorerFields, IField } from '../../../../common/types/explorer';
import { uniqueId } from 'lodash';
import React from 'react';
import { DocViewRow, IDocType } from '../docTable';
import { HttpStart } from '../../../../../../src/core/public';
import PPLService from '../../../services/requests/ppl';
import { PPL_INDEX_REGEX, PPL_STATS_REGEX } from '../../../../common/constants/shared';

// Create Individual table rows for events datagrid and flyouts
export const getTrs = (
  http: HttpStart,
  explorerFields: Array<IField>,
  limit: number,
  setLimit: React.Dispatch<React.SetStateAction<number>>,
  PAGE_SIZE: number,
  timeStampField: any,
  explorerFieldsFull: IExplorerFields,
  pplService: PPLService,
  rawQuery: string,
  docs: Array<any> = [],
  prevTrs: any[] = []
) => {
  if (prevTrs.length >= docs.length) return prevTrs;

  // reset limit if no previous table rows
  if (prevTrs.length === 0 && limit !== PAGE_SIZE) setLimit(PAGE_SIZE);
  const trs = prevTrs.slice();

  const upperLimit = Math.min(trs.length === 0 ? PAGE_SIZE : limit, docs.length);
  for (let i = trs.length; i < upperLimit; i++) {
    trs.push(
      <DocViewRow
        http={http}
        key={uniqueId('doc_view')}
        doc={docs[i]}
        selectedCols={explorerFields}
        timeStampField={timeStampField}
        explorerFields={explorerFieldsFull}
        pplService={pplService}
        rawQuery={rawQuery}
      />
    );
  }
  return trs;
};

// Create table headers for events datagrid and flyouts
export const getHeaders = (fields: any, defaultCols: string[], isFlyout?: boolean) => {
  let tableHeadContent = null;
  if (!fields || fields.length === 0) {
    tableHeadContent = (
      <>
        {defaultCols.map((colName: string) => {
          return <th key={uniqueId('datagrid-header-')}>{colName}</th>;
        })}
      </>
    );
  } else {
    tableHeadContent = fields.map((selField: any) => {
      return <th key={uniqueId('datagrid-header-')}>{selField.name}</th>;
    });

    if (!isFlyout) {
      tableHeadContent.unshift(<th key={uniqueId('datagrid-header-')}></th>);
    }
  }

  return <tr className="osdDocTableHeader">{tableHeadContent}</tr>;
};

// Populate Events datagrid and flyouts
export const populateDataGrid = (
  explorerFields: IExplorerFields,
  header1: JSX.Element,
  body1: JSX.Element,
  header2: JSX.Element,
  body2: JSX.Element
) => {
  return (
    <>
      <div className="dscTable dscTableFixedScroll">
        {explorerFields?.queriedFields && explorerFields.queriedFields.length > 0 && (
          <table className="osd-table table" data-test-subj="docTable">
            <thead>{header1}</thead>
            <tbody>{body1}</tbody>
          </table>
        )}
        {explorerFields?.queriedFields &&
        explorerFields?.queriedFields?.length > 0 &&
        explorerFields.selectedFields?.length === 0 ? null : (
          <table className="osd-table table" data-test-subj="docTable">
            <thead>{header2}</thead>
            <tbody>{body2}</tbody>
          </table>
        )}
      </div>
    </>
  );
};

/* Builds Final Query for the surrounding events
 * -> Final Query is as follows:
 * -> finalQuery = indexPartOfQuery + timeQueryFilter + filterPartOfQuery + sortFilter
 *
 * Example Query for 5 new events:
 * -> rawQuery: source = opensearch_dashboards_sample_data_logs | where geo.src = 'US'
 * -> indexPartOfQuery = 'source = opensearch_dashboards_sample_data_logs'
 * -> filterPartOfQuery = '| where geo.src = 'US''
 * -> timeQueryFilter = ' | where tiimestamp > 2022-01-16 03:26:21.326'
 * -> sortFilter = '| sort + tiimestamp | head 5'
 * -> finalQuery = 'source logs_test | where tiimestamp > 2022-01-16 03:26:21.326 | where geo.src = 'US' | sort + timeStampField | head 5'
 */
const composeFinalQuery = (
  rawQuery: string,
  timeStampField: string,
  eventTime: string,
  numDocs: number,
  typeOfDocs: 'new' | 'old'
) => {
  const indexMatchArray = rawQuery.match(PPL_INDEX_REGEX);
  if (indexMatchArray == null) {
    throw Error('index not found in Query');
  }
  const indexPartOfQuery = indexMatchArray[0];
  const filterPartOfQuery = rawQuery.replace(PPL_INDEX_REGEX, '');
  const timeSymbol = typeOfDocs == 'new' ? '>' : '<';
  const sortSymbol = typeOfDocs == 'new' ? '+' : '-';
  const timeQueryFilter = ` | where ${timeStampField} ${timeSymbol} '${eventTime}'`;
  const sortFilter = ` | sort ${sortSymbol} ${timeStampField} | head ${numDocs}`;

  return indexPartOfQuery + timeQueryFilter + filterPartOfQuery + sortFilter;
};

const createTds = (
  docs: IDocType[],
  selectedCols: IField[],
  getTds: (doc: IDocType, selectedCols: Array<IField>, isFlyout: boolean) => JSX.Element[]
) => {
  return docs.map((doc: IDocType) => (
    <tr className="osdDocTable__row"> {getTds(doc, selectedCols, true).slice(1)}</tr>
  ));
};

// fetches Surrounding events based on a timestamp
export const fetchSurroundingData = async (
  pplService: PPLService,
  rawQuery: string,
  timeStampField: string,
  eventTime: string,
  numDocs: number,
  typeOfDocs: 'new' | 'old',
  setEventsData: React.Dispatch<React.SetStateAction<JSX.Element[][]>>,
  setIsError: React.Dispatch<React.SetStateAction<string>>,
  setLoadingData: React.Dispatch<React.SetStateAction<boolean>>,
  selectedCols: IField[],
  getTds: (doc: IDocType, selectedCols: Array<IField>, isFlyout: boolean) => JSX.Element[]
) => {
  let resultCount = 0;
  let isErred = false;
  setLoadingData(true);
  setIsError('');

  let finalQuery = '';
  try {
    finalQuery = composeFinalQuery(rawQuery, timeStampField, eventTime, numDocs, typeOfDocs);
  } catch (error) {
    const errorMessage = 'Issue in building surrounding data query';
    setIsError(errorMessage);
    isErred = true;
    console.error(errorMessage, error);
    setLoadingData(false);
    return resultCount;
  }

  await pplService
    .fetch({ query: finalQuery, format: 'jdbc' })
    .then((res) => {
      const resuleData = typeOfDocs == 'new' ? res.jsonData.reverse() : res.jsonData;
      resultCount = resuleData.length;
      setEventsData(createTds(resuleData, selectedCols, getTds));
    })
    .catch((error: Error) => {
      setIsError(error.message);
      isErred = true;
      console.error(error);
    })
    .finally(() => {
      setLoadingData(false);
    });

  if (resultCount !== numDocs && !isErred) {
    const errorMessage =
      resultCount !== 0
        ? `Could only find ${resultCount} ${typeOfDocs} event${resultCount === 1 ? '' : 's'}!`
        : `Could not find any ${typeOfDocs} event!`;
    setIsError(errorMessage);
  }

  return resultCount;
};

// contains 0 <= value <= 10000
export const rangeNumDocs = (value: number) => {
  return value > 10000 ? 10000 : value < 0 ? 0 : value;
};

// check traceId Byte Size
export const isValidTraceId = (traceId: string) => {
  return new Blob([traceId]).size === 32;
};
