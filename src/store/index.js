import {createStore, combineReducers} from 'redux'
import storeSynchronize from 'redux-localstore'

import pokemons from './action'

const combineReducer = combineReducers({
  pokemons
})

const store = createStore(combineReducer)

export default store;

storeSynchronize(store)