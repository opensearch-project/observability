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
