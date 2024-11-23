const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv'); 
const clienteRoutes = require('./routes/clienteRoutes'); 

dotenv.config(); 

const app = express(); 

app.use(cors());
app.use(express.json()); 

app.use('/api/cliente', clienteRoutes); 

// Configurar el puerto
const port = process.env.PORT || 3000;

// Solo arrancar el servidor si se ejecuta directamente este archivo
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Exportar la aplicación para las pruebas
module.exports = app;
