/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import {
  EuiComboBox,
  EuiFieldText,
  EuiFormControlLayoutDelimited,
  EuiFormRow,
  EuiSpacer,
} from '@elastic/eui';
import _ from 'lodash';
import React from 'react';

const getFields = (page: 'dashboard' | 'traces' | 'services') =>
  ({
    dashboard: ['traceGroupFields.name', 'serviceName', 'error', 'status.message', 'latency'],
    traces: ['traceId', 'traceGroupFields.name', 'serviceName', 'error', 'status.message', 'latency'],
    services: ['traceGroupFields.name', 'serviceName', 'error', 'status.message', 'latency'],
  }[page]);
// filters will take effect and can be manually added
export const getFilterFields = (page: 'dashboard' | 'traces' | 'services') => getFields(page);
// filters will take effect
export const getValidFilterFields = (page: 'dashboard' | 'traces' | 'services') => {
  const fields = getFields(page);
  if (page !== 'services') return [...fields, 'Latency percentile within trace group'];
  return fields;
};

const getType = (field: string): string => {
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
    ...operatorMapping[type],
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
