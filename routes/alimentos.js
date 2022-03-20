const router = require('express').Router();
const alimento = require('../models/alimento');
// Require Item model in our routes module
var Alimento = require('../models/alimento');
var Consumicion = require('../models/consumption')
// Get con todos los documentos

router.get('/', async (req, res) => {
  const items = await Alimento.find().limit(500);
  res.json(items);
  
});

router.get('/creados/:username', async (req, res) => {
  const username = req.params.username;
  const items = await Alimento.find({"creado_por":username}).limit(500);
  res.json(items);
});

router.get('/alergenos/:alergeno', async (req, res) => {
  const alergeno = req.params.alergeno;
  const items = await Alimento.find({"alergenos": {$not: {$regex : alergeno}}}).limit(500);
  res.json(items);
});

router.get('/favoritos/:username', async (req, res) => {

  var alimento = 0;
  var alimentos =[];
  var lista_productos = [];
  const name = req.params.username;
  const items = await Consumicion.find({"username": name},{"product_id": 1, "_id":0}).sort({"num_consumption": -1}).limit(500);
  if (items.length > 0){
    for (var i = 0; i < items.length; i++){
      alimento = await Alimento.find({"_id":items[i]["product_id"]}).limit(500);
      alimentos = alimentos.concat(alimento);
      lista_productos.push(items[i]["product_id"]);
    }
    resto_alimentos = await Alimento.find({"_id":{$nin:  lista_productos}}).limit(500);
    alimentos = alimentos.concat(resto_alimentos);
  } else{
    alimentos = await Alimento.find().limit(500);
  }
  
  
  res.json(alimentos);
  
});

router.get('/recientes/:username', async (req, res) => {

  var alimento = 0;
  var resto_alimentos = [];
  var alimentos = [];
  const lista_productos = [];
  const name = req.params.username;
  const items = await Consumicion.find({"username": name},{"product_id": 1, "_id":0}).sort({"last_consumption": -1}).limit(500);

  if (items.length > 0){
    for (var i = 0; i < items.length; i++){
      alimento = await Alimento.find({"_id":items[i]["product_id"]}).limit(500);
      alimentos = alimentos.concat(alimento);
      lista_productos.push(items[i]["product_id"]);
    }

    resto_alimentos = await Alimento.find({"_id":{$nin:  lista_productos}}).limit(500);
    alimentos = alimentos.concat(resto_alimentos);

  } else{
    alimentos = await Alimento.find().limit(500);
  }
  
  
  res.json(alimentos);
  
});

router.post('/newConsumption', async (req, res, next) => {
  var item = new Consumicion(req.body);
  item.num_consumption = 1;
  item.last_consumption = Date();
  const consumicion = await Consumicion.find({"username": item.username, "product_id": item.product_id});
  if (consumicion.length == 0){
      item.save()
      .then(item => {
        res.status(200).json({'item': 'Consumption added successfully'});
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  }else{
    Consumicion.findOneAndUpdate({ "_id": consumicion[0]._id },{
      $set: {
        num_consumption: consumicion[0].num_consumption+1,
        last_consumption: Date()
    }
  },
  function(error, info) {
    if (error) {
        res.json({
            resultado: false,
            msg: 'No se pudo modificar la consumición',
            error
        });
    } else {
        res.json({
            resultado: "Modificado con éxito",
            info: info
        })
    }
  }
  )
}
});

router.get('/buscador/:name', async (req, res) => {
  const name = req.params.name;
  const items = await Alimento.find({"nombre": {$regex : name}}).limit(500);
  res.json(items);
});

router.route('/add').post((req, res, next) => {
  var item = new Alimento(req.body);
  item.save()
  .then(item => {
    res.status(200).json({'item': 'Item added successfully'});
  })
  .catch(err => {
    res.status(400).send("unable to save to database");
  });
});

// Exportamos la configuración de express app
module.exports = router;