let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require("dotenv").config();

chai.use(chaiHttp);
const url = process.env.VUE_APP_BACKEND_URL ||'http://localhost:3000/api/v1';
let id = '';

describe('Get Comidas: ', () => {
  it.only('should get successfully Desayuno', (done) => {
    chai.request(url)
    .get('/comidas/Desayuno/2022-04-01/6244d94635c17b47d527f178')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('usuario');
        expect(res.body).to.have.property('kcalIngeridas');
        done();
    });
  });

  it.only('should get successfully Almuerzo', (done) => {
    chai.request(url)
    .get('/comidas/Almuerzo/2022-04-01/6244d94635c17b47d527f178')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('usuario');
        expect(res.body).to.have.property('kcalIngeridas');
        done();
    });
  });

  it.only('should get successfully Cena', (done) => {
    chai.request(url)
    .get('/comidas/Cena/2022-04-01/6244d94635c17b47d527f178')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('usuario');
        expect(res.body).to.have.property('kcalIngeridas');
        done();
    });
  });

})

describe('Post Comidas: ', () => {

  it.only('should añadir o actualizar consumición y día', (done) => {
    chai.request(url)
    .post('/comidas/add/623240e3997148f56622accd/1/62474c08926d27a3c0b1fc85/Almuerzo/true')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

})

describe('Delete Comidas: ', () => {

  it.only('should delete consumición y día', (done) => {
    chai.request(url)
    .delete('/comidas/limpiarCarrusel/6244d94635c17b47d527f178/62474c08926d27a3c0b1fc85/Almuerzo')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

})
