import { waitFor } from '@testing-library/react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import httpClientMock from '../../../../../../test/__mocks__/httpClientMock';
import {
  AVAILABLE_FIELDS,
  QUERIED_FIELDS,
  SELECTED_FIELDS,
  UNSELECTED_FIELDS
} from '../../../../../../common/constants/explorer';
import { IDocType } from '../docViewRow';
import { DocFlyout } from '../doc_flyout';

const explorerFields = {
  [SELECTED_FIELDS]: [
    {
      name: '',
      type: '',
    },
  ],
  [UNSELECTED_FIELDS]: [
    {
      name: '',
      type: '',
    },
  ],
  [AVAILABLE_FIELDS]: [
    {
      name: '',
      type: '',
    },
  ],
  [QUERIED_FIELDS]: [
    {
      name: '',
      type: '',
    },
  ],
};

const doc: IDocType = {
  'avg(machine.ram)': '13262979995.042253',
  'span(timestamp,1d)': '2022-10-28 00:00:00',
};

describe('Test doc flyout component', () => {
  configure({ adapter: new Adapter() });

  it('Renders doc flyout component', async () => {
    const wrapper = mount(
      <DocFlyout
        http={httpClientMock}
        detailsOpen={false}
        setDetailsOpen={() => {}}
        doc={doc}
        timeStampField={''}
        memorizedTds={[]}
        explorerFields={explorerFields}
        openTraces={false}
        rawQuery={''}
        toggleSize={true}
        setToggleSize={() => {}}
        setOpenTraces={() => {}}
        setSurroundingEventsOpen={() => {}}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
