/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
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