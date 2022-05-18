const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const alimento = require('../models/alimento');

var Alimento = require('../models/alimento');
var Consumicion = require('../models/consumicion');
var dia = require('../models/dia');

const dctAlergenos =  {
  'gluten': /(gluten)/,
  'crustaceos': /(crustaceans|crustaceos)/,
  'huevos': /(eggs|huevos)/,
  'pescado': /(fish|pescado)/,
  'cacahuetes': /(peanuts|cacahuetes)/,
  'soja': /(soybeans|soja)/,
  'leche': /(milk|leche)/,
  'frutos_de_cascara': /(nuts|frutos)/,
  'apio': /(celery|apio)/,
  'mostaza': /(mustard|mostaza)/,
  'sesamo': /(sesame|sesamo)/,
  'azufre_sulfitos': /(sulphites|sulfitos)/,
  'altramuces': /(lupins|altramuces)/,
  'moluscos': /(molluscs|moluscos)/
}

router.get('/:id', async(req, res) => {
  const _id = req.params.id;
      try {
          const alimentoDB = await alimento.findOne({"_id": _id});
          res.json(alimentoDB);
      } catch (error) {
          return res.status(400).json({
          mensaje: 'An error has occurred',
          error
          })
      }
  });

//OBTENER 100 ALIMENTOS (EN FRONTEND SE HACE UN LAZYLOAD) BUSCA POR TERMINO, ALERGENOS (QUE NO TENGA)  Y ORDEN
router.get('/', async (req, res) => {
  const pagina = req.query.pagina;
  const ordenar = req.query.ordenar;
  const buscador = !(req.query.buscador) ? '': req.query.buscador;
  const alergeno = dctAlergenos[req.query.alergeno];

  try{
    var alimentosDB = await Alimento.find({"nombre": {$regex : buscador, $options:"i"}}).skip(9*pagina).limit(9)
    var total =  await Alimento.countDocuments({"nombre": {$regex : buscador}});
    if (ordenar && alergeno){
      alimentosDB = await Alimento.find({"nombre": {$regex : buscador, $options:"i"}, 
                                  "alergenos": {$not: {$regex : alergeno}}}).sort({[ordenar[0]]:ordenar[1]}).skip(9*pagina).limit(9);
      total = await Alimento.countDocuments({"nombre": {$regex : buscador, $options:"i"}, "alergenos": {$not: {$regex : alergeno}}});
    }else if(ordenar && !alergeno){
      alimentosDB = await Alimento.find({"nombre": {$regex : buscador, $options:"i"}}).sort({[ordenar[0]]:ordenar[1]}).skip(9*pagina).limit(9);
    }else if(!ordenar && alergeno){
      alimentosDB = await Alimento.find({"nombre": {$regex : buscador, $options:"i"}, "alergenos": {$not: {$regex : alergeno}}}).skip(9*pagina).limit(9);
      total = await Alimento.countDocuments({"nombre": {$regex : buscador, $options:"i"}, "alergenos": {$not: {$regex : alergeno}}});
    }
    res.json({
      resultado: alimentosDB,
      total: total
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      mensaje: 'Ha ocurrido un error',
      error
    })
  }
});

//OBTENER ALIMENTOS CREADOS POR UN USUARIO
router.get('/creados/:username', async (req, res) => {
  const username = req.params.username;
  const pagina = req.query.pagina;
  const ordenar = req.query.ordenar;
  const buscador = !(req.query.buscador) ? '': req.query.buscador;
  const alergeno = dctAlergenos[req.query.alergeno];
  
  try {
    var alimentosDB = await Alimento.find({"creado_por":username, "nombre": {$regex : buscador, $options:"i"}}).skip(9*pagina).limit(9)
    var total =  await Alimento.countDocuments({"creado_por":username, "nombre": {$regex : buscador, $options:"i"}});
    if (ordenar && alergeno){
      alimentosDB = await Alimento.find({"creado_por":username, "nombre": {$regex : buscador, $options:"i"}, 
                                  "alergenos": {$not: {$regex : alergeno}}}).sort({[ordenar[0]]:ordenar[1]}).skip(9*pagina).limit(9);
      total = await Alimento.countDocuments({"creado_por":username, "nombre": {$regex : buscador, $options:"i"}, "alergenos": {$not: {$regex : alergeno}}});
    }else if(ordenar && !alergeno){
      alimentosDB = await Alimento.find({"creado_por":username, "nombre": {$regex : buscador, $options:"i"}}).sort({[ordenar[0]]:ordenar[1]}).skip(9*pagina).limit(9);
    }else if(!ordenar && alergeno){
      alimentosDB = await Alimento.find({"creado_por":username, "nombre": {$regex : buscador, $options:"i"}, "alergenos": {$not: {$regex : alergeno}}}).skip(9*pagina).limit(9);
      total = await Alimento.countDocuments({"creado_por":username, "nombre": {$regex : buscador, $options:"i"}, "alergenos": {$not: {$regex : alergeno}}});
    }
    res.json({
      resultado: alimentosDB,
      total: total
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      mensaje: 'Ha ocurrido un error',
      error
    });
  }
});

//OBTENER LOS ALIMENTOS MAS RECIENTES DEL USUARIO
router.get('/recientes/:userId', async (req, res) => {

  const userId = req.params.userId;
  const pagina = req.query.pagina;
  const ordenar = req.query.ordenar;
  const buscador = !(req.query.buscador) ? '': req.query.buscador;
  const alergeno = dctAlergenos[req.query.alergeno];
  
  try {
    var consumiciones = await Consumicion.aggregate().match({"usuario": mongoose.Types.ObjectId(userId)}).sort({"fecha":-1}).group({"_id": "$alimento"});

    var alimentosDB = await Alimento.find({"_id":consumiciones, "nombre": {$regex : buscador, $options:"i"}}).skip(pagina*9).limit(9);
    var total =  await Alimento.countDocuments({"_id":consumiciones, "nombre": {$regex : buscador, $options:"i"}});
  
    if (ordenar && alergeno){
      alimentosDB = await Alimento.find({"_id":consumiciones, "nombre": {$regex : buscador, $options:"i"}, "alergenos": {$not: {$regex : alergeno}}})
                                  .sort({[ordenar[0]]:ordenar[1]}).skip(9*pagina).limit(9);
      total = await Alimento.countDocuments({"_id":consumiciones, "nombre": {$regex : buscador, $options:"i"}, "alergenos": {$not: {$regex : alergeno}}});
    }else if(ordenar && !alergeno){
      alimentosDB = await Alimento.find({"_id":consumiciones, "nombre": {$regex : buscador, $options:"i"}})
                                  .sort({[ordenar[0]]:ordenar[1]}).skip(9*pagina).limit(9);
    }else if(!ordenar && alergeno){
      alimentosDB = await Alimento.find({"_id":consumiciones, "nombre": {$regex : buscador, $options:"i"}, "alergenos": {$not: {$regex : alergeno}}})
                                  .skip(9*pagina).limit(9);
      total = await Alimento.countDocuments({"_id":consumiciones, "nombre": {$regex : buscador, $options:"i"}, "alergenos": {$not: {$regex : alergeno}}});
    }

    res.json({
      resultado: alimentosDB,
      total: total
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      mensaje: 'Ha ocurrido un error',
      error
    });
  }
});

//OBTENER LOS 25 ALIMENTOS MAS RECIENTES DEL USUARIO
router.get('/favoritos/:userId', async (req, res) => {

  const userId = req.params.userId;
  const pagina = req.query.pagina;
  const ordenar = req.query.ordenar;
  const buscador = !(req.query.buscador) ? '': req.query.buscador;
  const alergeno = dctAlergenos[req.query.alergeno];
  const alimentoIds = req.query.alimentoIds;

  var alimentosDB = await Alimento.find({"_id":alimentoIds, "nombre": {$regex : buscador, $options:"i"}}).skip(pagina*9).limit(9);
  var total =  await Alimento.countDocuments({"_id":alimentoIds, "nombre": {$regex : buscador, $options:"i"}});

  if (ordenar && alergeno){
    alimentosDB = await Alimento.find({"_id":alimentoIds, "nombre": {$regex : buscador, $options:"i"}, "alergenos": {$not: {$regex : alergeno}}})
                                .sort({[ordenar[0]]:ordenar[1]}).skip(9*pagina).limit(9);
    total = await Alimento.countDocuments({"_id":alimentoIds, "nombre": {$regex : buscador, $options:"i"}, "alergenos": {$not: {$regex : alergeno}}});
  }else if(ordenar && !alergeno){
    alimentosDB = await Alimento.find({"_id":alimentoIds, "nombre": {$regex : buscador, $options:"i"}})
                                .sort({[ordenar[0]]:ordenar[1]}).skip(9*pagina).limit(9);
  }else if(!ordenar && alergeno){
    alimentosDB = await Alimento.find({"_id":alimentoIds, "nombre": {$regex : buscador, $options:"i"}, "alergenos": {$not: {$regex : alergeno}}})
                                .skip(9*pagina).limit(9);
    total = await Alimento.countDocuments({"_id":alimentoIds, "nombre": {$regex : buscador, $options:"i"}, "alergenos": {$not: {$regex : alergeno}}});
  }

  res.json({
    resultado: alimentosDB,
    total: total
  });
});

router.route('/add').post((req, res, next) => {
  var item = new Alimento(req.body);
  item.save()
  .then(() => {
    res.status(200).json({'item': 'Alimento añadido satisfactoriamente'});
  })
  .catch(() => {
    res.status(400).send("Ha ocurrido un error al guardar en la DB");
  });
});

router.get('/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const alimentoDB = await Alimento.findOne({_id});
    res.json(alimentoDB);
} catch (error) {
    return res.status(400).json({
    mensaje: 'Ha ocurrido un error',
    error
    })
}
});

router.post('/', async(req, res) => {
  const body = req.body;  
  try {
      console.log("Añadiendo un nuevo alimento...")
      body._id = new mongoose.Types.ObjectId();
      const alimentoDB = await Alimento.create(body);
      console.log("Nuevo alimento añadido: ", alimentoDB._id);
      res.status(200).json(alimentoDB); 
  } catch (error) {
      return res.status(500).json({
          mensaje: 'Ha ocurrido un error',
          error
      })
  }
});


router.put('/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;  
  try {
    console.log("Actualizando el alimento "+_id+"...")
      const alimentoDB = await Alimento.findByIdAndUpdate(_id, body);
      res.status(200).json(alimentoDB);
  } catch (error) {
      return res.status(500).json({
          mensaje: 'Ha ocurrido un error',
          error
      })
  }
});

router.delete('/:id', async(req, res) => {
  const _id = req.params.id;
  try {
      console.log("Borrando el alimento "+_id+"...")
      const alimentoDB = await Alimento.findByIdAndDelete(_id);
      const consumicionesDB = await Consumicion.find({'alimento': _id});

      for (let consumicionDB of consumicionesDB){
        const diasDBDesayuno = await dia.find({'consumicionesDesayuno': consumicionDB._id})
        for (let diasDB of diasDBDesayuno){
          diasDB.consumicionesDesayuno.remove(consumicionDB._id);

          diasDB.kcalIngeridasDesayuno =  Math.trunc(Math.abs(diasDB.kcalIngeridasDesayuno - (alimentoDB.kcal_100g*consumicionDB.cantidad)/100))
          diasDB.proteinasIngeridasDesayuno = Math.trunc(Math.abs(diasDB.proteinasIngeridasDesayuno - (alimentoDB.proteinas_100g*consumicionDB.cantidad)/100))
          diasDB.carbIngeridasDesayuno = Math.trunc(Math.abs(diasDB.carbIngeridasDesayuno - (alimentoDB.carbohidratos_100g*consumicionDB.cantidad)/100))
          diasDB.grasasIngeridasDesayuno = Math.trunc(Math.abs(diasDB.grasasIngeridasDesayuno - (alimentoDB.grasa_100g*consumicionDB.cantidad)/100))

          await diasDB.save();
        }
        
        const diasDBAlmuerzo = await dia.find({'consumicionesAlmuerzo': consumicionDB._id})
        for (let diasDB of diasDBAlmuerzo){
          diasDB.consumicionesAlmuerzo.remove(consumicionDB._id);

          diasDB.kcalIngeridasAlmuerzo =  Math.trunc(Math.abs(diasDB.kcalIngeridasAlmuerzo - (alimentoDB.kcal_100g*consumicionDB.cantidad)/100))
          diasDB.proteinasIngeridasAlmuerzo = Math.trunc(Math.abs(diasDB.proteinasIngeridasAlmuerzo - (alimentoDB.proteinas_100g*consumicionDB.cantidad)/100))
          diasDB.carbIngeridasAlmuerzo = Math.trunc(Math.abs(diasDB.carbIngeridasAlmuerzo - (alimentoDB.carbohidratos_100g*consumicionDB.cantidad)/100))
          diasDB.grasasIngeridasAlmuerzo = Math.trunc(Math.abs(diasDB.grasasIngeridasAlmuerzo - (alimentoDB.grasa_100g*consumicionDB.cantidad)/100))

          await diasDB.save();
        }
        
        const diasDBCena = await dia.find({'consumicionesCena': consumicionDB._id})
        for (let diasDB of diasDBCena){
          diasDB.consumicionesCena.remove(consumicionDB._id);
          
          diasDB.kcalIngeridasCena =  Math.trunc(Math.abs( diasDB.kcalIngeridasCena - (alimentoDB.kcal_100g * consumicionDB.cantidad)/100 ))
          diasDB.proteinasIngeridasCena = Math.trunc(Math.abs( diasDB.proteinasIngeridasCena - (alimentoDB.proteinas_100g * consumicionDB.cantidad)/100 ))
          diasDB.carbIngeridasCena = Math.trunc(Math.abs( diasDB.carbIngeridasCena - (alimentoDB.carbohidratos_100g * consumicionDB.cantidad)/100 ))
          diasDB.grasasIngeridasCena = Math.trunc(Math.abs( diasDB.grasasIngeridasCena - (alimentoDB.grasa_100g * consumicionDB.cantidad)/100 ))

          await diasDB.save();
        }
      }
      
      await Consumicion.deleteMany({_id: {$in: consumicionesDB }});
      console.log("Alimento borrado junto con sus relaciones")
      res.status(200).json(alimentoDB);
  } catch (error) {
      return res.status(500).json({
          mensaje: 'Ha ocurrido un error',
          error
      })
  }
});

// Exportamos la configuración de express app
module.exports = router;
