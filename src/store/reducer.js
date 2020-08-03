import {defineState} from 'redux-localstore'

const defaultState = {
    pokemons:[],
    pokemonCart:[],
    type:''
    };

    const INITIAL_STATE = defineState(defaultState)('pokemons')
     
    export default function pokemons(state = INITIAL_STATE, action){
     switch(action.type){
      case 'ADD_POKEMON':
        return { ...state, pokemons:[ ...state.pokemons, action.data]}
        case 'ADD_POKEMON_CART':
          return { ...state, pokemonCart:[ ...state.pokemonCart, action.data]}
      case 'ADD_TYPE_POKEMON':
          return { ...state, typePokemon: action.typePokemon}  
      case 'REMOVE_POKEMON_CART':
        return { ...state, pokemonCart:[ ...state.pokemonCart.filter(pokemon => pokemon.id !== action.id )]}
      case 'CLEAN_CART_POKEMON':
        return { ...state, pokemonCart:[]}
      default:
        return state
      
    }
  }
