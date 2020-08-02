import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'
import {Container, Row, Col, Card, FormControl, InputGroup, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {FirstLetterUpperCase} from '../helpers'


import './ListPokemon.css';
function ListPokemon(props) {


  //states
  const [pokemon, setPokemon] = useState([]);
  const pookemonLength = useSelector(state => state.pokemons.length)

  const [type, setType] = useState('fire')
  const [color, setColor] = useState([])

  const urlDefault = `https://pokeapi.co/api/v2/type/${type}`;
  const imageNotFound = 'https://betadesign.com.br/site/wp-content/themes/bds/images/no-image-found-360x250.png'

  const dispatch = useDispatch()

const tipos = [{t: 'fire', color: "warning"},{t: 'water', color:'info'}]

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
  dispatch({type: 'ADD_TYPE_POKEMON', typePokemon: typeName})
 }

 const findPokemon = (ev) => {
  let poke = pokemon.filter(item => item.data.name === ev.target.value.toLowerCase())
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
    <Container fluid>
       <Row style={{marginTop:'20px'}}>
         <Col sm={10}>
          <InputGroup  className="mb-3">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
              onChange={findPokemon}
            />
          </InputGroup>
         </Col>
         <Col sm={2}>
          {tipos.map(tipo => <Button style={{marginRight: '8px'}} variant={tipo.color} onClick={() => getType(tipo.t)}>{FirstLetterUpperCase(tipo.t)}</Button>)}
          <FontAwesomeIcon icon={faShoppingCart} />{pookemonLength}
         </Col>
      </Row>
      <h4>Pokemon Type: {FirstLetterUpperCase(type)}</h4>
      <Row>
       {pokemon.map(x => 
        <Card style={{ width: '12rem', margin: '10px 0px 20px 10px', textAlign:'center' }}>
        <Card.Body>
          <Card.Title>{FirstLetterUpperCase(x.data.name)}</Card.Title>
          {x.img ? <Card.Img style={{ width: '8rem'}} variant="top" src={x.img} /> : <Card.Img style={{ width: '8rem'}} variant="top" src={imageNotFound} />}
          <Card.Text>
            R$ {x.price},00
          </Card.Text>
         { type == 'fire' ? <Button block onClick={() => addPokemon({name:x.data.name, img: x.img ? x.img : imageNotFound, price: x.price, id: Date.now()})} variant="warning">Add to Cart</Button> : <Button block onClick={() => addPokemon({name:x.data.name, img: x.img ? x.img : imageNotFound, price: x.price, id: Date.now()})} variant="info">Add to Cart</Button>}
        </Card.Body>
      </Card>
       )}
    </Row>
    </Container>
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