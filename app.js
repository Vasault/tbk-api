const express = require('express');
const posRoutes = require('./routes/posRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(express.json());
app.use(logger);

// Rutas
app.use('/transbank', posRoutes);

// Middleware para manejo de errores
app.use(errorHandler);

module.exports = app;
