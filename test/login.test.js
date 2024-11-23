// test/login.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');

const should = chai.should();

chai.use(chaiHttp);

describe('Clientes', () => {
  describe('/login', () => {
    it('debería iniciar sesión un cliente', (done) => {
      let cliente = {
        correo: 'manuel10@gmail.com',
        contrasena: '12345678'
      };
      chai.request(server)
        .post('/api/cliente/login')
        .send(cliente)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('mensaje').include('Inicio de sesión exitoso');
          done();
        });
    });

    it('debería fallar al iniciar sesión con credenciales incorrectas', (done) => {
      let cliente = {
        correo: 'cliente@example.com',
        contrasena: 'wrongpassword'
      };
      chai.request(server)
        .post('/api/cliente/login')
        .send(cliente)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('mensaje').include('Correo o contraseña incorrectos');
          done();
        });
    });
  });
});

