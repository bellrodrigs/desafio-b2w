import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'

import './ListPokemon.css';
function ListPokemon() {

 

  //states
  const [pokemon, setPokemon] = useState([]);
  const [type, setType] = useState('fire')

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
              index: index[6],
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
  dispatch({type:'ADD_POKEMON', data: data})
 }


  return (
    <List>
       {pokemon.map(x => 
       <CardPokemon style={{width:'20%', border: '#c3c3c3 1px solid', margin: '20px', padding:'10px 10px 40px 10px'}} className="pokemonList" key={x.index}>
          <p>{x.data.name.toUpperCase()}</p>
          {x.img ? <img src={ x.img} /> : <img style={{ width:'50%'}} src={imageNotFound} />}
          <p>R${x.price}</p>
          <button onClick={() => addPokemon({name:x.data.name, img: x.img ? x.img : imageNotFound, price: x.price, id: Date.now()})}>add</button>
       </CardPokemon>
       )}
    </List>
  );
}

export default ListPokemon;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CardPokemon = styled.div`
  width:15%;
  border: #c3c3c3 1px solid;
  margin: 20px; 
  padding: 10px 10px 40px 10px
`;

const ButtonAdd = styled.button`

`;