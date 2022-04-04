const router = require('express').Router();
// Require Item model in our routes module
var Ejecucion = require('../models/ejercicio_ejecucion');
var Ejercicio = require('../models/ejercicio');
var Usuario = require('../models/user');
const mongoose = require("mongoose");

const moment = require('moment')
const today = moment().startOf('day')

// Get de Recomendados
router.get('/recomendacion/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const user_id = await Usuario.findOne({ "username": username },"_id");
        const items = await Ejecucion.find({"recomendado":true, fecha: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
          }});
        if(items.length < 1){
            let i = 8;
            while (i < 15){
                const count = await Ejercicio.find({ "category": i }).countDocuments();
                var rand = Math.floor(Math.random() * count);
                const ej = await Ejercicio.findOne({ "category": i },"_id").skip(rand);
                
                var ejecucion = new Ejecucion();
                ejecucion._id = new mongoose.Types.ObjectId();
                ejecucion.ejercicio  = ej._id;
                ejecucion.segundos = 0;
                ejecucion.recomendado = true;
                ejecucion.hecho = false;
                ejecucion.usuario = user_id._id;
                ejecucion.save();
                
                i++; 
            }
            
        }
        res.json(items);
    } catch (error) {
        return res.status(400).json({
        mensaje: 'An error has occurred',
        error
        })
    }
});

// Get by id
router.get('/:ejecucionId', async (req, res) => {
    try {
        const ejecucionId = Number(req.params.ejecucionId);
        const items = await Ejecucion.find({ejecucionId});
        res.json(items);
    } catch (error) {
        return res.status(400).json({
        mensaje: 'An error has occurred',
        error
        })
    }
});

// Get by exercise id 
router.get('/:ejercicioId', async (req, res) => {
    try {
        const ejercicioId = Number(req.params.ejercicioId);
        const items = await Ejercicio.find({"ejercicio":ejercicioId});
        res.json(items);
    } catch (error) {
        return res.status(400).json({
        mensaje: 'An error has occurred',
        error
        })
    }
});

// Get by completion
router.get('/:done', async (req, res) => {
    try {
        const numb = Number(req.params.done);
        if (numb==1) {
            const done = true;
        }
        else {
            const done = false;
        }
        const items = await Ejecucion.find({"hecho":true});
        res.json(items);
    } catch (error) {
        return res.status(400).json({
        mensaje: 'An error has occurred',
        error
        })
    }
});

// Get con todos los documentos
router.get('/', async (req, res) => {
    try {
        const items = await Ejercicio.find();
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