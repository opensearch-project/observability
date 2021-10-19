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

import React from 'react';
import classNames from 'classnames';
import { EuiToken, EuiTokenProps } from '@elastic/eui';

export interface FieldIconProps extends Omit<EuiTokenProps, 'iconType'> {
  type:
    | 'boolean'
    | 'conflict'
    | 'date'
    | 'geo_point'
    | 'geo_shape'
    | 'ip'
    | 'murmur3'
    | 'number'
    | '_source'
    | 'string'
    | string
    | 'nested';
  label?: string;
  scripted?: boolean;
}

// defaultIcon => a unknown datatype
const defaultIcon = { iconType: 'questionInCircle', color: 'gray' };

export const typeToEuiIconMap: Partial<Record<string, EuiTokenProps>> = {
  boolean: { iconType: 'tokenBoolean' },
  // icon for an index pattern mapping conflict in discover
  conflict: { iconType: 'alert', color: 'euiVisColor9' },
  date: { iconType: 'tokenDate' },
  geo_point: { iconType: 'tokenGeo' },
  geo_shape: { iconType: 'tokenGeo' },
  ip: { iconType: 'tokenIP' },
  // is a plugin's data type https://www.elastic.co/guide/en/elasticsearch/plugins/current/mapper-murmur3-usage.html
  murmur3: { iconType: 'tokenFile' },
  number: { iconType: 'tokenNumber' },
  _source: { iconType: 'editorCodeBlock', color: 'gray' },
  string: { iconType: 'tokenString' },
  nested: { iconType: 'tokenNested' },
};

/**
 * Field token icon used across the app
 */
export function FieldIcon({
  type,
  label,
  size = 's',
  scripted,
  className,
  ...rest
}: FieldIconProps) {
  const token = typeToEuiIconMap[type] || defaultIcon;

  return (
    <EuiToken
      {...token}
      className={classNames('osdFieldIcon', className)}
      aria-label={label || type}
      title={label || type}
      size={size as EuiTokenProps['size']}
      fill={scripted ? 'dark' : undefined}
      {...rest}
    />
  );
}
