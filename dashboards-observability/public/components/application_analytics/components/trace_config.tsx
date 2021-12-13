/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import dateMath from '@elastic/datemath';
import { EuiAccordion, EuiBadge, EuiButton, EuiComboBox, EuiFormRow, EuiSpacer, EuiText } from "@elastic/eui";
import { optionType } from "common/constants/application_analytics";
import { filtersToDsl } from "../../../components/trace_analytics/components/common/helper_functions";
import { handleDashboardRequest } from "../../../components/trace_analytics/requests/dashboard_request_handler";
import DSLService from "public/services/requests/dsl";
import React, { useEffect, useState } from "react";
import { AppAnalyticsComponentDeps } from "../home";
import { DashboardTable } from '../../../components/trace_analytics/components/dashboard/dashboard_table';
import { FilterType } from 'public/components/trace_analytics/components/common/filters/filters';

interface TraceConfigProps extends AppAnalyticsComponentDeps {
  dslService: DSLService;
}

export const TraceConfig = (props: TraceConfigProps) => {
  const { dslService, query, filters, setFilters, http, startTime, endTime } = props;
  const [traceOpen, setTraceOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [traceItems, setTraceItems] = useState([]);
  const [traceOptions, setTraceOptions] = useState<Array<optionType>>([]);
  const [percentileMap, setPercentileMap] = useState<{ [traceGroup: string]: number[] }>({});
  const [selectedTraces, setSelectedTraces] = useState<Array<optionType>>([]);
  const [redirect, setRedirect] = useState(true);

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
    setRedirect(false);
    }, [])

  useEffect (() => {
    const toOptions = traceItems.map((item: any) => { return { label: item.dashboard_trace_group_name }});
    setTraceOptions(toOptions);
  }, [traceItems])

  useEffect (() => {
    const filteredOptions = filters.filter(f => f.field === 'traceGroup').map((f) => { return { label: f.value }});
    const noDups = filteredOptions.filter((t, index) => { return filteredOptions.findIndex(trace => trace.label === t.label) === index });
    setSelectedTraces(noDups);
  }, [filters])

  const addFilter = (filter: FilterType) => {
    for (const addedFilter of filters) {
      if (
        addedFilter.field === filter.field &&
        addedFilter.operator === filter.operator &&
        addedFilter.value === filter.value
      ) {
        return;
      }
    }
    const newFilters = [...filters, filter];
    setFilters(newFilters);
  };

  const onTraceChange = (selectedTraces: any) => {
    const traceFilters = selectedTraces.map((option: optionType) => { 
      return {
        field: 'traceGroup', 
        operator: 'is', 
        value: option.label, 
        inverted: false, 
        disabled: false 
      }
    })
    const nonTraceFilters = filters.filter((f) => f.field !== 'traceGroup');
    setFilters([...nonTraceFilters, ...traceFilters]);
  };

  const onCreateTrace = (searchValue: string, flattenedOptions: any) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();
    if (!normalizedSearchValue) {
      return;
    }
    const newTraceOption = {
      label: searchValue
    }
    const newTraceFilter = {
      field: 'traceGroup',
      operator: 'is',
      value: searchValue,
      inverted: false, 
      disabled: false 
    };
    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        (option: optionType) => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      setTraceOptions([...traceOptions, newTraceOption]);
    }
    // Select the option.
    setFilters([...filters, newTraceFilter]);
  };

  const addPercentileFilter = (condition = 'gte', additionalFilters = [] as FilterType[]) => {
    if (traceItems.length === 0 || Object.keys(percentileMap).length === 0) return;
    for (let i = 0; i < props.filters.length; i++) {
      if (props.filters[i].custom) {
        const newFilter = JSON.parse(JSON.stringify(props.filters[i]));
        newFilter.custom.query.bool.should.forEach((should: any) =>
          should.bool.must.forEach((must: any) => {
            const range = must?.range?.['traceGroupFields.durationInNanos'];
            if (range) {
              const duration = range.lt || range.lte || range.gt || range.gte;
              if (duration || duration === 0) {
                must.range['traceGroupFields.durationInNanos'] = {
                  [condition]: duration,
                };
              }
            }
          })
        );
        newFilter.value = condition === 'gte' ? '>= 95th' : '< 95th';
        const newFilters = [...filters, ...additionalFilters];
        newFilters.splice(i, 1, newFilter);
        setFilters(newFilters);
        return;
      }
    }
  }

  const clearTraces = () => {
    const withoutTraces = filters.filter((f) => f.field !== 'traceGroup')
    setFilters(withoutTraces);
  };

  return (
    <EuiAccordion
      id="traceGroups"
      buttonContent={
        <>
          <EuiText size="s">
          <h3>
          Trace Groups  <EuiBadge>{selectedTraces.length}</EuiBadge>
          </h3>
          </EuiText>
          <EuiSpacer size="s" />
          <EuiText size="s" color="subdued">
            Constrain your application to specific trace groups
          </EuiText>
        </>
        }
      extraAction={<EuiButton size="s" disabled={!traceOpen || !selectedTraces.length} onClick={clearTraces}>Clear all</EuiButton>}
      onToggle={(isOpen) => {setTraceOpen(isOpen)}}
      paddingSize="l"
    >
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
      <EuiSpacer />
      <DashboardTable
        items={traceItems}
        // We want table to display all traces regardless of added filters
        filters={[]}
        addFilter={addFilter}
        addPercentileFilter={addPercentileFilter}
        setRedirect={setRedirect}
        loading={loading}
        page="app"
      />
    </EuiAccordion>
  );
}
