const axios = require('axios');
const { Pokemon, Type } = require('../db')


const getTypes = async () => {

    const result = await axios.get('https://pokeapi.co/api/v2/type')

    const promises = result.data.results.map(async (e) => {

        const t = await Type.findOrCreate({ where: { name: e.name } })
        //    console.log('---',t[0].dataValues.name)
        return t[0].dataValues.name;
    });
    
    const types = Promise.all(promises);

    return types;
}


module.exports = {
    getTypes,
}


