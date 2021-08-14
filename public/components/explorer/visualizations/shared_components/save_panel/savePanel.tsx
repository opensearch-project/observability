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

import React, { useState } from 'react';
import { 
  EuiTitle,
  EuiComboBox,
  EuiFormRow,
  EuiSpacer,
  EuiFieldText
} from '@elastic/eui';

export const SavePanel = () => {
  return (
    <>
      <EuiTitle size="xxs">
        <h3>{ 'Custom operational dashboards/application' }</h3>
      </EuiTitle>
      <EuiFormRow
        helpText="Search existing dashboards or applications by name, or create new operational dashboard by typing in a new name">
          <EuiComboBox 
            placeholder="Select dashboards/applications"
          />
      </EuiFormRow>
      <EuiSpacer />
      <EuiTitle size="xxs">
        <h3>{ 'Visualization name' }</h3>
      </EuiTitle>
      <EuiFormRow
        helpText="Enter a unique and descriptive name between 1-50 characters">
          <EuiFieldText
            placeholder="Number of events overtime by service"
            value={''}
            onChange={(e) => {}}
            aria-label="Use aria labels when no actual label is in use"
          />
      </EuiFormRow>
    </>
  );
};