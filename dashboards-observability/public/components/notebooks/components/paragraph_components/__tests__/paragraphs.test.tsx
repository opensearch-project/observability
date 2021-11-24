/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { fireEvent, render } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import httpClientMock from '../../../../../../test/__mocks__/httpClientMock';
import { sampleParsedParagraghs1 } from '../../helpers/__tests__/sampleDefaultNotebooks';
import { Paragraphs } from '../paragraphs';

jest.mock('../../../../../../../../src/plugins/embeddable/public', () => ({
  ViewMode: {
    EDIT: 'edit',
    VIEW: 'view',
  },
}));

describe('<Paragraphs /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the component', () => {
    const setPara = jest.fn();
    const paragraphSelector = jest.fn();
    const textValueEditor = jest.fn();
    const handleKeyPress = jest.fn();
    const addPara = jest.fn();
    const DashboardContainerByValueRenderer = jest.fn();
    const deleteVizualization = jest.fn();
    const setSelectedViewId = jest.fn();
    const deletePara = jest.fn();
    const runPara = jest.fn();
    const clonePara = jest.fn();
    const movePara = jest.fn();
    const para = sampleParsedParagraghs1[0];
    para.isInputExpanded = true;
    const utils = render(
      <Paragraphs
        ref={jest.fn()}
        para={para}
        setPara={setPara}
        dateModified={'modified-date'}
        index={0}
        paraCount={2}
        paragraphSelector={paragraphSelector}
        textValueEditor={textValueEditor}
        handleKeyPress={handleKeyPress}
        addPara={addPara}
        DashboardContainerByValueRenderer={DashboardContainerByValueRenderer}
        deleteVizualization={deleteVizualization}
        http={httpClientMock}
        selectedViewId="view_both"
        setSelectedViewId={setSelectedViewId}
        deletePara={deletePara}
        runPara={runPara}
        clonePara={clonePara}
        movePara={movePara}
        showQueryParagraphError={false}
        queryParagraphErrorMessage="error-message"
      />
    );
    expect(utils.container.firstChild).toMatchSnapshot();

    utils.getByLabelText('Open paragraph menu').click()
    utils.getByText('Run input').click()
    utils.getByLabelText('Open paragraph menu').click()
    utils.getByText('Duplicate').click()
    utils.getByLabelText('Open paragraph menu').click()
    utils.getByText('Delete').click()
  });
});
