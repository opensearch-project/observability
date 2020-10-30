import { EuiFieldText, EuiFormControlLayoutDelimited, EuiFormRow, EuiSpacer } from '@elastic/eui';
import _ from 'lodash';
import React from 'react';

const fields = [
  'spanId',
  'traceId',
  'parentSpanId',
  'startTime',
  'endTime',
  'durationInNanos',
  'kind',
  'name',
  'status.code',
  'status.message',
  'attributes.component',
  'attributes.db.instance',
  'attributes.db.statement',
  'attributes.db.type',
  'attributes.db.user',
  'attributes.dispatcher.target',
  'attributes.host.port',
  'attributes.http.client_ip',
  'attributes.http.flavor',
  'attributes.http.host',
  'attributes.http.method',
  'attributes.http.response_content_length',
  'attributes.http.route',
  'attributes.http.scheme',
  'attributes.http.server_name',
  'attributes.http.status_code',
  'attributes.http.status_text',
  'attributes.http.target',
  'attributes.http.url',
  'attributes.http.user_agent',
  'attributes.net.peer.id',
  'attributes.net.peer.name',
  'attributes.net.peer.port',
  'attributes.servlet.context',
  'attributes.servlet.path',
  'attributes_component',
  'attributes_db.instance',
  'attributes_db.statement',
  'attributes_db.type',
  'attributes_db.user',
  'attributes_host.port',
  'attributes_http.client_ip',
  'attributes_http.flavor',
  'attributes_http.host',
  'attributes_http.method',
  'attributes_http.response_content_length',
  'attributes_http.route',
  'attributes_http.scheme',
  'attributes_http.server_name',
  'attributes_http.status_code',
  'attributes_http.status_text',
  'attributes_http.target',
  'attributes_http.url',
  'attributes_http.user_agent',
  'attributes_net.peer.id',
  'attributes_net.peer.name',
  'attributes_net.peer.port',
  'attributes_servlet.context',
  'attributes_servlet.path',
  'events.attributes.key',
  'events.attributes.value.stringValue',
  'events.attributes.name',
  'events.attributes.timeUnixNano',
  'resource.attributes.host.hostname',
  'resource.attributes.service.name',
  'resource.service.info',
  'resource.service.instance.id',
  'resource.service.name',
  'resource.telemetry.sdk.language',
  'resource.telemetry.sdk.name',
  'resource.telemetry.sdk.version',
];
export const fieldOptions = fields.map((field) => ({ label: field }));

export const getType = (field: string): string => {
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

export const getValueComponent = (operator: string, value: any, setValue: (v: any) => void) => {
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
