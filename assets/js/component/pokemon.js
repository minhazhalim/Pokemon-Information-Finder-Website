class PokemonCard extends HTMLElement {
     constructor(){
          super();
          const shadowRoot = this.attachShadow({mode: 'open'});
          this.name = this.getAttribute('name');
          this.id = this.getAttribute('id');
          this.image = this.getAttribute('image');
          if(this.getAttribute('types').includes(',') != -1){
               this.types = this.getAttribute('types').split(',');
          }else {
               this.types = [this.getAttribute('types')];
          }
          shadowRoot.appendChild(this.styleSheet());
          shadowRoot.appendChild(this.build());
     }
     __createPokemonCard(){
          const li = document.createElement('li');
          li.classList.add('pokemon');
          li.classList.add(`type-${this.types[0]}`);
          li.addEventListener('click',() => {
               pokemonDialog.show(pokemonsList.searchPokemonByID(parseInt(this.id)));
          });
          return li;
     }
     __createPokemonImage(){
          const div = document.createElement('div');
          div.classList.add(('pokemon-image'));
          const img = document.createElement('img');
          img.src = this.image;
          img.alt = this.name;
          div.appendChild(img);
          return div;
     }
     __createPokemonInformation(){
          const div = document.createElement('div');
          div.classList.add('pokemon-info');
          const p1 = document.createElement('p');
          p1.classList.add('pokemon-name');
          p1.textContent = this.name;
          const p2 = document.createElement('p');
          p2.classList.add('pokemon-id');
          p2.textContent = `# ${this.id}`;
          div.appendChild(p1);
          div.appendChild(p2);
          return div;
     }
     __createPokemonTypes(){
          const div = document.createElement('div');
          div.classList.add('pokemon-types');
          this.types.forEach((type) => {
               const span = document.createElement('span');
               span.classList.add('pill');
               span.classList.add(type);
               span.textContent = type;
               div.appendChild(span);
          });
          return div;
     }
     styleSheet(){
          const link = document.createElement('link');
          link.setAttribute('rel','stylesheet');
          link.setAttribute('href','./assets/css/pokemon-card.css');
          return link;
     }
     build(){
          const pokemonCard = this.__createPokemonCard();
          const div = document.createElement('div');
          div.classList.add('pokemon-container');
          const pokemonImage = this.__createPokemonImage();
          const pokemonInformation = this.__createPokemonInformation();
          const pokemonTypes = this.__createPokemonTypes();
          div.appendChild(pokemonImage);
          div.appendChild(pokemonInformation);
          div.appendChild(pokemonTypes);
          pokemonCard.appendChild(div);
          return pokemonCard;
     }
}
customElements.define('pokemon-card',PokemonCard);
