const router = require('express').Router();
// Require Item model in our routes module
var Musculo = require('../models/musculo');

// Get con todos los documentos

router.get('/', async (req, res) => {
    const items = await Musculo.find();
    res.json(items);
});

router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const items = await Musculo.find({_id});
        res.json(items);
    } catch (error) {
        return res.status(400).json({
        mensaje: 'An error has occurred',
        error
        })
    }
});

// Exportamos la configuración de express app
module.exports = router;