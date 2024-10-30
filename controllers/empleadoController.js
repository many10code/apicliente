const { response } = require('express'); 
const bcrypt = require('bcrypt'); 
const Empleado = require('../models/empleadoModel'); 

class EmpleadoController {
    static async obtenerEmpleados(req, res) {
        try {
            const empleados = await Empleado.obtenerEmpleados();
            res.json(empleados); 
        } catch (error) {
            console.error('Error al obtener empleados:', error);
            res.status(500).json({ mensaje: 'Error en el servidor.' });
        }
    }

    static async actualizarEmpleado(req, res) {
        const { id_empleado } = req.params; 
        const data = req.body; 

        try {
            const resultado = await Empleado.actualizarEmpleado(id_empleado, data);

            if (!resultado) {
                return res.status(404).json({ mensaje: 'Empleado no encontrado.' });
            }

            res.status(200).json(resultado);
        } catch (error) {
            console.error('Error al actualizar empleado:', error);
            res.status(500).json({ mensaje: 'Error al actualizar empleado.', error: error.message });
        }
    }
   
    static async login(req, res) {
        const { correo, contrasena } = req.body; 

        
        if (!correo || !contrasena) {
            return res.status(400).json({ mensaje: 'Por favor proporciona un correo y una contraseña.' });
        }

        try {
      
            const empleado = await Empleado.obtenerEmpleadoPorCorreo(correo);
            if (!empleado) {
                return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' });
            }

            const coincide = await bcrypt.compare(contrasena, empleado.contrasena);
            if (!coincide) {
                return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' });
            }

        
            res.json({
                mensaje: 'Inicio de sesión exitoso.',
                empleado: {
                    id: empleado.id_empleado,
                    correo: empleado.correo,
                    rol: empleado.rol,
                },
            });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ mensaje: 'Error en el servidor.' });
        }
    }

    static async insertarEmpleado(req, res) {
     
        try {
            const resultado = await Empleado.insertarEmpleado(req.body);
           
            if (resultado.error) {
                return res.status(400).json({ mensaje: resultado.error });
            }

            
            res.status(201).json(resultado);
        } catch (error) {
            console.error('Error al insertar empleado:', error);
            res.status(500).json({ mensaje: 'Error al insertar empleado.', error: error.message });
        }
    }

    static async eliminarEmpleado(req, res) {
        const { id_empleado } = req.params;
        console.log('Eliminando empleado con ID:', id_empleado); 

        try {
            const resultado = await Empleado.eliminarEmpleado(id_empleado);
            if (!resultado) {
                console.log('Empleado no encontrado para eliminar.'); 
                return res.status(404).json({ mensaje: 'Empleado no encontrado.' });
            }

            console.log('Empleado eliminado exitosamente:', resultado.empleado); 
            res.status(200).json(resultado);
        } catch (error) {
            console.error('Error al eliminar empleado:', error);
            res.status(500).json({ mensaje: 'Error al eliminar empleado.', error: error.message });
        }
    }
    
}

module.exports = EmpleadoController;
