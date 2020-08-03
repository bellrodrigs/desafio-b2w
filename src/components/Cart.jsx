import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Container, Card, Col, Row, Button, Modal, Image} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {FirstLetterUpperCase} from '../helpers'
import Ash from '../assets/images/ash.png'


function Cart() {
  const dispatch = useDispatch()
  const pokemon = useSelector(state => state.pokemons.pokemonCart)
  let length = pokemon.length
  let totalPrice = 0
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  
  const calcTotal = () => {
    let total = pokemon.map(x => x.price)
    return totalPrice = total.reduce((a,b) => a + b, 0)
  }
  
  const removePokemon = (id) => {
    dispatch({type: 'REMOVE_POKEMON_CART', id: id})
  }

  const finishPurchase = () =>{
    dispatch({type: 'CLEAN_CART_POKEMON'})
    setShow(!show)
    localStorage.removeItem('reduxStore')
  }

  return (
    <>
    <Container style={{paddingTop:'15px'}} fluid>
      <Row>
        <Col xs={8}>
          <h4>Carrinho</h4>
        </Col>
        <Col sm={3} xs={4}>
          <h5><FontAwesomeIcon icon={faShoppingCart} /><span style={{marginLeft:'2px', border: '1px solid black', borderRadius:'3px', padding:'0px 8px 0px 8px', fontSize:'14px'}}>{length}</span></h5>
        </Col>
      </Row>
    {pokemon.map(x => 
      <Card style={{marginTop:'10px', widht:'120%'}} >
        <Card.Body>
          <Row>
            <Col className = "my-auto" xs={4}  sm={3}>
              <Card.Img variant="top" style={{ width: '5rem', }} src={x.img} />
            </Col>
            <Col  className = "my-auto" xs={8}   sm={4}>
            <Card.Title style={{fontSize:'16px'}}>{FirstLetterUpperCase(x.name)}</Card.Title>
            </Col>
            <Col className = "my-auto" xs={10}  sm={3}>
              <Card.Text  style={{fontSize:'16px'}}>Preço: R${x.price},00</Card.Text>
            </Col>
            <Col className = "my-auto" xs={2}  sm={2}>
              <FontAwesomeIcon style={{color: 'red', cursor:'pointer'}} onClick={() => removePokemon(x.id)}  icon={faTrash} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )}
     <p style={{textAlign:'right', marginTop:'10px', fontWeight:'bold'}}><span>Total:</span> <span style={{fontSize:'18px', }}>R$ {calcTotal()},00</span></p>
      <Button style={{marginBottom:'20px'}} variant="success" block onClick={() => handleShow()}>Finalizar compra </Button>
        <Modal centered show={show} onHide={finishPurchase}>
          <Modal.Header closeButton>
            <Modal.Body style={{textAlign:'center'}}>
              <span style={{fontSize:'1.2em', fontWeight:'bold', color:'#28a745'}}>Sua compra foi finalizada com sucesso!</span>
              <p>Dejamos boa sorte na sua jornada para se tornar um mestre Pokemon</p>
              <Image style={{width: '25%'}} src={Ash}  />
            </Modal.Body>
          </Modal.Header>
        </Modal>
    </Container>
      </>
  );
}

export default Cart;

