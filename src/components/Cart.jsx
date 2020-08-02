import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
// import { Container } from './styles';

function Cart() {
  const pokemon = useSelector(state => state.pokemons)
  let length = useSelector(state => state.pokemons.length)
  const dispatch = useDispatch()
  // const [totalPrice, setTotalPrice] = useState()
  let totalPrice = 0

  useEffect(() => {
    //first get

  }, []);
  
  const calcTotal = () => {
    let total = pokemon.map(x => x.price)
    return totalPrice = total.reduce((a,b) => a + b, 0)
  }

  
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
      <h2>Total: {calcTotal()}</h2>
      </div>
  );
}

export default Cart;