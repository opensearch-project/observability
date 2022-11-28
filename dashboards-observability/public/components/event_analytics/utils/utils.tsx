/* eslint-disable no-bitwise */
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import dateMath from '@elastic/datemath';
import { uniqueId, isEmpty } from 'lodash';
import moment from 'moment';
import React from 'react';
import { HttpStart } from '../../../../../../src/core/public';
import {
  CUSTOM_LABEL,
  TIME_INTERVAL_OPTIONS,
  GROUPBY,
  AGGREGATIONS,
  BREAKDOWNS,
} from '../../../../common/constants/explorer';
import { PPL_DATE_FORMAT, PPL_INDEX_REGEX } from '../../../../common/constants/shared';
import {
  ConfigListEntry,
  GetTooltipHoverInfoType,
  IExplorerFields,
  IField,
} from '../../../../common/types/explorer';
import PPLService from '../../../services/requests/ppl';
import { DocViewRow, IDocType } from '../explorer/events_views';
import { ConfigTooltip } from '../explorer/visualizations/config_panel/config_panes/config_controls';
import {
  GroupByChunk,
  GroupField,
  StatsAggregationChunk,
  statsChunk,
} from '../../../../common/query_manager/ast/types';

// Create Individual table rows for events datagrid and flyouts
export const getTrs = (
  http: HttpStart,
  explorerFields: IField[],
  limit: number,
  setLimit: React.Dispatch<React.SetStateAction<number>>,
  PAGE_SIZE: number,
  timeStampField: any,
  explorerFieldsFull: IExplorerFields,
  pplService: PPLService,
  rawQuery: string,
  rowRefs: Array<
    React.RefObject<{
      closeAllFlyouts(openDocId: string): void;
    }>
  >,
  setRowRefs: React.Dispatch<
    React.SetStateAction<
      Array<
        React.RefObject<{
          closeAllFlyouts(openDocId: string): void;
        }>
      >
    >
  >,
  onFlyoutOpen: (docId: string) => void,
  docs: any[] = [],
  prevTrs: any[] = []
) => {
  if (prevTrs.length >= docs.length) return prevTrs;

  // reset limit if no previous table rows
  if (prevTrs.length === 0 && limit !== PAGE_SIZE) setLimit(PAGE_SIZE);
  const trs = prevTrs.slice();

  const upperLimit = Math.min(trs.length === 0 ? PAGE_SIZE : limit, docs.length);
  const tempRefs = rowRefs;
  for (let i = trs.length; i < upperLimit; i++) {
    const docId = uniqueId('doc_view');
    const tempRowRef = React.createRef<{
      closeAllFlyouts(openDocId: string): void;
    }>();
    tempRefs.push(tempRowRef);
    trs.push(
      <DocViewRow
        ref={tempRowRef}
        http={http}
        key={docId}
        docId={docId}
        doc={docs[i]}
        selectedCols={explorerFields}
        timeStampField={timeStampField}
        explorerFields={explorerFieldsFull}
        pplService={pplService}
        rawQuery={rawQuery}
        onFlyoutOpen={onFlyoutOpen}
      />
    );
  }
  setRowRefs(tempRefs);
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
      tableHeadContent.unshift(<th key={uniqueId('datagrid-header-')} />);
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
  const timeSymbol = typeOfDocs === 'new' ? '>' : '<';
  const sortSymbol = typeOfDocs === 'new' ? '+' : '-';
  const timeQueryFilter = ` | where ${timeStampField} ${timeSymbol} '${eventTime}'`;
  const sortFilter = ` | sort ${sortSymbol} ${timeStampField} | head ${numDocs}`;

  return indexPartOfQuery + timeQueryFilter + filterPartOfQuery + sortFilter;
};

const createTds = (
  docs: IDocType[],
  selectedCols: IField[],
  getTds: (doc: IDocType, selectedCols: IField[], isFlyout: boolean) => JSX.Element[]
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
  getTds: (doc: IDocType, selectedCols: IField[], isFlyout: boolean) => JSX.Element[]
) => {
  let resultCount = 0;
  let isErred = false;
  const pplEventTime = moment.utc(eventTime).format(PPL_DATE_FORMAT);
  setLoadingData(true);
  setIsError('');

  let finalQuery = '';
  try {
    finalQuery = composeFinalQuery(rawQuery, timeStampField, pplEventTime, numDocs, typeOfDocs);
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

export const formatError = (name: string, message: string, details: string) => {
  return {
    name,
    message,
    body: {
      attributes: {
        error: {
          caused_by: {
            type: '',
            reason: details,
          },
        },
      },
    },
  };
};

export const hexToRgb = (
  hex: string = '#3CA1C7',
  opacity: number = 1,
  colorWithOpacity: boolean = true
) => {
  // default color PLOTLY_COLOR[0]: '#3CA1C7'
  const defaultColor = [hex, '60', '161', '199'];
  const rgbElements = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || defaultColor;
  const [, r, g, b] = rgbElements.map((color) => parseInt(color, 16));
  const rgbaFormat = colorWithOpacity ? `rgba(${r},${g},${b},${opacity})` : `rgb(${r},${g},${b})`;
  return rgbaFormat;
};

export const lightenColor = (color: string, percent: number) => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const B = ((num >> 8) & 0x00ff) + amt;
  const G = (num & 0x0000ff) + amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

// Get config objects according to specific editor
export const fetchConfigObject = (editor: string, propsOptions: any) => {
  switch (editor) {
    case 'Tooltip':
      return {
        id: 'tooltip_options',
        name: 'Tooltip options',
        editor: ConfigTooltip,
        mapTo: 'tooltipOptions',
        schemas: [
          {
            name: 'Tooltip mode',
            component: null,
            mapTo: 'tooltipMode',
            props: {
              options: [
                { name: 'Show', id: 'show' },
                { name: 'Hidden', id: 'hidden' },
              ],
              defaultSelections: [{ name: 'Show', id: 'show' }],
            },
          },
          {
            name: 'Tooltip text',
            component: null,
            mapTo: 'tooltipText',
            props: propsOptions,
          },
        ],
      };
    default:
      return null;
  }
};

export const getTooltipHoverInfo = ({ tooltipMode, tooltipText }: GetTooltipHoverInfoType) => {
  if (tooltipMode === 'hidden') {
    return 'none';
  }
  if (tooltipText === undefined) {
    return 'all';
  }
  return tooltipText;
};

export const filterDataConfigParameter = (parameter: ConfigListEntry[]) =>
  parameter.filter((configItem: ConfigListEntry) => configItem.label);

export const getRoundOf = (value: number, places: number) => value.toFixed(places);

export const getPropName = (queriedVizObj: {
  customLabel?: string;
  aggregation: string;
  name: string;
  label: string;
}) => {
  if (queriedVizObj) {
    if (queriedVizObj[CUSTOM_LABEL] === '' || queriedVizObj[CUSTOM_LABEL] === undefined) {
      return `${queriedVizObj.aggregation}(${queriedVizObj.name})`;
    }
    return queriedVizObj[CUSTOM_LABEL];
  } else {
    return '';
  }
};

export const getDefaultVisConfig = (statsToken: statsChunk) => {
  if (statsToken === null) {
    return {
      [GROUPBY]: [],
      [AGGREGATIONS]: [],
      [BREAKDOWNS]: [],
    };
  }

  const groupByToken = statsToken.groupby;
  // const seriesToken = statsToken.aggregations && statsToken.aggregations[0];
  const span = getSpanValue(groupByToken);
  return {
    [AGGREGATIONS]: statsToken.aggregations.map((agg) => ({
      label: agg.function?.value_expression,
      name: agg.function?.value_expression,
      aggregation: agg.function?.name,
      [CUSTOM_LABEL]: agg[CUSTOM_LABEL as keyof StatsAggregationChunk],
    })),
    [GROUPBY]: groupByToken?.group_fields?.map((agg) => ({
      label: agg.name ?? '',
      name: agg.name ?? '',
      [CUSTOM_LABEL]: agg[CUSTOM_LABEL as keyof GroupField] ?? '',
    })),
    span,
  };
};

const getSpanValue = (groupByToken: GroupByChunk) => {
  const timeUnitValue = TIME_INTERVAL_OPTIONS.find(
    (time_unit) => time_unit.value === groupByToken?.span?.span_expression.time_unit
  )?.text;
  return !isEmpty(groupByToken?.span)
    ? {
        time_field: [
          {
            name: groupByToken?.span?.span_expression?.field,
            type: 'timestamp',
            label: groupByToken?.span?.span_expression?.field,
          },
        ],
        unit: [
          {
            text: timeUnitValue,
            value: groupByToken?.span?.span_expression?.time_unit,
            label: timeUnitValue,
          },
        ],
        interval: groupByToken?.span?.span_expression?.literal_value,
      }
    : undefined;
};
