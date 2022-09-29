/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { IExplorerFields } from '../../../../../common/types/explorer';
import { RAW_QUERY, SELECTED_TIMESTAMP } from '../../../../../common/constants/explorer';
import { DataGrid } from '../../../../components/event_analytics/explorer/events_views/data_grid';
import './logs_view.scss';

export const LogsView = ({ visualizations }: any) => {
  const explorer = visualizations?.data?.explorer;

  const http = explorer?.http;
  const pplService = explorer?.pplService;
  const explorerData = explorer?.explorerData;
  const explorerFields = explorer?.explorerFields;
  const query = explorer?.query;

  const emptyExplorerFields: IExplorerFields = {
    availableFields: [],
    queriedFields: explorerFields,
    selectedFields: [],
    unselectedFields: [],
  };

  return (
    <div className="logs-view-container">
      <DataGrid
        http={http}
        pplService={pplService}
        rows={explorerData?.jsonData !== undefined ? explorerData.jsonData : []}
        rowsAll={explorerData?.jsonDataAll !== undefined ? explorerData.jsonDataAll : []}
        explorerFields={query !== undefined ? explorerFields : emptyExplorerFields}
        timeStampField={query?.[SELECTED_TIMESTAMP] !== undefined ? query[SELECTED_TIMESTAMP] : ''}
        rawQuery={query?.[RAW_QUERY] !== undefined ? query[RAW_QUERY] : ''}
      />
    </div>
  );
};
