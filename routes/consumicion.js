const axios = require('axios');
const express = require('express');
const router = express.Router();

const Consumicion = require('../models/consumicion');


router.get('/', async(req, res) => {
    try {
        const consumicionDB = await Consumicion.find();
        res.json(consumicionDB);
    } catch (error) {
        return res.status(400).json({
        mensaje: 'An error has occurred',
        error
        })
    }
});

 router.get('/:id', async(req, res) => {
 const _id = req.params.id;
     try {
         const consumicionDB = await Consumicion.findOne({"_id": _id});
         res.json(consumicionDB);
     } catch (error) {
         return res.status(400).json({
         mensaje: 'An error has occurred',
         error
         })
     }
 });

router.post('/', async(req, res) => {
    const body = req.body;  
    try {
    console.log("Añadiendo una nueva consumicion...")
    const consumicionDB = await Consumicion.create(body);
    res.status(200).json(consumicionDB); 
    } catch (error) {
    return res.status(500).json({
        mensaje: 'An error has occurred',
        error
    })
    }
});


//SE USA PARA BORRAR LOS TESTS CREADOS
router.delete('/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        console.log("Borrando la consumición "+_id+"...")
        const consumicionDB = await Consumicion.findByIdAndDelete(_id);
        res.status(200).json(consumicionDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error',
            error
        })
    }
});

module.exports = router;