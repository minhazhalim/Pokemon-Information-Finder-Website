const MAXIMUM_RECORDS = 1000;
const POKEAPI_LIMIT = 8;
let POKEAPI_OFFSET = 0;
const pokemonsList = {
     pokemons: [],
     addPokemon: function(pokemon){
          this.pokemons.push(pokemon);
     },
     searchPokemonByID: function(id){
          return this.pokemons.find((pokemon) => pokemon.id === id);
     },
     searchPokemonByName: function(pokemonName){
          return this.pokemons.find((pokemon) => pokemon.name === pokemonName);
     },
};
const pokemonDialog = {
     dialog: document.getElementById('pokemon-dialog'),
     dialogOverlay: document.getElementById('dialog-overlay'),
     show: function(pokemon){
          populateDialog(pokemon);
          this.dialog.show();
          this.dialogOverlay.classList.add('active');
     },
     hide: function(){
          this.dialog.close();
          this.dialogOverlay.classList.remove('active');
     },
};
async function loadPokemons(offset,limit){
     pokeAPI.getPokemons(offset,limit).then((pokemons) => {
          renderPokemonList(pokemons);
     });
}
async function doPokeAPIRequest(){
     POKEAPI_OFFSET += POKEAPI_LIMIT;
     const quantityNextRequest = POKEAPI_OFFSET + POKEAPI_LIMIT;
     if(quantityNextRequest >= MAXIMUM_RECORDS){
          const newLimit = MAXIMUM_RECORDS - POKEAPI_OFFSET;
          await loadPokemons(POKEAPI_OFFSET,newLimit);
     }else {
          await loadPokemons(POKEAPI_OFFSET,POKEAPI_LIMIT);
     }
}
function searchPokemon(){
     const searchInput = document.getElementById('search-pokemon');
     const searchValue = searchInput.value.trim().toLowerCase();
     const searchError = document.getElementById('search-error');
     const searchResult = pokemonsList.searchPokemonByName(searchValue);
     if(searchResult !== undefined){
          if(searchError.classList.contains('show')){
               searchError.classList.remove('show');
          }
          pokemonDialog.show(searchResult);
          pokemonDialog.show(searchByID);
     }else {
          pokeAPI.searchPokemon(searchValue).then((pokemon) => {
               if(pokemon){
                    if(searchError.classList.contains('show')){
                         searchError.classList.remove('show');
                    }
                    pokemonDialog.show(pokemon);
               }else {
                    if(!searchError.classList.contains('show')){
                         searchError.classList.add('show');
                    }
               }
          });
     }
}
window.addEventListener('load',async () => {
     await loadPokemons();
});
window.addEventListener('scroll',async () => {
     const {scrollTop,scrollHeight,clientHeight} = document.documentElement;
     if(clientHeight + scrollTop >= scrollHeight - 5) doPokeAPIRequest();
});
document.getElementById('search-pokemon').addEventListener('keyup',() => {
     const searchButton = document.getElementById('search-button');
     if(searchButton.disabled){
          searchButton.disabled = false;
     }
});
document.getElementById('search-button').addEventListener('click',() => {
     searchPokemon();
});
document.getElementById('search-pokemon').addEventListener('keypress',(event) => {
     if(event.key === 'Enter') searchPokemon();
});
document.getElementById('dialog-overlay').addEventListener('click',() => {
     pokemonDialog.hide();
});
document.querySelector('.back-button').addEventListener('click',() => {
     pokemonDialog.hide();
});
document.querySelector('.close-button').addEventListener('click',() => {
     pokemonDialog.hide();
});
document.addEventListener('keydown',(event) => {
     if(event.key === 'Escape') pokemonDialog.hide();
});