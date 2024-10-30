const pool = require('../config/db'); 
const bcrypt = require('bcrypt')

class Empleado {
    static async obtenerEmpleados() {
        try {
            const query = 'SELECT * FROM empleados';
            const { rows } = await pool.query(query);
            return rows; 
        } catch (error) {
            console.error('Error al obtener empleados:', error);
            throw error; 
        }
    }
    static async actualizarEmpleado(id_empleado, data) {
        const { nombre, apellido_paterno, apellido_materno, correo, rol } = data;

        try {
            const query = `
                UPDATE empleados
                SET nombre = $1, apellido_paterno = $2, apellido_materno = $3, correo = $4, rol = $5
                WHERE id_empleado = $6
                RETURNING *`;
            const { rows } = await pool.query(query, [nombre, apellido_paterno, apellido_materno, correo, rol, id_empleado]);

            if (rows.length === 0) {
                return null;
            }

            return {
                mensaje: 'Empleado actualizado exitosamente.',
                empleado: rows[0]
            };
        } catch (error) {
            console.error('Error al actualizar empleado:', error);
            throw error; 
        }
    }
    static async insertarEmpleado(data) {
        const { nombre, apellido_paterno, apellido_materno, correo, contrasena, rol } = data;

        try {
          
            const result = await pool.query('SELECT * FROM empleados WHERE correo = $1', [correo]);
            if (result.rows.length > 0) {
                return { error: 'El correo ya está registrado.' };
            }

            const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

          
            const nuevoEmpleado = await pool.query(
                'INSERT INTO empleados (nombre, apellido_paterno, apellido_materno, correo, contrasena, rol) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [nombre, apellido_paterno, apellido_materno, correo, contrasenaEncriptada, rol]
            );

            return {
                mensaje: 'Empleado registrado exitosamente.',
                empleado: nuevoEmpleado.rows[0] 
            };
        } catch (error) {
            console.error('Error al insertar empleado:', error);
            throw error; 
        }
    }

    static async obtenerEmpleadoPorCorreo(correo) {
        try {
            const query = 'SELECT * FROM empleados WHERE correo = $1';
            const { rows } = await pool.query(query, [correo]);
            return rows[0]; 
        } catch (error) {
            console.error('Error al obtener el empleado por correo:', error);
            throw error; 
        }
    }

    static async eliminarEmpleado(id_empleado) {
        try {
            const query = 'DELETE FROM empleados WHERE id_empleado = $1 RETURNING *'; 
            const { rows } = await pool.query(query, [id_empleado]);
            
       
            if (rows.length === 0) {
                return null; 
            }
    
            return {
                mensaje: 'Empleado eliminado exitosamente.',
            };
        } catch (error) {
            console.error('Error al eliminar empleado:', error);
            throw error; 
        }
    }
    
}


module.exports = Empleado;
