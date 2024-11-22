// models/Cliente.js
const pool = require('../config/db'); // Asegúrate de que la conexión a la base de datos esté configurada correctamente

class Cliente {
  static async obtenerClientePorCorreo(correo) {
    const query = "SELECT * FROM clientes WHERE correo = $1";
    const values = [correo];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  constructor({ nombre, apellidos, correo, contrasena, direccion, telefono }) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.correo = correo;
    this.contrasena = contrasena;
    this.direccion = direccion;
    this.telefono = telefono;
  }

  async save() {
    const query = `
      INSERT INTO clientes (nombre, apellidos, correo, contrasena, direccion, telefono)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      this.nombre,
      this.apellidos,
      this.correo,
      this.contrasena,
      this.direccion,
      this.telefono,
    ];
    const result = await pool.query(query, values);
    this.id_cliente = result.rows[0].id_cliente;
  }
}

module.exports = Cliente;
