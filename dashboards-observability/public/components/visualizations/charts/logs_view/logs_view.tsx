/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { RAW_QUERY, SELECTED_TIMESTAMP } from '../../../../../common/constants/explorer';
import { DataGrid } from '../../../../components/event_analytics/explorer/events_views/data_grid';
import './logs_view.scss';

export const LogsView = ({ visualizations }: any) => {
  const http = visualizations?.data?.explorer?.http;
  const pplService = visualizations?.data?.explorer?.pplService;
  const explorerData = visualizations?.data?.explorer?.explorerData;
  const explorerFields = visualizations?.data?.explorer?.explorerFields;
  const query = visualizations?.data?.explorer?.query;

  const emptyExplorerFields = {
    availableFields: [],
    queriedFields: [],
    selectedFields: [],
    unselectedFields: [],
  };

  return (
    <div style={{ fontSize: '16px' }}>
      <DataGrid
        http={http}
        pplService={pplService}
        rows={explorerData?.jsonData !== undefined ? explorerData.jsonData : []}
        rowsAll={explorerData?.jsonDataAll !== undefined ? explorerData.jsonDataAll : []}
        explorerFields={explorerFields !== undefined ? explorerFields : emptyExplorerFields}
        timeStampField={query?.[SELECTED_TIMESTAMP] !== undefined ? query[SELECTED_TIMESTAMP] : ''}
        rawQuery={query?.[RAW_QUERY] !== undefined ? query[RAW_QUERY] : ''}
      />
    </div>
  );
};
