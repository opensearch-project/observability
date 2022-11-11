/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { Field } from '../field';
import { AGENT_FIELD } from '../../../../../../test/event_analytics_constants';
import { SELECTED_PATTERN_FIELD } from '../../../../../../common/constants/explorer';

describe('Field component', () => {
  configure({ adapter: new Adapter() });

  it('Renders a sidebar field', async () => {
    const onToggleField = jest.fn();
    const handleOverrideTimestamp = jest.fn();
    const handleOverridePattern = jest.fn();
    const selectedTimestamp = 'timestamp';
    const query = 'rawQuery';
    const selectedPattern = SELECTED_PATTERN_FIELD;

    const wrapper = mount(
      <Field
        query={query}
        field={AGENT_FIELD}
        selectedPattern={selectedPattern}
        isOverridingPattern={false}
        handleOverridePattern={handleOverridePattern}
        selectedTimestamp={selectedTimestamp}
        handleOverrideTimestamp={handleOverrideTimestamp}
        isOverridingTimestamp={false}
        isFieldToggleButtonDisabled={false}
        showTimestampOverrideButton={true}
        onToggleField={onToggleField}
        selected
        showToggleButton={true}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
