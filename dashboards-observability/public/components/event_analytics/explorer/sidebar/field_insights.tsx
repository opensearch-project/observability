/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState, useContext, useEffect } from 'react';
import { indexOf, last } from 'lodash';
import { EuiFlexGroup, EuiFlexItem, EuiLink, EuiBasicTable } from '@elastic/eui';
import { getIndexPatternFromRawQuery } from '../../../../../common/utils/query_utils';
import { TabContext } from '../../hooks/use_tab_context';

export const FieldInsights = ({ field, query }: any) => {
  const { pplService } = useContext(TabContext);
  const { rawQuery } = query;
  const index = getIndexPatternFromRawQuery(rawQuery);
  const generalReports = [
    {
      id: 'top_values',
      name: 'Top values',
      query: `source = ${index} | top 5 ${field.name} | sort - ${field.name}`,
      format: 'jdbc',
    },
    {
      id: 'rare_values',
      name: 'Rare values',
      query: `source = ${index} | rare ${field.name} | sort + ${field.name}`,
      format: 'jdbc',
    },
  ];

  const numericalOnlyReports = [
    {
      id: 'average',
      name: 'Average overtime',
      query: `source = ${index} | stats avg(${field.name})`,
      format: 'viz',
    },
    {
      id: 'maximum',
      name: 'Maximum overtime',
      query: `source = ${index} | stats max(${field.name})`,
      format: 'viz',
    },
    {
      id: 'minimum',
      name: 'Minimum overtime',
      query: `source = ${index} | stats min(${field.name})`,
      format: 'viz',
    },
  ];
  const NUMERICAL_TYPES = ['short', 'integer', 'long', 'float', 'double'];
  const isNumericalField = indexOf(NUMERICAL_TYPES, field.type) > 0;
  const [curReport, setCurReport] = useState({ ...generalReports[0] });
  const [reportContent, setReportContent] = useState({});

  const statsInsightsQueries = [
    {
      id: 'stats',
      name: 'Stats',
      query: `source = ${index} | stats avg(${field.name}), max(${field.name}), min(${field.name})`,
      format: 'viz',
    },
  ];

  const fetchData = async (requests) => {
    return await Promise.all(
      requests.map((reqQuery) => {
        const req = {
          format: reqQuery.format,
          query: reqQuery.query,
        };
        return getInsights(req);
      })
    );
  };

  useEffect(() => {
    let requests = [...generalReports];
    if (isNumericalField) requests = [...requests, ...statsInsightsQueries];
    fetchData(requests)
      .then((res) => {
        // numerical field
        generalReports.map((report, index) => {
          if (!res[index]?.jsonData) return;
          setReportContent((staleState) => {
            return {
              ...staleState,
              [report.id]: res[index]?.jsonData || {},
            };
          });
        });
        if (res.length > 2) {
          const statsRes = last(res);
          if (!statsRes?.metadata) return;
          numericalOnlyReports.map((rep, index) => {
            const fieldName = statsRes.metadata?.fields[index]?.name;
            setReportContent((staleState) => {
              return {
                ...staleState,
                [rep.id]: [{ [field.name]: statsRes.data[fieldName][0] }],
              };
            });
          });
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const getInsights = async (query: string) => {
    try {
      return await pplService.fetch(query);
    } catch (error) {
      console.error(error);
    }
  };

  const insightsContent = useMemo(() => {
    const columns = [
      {
        field: field.name,
        name: field.name,
      },
    ];
    const repItems = reportContent[curReport.id] || [];

    return <EuiBasicTable columns={columns} items={repItems} />;
  }, [curReport, reportContent, field.name]);

  return (
    <EuiFlexGroup direction="column" data-test-subj="sidebarField__fieldInsights">
      <EuiFlexItem grow={false}>
        <EuiFlexGroup wrap>
          {generalReports.map((report) => {
            return (
              <EuiFlexItem grow={false}>
                <EuiLink onClick={() => setCurReport(report)}>{report.name}</EuiLink>
              </EuiFlexItem>
            );
          })}
          {indexOf(NUMERICAL_TYPES, field.type) > 0 &&
            numericalOnlyReports.map((report) => {
              return (
                <EuiFlexItem grow={false}>
                  <EuiLink onClick={() => setCurReport(report)}>{report.name}</EuiLink>
                </EuiFlexItem>
              );
            })}
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>{insightsContent}</EuiFlexItem>
    </EuiFlexGroup>
  );
};
