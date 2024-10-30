const express = require('express');
const EmpleadoController = require('../controllers/empleadoController'); 

const router = express.Router(); 


router.post('/login', EmpleadoController.login); 
router.post('/insertar', EmpleadoController.insertarEmpleado);
router.delete('/:id_empleado', EmpleadoController.eliminarEmpleado);
router.get('/', EmpleadoController.obtenerEmpleados); 
router.put('/:id_empleado', EmpleadoController.actualizarEmpleado);
module.exports = router; 
