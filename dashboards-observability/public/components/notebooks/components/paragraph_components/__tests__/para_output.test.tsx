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

  it('renders markdown outputs', () => {
    const para = sampleParsedParagraghs1[0];
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

  it('renders query outputs', () => {
    const para = sampleParsedParagraghs1[3];
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

  it('renders visualization outputs', () => {
    const para = sampleParsedParagraghs1[2];
    para.isSelected = true;
    const setVisInput = jest.fn();
    const utils = render(
      <ParaOutput
        key={para.uniqueId}
        para={para}
        visInput={{
          timeRange: { from: '2020-07-21T18:37:44.710Z', to: '2020-08-20T18:37:44.710Z' },
        }}
        setVisInput={setVisInput}
        DashboardContainerByValueRenderer={() => null}
      />
    );
    expect(utils.container.firstChild).toMatchSnapshot();
  });

  it('renders other types of outputs', () => {
    const para = sampleParsedParagraghs1[0];
    para.isSelected = true;
    para.typeOut = ['HTML', 'TABLE', 'IMG', 'UNKNOWN', undefined];
    para.out = ['', '', '', '', ''];
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
