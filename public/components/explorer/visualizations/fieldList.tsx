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

// import './field_list.scss';
import { throttle } from 'lodash';
import React, { useState, Fragment, useCallback, useMemo, useEffect } from 'react';
import { EuiSpacer } from '@elastic/eui';
import { FieldItem } from './field_item';
import { FieldsAccordion } from './fields_accordion';

export const FieldList = (
  {
    schema,
    id
  }
) => {

  return (
    <div
      className="lnsIndexPatternFieldList"
    >
      <div className="lnsIndexPatternFieldList__accordionContainer">
        {
          <>
            <FieldsAccordion
              id={id}
              paginatedFields={ schema }
              isFiltered={ false }
              label={ "Available fields" }
              showExistenceFetchError={ false }
            />
          </>
        }
      </div>
    </div>
  );
};