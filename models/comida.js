var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var d = new Date();

const comidaSchema = new Schema({
  fecha: {
      type: String,
      default: d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear()
  },
  tipo: {
    type: String,
    enum : ["Desayuno","Almuerzo","Cena"],
    default: "Almuerzo"
  },
  username: String,
  alimentos:
        [{
            alimento_id: String,
            cantidad: Number
        }],
  kcal_100g: Number,
  grasa_100g: Number,
  carbohidratos_100g: Number,
  proteinas_100g: Number,
});

module.exports = mongoose.model('comida', comidaSchema);