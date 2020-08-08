import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector } from 'react-redux'
import {Container, Row, Col, Card, FormControl, InputGroup, Button} from 'react-bootstrap'
import {FirstLetterUpperCase} from '../helpers'
import { loadPokemons } from '../store/pokemonFetch'


function ListPokemon() {

  //states
  const pokemon = useSelector(state => state.pokemons.pokemons)
  // const [pokemon, setPokemon] = useState([]);
  // setPokemon(pokeRedux)
  const typeRedux = useSelector(state => state.pokemons.typePokemon)
  const [type, setType] = useState(typeRedux !== '' ? typeRedux : {name:'fire'})

  const urlDefault = `https://pokeapi.co/api/v2/type/`;
  const imageNotFound = 'https://betadesign.com.br/site/wp-content/themes/bds/images/no-image-found-360x250.png'

  const dispatch = useDispatch()

const tipos = [{name:'fogo', type: 'fire', color: "warning"}, {name:'água', type: 'water', color:'info'}]

  useEffect(() => {
    //new function on store
    loadPokemons(pokemon, dispatch)(urlDefault, type.name)
  }, []); 

  const addPokemon =  (data) => {
  dispatch({type:'ADD_POKEMON_CART', data: data})
 }

//  const findPokemon = (ev) => {
//   let poke = pokemon.map(x => {
//     return { index: x.index, img: x.img, data: x.data , price: x.price}
//   })
//   if(ev.target.value !== ''){
//       let newList = [];
//       newList = poke.filter(p => p.data.name.includes(ev.target.value.toLowerCase()))
//       pokemon = newList
//     } else if (ev.target.value === '') {
//       pokemon = useSelector(state => state.pokemons.pokemons)
//     }
//  }

 const getType = (typeName) => {
  dispatch({type: 'CLEAN_POKEMON'})
  setType(typeName.name)
  loadPokemons(pokemon, dispatch)(urlDefault, typeName.type)
  dispatch({type: 'ADD_TYPE_POKEMON', typePokemon: typeName.type})
 }

 const fireLength = typeRedux == 'fire' || type.name =='fire' ? pokemon.length : 0
 const waterLength = typeRedux == 'water' ? pokemon.length : 0

  return (
    <Container fluid>
       <Row style={{marginTop:'20px'}}>
         <Col sm={10}>
          <InputGroup  className="mb-3">
            <FormControl
              placeholder="Buscar"
              aria-label="Buscar"
              aria-describedby="basic-addon1"
              // onChange={findPokemon}
            />
          </InputGroup>
         </Col>
         <Col sm={2}>
          {tipos.map(tipo => <Button disabled={(fireLength < 75 && waterLength == 0) || (waterLength < 137 && fireLength == 0) } style={{marginRight: '8px'}} variant={tipo.color} onClick={() => getType({name: tipo.name, type:tipo.type})}>{FirstLetterUpperCase(tipo.name)}</Button>)}
         </Col>
      </Row>
      <h5>Pokemon do Tipo: {typeRedux == 'fire' ? FirstLetterUpperCase('fogo') : FirstLetterUpperCase('água') }</h5>
      <Row>
       {pokemon.map(x => 
        <Card style={{ width: '13rem', margin: '10px 0px 20px 25px', textAlign:'center', boxShadow: '0px 0px 10px -5px rgba(0,0,0,0.75)' }}>
        <Card.Body>
          <Card.Title>{FirstLetterUpperCase(x.data.name)}</Card.Title>
          {x.img ? <Card.Img style={{ width: '8rem'}} variant="top" src={x.img} /> : <Card.Img style={{ width: '8rem'}} variant="top" src={imageNotFound} />}
          <Card.Text>
            R$ {x.price},00
          </Card.Text>
         { (typeRedux === "fire") || (type.name === "fire") ? <Button block onClick={() => addPokemon({name:x.data.name, img: x.img ? x.img : imageNotFound, price: x.price, id: Date.now()})} variant="warning">Adicionar</Button> : <Button block onClick={() => addPokemon({name:x.data.name, img: x.img ? x.img : imageNotFound, price: x.price, id: Date.now()})} variant="info">Adicionar</Button>}
        </Card.Body>
      </Card>
       )}
    </Row>
    </Container>
  );
}

export default ListPokemon;

