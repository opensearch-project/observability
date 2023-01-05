/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiComboBox,
  EuiFieldText,
  EuiFormControlLayoutDelimited,
  EuiFormRow,
  EuiSpacer,
} from '@elastic/eui';
import _ from 'lodash';
import { TraceAnalyticsMode } from 'public/components/trace_analytics/home';
import React from 'react';

const getFields = (mode: TraceAnalyticsMode, page: 'dashboard' | 'traces' | 'services' | 'app') =>
  (mode === 'data_prepper' ? {
    dashboard: ['traceGroup', 'serviceName', 'error', 'status.message', 'latency'],
    traces: ['traceId', 'traceGroup', 'serviceName', 'error', 'status.message', 'latency'],
    services: ['traceGroup', 'serviceName', 'error', 'status.message', 'latency'],
    app: ['traceId', 'traceGroup', 'serviceName'],
  }[page] : {
    dashboard: ['process.serviceName', 'error', 'latency'],
    traces: ['traceID', 'operationName', 'process.serviceName', 'error', 'latency'],
    services: ['process.serviceName', 'error', 'latency'],
    app: ['traceID', 'process.serviceName'],
  }[page]);
// filters will take effect and can be manually added
export const getFilterFields = (mode: TraceAnalyticsMode, page: 'dashboard' | 'traces' | 'services' | 'app') => getFields(mode, page);
// filters will take effect
export const getValidFilterFields = (mode: TraceAnalyticsMode, page: 'dashboard' | 'traces' | 'services' | 'app') => {
  const fields = getFields(mode, page);
  if (page !== 'services') return [...fields, 'Latency percentile within trace group'];
  return fields;
};

const getType = (field: string): string | null => {
  const typeMapping = {
    attributes: {
      host: {
        port: 'long',
      },
      http: {
        response_content_length: 'long',
        status_code: 'long',
      },
      net: {
        port: 'long',
      },
    },
    attributes_host: {
      port: 'long',
    },
    attributes_http: {
      response_content_length: 'long',
      status_code: 'long',
    },
    attributes_net: {
      port: 'long',
    },
    durationInNanos: 'long',
    latency: 'long',
    endTime: 'date_nanos',
    startTime: 'date_nanos',
  };
  const type = _.get(typeMapping, field, 'keyword');
  return typeof type === 'string' ? type : null;
};

export const getInvertedOperator = (operator: string, inverted: boolean) => {
  if (operator.includes('between')) return inverted ? 'is not between' : 'is between';
  else if (operator.includes('exist')) return inverted ? 'does not exist' : 'exists';
  else if (operator === 'is' || operator === 'is not') return inverted ? 'is not' : 'is';
};

export const getOperatorOptions = (field: string) => {
  const type = getType(field);
  const operatorMapping = {
    long: [
      {
        label: 'is between',
      },
      {
        label: 'is not between',
      },
    ],
    date_nanos: [
      {
        label: 'is between',
      },
      {
        label: 'is not between',
      },
    ],
    keyword: [],
    default_first: [
      {
        label: 'is',
      },
      {
        label: 'is not',
      },
    ],
    default_last: [
      {
        label: 'exists',
      },
      {
        label: 'does not exist',
      },
    ],
  };
  const operators = [
    ...operatorMapping.default_first,
    ..._.get(operatorMapping, type),
    ...operatorMapping.default_last,
  ];
  return operators;
};

export const getValueComponent = (
  field: string,
  operator: string,
  value: any,
  setValue: (v: any) => void
) => {
  const textField = (
    <>
      <EuiSpacer size="s" />
      <EuiFormRow label={'Value'}>
        <EuiFieldText
          placeholder="Enter a value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </EuiFormRow>
    </>
  );

  const getRangeField = () => {
    const getFromValue = () => {
      if (value?.from) {
        return value.from.includes('\u221E') ? '' : value.from;
      }
      return '';
    };
    const getToValue = () => {
      if (value?.to) {
        return value.to.includes('\u221E') ? '' : value.to;
      }
      return '';
    };
    const setFromValue = (from: string) => {
      setValue({ from: from || '-\u221E', to: getToValue() || '\u221E' });
    };
    const setToValue = (to: string) => {
      setValue({ from: getFromValue() || '-\u221E', to: to || '\u221E' });
    };
    return (
      <>
        <EuiSpacer size="s" />
        <EuiFormRow label={'Value'}>
          <EuiFormControlLayoutDelimited
            startControl={
              <input
                type="string"
                placeholder="Start of range"
                className="euiFieldText"
                value={getFromValue()}
                onChange={(e) => setFromValue(e.target.value)}
              />
            }
            endControl={
              <input
                type="string"
                placeholder="End of range"
                className="euiFieldText"
                value={getToValue()}
                onChange={(e) => setToValue(e.target.value)}
              />
            }
          />
        </EuiFormRow>
      </>
    );
  };

  const getComboBoxField = () => {
    return (
      <>
        <EuiSpacer size="s" />
        <EuiFormRow label={'Value'}>
          <EuiComboBox
            placeholder="Select a value"
            options={[
              {
                label: 'true',
              },
              {
                label: 'false',
              },
            ]}
            onChange={setValue}
            selectedOptions={value || []}
            singleSelection={true}
          />
        </EuiFormRow>
      </>
    );
  };

  if (field === 'error' && (operator === 'is' || operator === 'is not')) {
    return getComboBoxField();
  }

  const valueMapping = {
    is: textField,
    'is not': textField,
    'is between': getRangeField(),
    'is not between': getRangeField(),
    exists: null,
    'does not exist': null,
  };

  return valueMapping[operator];
};
