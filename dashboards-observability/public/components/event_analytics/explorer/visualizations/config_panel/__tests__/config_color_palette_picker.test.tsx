import { euiPaletteColorBlind } from '@elastic/eui';
import { waitFor } from '@testing-library/react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {
  MULTI_COLOR_PALETTE,
  SINGLE_COLOR_PALETTE,
} from '../../../../../../../common/constants/colors';
import { ColorPalettePicker } from '../config_panes/config_controls';

describe('ColorPalettePicker component', () => {
  configure({ adapter: new Adapter() });
  const palettes = [
    {
      value: 'default',
      title: 'Default',
      type: 'text',
    },
    {
      value: 'singleColor',
      title: 'Single Color',
      type: 'text',
    },
    {
      value: 'multicolor',
      title: 'Multi Color',
      type: 'text',
    },
  ];
  const onConfigChange = (configs: any) => {
    // console.log('vizType', vizType);
  };

  const wrapper = mount(
    <ColorPalettePicker
      title={'Color theme'}
      selectedColor={{
        name: 'singleColor',
        childColor: '#D36086',
        parentColors: [],
      }}
      numberOfParents={0}
      colorPalettes={palettes}
      onSelectChange={onConfigChange}
    />
  );

  it('Renders ColorPalettePicker component with data selected color as SINGLE_COLOR_PALETTE', async () => {
    wrapper.update();
    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders ColorPalettePicker component with data selected color as MULTI_COLOR_PALETTE', async () => {
    const wrapperComp = mount(
      <ColorPalettePicker
        title={'Color theme'}
        selectedColor={{
          name: 'multicolor',
          childColor: '#5D826F',
          parentColors: ['#68917C'],
        }}
        numberOfParents={1}
        colorPalettes={palettes}
        onSelectChange={onConfigChange}
      />
    );
    wrapperComp.update();
    await waitFor(() => {
      expect(wrapperComp).toMatchSnapshot();
    });
  });

  it('Renders ColorPalettePicker component to simulate color picker', async () => {
    wrapper
      .find('input[data-test-subj="euiColorPickerAnchor config-color-palette-colorpicker"]')
      .simulate('click', { value: '#FFFFFF' });
    wrapper.update();
    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  // it('Renders ColorPalettePicker component to simulate color picker in Multi color palette', async () => {
  //   const wrapper = mount(
  //     <ColorPalettePicker
  //       title={'testTitle'}
  //       selectedColor={{ name: MULTI_COLOR_PALETTE }}
  //       numberOfParents={3}
  //       colorPalettes={palettes}
  //       onSelectChange={onConfigChange}
  //     />
  //   );
  //   wrapper
  //     .find('input[data-test-subj="euiColorPickerAnchor config-color-palette-colorpicker-1"]')
  //     .simulate('click');
  // });

  it('Renders ColorPalettePicker component to simulate color palette picker', async () => {
    wrapper.find('button[data-test-subj="config-color-palette-picker"]').simulate('click');
    wrapper.update();
    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
