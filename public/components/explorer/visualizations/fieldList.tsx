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
import { FieldsAccordion } from './fields_accordion';

export const FieldList = (
  {
    fields,
    id
  }: any
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
              paginatedFields={ fields || [] }
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