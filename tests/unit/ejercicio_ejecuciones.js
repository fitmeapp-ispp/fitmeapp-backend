let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require("dotenv").config();

chai.use(chaiHttp);
const url = process.env.VUE_APP_BACKEND_URL ||'http://localhost:3000/api/v1';

describe('Get Ejercicio ejeciciones: ', () => {
  it.only('should get successfully', (done) => {
    chai.request(url)
    .get('/ejercicio_ejecuciones')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

  it.only('should get ejercicio ejecucion by id successfully', (done) => {
    chai.request(url)
    .get('/ejercicio_ejecuciones/624cb3f476812a97e799d6e4')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

  it.only('should get ejercicios fecha by user successfully', (done) => {
    chai.request(url)
    .get('/ejercicio_ejecuciones/done/62438636626cc9212b55e272/2022-05-05')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

  it.only('should get ejercicios recomendados by user successfully', (done) => {
    chai.request(url)
    .get('/ejercicio_ejecuciones/recomendacion/62438636626cc9212b55e272')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

  it.only('should get ejercicios bu user, fecha y exerciseId successfully', (done) => {
    chai.request(url)
    .get('/ejercicio_ejecuciones/62438636626cc9212b55e272/2022-04-05/624aefd529ee1ba2d174b7f2')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

}); 