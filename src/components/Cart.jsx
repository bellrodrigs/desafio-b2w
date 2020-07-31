import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
// import { Container } from './styles';

function Cart() {
  const [value, setValue] = useState([]);
  const [existingName, setExtistingName] = useState([]);
  const pokemon = useSelector(state => state.pokemons)
  const total = useSelector(state => state.total)
  let name = [];

  useEffect(() => {
    //first get

  }, []);
  const count = pokemon.filter(y => y.name == 'charizard')
  console.log(count.length)
  
  const calcTotal = () => {
    console.log('to ouvindo')
  }
  return (
    <div style={{height:'40%'}}>
      {pokemon.map(x => 
      <div key={x.id}>
        <p>{x.name}</p>
        <img src={x.img} />
         <p>{x.price}</p> 
         {count.length > 0 ? <p>{count.length}</p> : null}
      </div>
      )}
      <h2>Total: {total}</h2>
      </div>
  );
}

export default Cart;