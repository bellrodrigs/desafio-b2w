import {FirstLetterUpperCase} from '../helpers'

describe('helpers unit test', () => {
  
    it('Should return a first letter of string in uppercase', () => {
        const string = FirstLetterUpperCase('pokemon')
        expect(string).toEqual('Pokemon')
    });
  });