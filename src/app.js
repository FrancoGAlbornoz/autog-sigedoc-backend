const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Para verificar que el servidor está vivo
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

module.exports = app;