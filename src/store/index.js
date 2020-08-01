import {createStore} from 'redux'

const INITIAL_STATE = {
  pokemons:[],
  total: []
  };

   
function pokemons(state = INITIAL_STATE, action){
 
  console.log(state.pokemons)
  switch(action.type){
    case 'ADD_POKEMON':
      return { ...state, pokemons:[ ...state.pokemons, action.data]}
    case 'REMOVE_POKEMON':
      return { pokemons:[ ...state.pokemons.filter(pokemon => pokemon.id !== action.id )]}
    default:
      return state
    
  }
}

const store = createStore(pokemons)

export default store;