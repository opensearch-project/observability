import { waitFor } from '@testing-library/react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {
  AVAILABLE_FIELDS,
  QUERIED_FIELDS,
  SELECTED_FIELDS,
  UNSELECTED_FIELDS
} from '../../../../../../common/constants/explorer';
import { IField } from '../../../../../../common/types/explorer';
import httpClientMock from '../../../../../../test/__mocks__/httpClientMock';
import PPLService from '../../../../../services/requests/ppl';
import { IDocType } from '../docViewRow';
import { SurroundingFlyout } from '../surrounding_flyout';

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

const pplService = ({
  http: jest.fn(),
  fetch: jest.fn(),
} as unknown) as PPLService;

const cols = [
  {
    name: 'avg(machine.ram)',
    type: 'double',
  },
  {
    name: 'span(timestamp,1d)',
    type: 'timestamp',
  },
];

describe('Test surrounding flyout component', () => {
  configure({ adapter: new Adapter() });

  it('Renders surrounding flyout component', async () => {
    const wrapper = mount(
      <SurroundingFlyout
        http={httpClientMock}
        detailsOpen={false}
        setDetailsOpen={() => {}}
        doc={doc}
        timeStampField={''}
        memorizedTds={[]}
        explorerFields={explorerFields}
        openTraces={false}
        setOpenTraces={() => {}}
        setSurroundingEventsOpen={() => {}}
        pplService={pplService}
        rawQuery={''}
        selectedCols={cols}
        toggleSize={true}
        setToggleSize={() => {}}
        getTds={function (doc: IDocType, selectedCols: IField[], isFlyout: boolean): JSX.Element[] {
          throw new Error('Function not implemented.');
        }}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
