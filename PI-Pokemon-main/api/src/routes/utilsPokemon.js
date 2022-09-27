const axios = require('axios');
const { Pokemon, Type } = require('../db')
//--------------------------TODOS LOS POKEMONS----------------------
const getApiPokemons = async () => {
    const pokemonsApi = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=60`)
    // console.log(pokemonsApi.data)

    // const result = pokemonsApi.data.results.map(e => {
    //     return e;
    //     //cambie return e.name 
    // })
    // console.log('-----',pokemonsApi.data)
    return pokemonsApi.data;
}

const getDbPokemons = async () => {

    const list = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name']
        }
    })
    // console.log('------',list[0])
    return list;
}

const allList = async () => {
    const api = await getApiPokemons();
    const db = await getDbPokemons();
    api.results= api.results.concat(db)
    // console.log('API---',api)
    
    return api
}
//-------------------------POKEMON BY ID O NAME-------------------
const getPokemonApi = async (id) => {

    const r = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

    let pokemon = {
        id: r.data.id,
        name: r.data.name,
        height: r.data.height,
        weight: r.data.weight,
        img: r.data.sprites.other.home.front_default
    }

    r.data.stats.forEach(e => {

        if (e.stat.name === 'hp') pokemon.life = e.base_stat

        if (e.stat.name === 'attack') pokemon.attack = e.base_stat

        if (e.stat.name === 'defense') pokemon.defense = e.base_stat

        if (e.stat.name === 'speed') pokemon.speed = e.base_stat
    });

    pokemon.types = r.data.types.map(e => {
        return e.type.name
    })

    return pokemon;

}

const pokemonByIdDb = async (id) => {
    const result = await Pokemon.findByPk(id)

    if (!result) throw new Error('Not found Pokemon in Db');

    return result;
}

const pokemonByNameDb = async (name) => {
    const result = await Pokemon.findOne({
        where: { name },
        include: {
            model: Type,
            attributes: ['name']
        }
    })

    if (!result) throw new Error('Not found Pokemon in Db');

    return result;
}

const pokemonById = async (id) => {

    const api = await getPokemonApi(id);
    // console.log('s')

    if (api) return api

    const db = await pokemonByIdDb(id);

    // console.log('API: ', api)
    // console.log('DB: ', db)

    return db;
}

const pokemonByName = async (name) => {

    try {
        const api = await getPokemonApi(name);

        if (api) return api

    } catch (e) {
        const db = await pokemonByNameDb(name);

        if (db) return db
    }

    return 'Personaje no encontrado';
}

//-----------------------FILTROS--------------------------------

const pokemonFilterApi = async (type) => {
    // const pokemonsApi = await axios.get(`https://pokeapi.co/api/v2/pokemon`)
    const pokemonsApi = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=250`)

    const filter = pokemonsApi.data.results.map(async (e) => {
        const result = await getPokemonApi(e.name);
        // console.log('RESULT---',result.types);
        
        if (result.types.includes(type)) return result    
    });
    
    const promiseResolv = await Promise.all(filter);
    let pokemons = promiseResolv.filter(e => e !== undefined)
    
    return pokemons;
}

const pokemonFilterDb = async (type) => {
    const pokemonsDb = await Pokemon.findAll({ include: Type })

    const result = pokemonsDb.map(e => {

        const t = [e.dataValues.types[0].dataValues.name];
        if (t.includes(type)) return e.dataValues;
    })
    
    let pokemons = result.filter(e => e !== undefined)
    return pokemons;
}

const pokemonFilter = async (type) => {
    const api = await pokemonFilterApi(type);
    const db = await pokemonFilterDb(type);
    
    return api.concat(db);
}


module.exports = {
    allList,
    pokemonById,
    pokemonByName,
    pokemonFilter,
}