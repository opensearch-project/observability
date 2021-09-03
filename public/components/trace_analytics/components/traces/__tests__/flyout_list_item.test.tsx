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

/*
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { render } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { FlyoutListItem } from '../flyout_list_item';

describe('<FlyoutListItem /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the component', () => {
    const addSpanFilter = jest.fn();
    const utils = render(
      <FlyoutListItem title="Span ID" description="test-span-id" addSpanFilter={addSpanFilter} />
    );
    expect(utils.container.firstChild).toMatchSnapshot();
  });

  it('renders the component', () => {
    const addSpanFilter = jest.fn();
    const utils = render(
      <FlyoutListItem title="Span ID" description="test-span-id" addSpanFilter={addSpanFilter} />
    );
  });
});
