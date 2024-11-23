const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv'); 
const clienteRoutes = require('./routes/clienteRoutes'); 
const pedidoRoutes = require('./routes/pedidoRoutes'); // Importar las rutas de pedidos

dotenv.config(); 

const app = express(); 

// Middleware
app.use(cors());
app.use(express.json()); 

// Rutas
app.use('/api/cliente', clienteRoutes); 
app.use('/api/pedidos', pedidoRoutes); // Agregar las rutas de pedidos

// Configurar el puerto
const port = process.env.PORT || 3000;

// Iniciar el servidor solo si el módulo principal es este archivo
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;

