import { loadPokemons } from '../store/pokemonFetch'
import {useDispatch } from 'react-redux'


describe('Fetch pokemon unit test', () => {
    const dispatch = () => {}
    const state = {}
  
    it('Should return a list of pokemon baseado on url and type ', done  => {

        const mockSuccessResponse = {pokemon:[{pokemon:{url:'teste'}}]}
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
        const mockFetchPromise = Promise.resolve({ 
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 

        loadPokemons(state, dispatch)(`https://pokeapi.co/api/v2/type/`, 'fire').then(() => {
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type/fire');
            done();
        });
                                
       
    });
  });