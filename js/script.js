class PokemonCard {
    constructor() {

        // this.catalog = null;
        // this.info = null;
        // this.search = null;
        // this.button = null;
        // this.loader = null;

        this.API = 'https://api.pokemontcg.io';
        this.API_VERSION = 'v1';
        this.API_RESOURCE = 'cards';

        this.API_ENDPOINT = `${this.API}/${this.API_VERSION}/${this.API_RESOURCE}`; // 'https://api.pokemontcg.io/v1/cards


        // this.UiSelectors = {
        //     info: '[data-info]',
        //     search = search,
        //     button: '[data-button]',
        //     loader: '[ data-loader]',
        //     content: '[data-content]',
        //     // card: '[data-card]',
        // };
    }

    initializeCatalog() {
        // this.catalog = document.querySelector(this.UiSelectors.content);
        // this.info = document.querySelector(this.UiSelectors.info);
        // this.button = document.querySelector(this.UiSelectors.button);
        // this.loader = document.querySelector(this.UiSelectors.loader);
        // this.search = document.getElementById(this.UiSelectors.search);

       

        this.pullCards();
    }

    async pullCards() {
        const {cards} = await this.fetchData(this.API_ENDPOINT);  //DESTRUKTURYZACJA tablicy cards 

        console.log(cards);
    }
    async fetchData(url) {
        const response = await fetch(url);
        const parsedResponse = await response.json();

        return parsedResponse;
    }
}