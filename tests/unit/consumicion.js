let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require("dotenv").config();

chai.use(chaiHttp);
const url = process.env.VUE_APP_BACKEND_URL ||'http://localhost:3000/api/v1';
let id = '';

describe('Get Consumiciones: ', () => {
    it.only('should get successfully', (done) => {
        chai.request(url)
        .get('/consumicion')
        .end(function(err, res) {
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe('Añadir consumición: ', () => {
    it.only('should añadir consumición completo', (done) => {
      chai.request(url)
      .post('/consumicion')
      .send({
        fecha: new Date(),
        usuario: '626425109b595c35e7ac6229',
        alimento: '623240e3997148f56622ad01',
        cantidad: 100,
        tipo: 'Desayuno',
        calculadora: false
      })
      .end(function(err, res) {
        id = res.body._id;
        expect(res).to.have.status(200);
        expect(res).to.have.json;
        done();
      });
    });
  });

describe('Get consumicion creada: ', () => {
    it.only('should get successfully', (done) => {
        chai.request(url)
        .get('/consumicion/'+id)
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res).to.have.json;
            done();
        });
    });
});

describe('Eliminar consumicion creada: ', () => {
    it.only('should eliminar successfully', (done) => {
        chai.request(url)
        .delete('/consumicion/'+id)
        .end(function(err, res) {
            expect(res).to.have.status(200);
            done();
        });
    });
});