function createPokemon(pokemon){
     return `<pokemon-card id="${pokemon.id}" name="${pokemon.name}" types="${pokemon.types.join(',')}" image="${pokemon.image}"></pokemon-card>`;
}
function renderPokemonList(pokemons){
     const pokemonsList = document.querySelector('.pokemons-list');
     pokemons.forEach((pokemon) => {
          const pokemonCard = createPokemon(pokemon);
          pokemonsList.innerHTML += pokemonCard;
     });
}