/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { fireEvent, render } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { sampleParsedParagraghs1 } from '../../helpers/__tests__/sampleDefaultNotebooks';
import { ParaOutput } from '../para_output';

describe('<ParaOutput /> spec', () => {
  configure({ adapter: new Adapter() });

  it.skip('renders the component', () => {
    const para = sampleParsedParagraghs1[2];
    para.isSelected = true;
    const setVisInput = jest.fn();
    const utils = render(
      <ParaOutput
        key={para.uniqueId}
        para={para}
        visInput={jest.fn()}
        setVisInput={setVisInput}
        DashboardContainerByValueRenderer={jest.fn()}
      />
    );
    expect(utils.container.firstChild).toMatchSnapshot();
  });
});
