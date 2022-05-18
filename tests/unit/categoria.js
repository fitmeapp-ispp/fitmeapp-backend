let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require("dotenv").config();

chai.use(chaiHttp);
const url = process.env.VUE_APP_BACKEND_URL ||'http://localhost:3000/api/v1';

describe('Get Material: ', () => {
  it.only('should get successfully', (done) => {
    chai.request(url)
    .get('/categoria')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

  it.only('should get categoria by id successfully', (done) => {
    chai.request(url)
    .get('/categoria/8')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    });
  });

}); 



