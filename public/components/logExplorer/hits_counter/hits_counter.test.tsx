/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

import React from 'react';
import { mountWithIntl } from 'test_utils/enzyme_helpers';
import { ReactWrapper } from 'enzyme';
import { HitsCounter, HitsCounterProps } from './hits_counter';
import { findTestSubject } from '@elastic/eui/lib/test';

describe('hits counter', function () {
  let props: HitsCounterProps;
  let component: ReactWrapper<HitsCounterProps>;

  beforeAll(() => {
    props = {
      onResetQuery: jest.fn(),
      showResetButton: true,
      hits: 2,
    };
  });

  it('HitsCounter renders a button by providing the showResetButton property', () => {
    component = mountWithIntl(<HitsCounter {...props} />);
    expect(findTestSubject(component, 'resetSavedSearch').length).toBe(1);
  });

  it('HitsCounter not renders a button when the showResetButton property is false', () => {
    component = mountWithIntl(
      <HitsCounter hits={2} showResetButton={false} onResetQuery={jest.fn()} />
    );
    expect(findTestSubject(component, 'resetSavedSearch').length).toBe(0);
  });

  it('expect to render the number of hits', function () {
    component = mountWithIntl(<HitsCounter {...props} />);
    const hits = findTestSubject(component, 'discoverQueryHits');
    expect(hits.text()).toBe('2');
  });

  it('expect to render 1,899 hits if 1899 hits given', function () {
    component = mountWithIntl(
      <HitsCounter hits={1899} showResetButton={false} onResetQuery={jest.fn()} />
    );
    const hits = findTestSubject(component, 'discoverQueryHits');
    expect(hits.text()).toBe('1,899');
  });

  it('should reset query', function () {
    component = mountWithIntl(<HitsCounter {...props} />);
    findTestSubject(component, 'resetSavedSearch').simulate('click');
    expect(props.onResetQuery).toHaveBeenCalled();
  });
});
