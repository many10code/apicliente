const express = require('express');
const ClienteController = require('../controllers/clienteController'); 

const router = express.Router(); 

// Rutas para el cliente
router.post('/login', ClienteController.login); 
router.post('/registro', ClienteController.registro);

module.exports = router;
