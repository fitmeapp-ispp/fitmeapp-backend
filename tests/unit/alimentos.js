let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require("dotenv").config();

chai.use(chaiHttp);
const url = process.env.VUE_APP_BACKEND_URL ||'http://localhost:3000/api/v1';
let id = '';

describe('Get Alimentos: ', () => {
  it.only('should get successfully', (done) => {
    chai.request(url)
    .get('/alimentos')
    .query({pagina:0,ordenar:['nombre','1']})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
    });
  });

  it.only('should get with ordenar successfully', (done) => {
    chai.request(url)
    .get('/alimentos')
    .query({pagina:0,ordenar:['nombre','1']})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
    });
  });

  it.only('should get with buscador successfully', (done) => {
    chai.request(url)
    .get('/alimentos')
    .query({pagina:0,buscador:'tomate'})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
    });
  });

  it.only('should get with alergeno successfully', (done) => {
    chai.request(url)
    .get('/alimentos')
    .query({pagina:0,alergeno:'huevos'})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
    });
  });
    
  it.only('should get with buscador y ordenar successfully', (done) => {
    chai.request(url)
    .get('/alimentos')
    .query({pagina:0,buscador:'tomate',ordenar:['nombre','1']})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
    });
  });

  it.only('should get with buscador y alergeno successfully', (done) => {
    chai.request(url)
    .get('/alimentos')
    .query({pagina:0,buscador:'tomate',alergeno:'huevos'})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
    });
  });

  it.only('should get with buscador, ordenar y alergeno successfully', (done) => {
    chai.request(url)
    .get('/alimentos')
    .query({pagina:0,buscador:'tomate',alergeno:'huevos',ordenar:['nombre','1']})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
    });
  });
}); 

describe('Get Alimentos Creados: ', () => {
  it.only('should get successfully', (done) => {
    chai.request(url)
    .get('/alimentos/creados/develop')
    .query({pagina:0})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
    });
  });

  it.only('should get with ordenar successfully', (done) => {
    chai.request(url)
    .get('/alimentos/creados/develop')
    .query({pagina:0,ordenar:['nombre','1']})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
    });
  });

  it.only('should get with buscador successfully', (done) => {
    chai.request(url)
    .get('/alimentos/creados/develop')
    .query({pagina:0,buscador:'tomate'})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
    });
  });

  it.only('should get with alergeno successfully', (done) => {
    chai.request(url)
    .get('/alimentos/creados/develop')
    .query({pagina:0,alergeno:'huevos'})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
    });
  });
    
  it.only('should get with buscador y ordenar successfully', (done) => {
    chai.request(url)
    .get('/alimentos/creados/develop')
    .query({pagina:0,buscador:'tomate',ordenar:['nombre','1']})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
    });
  });

  it.only('should get with buscador y alergeno successfully', (done) => {
    chai.request(url)
    .get('/alimentos/creados/develop')
    .query({pagina:0,buscador:'tomate',alergeno:'huevos'})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
    });
  });

  it.only('should get with buscador, ordenar y alergeno successfully', (done) => {
    chai.request(url)
    .get('/alimentos/creados/develop')
    .query({pagina:0,buscador:'tomate',alergeno:'huevos',ordenar:['nombre','1']})
    .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
    });
  });
}); 

describe('Get Alimentos Recientes: ', () => {
    it.only('should get successfully', (done) => {
      chai.request(url)
      .get('/alimentos/recientes/626425109b595c35e7ac6229')
      .query({pagina:0,ordenar:['nombre','1']})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
      });
    });
  
    it.only('should get with ordenar successfully', (done) => {
      chai.request(url)
      .get('/alimentos/recientes/626425109b595c35e7ac6229')
      .query({pagina:0,ordenar:['nombre','1']})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
      });
    });
  
    it.only('should get with buscador successfully', (done) => {
      chai.request(url)
      .get('/alimentos/recientes/626425109b595c35e7ac6229')
      .query({pagina:0,buscador:'tomate'})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
      });
    });
  
    it.only('should get with alergeno successfully', (done) => {
      chai.request(url)
      .get('/alimentos/recientes/626425109b595c35e7ac6229')
      .query({pagina:0,alergeno:'huevos'})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
      });
    });
      
    it.only('should get with buscador y ordenar successfully', (done) => {
      chai.request(url)
      .get('/alimentos/recientes/626425109b595c35e7ac6229')
      .query({pagina:0,buscador:'tomate',ordenar:['nombre','1']})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
      });
    });
  
    it.only('should get with buscador y alergeno successfully', (done) => {
      chai.request(url)
      .get('/alimentos/recientes/626425109b595c35e7ac6229')
      .query({pagina:0,buscador:'tomate',alergeno:'huevos'})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
      });
    });
  
    it.only('should get with buscador, ordenar y alergeno successfully', (done) => {
      chai.request(url)
      .get('/alimentos/recientes/626425109b595c35e7ac6229')
      .query({pagina:0,buscador:'tomate',alergeno:'huevos',ordenar:['nombre','1']})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('resultado');
        expect(res.body).to.have.property('total');
        done();
      });
    });
}); 

describe('Añadir alimentos: ', () => {
  it.only('should añadir alimento completo', (done) => {
    chai.request(url)
    .post('/alimentos')
    .send({
      nombre: 'Tomate con tomate',
      creado_por: 'develop',
      marca: 'Tomatico',
      kcal_100g: 100,
      grasa_100g: 100,
      'grasas-std_100g': 100,
      carbohidratos_100g: 100,
      azucares_100g: 100,
      proteinas_100g: 100,
      sal_100g:100,
      sodio_100g: 100,
      fibra_100g: 100,
      colesterol_100g: 100,
      potasio_100g: 100,
      alergenos: 'huevos,crustaceos',
    })
    .end(function(err, res) {
      id = res.body._id;
      expect(res).to.have.status(200);
      expect(res).to.have.json;
      done();
    });
  });
});

describe('Actualizar alimentos: ', () => {
  it.only('should actualizar alimento completo', (done) => {
    chai.request(url)
    .put('/alimentos/'+id)
    .send({
      alergenos: 'huevos',
    })
    .end(function(err, res) {
      id = res.body._id;
      expect(res).to.have.status(200);
      done();
    });
  });
});

describe('Eliminar alimentos: ', () => {
  it.only('should eliminar alimento completo', (done) => {
    chai.request(url)
    .delete('/alimentos/'+id)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});

