const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pokemon, Type } = require('../db');
const { getTypes } = require('./utilsType');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get('/types', async (req, res) =>{
    try {
        const types = await getTypes()
        
        res.status(200).json(types)
    } catch (err) {
        res.status(400).json({err})
    }
})


module.exports = router;