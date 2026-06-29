const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => res.json({ msg: 'CosmoBrains API 🚀' }));

module.exports = app;
