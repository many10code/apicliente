const express = require('express');
const ClienteController = require('../controllers/clienteController'); 

const router = express.Router(); 

// Rutas para el cliente
router.post('/login', ClienteController.login); 
router.post('/registro', ClienteController.registro);
router.get('/:id', ClienteController.obtenerClientePorId); // Añadir la ruta para obtener un cliente por ID

module.exports = router;
