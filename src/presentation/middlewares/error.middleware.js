function errorHandler(err, req, res, next) {
  console.error(`[Error] ${req.method} ${req.url} →`, err.message);

  // Errores de validación del dominio (value objects)
  if (err.message.includes('inválido') || err.message.includes('requerido')) {
    return res.status(400).json({ ok: false, message: err.message });
  }

  // Error de foreign key en PostgreSQL
  if (err.code === '23503') {
    return res.status(400).json({ ok: false, message: 'El recurso referenciado no existe' });
  }

  // Error de valor único duplicado en PostgreSQL
  if (err.code === '23505') {
    return res.status(409).json({ ok: false, message: 'El registro ya existe' });
  }

  // Error genérico
  return res.status(500).json({
    ok: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Error interno del servidor'
      : err.message,
  });
}

module.exports = errorHandler;