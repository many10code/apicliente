// test/registro.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');

const should = chai.should();

chai.use(chaiHttp);

describe('Clientes', () => {
  describe('/POST registro', () => {
    it('debería registrar un nuevo cliente', (done) => {
      let cliente = {
        nombre: 'Juan',
        apellidos: 'Pérez',
        correo: `juan.perez${Date.now()}@example.com`, // Correo único por cada prueba
        contrasena: 'password123',
        direccion: 'Calle Falsa 123',
        telefono: '1234567890'
      };
      chai.request(server)
        .post('/api/cliente/registro')
        .send(cliente)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('mensaje').eql('Registro exitoso.');
          done();
        });
    });

    it('debería fallar al registrar un cliente sin correo', (done) => {
        let cliente = {
          nombre: 'Juan',
          apellidos: 'Pérez',
          contrasena: 'password123',
          direccion: 'Calle Falsa 123',
          telefono: '1234567890'
        };
        chai.request(server)
          .post('/api/cliente/registro')
          .send(cliente)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('mensaje').include('Por favor proporciona todos los datos requeridos');
            done();
          });
      });
      
  });
});


