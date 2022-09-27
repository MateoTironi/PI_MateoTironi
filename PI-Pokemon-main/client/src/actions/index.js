import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON = 'GET_POKEMON';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';
export const GET_TYPES = 'GET_TYPES';
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const FILTER_POKEMON_TYPE = 'FILTER_POKEMON_TYPE';
export const ACT_FILTER = 'ACT_FILTER';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const CLEAN_STATE = 'CLEAN_STATE';

export function getPokemons(name) {
    if (name) {
        return function (dispatch) {
            axios.get(`http://localhost:3001/pokemons?name=${name}`)
                .then(p => dispatch({ type: GET_POKEMON, payload: p.data }))
                .catch(err => { alert(err) })
        }
    }

    return function (dispatch) {
        axios.get('http://localhost:3001/pokemons')
            .then(el => {
                el.data.results.forEach(e => {
                    if (!e.url){
                        // console.log('DB--',e)
                        let pokemon = {
                            name: e.name,
                            img: e.img,
                            attack: e.attack,
                            createdInDb: e.createdInDb
                        }
                        let type = e.types.map(e => {return e.name});
                        pokemon.type = type;
                        return dispatch({ type: GET_POKEMONS, payload: pokemon })
                    } 
                    axios.get(e.url) 
                        .then(d => {
                            
                            let pokemon = {
                                name: d.data.name,
                                attack: d.data.stats[1].base_stat,
                                img: d.data.sprites.other.home.front_default
                            }
                            pokemon.type = d.data.types.map(e => {

                                return e.type.name
                            })
                            // console.log(pokemon)
                            return pokemon;
                        })
                        .then(r => {
                            // console.log('R: ', r)
                            dispatch({ type: GET_POKEMONS, payload: r })
                        }).catch(err => console.log(err))

                })
                
            }).catch(err => alert(err))
    }
}

export function createPokemon({name, life, attack, defense, speed, height, weight, type, img, createdInDb}) {
    // console.log(name, life, attack, defense, speed, height, weight, type, img, createdInDb)
    return function (dispatch) {
        axios.post('http://localhost:3001/pokemons', {
            name,
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            type,
            img,
            createdInDb,
        })
            .then(r => dispatch({ type: CREATE_POKEMON, payload: r.data }))
    }
}

export function getPokemonById(id) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/pokemons/${id}`)
            .then(r => dispatch({ type: GET_POKEMON_BY_ID, payload: r.data }))
    }
}

export function filterByType(payload) {
    return {
        type: FILTER_POKEMON_TYPE,
        payload
    }
}

export function filterByOrigin(e){
    return{
        type: FILTER_BY_ORIGIN,
        value: e.target.value
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function actFilter(e){
    
    return{
        type: ACT_FILTER,
        value: e.target.value,
        checked: e.target.checked
    }
}

export function getTypes() {
    return function (dispatch) {
        axios.get(`http://localhost:3001/types`)
            .then(r => {
                // console.log(r.data)
                dispatch({ type: GET_TYPES, payload: r.data })
            })
            .catch(err => alert(err))
    }
}

export function cleanState(){
    return{
        type: CLEAN_STATE
    }
}

