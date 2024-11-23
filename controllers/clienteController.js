const bcrypt = require('bcrypt');
const Cliente = require('../models/clienteModel');

class ClienteController {
  // Método para el login
  static async login(req, res) {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res
        .status(400)
        .json({ mensaje: "Por favor proporciona un correo y una contraseña." });
    }

    try {
      const cliente = await Cliente.obtenerClientePorCorreo(correo);
      if (!cliente) {
        return res
          .status(401)
          .json({ mensaje: "Correo o contraseña incorrectos." });
      }

      const coincide = await bcrypt.compare(contrasena, cliente.contrasena);
      if (!coincide) {
        return res
          .status(401)
          .json({ mensaje: "Correo o contraseña incorrectos." });
      }

      res.json({
        mensaje: "Inicio de sesión exitoso.",
        cliente: {
          id: cliente.id_cliente,
          correo: cliente.correo,
          rol: cliente.rol,
        },
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(500).json({ mensaje: "Error en el servidor." });
    }
  }

  // Método para el registro
  static async registro(req, res) {
    const { nombre, apellidos, correo, contrasena, direccion, telefono } = req.body;

    if (!nombre || !correo || !contrasena || !direccion || !telefono) {
      return res
        .status(400)
        .json({ mensaje: "Por favor proporciona todos los datos requeridos." });
    }

    try {
      const hashContrasena = await bcrypt.hash(contrasena, 10);
      const nuevoCliente = new Cliente({
        nombre,
        apellidos,
        correo,
        contrasena: hashContrasena,
        direccion,
        telefono,
      });

      await nuevoCliente.save();

      res.json({
        mensaje: "Registro exitoso.",
        cliente: {
          id: nuevoCliente.id_cliente,
          correo: nuevoCliente.correo,
          rol: "cliente",
        },
      });
    } catch (error) {
      console.error("Error al registrar:", error);
      res.status(500).json({ mensaje: "Error en el servidor." });
    }
  }

  // Método para obtener un cliente por ID
  static async obtenerClientePorId(req, res) {
    const { id } = req.params;

    try {
      const cliente = await Cliente.obtenerClientePorId(id);
      if (!cliente) {
        return res.status(404).json({ mensaje: "Cliente no encontrado." });
      }

      res.json(cliente);
    } catch (error) {
      console.error("Error al obtener el cliente:", error);
      res.status(500).json({ mensaje: "Error en el servidor." });
    }
  }
}

module.exports = ClienteController;
