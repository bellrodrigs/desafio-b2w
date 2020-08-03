import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector } from 'react-redux'
import {Container, Row, Col, Card, FormControl, InputGroup, Button} from 'react-bootstrap'
import {FirstLetterUpperCase} from '../helpers'


function ListPokemon() {

  //states
  const [pokemon, setPokemon] = useState([]);
  const [type, setType] = useState({name:'fire'})
  const typeRedux = useSelector(state => state.pokemons.typePokemon)

  const urlDefault = `https://pokeapi.co/api/v2/type/${type.name}`;
  const imageNotFound = 'https://betadesign.com.br/site/wp-content/themes/bds/images/no-image-found-360x250.png'

  const dispatch = useDispatch()

const tipos = [{name:'fogo', type: 'fire', color: "warning"}, {name:'água', type: 'water', color:'info'}]

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
  dispatch({type:'ADD_POKEMON_CART', data: data})
 }

 const getType = async (typeName) => {
 await setPokemon([])
  setType(typeName.name)
  loadPokemons(`https://pokeapi.co/api/v2/type/${typeName.type}`)
  dispatch({type: 'ADD_TYPE_POKEMON', typePokemon: typeName.type})
 }

 const findPokemon = (ev) => {

  let poke = pokemon.map(x => {
    return { index: x.index, img: x.img, data: x.data , price: x.price}
  })
  if(ev.target.value !== ''){
      let newList = [];
      newList = poke.filter(p => p.data.name.includes(ev.target.value.toLowerCase()))
      setPokemon(newList)
    } else if (ev.target.value === '') {
        setPokemon([])
        loadPokemons(`https://pokeapi.co/api/v2/type/${type.name}`)
      
    }
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
              onChange={findPokemon}
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
         { typeRedux === "fire" ? <Button block onClick={() => addPokemon({name:x.data.name, img: x.img ? x.img : imageNotFound, price: x.price, id: Date.now()})} variant="warning">Adicionar</Button> : <Button block onClick={() => addPokemon({name:x.data.name, img: x.img ? x.img : imageNotFound, price: x.price, id: Date.now()})} variant="info">Adicionar</Button>}
        </Card.Body>
      </Card>
       )}
    </Row>
    </Container>
  );
}

export default ListPokemon;

