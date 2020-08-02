import {createStore} from 'redux'

const INITIAL_STATE = {
  pokemons:[]
  };

   
function pokemons(state = INITIAL_STATE, action){
   switch(action.type){
    case 'ADD_POKEMON':
      return { ...state, pokemons:[ ...state.pokemons, action.data]}
    case 'REMOVE_POKEMON':
      return { pokemons:[ ...state.pokemons.filter(pokemon => pokemon.id !== action.id )]}
    case 'CLEAN_CART_POKEMON':
      return { pokemons:[]}
    default:
      return state
    
  }
}

const store = createStore(pokemons)

export default store;