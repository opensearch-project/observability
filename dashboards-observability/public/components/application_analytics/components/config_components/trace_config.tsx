/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */

import dateMath from '@elastic/datemath';
import {
  EuiAccordion,
  EuiBadge,
  EuiButton,
  EuiComboBox,
  EuiFormRow,
  EuiOverlayMask,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import DSLService from 'public/services/requests/dsl';
import React, { useEffect, useState } from 'react';
import { FilterType } from 'public/components/trace_analytics/components/common/filters/filters';
import { OptionType } from '../../../../../common/types/app_analytics';
import { filtersToDsl } from '../../../trace_analytics/components/common/helper_functions';
import { handleDashboardRequest } from '../../../trace_analytics/requests/dashboard_request_handler';
import { AppAnalyticsComponentDeps } from '../../home';
import { DashboardTable } from '../../../trace_analytics/components/dashboard/dashboard_table';
import { getClearModal } from '../../helpers/modal_containers';

interface TraceConfigProps extends AppAnalyticsComponentDeps {
  dslService: DSLService;
  selectedTraces: OptionType[];
  setSelectedTraces: (traces: OptionType[]) => void;
}

export const TraceConfig = (props: TraceConfigProps) => {
  const {
    dslService,
    query,
    filters,
    setFiltersWithStorage,
    http,
    startTime,
    endTime,
    selectedTraces,
    setSelectedTraces,
  } = props;
  const [traceOpen, setTraceOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [traceItems, setTraceItems] = useState([]);
  const [traceOptions, setTraceOptions] = useState<OptionType[]>([]);
  const [percentileMap, setPercentileMap] = useState<{ [traceGroup: string]: number[] }>({});
  const [redirect, setRedirect] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalLayout, setModalLayout] = useState(<EuiOverlayMask />);

  useEffect(() => {
    setLoading(true);
    const timeFilterDSL = filtersToDsl([], '', startTime, endTime);
    const latencyTrendStartTime = dateMath.parse(endTime)?.subtract(24, 'hours').toISOString()!;
    const latencyTrendDSL = filtersToDsl(filters, query, latencyTrendStartTime, endTime);
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
  }, []);

  useEffect(() => {
    const toOptions = traceItems.map((item: any) => {
      return { label: item.dashboard_trace_group_name };
    });
    setTraceOptions(toOptions);
  }, [traceItems]);

  useEffect(() => {
    const filteredOptions = filters
      .filter((f) => f.field === 'traceGroup')
      .map((f) => {
        return { label: f.value };
      });
    const noDups = filteredOptions.filter((t, index) => {
      return filteredOptions.findIndex((trace) => trace.label === t.label) === index;
    });
    setSelectedTraces(noDups);
  }, [filters]);

  const addFilter = (filter: FilterType) => {
    for (const addedFilter of filters) {
      if (
        addedFilter.field === filter.field &&
        addedFilter.operator === filter.operator &&
        addedFilter.value === filter.value
      ) {
        const removed = filters.filter((fil) => fil.field !== addedFilter.field);
        setFiltersWithStorage(removed);
        return;
      }
    }
    const newFilters = [...filters, filter];
    setFiltersWithStorage(newFilters);
  };

  const onTraceChange = (newTraces: any) => {
    const traceFilters = newTraces.map((option: OptionType) => {
      return {
        field: 'traceGroup',
        operator: 'is',
        value: option.label,
        inverted: false,
        disabled: false,
      };
    });
    const nonTraceFilters = filters.filter((f) => f.field !== 'traceGroup');
    setFiltersWithStorage([...nonTraceFilters, ...traceFilters]);
  };

  const onCreateTrace = (searchValue: string, flattenedOptions: any) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();
    if (!normalizedSearchValue) {
      return;
    }
    const newTraceOption = {
      label: searchValue,
    };
    const newTraceFilter = {
      field: 'traceGroup',
      operator: 'is',
      value: searchValue,
      inverted: false,
      disabled: false,
    };
    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        (option: OptionType) => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      setTraceOptions([...traceOptions, newTraceOption]);
    }
    // Select the option.
    setFiltersWithStorage([...filters, newTraceFilter]);
  };

  const addPercentileFilter = (condition = 'gte', additionalFilters = [] as FilterType[]) => {
    if (traceItems.length === 0 || Object.keys(percentileMap).length === 0) return;
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].custom) {
        const newFilter = JSON.parse(JSON.stringify(filters[i]));
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
        setFiltersWithStorage(newFilters);
        return;
      }
    }
  };

  const clearTraces = () => {
    const withoutTraces = filters.filter((f) => f.field !== 'traceGroup');
    setFiltersWithStorage(withoutTraces);
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onConfirm = () => {
    clearTraces();
    closeModal();
  };

  const clearAllModal = () => {
    setModalLayout(
      getClearModal(
        onCancel,
        onConfirm,
        'Clear trace groups?',
        'This will clear all information in trace groups configuration.',
        'Clear all'
      )
    );
    showModal();
  };

  return (
    <div>
      <EuiAccordion
        id="traceGroups"
        buttonContent={
          <>
            <EuiText size="s">
              <h3>
                Trace groups <EuiBadge>{selectedTraces.length}</EuiBadge>
              </h3>
            </EuiText>
            <EuiSpacer size="s" />
            <EuiText size="s" color="subdued">
              Constrain your application to specific trace groups
            </EuiText>
          </>
        }
        extraAction={
          <EuiButton
            size="s"
            disabled={!traceOpen || !selectedTraces.length}
            onClick={clearAllModal}
          >
            Clear all
          </EuiButton>
        }
        onToggle={(isOpen) => {
          setTraceOpen(isOpen);
        }}
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
      {isModalVisible && modalLayout}
    </div>
  );
};
