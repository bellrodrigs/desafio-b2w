import React, { useState, useEffect } from 'react';
import ListPokemon from  './components/ListPokemon'
import Cart from  './components/Cart'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import {useSelector} from 'react-redux'


function App() {
  const pokemon = useSelector(state => state.pokemons.pokemons)
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    detectMob()
  }, []);

  
  function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        if(navigator.userAgent.match(toMatchItem)){
          return setMobile(true)
        }
    });
}

  return (
    <Container fluid style={{backgroundColor:'#ededed'}}>
      { mobile === true ?
      <Row>
        {pokemon.length > 0 ? <Col xs={12} sm={3} style={{borderBottom: '1px #c3c3c3 solid'}}><Cart  /></Col> : null}
        {pokemon.length > 0 ? <Col xs={12} sm={9}><ListPokemon /></Col> : <Col xs={12} sm={12}><ListPokemon /></Col>}
      </Row>
      :
      <Row>
        {pokemon.length > 0 ? <Col xs={12} sm={9}><ListPokemon /></Col> : <Col xs={12} sm={12}><ListPokemon /></Col>}
        {pokemon.length > 0 ? <Col xs={12} sm={3} style={{borderLeft: '1px #c3c3c3 solid'}}><Cart  /></Col> : null}
      </Row>
    }
    </Container>
  );
}

export default App;
