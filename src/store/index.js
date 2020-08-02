import {createStore} from 'redux'

const INITIAL_STATE = {
  pokemons:[],
  type:''
  };

  //  const teste = (p) => {
  //      localStorage.setItem('cartStorage', JSON.stringify(p))
  //      console.log(JSON.parse(localStorage.getItem('cartStorage')))
  //  }

function pokemons(state = INITIAL_STATE, action){
  console.log('pokeredux ', state.type)
   switch(action.type){
    case 'ADD_POKEMON':
      return { ...state, pokemons:[ ...state.pokemons, action.data]}
      case 'ADD_TYPE_POKEMON':
        return { ...state, typePokemon: action.typePokemon}  
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