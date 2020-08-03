import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from '../enzyme'

import { Provider } from 'react-redux';
import { createStore } from 'redux';


import reducer from '../store/reducer';

import App from '../App'

describe('<App /> unit test', () => {
    const mockStore = createStore(reducer);    
    const getWrapper = () => mount(
      <Provider store={mockStore}>
          <App />
      </Provider>
    );
  
    it('should exists and have h5 element', () => {
      const wrapper = getWrapper();
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.find('h5').text()).toEqual('Pokemon do Tipo: Fogo');
    });
  });