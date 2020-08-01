import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
// import { Container } from './styles';

function Cart() {
  const pokemon = useSelector(state => state.pokemons)
  let length = useSelector(state => state.pokemons.length)
  const dispatch = useDispatch()

  useEffect(() => {
    //first get
    
 
  }, []);

  
  const removePokemon = (id) => {
    dispatch({type: 'REMOVE_POKEMON', id: id})
  }
  return (
    <div style={{height:'40%'}}>
      <p>Itens no carrinho: {length}</p>
      {pokemon.map(x => 
      <div key={x.id}>
        <p>{x.name}</p>
        <img src={x.img} />
         <p>{x.price}</p>
         <button onClick={() => removePokemon(x.id)}>Remove</button>
      </div>
      )}
      <h2>Total: {length * 10}</h2>
      </div>
  );
}

export default Cart;