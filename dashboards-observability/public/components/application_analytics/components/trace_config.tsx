/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import dateMath from '@elastic/datemath';
import { EuiComboBox, EuiFormRow } from "@elastic/eui";
import { optionType } from "common/constants/application_analytics";
import { filtersToDsl } from "../../../components/trace_analytics/components/common/helper_functions";
import { handleDashboardRequest } from "../../../components/trace_analytics/requests/dashboard_request_handler";
import DSLService from "public/services/requests/dsl";
import React, { useEffect, useState } from "react";
import { AppAnalyticsComponentDeps } from "../home";

interface TraceConfigProps extends AppAnalyticsComponentDeps {
  dslService: DSLService;
}

export const TraceConfig = (props: TraceConfigProps) => {
  const { dslService, query, filters, http, startTime, endTime } = props;
  const [loading, setLoading] = useState(false);
  const [traceItems, setTraceItems] = useState([]);
  const [traceOptions, setTraceOptions] = useState<Array<optionType>>([]);
  const [percentileMap, setPercentileMap] = useState<{ [traceGroup: string]: number[] }>({});
  const [selectedTraces, setSelectedTraces] = useState<Array<optionType>>([]);

  useEffect(() => {
    setLoading(true)
    const timeFilterDSL = filtersToDsl([], '', startTime, endTime);
    const latencyTrendStartTime = dateMath
      .parse(endTime)
      ?.subtract(24, 'hours')
      .toISOString()!;
    const latencyTrendDSL = filtersToDsl(
      filters,
      query,
      latencyTrendStartTime,
      endTime
    );
    handleDashboardRequest(
      http,
      dslService,
      timeFilterDSL,
      latencyTrendDSL,
      traceItems,
      setTraceItems,
      setPercentileMap
    ).then(() => setLoading(false));
    }, [])

  useEffect (() => {
    const toOptions = traceItems.map((item: any) => { return { label: item.dashboard_trace_group_name }});
    setTraceOptions(toOptions);
  }, [traceItems])

  const onTraceChange = (selectedTraces: any) => {
    setSelectedTraces(selectedTraces);
  };

  const onCreateTrace = (searchValue: string, flattenedOptions: any) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();
    if (!normalizedSearchValue) {
      return;
    }
    const newTrace = {
      label: searchValue,
    };
    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        (option: optionType) => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      setTraceOptions([...traceOptions, newTrace]);
    }
    // Select the option.
    setSelectedTraces([...selectedTraces, newTrace]);
  };

  return (
    <EuiFormRow
    label="Trace Groups"
    helpText="Select one or multiple trace groups, or type a custom one"
    >
      <EuiComboBox
        aria-label="Select trace groups"
        placeholder="Select or add trace groups"
        options={traceOptions}
        selectedOptions={selectedTraces}
        onChange={onTraceChange}
        onCreateOption={onCreateTrace}
        isClearable={false}
        data-test-subj="traceGroupsComboBox"
      />
    </EuiFormRow>
  );
}
