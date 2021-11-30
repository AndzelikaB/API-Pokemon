class PokemonCard {
    constructor() {
        this.pageSize = 4;
        this.currentPage = 1;
        this.tabCards = [];
        this.newCards= [];
        
        this.info = null;

        this.catalog = null;
        this.button = null;
        this.loader = null;
        this.search = null;

        this.API = 'https://api.pokemontcg.io';
        this.API_VERSION = 'v1';
        this.API_RESOURCE = 'cards';
        this.API_ENDPOINT = `${this.API}/${this.API_VERSION}/${this.API_RESOURCE}`; // 'https://api.pokemontcg.io/v1/cards


        this.UiSelectors = {
            content: '[data-content]',
            card: '[data-card]',
            button: '[data-button]',
            loader:'[data-loader]',
            search: 'search',
            card: '[data-card]',
        };
    }

    initializeCatalog() {
        this.catalog = document.querySelector(this.UiSelectors.content);
        this.button = document.querySelector(this.UiSelectors.button);
        this.loader = document.querySelector(this.UiSelectors.loader);
        this.search = document.getElementById(this.UiSelectors.search);
        this.moreCardsBtn();
        this.pullCards();
    }

    // Add new Cards after click Load button
    moreCardsBtn(){
        this.button.addEventListener('click', () => this.pullCards());
        this.search.addEventListener('keyup', () => this.filterCards());
    }
    
    //downloading data from the database
    async pullCards() {
        this.toggleShowElement(this.loader, this.button);
        const {cards} = await this.fetchData(`${this.API_ENDPOINT}?page=${this.currentPage}&pageSize=${this.pageSize}`,); //DESTRUKTURYZACJA tablicy cards 
                                            //'https://api.pokemontcg.io/v1/cards?page=2&pageSize=1

       // this.tabCards = [...this.tabCards, ...cards]; //tabCards - nasze obecne karty - do tablicy dokłądamy po prostu cards xddd
      //  this.newCards = [...cards]; //przypisanie każdego elementu tablicy do zmiennej newCards?
      this.toggleShowElement(this.loader, this.button);

        
        this.tabCards = [...this.tabCards, ...cards];
        this.newCards = [...cards];
        this.showCards(this.newCards);
        console.log();
        console.log(this.tabCards);

        this.currentPage++;
    }

    // If set to false, then token will only be removed, but not added. If set to true, then token will only be added, but not removed.
    toggleShowElement(...elements){
        elements.forEach(element => element.classList.toggle('hide'));
    }

    //connecting to the base
    async fetchData(url) {
        const response = await fetch(url);
        const parsedResponse = await response.json();
        return parsedResponse;
    }

    // Showing data to the user
    showCards(tabCards) {
      this.catalog.insertAdjacentHTML('beforeend', [
          tabCards.map((card) => this.createCard(card)).join('')
        ]); // join dodaje łancuch znakow 
    }

    //insertAdjacentHTML - służy do wstawiania kawałka HTML na wybranej pozycji.
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

    //after typing word in field search cards
    filterCards(){
        const searchQuery = this.search.value.toLowerCase();
        document.querySelectorAll(this.UiSelectors.card).forEach((el) => el.classList.remove('hide'));


        //The filter() method creates a new array with all elements that pass the test implemented by the provided function.
        const filteredCards = this.tabCards.filter(({name}) => !name.toLowerCase().includes(searchQuery),);
    
        filteredCards.forEach(({id}) => document.getElementById(id).classList.add('hide'),);
    }
}

