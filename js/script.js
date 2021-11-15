class PokemonCard {
    constructor() {
        this.tabCards = [];
        this.catalog = null;
        this.info = null;
        // this.search = null;
        // this.button = null;
        // this.loader = null;

        this.API = 'https://api.pokemontcg.io';
        this.API_VERSION = 'v1';
        this.API_RESOURCE = 'cards';

        this.API_ENDPOINT = `${this.API}/${this.API_VERSION}/${this.API_RESOURCE}`; // 'https://api.pokemontcg.io/v1/cards


        this.UiSelectors = {
            // info: '[data-info]',
            //     search = search,
            //     button: '[data-button]',
            //     loader: '[ data-loader]',
            content: '[data-content]',
            card: '[data-card]',
        };
    }

    initializeCatalog() {
        this.catalog = document.querySelector(this.UiSelectors.content);
        // this.info = document.querySelector(this.UiSelectors.info);
        // this.button = document.querySelector(this.UiSelectors.button);
        // this.loader = document.querySelector(this.UiSelectors.loader);
        // this.search = document.getElementById(this.UiSelectors.search);
        this.pullCards();
    }

    //downloading data from the database
    async pullCards() {
        const {
            cards
        } = await this.fetchData(this.API_ENDPOINT); //DESTRUKTURYZACJA tablicy cards 

        this.tabCards = [...cards]; //przypisanie każdego elementu tablicy do zmiennej tabCards?

        this.showCards(this.tabCards);
        console.log(cards);
    }

    //connecting to the base
    async fetchData(url) {
        const response = await fetch(url);
        const parsedResponse = await response.json();
        return parsedResponse;
    }

    // Showing data to the user
    showCards(tabCards) {
        // this.catalog.innerHTML += tabCards.map(function(card){
        //      return `${card.name}`
        // });  //  this.catalog.innerHTML += [tabCards.map((card) => `${card.name}`)];
      
        this.catalog.innerHTML = [tabCards.map((card) => this.createCard(card))];
    }

   // Create view single card 
    createCard({id, name, number, imageUrl, supertype, subtype, rarity}){
        return `
        <article class="card" data-card id=${id}> 
            <header class="card__header"> 
            <h2> ${name} </h2>
            
            <p class="card__number">
                Nr: ${number}
            </p>
            </header>

            <img class="card__image" src="${imageUrl}" alt="${name}"> </img>
            <p class="card__description"><span class="bold">Supertype:</span> ${supertype}</p>
                <p class="card__description ${ subtype ? '' : 'hide'}"> <span class="bold">Subtype:</span> ${subtype}</p>
                <p class="card__description ${ rarity ? '' : 'hide'}"><span class="bold">Rarity:</span> ${rarity}</p>
        </article> 
        `;
    }
}

