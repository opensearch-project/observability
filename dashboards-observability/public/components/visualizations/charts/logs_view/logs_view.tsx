/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { EuiAccordion, EuiPanel, EuiSpacer, htmlIdGenerator } from '@elastic/eui';
import { DataGrid } from '../../../../components/event_analytics/explorer/events_views/data_grid';
import React, { useContext } from 'react';
import { TabContext } from '../../../event_analytics/hooks';
import './logs_view.scss';
import { RAW_QUERY, SELECTED_TIMESTAMP } from '../../../../../common/constants/explorer';

export const LogsView = ({ visualizations }: any) => {
  const { explorerData, http, pplService, explorerFields, query } = useContext<any>(TabContext);
  const { dataConfig = {} } = visualizations?.data?.userConfigs;
  const isTimeEnabled =
    dataConfig?.chartStyles?.time !== undefined ? dataConfig?.chartStyles?.time : true;
  const isWrapLinesEnabled =
    dataConfig?.chartStyles?.view !== undefined && dataConfig?.chartStyles?.view === 'wrapLines';
  const isPrettifyJSONEnabled =
    dataConfig?.chartStyles?.view !== undefined && dataConfig?.chartStyles?.view === 'prettifyJSON';
  const isLogDetailsEnabled =
    dataConfig?.chartStyles?.enableLogDetails !== undefined
      ? dataConfig?.chartStyles?.enableLogDetails
      : true;
  const labelSize =
    dataConfig?.chartStyles?.labelSize !== undefined
      ? dataConfig?.chartStyles?.labelSize + 'px'
      : '14px';
  const rawData = explorerData.jsonData;
  const { queriedFields = [], availableFields = [] } = visualizations?.data?.indexFields;

  const isTimestamp = (key: any) => {
    if (queriedFields.length !== 0) {
      for (const { name, type } of queriedFields) {
        if (name === key && type === 'timestamp') return true;
      }
    } else {
      for (const { name, type } of availableFields) {
        if (name === key && type === 'timestamp') return true;
      }
    }
    return false;
  };

  const fetchTimestamp = (obj: any) => {
    for (const key of Object.keys(obj)) {
      if (queriedFields.length !== 0) {
        for (const { name, type } of queriedFields) {
          if (name === key && type === 'timestamp') return key;
        }
      }
    }
    return null;
  };

  const logs =
    rawData &&
    rawData.map((log, index) => {
      let btnContent: JSX.Element;
      if (isWrapLinesEnabled) {
        const column1 = Object.keys(log).reduce((val, key) => {
          if (isTimestamp(key)) return `${log[key]}  `;
          return val;
        }, '');
        let column2 = '';
        for (const [key, val] of Object.entries(log)) {
          if (!isTimestamp(key)) column2 += `${key}="${val}"  `;
        }
        const jsxContent = column2
          .split('  ')
          .map((ele) => <span className="columnData">{ele}</span>);
        btnContent = (
          <table className="tableContainer">
            <tr>
              {isTimeEnabled && column1 !== '' && (
                <td className="timeColumn">
                  {column1.indexOf('.') !== -1
                    ? column1.substring(0, column1.indexOf('.'))
                    : column1}
                </td>
              )}
              <td className="wrapContent">{jsxContent}</td>
            </tr>
          </table>
        );
      } else if (isPrettifyJSONEnabled) {
        let columnContent;
        let { timestamp } = log;
        if (timestamp === undefined) timestamp = fetchTimestamp(log);

        let newLog: any = {};
        for (const key of Object.keys(log)) {
          if (key !== timestamp) newLog[key] = log[key];
        }

        if (isTimeEnabled && timestamp !== null) {
          columnContent = JSON.stringify({ timestamp: log[timestamp], ...newLog }, null, '\t');
        } else {
          columnContent = JSON.stringify(newLog, null, '\t');
        }

        btnContent = (
          <table className="tableContainer">
            <tr>
              <td>
                <pre>{columnContent}</pre>
              </td>
            </tr>
          </table>
        );
      } else {
        let stringContent = '';
        if (isTimeEnabled) {
          stringContent += Object.keys(log).reduce((val, key) => {
            if (isTimestamp(key))
              return log[key].indexOf('.') !== -1
                ? log[key].substring(0, log[key].indexOf('.')) + '  '
                : log[key] + '  ';
            return val;
          }, '');
        }
        for (const [key, val] of Object.entries(log)) {
          if (isTimestamp(key)) continue;
          stringContent += `${key}="${val}"  `;
        }
        const jsxContent = stringContent
          .split('  ')
          .map((ele) => <span className="columnData">{ele}</span>);
        btnContent = (
          <table>
            <tr>
              <td className="noWrapContent">{jsxContent}</td>
            </tr>
          </table>
        );
      }
      if (isLogDetailsEnabled) {
        return (
          <>
            <EuiAccordion
              key={index}
              id={htmlIdGenerator('multipleAccordionsId__1')()}
              buttonContent={btnContent}
              paddingSize="l"
            >
              <EuiPanel color="subdued" className="lvEuiAccordian_Panel">
                <table>
                  <tr>
                    <th>Detected fields</th>
                  </tr>
                  {Object.entries(log).map(([key, value], index) => (
                    <tr key={index}>
                      <td>
                        <p>{key}</p>
                      </td>
                      <td>
                        <p>{value}</p>
                      </td>
                    </tr>
                  ))}
                </table>
              </EuiPanel>
            </EuiAccordion>
            <EuiSpacer />
          </>
        );
      } else {
        return <div className="rawlogData">{btnContent}</div>;
      }
    });

  return (
    <div style={{ fontSize: labelSize }}>
      <DataGrid
        http={http}
        pplService={pplService}
        rows={explorerData.jsonData}
        rowsAll={explorerData.jsonDataAll}
        explorerFields={explorerFields}
        timeStampField={query[SELECTED_TIMESTAMP]}
        rawQuery={query[RAW_QUERY]}
      />
    </div>
  );
};
