/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { fireEvent, render } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { GenerateReportLoadingModal } from '../reporting_loading_modal';

describe('<GenerateReportLoadingModal /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the component', () => {
    const setShowLoading = jest.fn();
    const utils = render(<GenerateReportLoadingModal setShowLoading={setShowLoading} />);
    expect(utils.container.firstChild).toMatchSnapshot();
    utils.getByTestId('reporting-loading-modal-close-button').click();
    expect(setShowLoading).toBeCalledWith(false);
  });
});
