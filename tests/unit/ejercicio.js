let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require("dotenv").config();

chai.use(chaiHttp);
const url = process.env.VUE_APP_BACKEND_URL ||'http://localhost:3000/api/v1';

describe('Get Ejercicios: ', () => {
  it.only('should get successfully', (done) => {
    chai.request(url)
    .get('/ejercicio')
    .query({pagina: 1, zonaMuscular: 1})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

  it.only('should get con buscador successfully', (done) => {
    chai.request(url)
    .get('/ejercicio')
    .query({pagina: 1, zonaMuscular: 1, buscador: "brazo"})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

  it.only('should get con materiales successfully', (done) => {
    chai.request(url)
    .get('/ejercicio')
    .query({pagina: 1, zonaMuscular: 1, materiales: [1,2,3]})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

  it.only('should get con buscador y materiales successfully', (done) => {
    chai.request(url)
    .get('/ejercicio')
    .query({pagina: 1, zonaMuscular: 1, buscador: "brazo", materiales: [1,2,3]})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

  it.only('should get ejercicio by id successfully', (done) => {
    chai.request(url)
    .get('/ejercicio/624aefd529ee1ba2d174b724')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

  it.only('should get ejercicio by muscle id successfully', (done) => {
    chai.request(url)
    .get('/ejercicio/muscle/1')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });
}); 



