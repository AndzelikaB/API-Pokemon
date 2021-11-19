class PokemonCard {
    constructor() {
        this.tabCards = [];
        this.catalog = null;
        this.info = null;
        this.pageSize = 4;
        this.currentPage = 1;
        this.API = 'https://api.pokemontcg.io';
        this.API_VERSION = 'v1';
        this.API_RESOURCE = 'cards';

        this.API_ENDPOINT = `${this.API}/${this.API_VERSION}/${this.API_RESOURCE}`; // 'https://api.pokemontcg.io/v1/cards


        this.UiSelectors = {
            content: '[data-content]',
            card: '[data-card]',
        };
    }

    initializeCatalog() {
        this.catalog = document.querySelector(this.UiSelectors.content);
        this.pullCards();
    }

    //downloading data from the database
    async pullCards() {
        const {cards} = await this.fetchData(`${this.API_ENDPOINT}?page=${this.currentPage}&pageSize=${this.pageSize}`,); //DESTRUKTURYZACJA tablicy cards 
                                            //'https://api.pokemontcg.io/v1/cards?page=2&pageSize=1
        this.tabCards = [...cards]; //przypisanie każdego elementu tablicy do zmiennej tabCards?
        this.showCards(this.tabCards);
        console.log();
    }

    //connecting to the base
    async fetchData(url) {
        const response = await fetch(url);
        const parsedResponse = await response.json();
        return parsedResponse;
    }

    // Showing data to the user
    showCards(tabCards) {
        //działa
        // this.catalog.innerHTML += tabCards.map(function(card){
        //      return `${card.name}`
        // });  //  this.catalog.innerHTML += [tabCards.map((card) => `${card.name}`)];
      
        //to czemu to nie?
        // this.catalog.innerHTML = [tabCards.map(function(card){
        //     console.log(card);
        //      return this.createCard(card)
        // })];


      this.catalog.innerHTML = [tabCards.map((lol) => this.createCard(lol)).join('')]; // join dodaje łancuch znakow 
       
       //this.catalog.innerHTML = [tabCards.map((lol) => {console.log(lol)})]; // join dodaje łancuch znakow 

       //to też nie
       // this.catalog.innerHTML = [tabCards.map(function(lolx){createCard(lolx)})];

    }

   // Create view single card 
    createCard({id, name, number, imageUrl, supertype, subtype, rarity}){
        return `
        <article class="card" data-card id=${id}> 
            <header class="card__header"> 
                <h2 class="card__title"> ${name} </h2>
                <p class="card__number">
                    Nr: ${number}
                </p>
            </header>

            <img class="card__image" src="${imageUrl}" alt="${name}"> </img>
            <div class="card__details">
                <p><span class="bold">Supertype:</span> ${supertype}</p>
                <p ${ subtype ? '' : 'hide'}"> <span class="bold">Subtype:</span> ${subtype}</p>
                <p ${ rarity ? '' : 'hide'}"><span class="bold">Rarity:</span> ${rarity}</p>
            </div>
        </article> 
        `;
    }
}

