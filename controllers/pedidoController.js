const Pedido = require('../models/pedidoModel');

const crearPedido = async (req, res) => {
  try {
    const { id_cliente, fecha_recogida, hora_recogida, total, qr_code, productos } = req.body;
    if (!id_cliente || !fecha_recogida || !hora_recogida || !total || !productos || productos.length === 0) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }
    const nuevoPedido = await Pedido.crear({ id_cliente, fecha_recogida, hora_recogida, total, qr_code, productos });
    res.status(201).json({ mensaje: 'Pedido creado exitosamente.', pedido: nuevoPedido });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el pedido.', error: error.message });
  }
};

const agregarProductoAPedido = async (req, res) => {
  try {
    const { id_pedido, id_producto, cantidad } = req.body;
    if (!id_pedido || !id_producto || !cantidad) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }
    const productoPedido = await Pedido.agregarProducto({ id_pedido, id_producto, cantidad });
    res.status(201).json({ mensaje: 'Producto agregado al pedido exitosamente.', productoPedido });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar producto.', error: error.message });
  }
};

const actualizarEstadoPedido = async (req, res) => {
  try {
    const { id_pedido } = req.params;
    const { estado_pedido } = req.body;
    if (!estado_pedido) {
      return res.status(400).json({ mensaje: 'El estado del pedido es obligatorio.' });
    }
    const pedidoActualizado = await Pedido.actualizarEstado(id_pedido, estado_pedido);
    res.status(200).json({ mensaje: 'Estado del pedido actualizado.', pedido: pedidoActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar estado del pedido.', error: error.message });
  }
};

const obtenerPedidosPorCliente = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const pedidos = await Pedido.obtenerPorCliente(id_cliente);
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los pedidos.', error: error.message });
  }
};

const obtenerDetallePedido = async (req, res) => {
  try {
    const { id_pedido } = req.params;
    const productos = await Pedido.obtenerProductosDePedido(id_pedido);
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el detalle del pedido.', error: error.message });
  }
};

const obtenerTodosLosPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.obtenerTodos();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los pedidos.', error: error.message });
  }
};

module.exports = { crearPedido, agregarProductoAPedido, actualizarEstadoPedido, obtenerPedidosPorCliente, obtenerDetallePedido, obtenerTodosLosPedidos };
