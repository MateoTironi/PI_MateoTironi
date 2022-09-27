const { Router } = require('express');
const { allList, pokemonById, pokemonByName, pokemonFilter } = require('./utilsPokemon');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Pokemon, Type } = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async (req, res) => {

    let { name } = req.query;
    if (name) {

        try {
            const result = await pokemonByName(name);
            return res.status(200).json(result)
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    }

    try {
        const result = await allList()
        // console.log(result)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(400).json({ error: err })
    }
});

router.post('/pokemons', async (req, res) => {
    let { name, life, attack, defense, speed, height, weight, type, img, createdInDb } = req.body;
    // console.log(name, life, attack, defense, speed, height, weight, type, img, createdInDb)
    try {
        if (typeof type === 'string') {
            type = type.split(',')  
        }
        const repeated = await Pokemon.findOne({where:{name: name}})
        if(repeated) return
         
        const newPokemon = await Pokemon.create({
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
        });

        for (let i = 0; i < type.length; i++) {
            
            const typeDb = await Type.findAll({ where: { 
                name: type[i].trim() 
            } })
            newPokemon.addType(typeDb)
        }
        // console.log(newPokemon)
        res.status(200).json(newPokemon)
    } catch (err) {
        res.status(400).json({ err })
    }
});

router.get('/pokemons/filter', async (req, res) => {
    let { type } = req.query
    if (!type) return 'Debes mandar una query con type'

    try {
        const result = await pokemonFilter(type);
        
        return res.status(200).json(result)
    } catch (err) {
        return res.status(400).json({ err })
    }
})

router.get('/pokemons/:idPokemon', async (req, res) => {
    let { idPokemon } = req.params;

    if (!idPokemon) throw new Error('Params must be true')

    try {
        const result = await pokemonById(idPokemon)
        return res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ error: err })
    }
});




module.exports = router;
