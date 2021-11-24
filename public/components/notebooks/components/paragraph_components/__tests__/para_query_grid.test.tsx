/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { render } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { QueryDataGridMemo } from '../para_query_grid';

describe('<QueryDataGridMemo /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the component', () => {
    const props = {
      rowCount: 5,
      queryColumns: [
        {
          id: 'bytes',
          displayAsText: 'bytes',
        },
      ],
      visibleColumns: ['bytes'],
      dataValues: [
        {
          bytes: 6219,
        },
        {
          bytes: 6850,
        },
        {
          bytes: 0,
        },
        {
          bytes: 14113,
        },
        {
          bytes: 2492,
        },
      ],
    };
    const utils = render(<QueryDataGridMemo setVisibleColumns={jest.fn()} {...props} />);
    expect(utils.container.firstChild).toMatchSnapshot();
  });
});
