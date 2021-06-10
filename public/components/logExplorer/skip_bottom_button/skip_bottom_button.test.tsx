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
