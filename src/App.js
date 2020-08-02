import React, { useState } from 'react';
import './App.css';
import ListPokemon from  './components/ListPokemon'
import Cart from  './components/Cart'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import {useSelector} from 'react-redux'


function App() {
  const pokemon = useSelector(state => state.pokemons)

  return (
    <Container fluid style={{backgroundColor:'#ededed'}}>
      <Row>
       {/* {pokemon.length > 0 ? <Col xs={6} sm={9}><ListPokemon /></Col> : <Col xs={12} sm={12}><ListPokemon /></Col>}
       {pokemon.length > 0 ? <Col xs={6} sm={3} style={{borderLeft: '1px #c3c3c3 solid'}}><Cart  /></Col> : null} */}
       <Col xs={6} sm={9}><ListPokemon /></Col>
       <Col xs={6} sm={3} style={{borderLeft: '1px #c3c3c3 solid'}}><Cart /></Col>
      </Row>
    </Container>
  );
}

export default App;
