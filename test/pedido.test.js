// test/pedido.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');

const should = chai.should();

chai.use(chaiHttp);

describe('Pedidos', () => {
  describe('/POST pedido', () => {
    it('debería crear un nuevo pedido', (done) => {
      let pedido = {
        id_cliente: 9,
        fecha_recogida: '2024-11-23',
        hora_recogida: '10:00',
        total: 150.00,
        qr_code: 'codigo_qr',
        productos: [
          { id_producto: 25, cantidad: 2 },
          { id_producto: 26, cantidad: 1 },
          { id_producto: 27, cantidad: 3 }
        ]
      };
      chai.request(server)
        .post('/api/pedidos')
        .send(pedido)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('mensaje').include('Pedido creado exitosamente');
          done();
        });
    });

    it('debería fallar al crear un pedido sin productos', (done) => {
      let pedido = {
        id_cliente: 9,
        fecha_recogida: '2024-11-23',
        hora_recogida: '10:00',
        total: 150.00,
        qr_code: 'codigo_qr',
        productos: []
      };
      chai.request(server)
        .post('/api/pedidos')
        .send(pedido)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('mensaje').include('Todos los campos son obligatorios');
          done();
        });
    });
  });
});
