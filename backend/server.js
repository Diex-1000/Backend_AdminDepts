const express = require('express');
const colors = require('colors');
require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const departamentosRoutes = require('./routes/departamentosRoutes');
const reservacionesRoutes = require('./routes/reservacionesRoutes');


const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/departamentos', departamentosRoutes);
app.use('/api/reservaciones', reservacionesRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`🚀 Servidor corriendo en http://localhost:${port}`));
