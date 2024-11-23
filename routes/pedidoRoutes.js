const express = require('express');
const { crearPedido, agregarProductoAPedido, actualizarEstadoPedido, obtenerPedidosPorCliente, obtenerDetallePedido, obtenerTodosLosPedidos } = require('../controllers/pedidoController');
const router = express.Router();

router.post('/', crearPedido);
router.post('/producto', agregarProductoAPedido);
router.put('/:id_pedido', actualizarEstadoPedido);
router.get('/cliente/:id_cliente', obtenerPedidosPorCliente);
router.get('/:id_pedido', obtenerDetallePedido);
router.get('/', obtenerTodosLosPedidos);

module.exports = router;
