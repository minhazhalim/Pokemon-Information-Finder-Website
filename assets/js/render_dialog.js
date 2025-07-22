function transformStatsValueProportionally(value){
     return (value / 100) * 16;
}
function convertHectogramsToKilos(value){
     return value / 10;
}
function convertDecimetersToMetres(value){
     return value / 10;
}
function populateDialog(pokemon){
     const pokemonInformation = document.querySelector('.pokemon-information');
     pokemonInformation.classList.forEach((className) => {
          if(className.startsWith('type-')){
               pokemonInformation.classList.remove(className);
          }
     });
     pokemonInformation.classList.add(`type-${pokemon.types[0]}`);
     pokemonInformation.classList.add(`type-${pokemon.types[0]}-background`);
     const pokemonName = document.getElementById('pokemon-name');
     const pokemonID = document.getElementById('pokemon-id');
     const pokemonImage = document.getElementById('pokemon-image');
     const pokemonHeight = document.getElementById('pokemon-height');
     const pokemonWeight = document.getElementById('pokemon-weight');
     const pokemonCategory = document.getElementById('pokemon-category');
     pokemonName.textContent = pokemon.name;
     pokemonID.textContent = `# ${pokemon.id}`;
     pokemonImage.src = pokemon.image;
     pokemonHeight.textContent = `${convertDecimetersToMetres(pokemon.height)} m`;
     pokemonWeight.textContent = `${convertHectogramsToKilos(pokemon.weight)} kg`;
     pokemonCategory.textContent = pokemon.category;
     const pokemonAbilities = document.getElementById('pokemon-abilities');
     pokemonAbilities.innerHTML = '<span>ability</span>';
     pokemon.abilities.forEach((ability) => {
          const span = document.createElement('span');
          span.textContent = ability;
          pokemonAbilities.appendChild(span);
     });
     const pokemonEvolutionsList = document.getElementById('pokemon-evolutions-list');
     pokemonEvolutionsList.innerHTML = "";
     if(Array.isArray(pokemon.evolutionChain)){
          pokemon.evolutionChain.forEach((evolution) => {
               const pokemonChain = pokeAPI.searchPokemon(evolution);
               pokemonChain.then((response) => response).then((pokemon) => {
                    const li = document.createElement('li');
                    li.setAttribute('style',`order: ${pokemon.id}`);
                    li.classList.add('evolution');
                    li.innerHTML += `<img src="${pokemon.image}" alt="${pokemon.name}"><span> # ${pokemon.id} - ${pokemon.name}</span>`;
                    pokemonEvolutionsList.appendChild(li);
               });
          });
     }
     const pokemonTypes = document.getElementById('pokemon-types');
     pokemonTypes.innerHTML = "";
     pokemon.types.forEach((type) => {
          const li = document.createElement('li');
          li.classList.add(`type-${type}`);
          li.textContent = type;
          pokemonTypes.appendChild(li);
     });
     vitalityValue = parseInt(transformStatsValueProportionally(pokemon.vitality));
     attackValue = parseInt(transformStatsValueProportionally(pokemon.attack));
     defenseValue = parseInt(transformStatsValueProportionally(pokemon.defense));
     speedValue = parseInt(transformStatsValueProportionally(pokemon.speed));
     specialAttackValue = parseInt(transformStatsValueProportionally(pokemon.specialAttack));
     specialDefenseValue = parseInt(transformStatsValueProportionally(pokemon.specialDefense));
     const pokemonVitality = document.getElementById('pokemon-vitality');
     pokemonVitality.innerHTML = '<h4>vitality</h4>';
     for(let i = 0;i < vitalityValue;i++){
          const span = document.createElement('span');
          span.classList.add('filled');
          pokemonVitality.appendChild(span);
     }
     if(pokemonVitality.children.length < 16){
          for(let i = 0;i < 16 - vitalityValue;i++){
               const span = document.createElement('span');
               pokemonVitality.appendChild(span);
          }
     }
     const pokemonAttack = document.getElementById('pokemon-attack');
     pokemonAttack.innerHTML = '<h4>attack</h4>';
     for(let i = 0;i < attackValue;i++){
          const span = document.createElement('span');
          span.classList.add('filled');
          pokemonAttack.appendChild(span);
     }
     if(pokemonAttack.children.length < 16){
          for(let i = 0;i < 16 - attackValue;i++){
               const span = document.createElement('span');
               pokemonAttack.appendChild(span);
          }
     }
     const pokemonDefense = document.getElementById('pokemon-defense');
     pokemonDefense.innerHTML = '<h4>defense</h4>';
     for(let i = 0;i < defenseValue;i++){
          const span = document.createElement('span');
          span.classList.add('filled');
          pokemonDefense.appendChild(span);
     }
     if(pokemonDefense.children.length < 16){
          for(let i = 0;i < 16 - defenseValue;i++){
               const span = document.createElement('span');
               pokemonDefense.appendChild(span);
          }
     }
     const pokemonSpeed = document.getElementById('pokemon-speed');
     pokemonSpeed.innerHTML = '<h4>speed</h4>';
     for(let i = 0;i < speedValue;i++){
          const span = document.createElement('span');
          span.classList.add('filled');
          pokemonSpeed.appendChild(span);
     }
     if(pokemonSpeed.children.length < 16){
          for(let i = 0;i < 16 - speedValue;i++){
               const span = document.createElement('span');
               pokemonSpeed.appendChild(span);
          }
     }
     const pokemonSpecialAttack = document.getElementById('pokemon-special-attack');
     pokemonSpecialAttack.innerHTML = '<h4>special attack</h4>';
     for(let i = 0;i < specialAttackValue;i++){
          const span = document.createElement('span');
          span.classList.add('filled');
          pokemonSpecialAttack.appendChild(span);
     }
     if(pokemonSpecialAttack.children.length < 16){
          for(let i = 0;i < 16 - specialAttackValue;i++){
               const span = document.createElement('span');
               pokemonSpecialAttack.appendChild(span);
          }
     }
     const pokemonSpecialDefense = document.getElementById('pokemon-special-defense');
     pokemonSpecialDefense.innerHTML = '<h4>special defense</h4>';
     for(let i = 0;i < specialDefenseValue;i++){
          const span = document.createElement('span');
          span.classList.add('filled');
          pokemonSpecialDefense.appendChild(span);
     }
     if(pokemonSpecialDefense.children.length < 16){
          for(let i = 0;i < 16 - specialDefenseValue;i++){
               const span = document.createElement('span');
               pokemonSpecialDefense.appendChild(span);
          }
     }
}