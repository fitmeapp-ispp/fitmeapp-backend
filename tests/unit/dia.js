let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require("dotenv").config();

chai.use(chaiHttp);
const url = process.env.VUE_APP_BACKEND_URL ||'http://localhost:3000/api/v1';
let id = '';

describe('Get Dia: ', () => {
  it.only('should get successfully', (done) => {
    chai.request(url)
    .get('/dia/')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

  it.only('should get successfully por id', (done) => {
    chai.request(url)
    .get('/dia/62474c08926d27a3c0b1fc85')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("usuario");
        done();
    });
  });

  it.only('should get successfully pesosSemana', (done) => {
    chai.request(url)
    .get('/dia/pesosDeLaSemana/jose00/2022-05-02')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("dias");
        expect(res.body).to.have.property("pesos");
        done();
    });
  });

  it.only('should get successfully existe dia', (done) => {
    chai.request(url)
    .get('/dia/jose00/2022-05-02')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("usuario");
        done();
    });
  });

  it.only('should get successfully imagenes comida', (done) => {
    chai.request(url)
    .get('/dia/jose00/2022-05-02/Cena')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

})

/*
describe('Post Dia: ', () => {

  it.only('should añadir un dia', (done) => {
    chai.request(url)
    .post('/dia')
    .send({usuario: "6244d94635c17b47d527f178", pesoActual: 80, kcalRec: 100, proteinasRec:100, carbRec:100, grasasRec:100})
    .end(function(err, res) {
      id = res.body._id
      expect(res).to.have.status(200);
      expect(res).to.have.json;
      done();
    });
  });

})
*/

