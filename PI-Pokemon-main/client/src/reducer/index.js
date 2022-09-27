import { ACT_FILTER, CLEAN_STATE, CREATE_POKEMON, FILTER_BY_ORIGIN, FILTER_POKEMON_TYPE, GET_POKEMON, GET_POKEMONS, GET_POKEMON_BY_ID, GET_TYPES, ORDER_BY_NAME } from "../actions";

const initialState = {
    pokemons: [],
    types: [],
    allPokemons: [],
    details: {},
    filter: {}
};

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload],
                allPokemons: [...state.pokemons, action.payload]
            }

        case GET_POKEMON:
            return {
                ...state,
                details: action.payload
            }

        case CREATE_POKEMON:
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload]
            }

        case GET_TYPES:
            return {
                ...state,
                types: [...state.types, action.payload]
            }

        case ACT_FILTER:
            return {
                ...state,
                filter: { ...state.filter, [action.value]: action.checked }
            }

        case FILTER_POKEMON_TYPE:
            let pokemonsFilter = state.allPokemons
            for (const e in state.filter) {
                if (state.filter[e]) {
                    pokemonsFilter = pokemonsFilter.filter(el => el.type.includes(e))

                }
            }
            if(!pokemonsFilter) return

            return {
                ...state,
                pokemons: pokemonsFilter
            }

        case FILTER_BY_ORIGIN:
            let pokemonOrigin = state.allPokemons;
            if (action.value === 'createdInDb') {
                pokemonOrigin = pokemonOrigin.filter(el => el.createdInDb)
            } else if (action.value === 'originals') {
                pokemonOrigin = pokemonOrigin.filter(el => !el.createdInDb)
            } else pokemonOrigin = state.allPokemons
            return {
                ...state,
                pokemons: pokemonOrigin
            }

        case ORDER_BY_NAME:
            let sortArr = state.allPokemons
            if (action.payload === 'ascending' || action.payload === 'decendent') {
                console.log('entre 1')
                sortArr = state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0
                })
                if (action.payload === 'decendent') sortArr.reverse()
            } else if (action.payload === 'attack') {
                console.log('entre 1')
                sortArr = state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) return 1;
                    if (a.attack < b.attack) return -1;
                    return 0
                })
            } 
            console.log(sortArr)
            return {
                ...state,
                pokemons: sortArr
            }

        case GET_POKEMON_BY_ID:
            return {
                ...state,
                details: action.payload
            }

        case CLEAN_STATE:
            return{
                ...state,
                pokemons: [],
                details: []
            }

        default:
            return state;
    }

}