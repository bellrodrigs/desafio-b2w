import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store'
import ListPokemon from  './components/ListPokemon'
import Cart from  './components/Cart'
 
const types = ['fire', 'water']

function App() {
  return (
    <Provider store={store}>
    <div>
      <div>
        <h1>header</h1>
      </div>
    <div className="App">
      <div className='teste' style={{width:'70%'}}>
        <ListPokemon  />
      </div>
      <div style={{width:'30%', borderLeft: '1px solid black'}}>
        <Cart  />
      </div>
    </div>
    </div>
    </Provider>
  );
}

export default App;
