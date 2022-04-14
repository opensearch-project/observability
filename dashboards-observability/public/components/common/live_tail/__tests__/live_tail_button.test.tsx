/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { LiveTailButton, StopLiveButton } from '../live_tail_button';
import { waitFor } from '@testing-library/dom';

  describe('Live tail button', () => {
    configure({ adapter: new Adapter() });
  
    it('starts live tail with 5s interval', async () => {
      const setIsLiveTailPopoverOpen = jest.fn();

      const wrapper = mount(
        <LiveTailButton 
        isLiveTailOn={true} 
        setIsLiveTailPopoverOpen={setIsLiveTailPopoverOpen} 
        liveTailName={'5s'} 
        isLiveTailPopoverOpen={false} 
        dataTestSubj={''}   
        />
      );
      
      wrapper.update();
  
      await waitFor(() => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    it('change live tail to 10s interval', async () => {
        const setIsLiveTailPopoverOpen = jest.fn();
        
        const wrapper = mount(
          <LiveTailButton 
          isLiveTailOn={true} 
          setIsLiveTailPopoverOpen={setIsLiveTailPopoverOpen} 
          liveTailName={'10s'} 
          isLiveTailPopoverOpen={false} 
          dataTestSubj={''}   
          />
        );
        
        wrapper.update();
    
        await waitFor(() => {
          expect(wrapper).toMatchSnapshot();
        });
      });
  });

  describe('Live tail off button', () => {
    configure({ adapter: new Adapter() });

    it('stop live tail', async () => {
        const StopLive = jest.fn();
        
        const wrapper = mount(
          <StopLiveButton 
             StopLive={StopLive}
             dataTestSubj={''}
          />
        );
        
        wrapper.update();
    
        await waitFor(() => {
          expect(wrapper).toMatchSnapshot();
        });
      });
 });