import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'

import './ListPokemon.css';
function ListPokemon(props) {


  //states
  const [pokemon, setPokemon] = useState([]);
  const [pokemonSearch, setPokemonSearch] = useState([]);

  const [type, setType] = useState('fire')

  const urlDefault = `https://pokeapi.co/api/v2/type/${type}`;
  const imageNotFound = 'https://betadesign.com.br/site/wp-content/themes/bds/images/no-image-found-360x250.png'

  const dispatch = useDispatch()

const tipos = ['fire', 'water']
 const handleSearch = false
  useEffect(() => {
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
              price: Math.floor(Math.random() * 90 + 10)
            },
          ]);
        });
       })
     });
 };

 const addPokemon =  (data) => {
  dispatch({type:'ADD_POKEMON', data: data})
 }

 const getType = async (typeName) => {
  setPokemon([])
  await setType(typeName)
  loadPokemons(`https://pokeapi.co/api/v2/type/${typeName}`)
 }

 const findPokemon = (ev) => {
  let poke = pokemon.filter(item => item.data.name === ev.target.value)
  if(poke.length >= 1){
      setPokemon(poke)
    }else if (ev.target.value == '') {
      if(pokemon.length <= 1){
        setPokemon([])
        loadPokemons(`https://pokeapi.co/api/v2/type/${type}`)
      }
    }
 }

  return (
    <List>
       <div>
         <input onChange={findPokemon} type='text' />
         <h3>{type}</h3>
  {/* {handleSearch == false ? null : <p>{pokemonSearch.data.name}</p>} */}
         {tipos.map(tipo => <button onClick={() => getType(tipo)}>{tipo}</button>)}
      </div>
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