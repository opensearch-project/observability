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
import { mountWithIntl } from 'test_utils/enzyme_helpers';
import { ReactWrapper } from 'enzyme';
import { LoadingSpinner } from './loading_spinner';
import { findTestSubject } from '@elastic/eui/lib/test';

describe('loading spinner', function () {
  let component: ReactWrapper;

  it('LoadingSpinner renders a Searching text and a spinner', () => {
    component = mountWithIntl(<LoadingSpinner />);
    expect(findTestSubject(component, 'loadingSpinnerText').text()).toBe('Searching');
    expect(findTestSubject(component, 'loadingSpinner').length).toBe(1);
  });
});
