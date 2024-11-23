const db = require('../config/db');

const Pedido = {
  crear: async (pedido) => {
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      const queryPedido = `
        INSERT INTO pedidos (id_cliente, fecha_recogida, hora_recogida, total, qr_code, estado_pedido)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
      const valuesPedido = [
        pedido.id_cliente,
        pedido.fecha_recogida,
        pedido.hora_recogida,
        pedido.total,
        pedido.qr_code,
        pedido.estado_pedido || 'pendiente',
      ];
      const resultPedido = await client.query(queryPedido, valuesPedido);
      const nuevoPedido = resultPedido.rows[0];

      for (const producto of pedido.productos) {
        const queryProducto = `
          INSERT INTO productos_pedido (id_pedido, id_producto, cantidad)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
        const valuesProducto = [nuevoPedido.id_pedido, producto.id_producto, producto.cantidad];
        await client.query(queryProducto, valuesProducto);
      }

      await client.query('COMMIT');
      return nuevoPedido;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  agregarProducto: async (productoPedido) => {
    const query = `
      INSERT INTO productos_pedido (id_pedido, id_producto, cantidad)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [productoPedido.id_pedido, productoPedido.id_producto, productoPedido.cantidad];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  obtenerPorCliente: async (id_cliente) => {
    const query = `SELECT * FROM pedidos WHERE id_cliente = $1 ORDER BY fecha_pedido DESC;`;
    const result = await db.query(query, [id_cliente]);
    return result.rows;
  },

  obtenerProductosDePedido: async (id_pedido) => {
    const query = `
      SELECT p.nombre, pp.cantidad, p.precio, (pp.cantidad * p.precio) AS subtotal
      FROM productos_pedido pp
      JOIN productos p ON pp.id_producto = p.id_producto
      WHERE pp.id_pedido = $1;
    `;
    const result = await db.query(query, [id_pedido]);
    return result.rows;
  },

  actualizarEstado: async (id_pedido, estado_pedido) => {
    const query = `
      UPDATE pedidos
      SET estado_pedido = $1
      WHERE id_pedido = $2
      RETURNING *;
    `;
    const result = await db.query(query, [estado_pedido, id_pedido]);
    return result.rows[0];
  },

  obtenerTodos: async () => {
    const query = `SELECT * FROM pedidos ORDER BY fecha_pedido DESC;`;
    const result = await db.query(query);
    return result.rows;
  },
};

module.exports = Pedido;

