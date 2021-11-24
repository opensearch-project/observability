/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render } from 'enzyme';
import { FieldName } from './field_name';

// Note that it currently provides just 2 basic tests, there should be more, but
// the components involved will soon change
test('FieldName renders a string field by providing fieldType and fieldName', () => {
  const component = render(<FieldName fieldType="string" fieldName="test" />);
  expect(component).toMatchSnapshot();
});

test('FieldName renders a number field by providing a field record, useShortDots is set to false', () => {
  const component = render(<FieldName fieldName={'test.test.test'} fieldType={'number'} />);
  expect(component).toMatchSnapshot();
});

test('FieldName renders a geo field, useShortDots is set to true', () => {
  const component = render(
    <FieldName fieldName={'test.test.test'} fieldType={'geo_point'} useShortDots={true} />
  );
  expect(component).toMatchSnapshot();
});
