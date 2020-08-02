import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Container, Card, Col, Row, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {FirstLetterUpperCase} from '../helpers'


function Cart() {
  const pokemon = useSelector(state => state.pokemons)
  const typeName = useSelector(state => state.type)
  let length = useSelector(state => state.pokemons.length)
  const dispatch = useDispatch()
  let totalPrice = 0

  useEffect(() => {
    //first get    
  }, []);

  
  const calcTotal = () => {
    let total = pokemon.map(x => x.price)
    return totalPrice = total.reduce((a,b) => a + b, 0)
  }
  
  const removePokemon = (id) => {
    dispatch({type: 'REMOVE_POKEMON', id: id})
  }

  const finishPurchase = () =>{
    alert('Sua compra foi finalizada com sucesso!')
    dispatch({type: 'CLEAN_CART_POKEMON'})
  }

  return (
    <>
    <Container fluid>
      <h2>Carrinho</h2>
    {pokemon.map(x => 
      <Card style={{marginTop:'10px', height:'90px'}}>
        <Card.Body>
          <Row>
            <Col >
              <Card.Img variant="top" style={{ width: '5rem', marginTop:'-20px'}} src={x.img} />
            </Col>
            <Col sm={4}>
            <Card.Title>{FirstLetterUpperCase(x.name)}</Card.Title>
            </Col>
            <Col>
              <Card.Text>Preço: R${x.price},00</Card.Text>
            </Col>
            <Col style={{textAlign:'right'}} sm={2}>
              <FontAwesomeIcon style={{color: 'red', cursor:'pointer'}} onClick={() => removePokemon(x.id)}  icon={faTrash} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )}
     <h2>Total: {calcTotal()}</h2>
      {length >=1 ? <Button variant="success" block onClick={() => finishPurchase()}>Finalizar compra</Button> : null}
    </Container>
      </>
  );
}

export default Cart;