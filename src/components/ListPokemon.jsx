import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux'
import {Container, Row, Col, Card, FormControl, InputGroup, Button} from 'react-bootstrap'
import {FirstLetterUpperCase} from '../helpers'


function ListPokemon() {

  //states
  const [pokemon, setPokemon] = useState([]);
  const [type, setType] = useState({name:'fire'})

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
  dispatch({type:'ADD_POKEMON', data: data})
 }

 const getType = async (typeName) => {
  setPokemon([])
  await setType(typeName)
  loadPokemons(`https://pokeapi.co/api/v2/type/${typeName.type}`)
  dispatch({type: 'ADD_TYPE_POKEMON', typePokemon: typeName.type})
 }

 const findPokemon = (ev) => {
  let poke = pokemon.filter(item => item.data.name === ev.target.value.toLowerCase())
  if(poke.length >= 1){
      setPokemon(poke)
    }else if (ev.target.value == '') {
      if(pokemon.length <= 1){
        setPokemon([])
        loadPokemons(`https://pokeapi.co/api/v2/type/${type.name}`)
      }
    }
 }

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
          {tipos.map(tipo => <Button style={{marginRight: '8px'}} variant={tipo.color} onClick={() => getType({name: 'tipo.name', type:tipo.type})}>{FirstLetterUpperCase(tipo.name)}</Button>)}
         </Col>
      </Row>
      <h5>Pokemon do Tipo: {type.name == 'fire' ? FirstLetterUpperCase('fogo') : FirstLetterUpperCase('água') }</h5>
      <Row>
       {pokemon.map(x => 
        <Card style={{ width: '12rem', margin: '10px 0px 20px 10px', textAlign:'center' }}>
        <Card.Body>
          <Card.Title>{FirstLetterUpperCase(x.data.name)}</Card.Title>
          {x.img ? <Card.Img style={{ width: '8rem'}} variant="top" src={x.img} /> : <Card.Img style={{ width: '8rem'}} variant="top" src={imageNotFound} />}
          <Card.Text>
            R$ {x.price},00
          </Card.Text>
         { type.name == 'fire' ? <Button block onClick={() => addPokemon({name:x.data.name, img: x.img ? x.img : imageNotFound, price: x.price, id: Date.now()})} variant="warning">Adicionar</Button> : <Button block onClick={() => addPokemon({name:x.data.name, img: x.img ? x.img : imageNotFound, price: x.price, id: Date.now()})} variant="info">Adicionar</Button>}
        </Card.Body>
      </Card>
       )}
    </Row>
    </Container>
  );
}

export default ListPokemon;

