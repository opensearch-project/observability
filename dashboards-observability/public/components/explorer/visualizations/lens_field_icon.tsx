/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FieldIcon } from '../../common/field_icon';
export function LensFieldIcon({ type, ...rest }) {
  return (
    <FieldIcon
      className="lnsFieldListPanel__fieldIcon"
      type={normalizeOperationDataType(type)}
      {...rest}
    />
  );
}

export function normalizeOperationDataType(type) {
  return type === 'document' ? 'number' : type;
}
