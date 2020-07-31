import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'

import './ListPokemon.css';
function ListPokemon() {
  //states
  const [pokemon, setPokemon] = useState([]);
  const [type, setType] = useState('fire')
  const [total, setTotal] = useState([10]);

  const urlDefault = `https://pokeapi.co/api/v2/type/${type}`;
  const imageNotFound = 'https://betadesign.com.br/site/wp-content/themes/bds/images/no-image-found-360x250.png'

  const dispatch = useDispatch()
 
  useEffect(() => {
    //first get
    loadPokemons(urlDefault);
  }, []);

  const loadPokemons =  (url) => {
    fetch(url)
     .then((response) => response.json())
     .then((data) => {
       data.pokemon.map( y => {
       let index = y.pokemon.url.split('/');
       fetch(`https://pokeapi.co/api/v2/pokemon/${index[6]}`)
        .then((response) => response.json())
        .then( (data) => {
          setPokemon((pokemon) => [
            ...pokemon,
            {
              id: index[6],
              img: data.sprites.front_default,
              data,
              price: 10
            },
          ]);
        });
       })
     });
 };

 const addPokemon =  (data) => {
  setTotal((total) => [...total, data.price])
  const totalPrice = total.reduce((a, b) => a + b, 0)
  addTotal(totalPrice)
  dispatch({type:'ADD_POKEMON', data: data})
 }

 const addTotal = (price) => {
   dispatch({type:'ADD_TOTAL', total:price })
 }


  return (
    <div className="List">
       {pokemon.map(x => 
       <div style={{width:'20%', border: '#c3c3c3 1px solid', margin: '20px', padding:'10px 10px 40px 10px'}} className="pokemonList" key={x.id}>
          <p>{x.data.name.toUpperCase()}</p>
          {x.img ? <img src={ x.img} /> : <img style={{ width:'50%'}} src={imageNotFound} />}
          <p>R${x.price}</p>
          <button onClick={() => addPokemon({name:x.data.name, img: x.img ? x.img : imageNotFound, price: x.price, id: x.id})}>add</button>
       </div>
       )}
    </div>
  );
}

export default ListPokemon;