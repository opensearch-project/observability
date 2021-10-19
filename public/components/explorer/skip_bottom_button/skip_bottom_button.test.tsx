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
import { SkipBottomButton, SkipBottomButtonProps } from './skip_bottom_button';

describe('Skip to Bottom Button', function () {
  let props: SkipBottomButtonProps;
  let component: ReactWrapper<SkipBottomButtonProps>;

  beforeAll(() => {
    props = {
      onClick: jest.fn(),
    };
  });

  it('should be clickable', function () {
    component = mountWithIntl(<SkipBottomButton {...props} />);
    component.simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });
});
