const express = require('express');
const productRoutes = require('./routes/ProductRoutes')
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/categories', productRoutes);

module.exports = app;
