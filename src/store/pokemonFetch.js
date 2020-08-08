export const loadPokemons =  (state, dispatch) => {
    return  (url, type) => {
        return fetch(url+type)
        .then((response) => response.json())
        .then((data) => {
          return Promise.all(data.pokemon.map( y => {
          fetch(y.pokemon.url)
           .then((response) => response.json())
           .then( (data) => {
               dispatch({type:'ADD_POKEMON', data: {
                        index: data.id,
                        img: data.sprites?.front_default,
                        data,
                        price: Math.floor(Math.random() * 90 + 10)
                }})
           });
         })
         )
       });
    }
  };

