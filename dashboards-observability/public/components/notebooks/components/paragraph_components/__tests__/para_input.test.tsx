/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { fireEvent, render, waitFor } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { sampleParsedParagraghs1 } from '../../helpers/__tests__/sampleDefaultNotebooks';
import { ParaInput } from '../para_input';

describe('<para_input /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the markdown component', () => {
    const para = sampleParsedParagraghs1[0];
    const textValueEditor = jest.fn();
    const handleKeyPress = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const setIsOutputStale = jest.fn();
    const setSelectedVisOption = jest.fn();
    const utils = render(
      <ParaInput
        para={para}
        index={1}
        runParaError={false}
        textValueEditor={textValueEditor}
        handleKeyPress={handleKeyPress}
        startTime={para.visStartTime}
        setStartTime={setStartTime}
        endTime={para.visEndTime}
        setEndTime={setEndTime}
        setIsOutputStale={setIsOutputStale}
        visOptions={[]}
        selectedVisOption={[]}
        setSelectedVisOption={setSelectedVisOption}
      />
    );
    expect(utils.container.firstChild).toMatchSnapshot();
  });

  it('renders the visualization component', () => {
    const para = sampleParsedParagraghs1[2];
    const textValueEditor = jest.fn();
    const handleKeyPress = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const setIsOutputStale = jest.fn();
    const setSelectedVisOption = jest.fn();
    const visOptions = Array.from({ length: 5 }, (v, k) => ({
      label: `visualization-${k}`,
      key: `key-${k}`,
    }));
    const utils = render(
      <ParaInput
        para={para}
        index={1}
        runParaError={false}
        textValueEditor={textValueEditor}
        handleKeyPress={handleKeyPress}
        startTime={para.visStartTime}
        setStartTime={setStartTime}
        endTime={para.visEndTime}
        setEndTime={setEndTime}
        setIsOutputStale={setIsOutputStale}
        visOptions={visOptions}
        selectedVisOption={[visOptions[0]]}
        setSelectedVisOption={setSelectedVisOption}
      />
    );
    expect(utils.container.firstChild).toMatchSnapshot();
  });

  it('types in the markdown component', () => {
    const para = sampleParsedParagraghs1[0];
    para.isSelected = true;
    const textValueEditor = jest.fn();
    const handleKeyPress = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const setIsOutputStale = jest.fn();
    const setSelectedVisOption = jest.fn();
    const utils = render(
      <ParaInput
        para={para}
        index={1}
        runParaError={false}
        textValueEditor={textValueEditor}
        handleKeyPress={handleKeyPress}
        startTime={para.visStartTime}
        setStartTime={setStartTime}
        endTime={para.visEndTime}
        setEndTime={setEndTime}
        setIsOutputStale={setIsOutputStale}
        visOptions={[]}
        selectedVisOption={[]}
        setSelectedVisOption={setSelectedVisOption}
      />
    );
    const textarea = utils.container.querySelectorAll('textarea#editorArea')[0];
    fireEvent.change(textarea, { target: { value: 'test input' } });
    expect(setIsOutputStale).toBeCalledWith(true);
  });

  it('clicks the visualization component', async () => {
    const para = sampleParsedParagraghs1[2];
    para.isSelected = true;
    const textValueEditor = jest.fn();
    const handleKeyPress = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const setIsOutputStale = jest.fn();
    const setSelectedVisOption = jest.fn();
    const visOptions = Array.from({ length: 5 }, (v, k) => ({
      label: `visualization-${k}`,
      key: `key-${k}`,
    }));
    const utils = render(
      <ParaInput
        para={para}
        index={1}
        runParaError={false}
        textValueEditor={textValueEditor}
        handleKeyPress={handleKeyPress}
        startTime={para.visStartTime}
        setStartTime={setStartTime}
        endTime={para.visEndTime}
        setEndTime={setEndTime}
        setIsOutputStale={setIsOutputStale}
        visOptions={visOptions}
        selectedVisOption={[visOptions[0]]}
        setSelectedVisOption={setSelectedVisOption}
      />
    );
    const datepicker = utils.container.querySelectorAll(
      'button[data-test-subj="superDatePickerstartDatePopoverButton"]'
    );
    fireEvent.click(datepicker[0]);

    utils.getByTestId('para-input-visualization-browse-button').click();
    await waitFor(() => {
      // modal should show up
      utils.getByTestId('para-input-select-button').click();
    });
  });
});
