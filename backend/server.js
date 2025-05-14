const express = require('express');
const colors = require('colors');
require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const departamentosRoutes = require('./routes/departamentosRoutes');
const reservacionesRoutes = require('./routes/reservacionesRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // <- usa el objeto, no una función

const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/departamentos', departamentosRoutes);
app.use('/api/reservaciones', reservacionesRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
