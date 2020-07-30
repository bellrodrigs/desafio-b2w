import React from 'react';
import './App.css';
import ListPokemon from  './components/ListPokemon'
import Cart from  './components/Cart'

function App() {
  return (
    <div className="App">
      <ListPokemon />
      <Cart />
    </div>
  );
}

export default App;
