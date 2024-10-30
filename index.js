const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv'); 
const empleadoRoutes = require('./routes/empleadoRoutes'); 

dotenv.config(); 

const app = express(); 

app.use(cors());
app.use(express.json()); 


app.use('/api/empleados', empleadoRoutes); 

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`); 
});
