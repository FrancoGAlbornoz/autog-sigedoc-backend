function validarCrearTramite(req, res, next) {
  const {
    id_oficina,
    id_sistema,
    id_tipo_tramite,
    apellido_encargado,
    nombre_encargado,
    email,
    detalles,
  } = req.body;

  // Validar campos obligatorios del trámite
  if (!id_oficina || !id_sistema || !id_tipo_tramite) {
    return res.status(400).json({
      ok: false,
      message: 'Los campos id_oficina, id_sistema e id_tipo_tramite son obligatorios',
    });
  }

  if (!apellido_encargado || !nombre_encargado) {
    return res.status(400).json({
      ok: false,
      message: 'El apellido y nombre del encargado son obligatorios',
    });
  }

  if (!email) {
    return res.status(400).json({
      ok: false,
      message: 'El email del encargado es obligatorio',
    });
  }

  // Validar detalles
  if (!detalles || !Array.isArray(detalles) || detalles.length === 0) {
    return res.status(400).json({
      ok: false,
      message: 'Debe incluir al menos un solicitante en el trámite',
    });
  }

  // Validar campos obligatorios de cada detalle
  for (let i = 0; i < detalles.length; i++) {
    const detalle = detalles[i];

    if (!detalle.apellido || !detalle.nombres) {
      return res.status(400).json({
        ok: false,
        message: `El detalle ${i + 1} debe tener apellido y nombres`,
      });
    }

    if (!detalle.cuil) {
      return res.status(400).json({
        ok: false,
        message: `El detalle ${i + 1} debe tener CUIL`,
      });
    }

    if (!detalle.mail) {
      return res.status(400).json({
        ok: false,
        message: `El detalle ${i + 1} debe tener mail`,
      });
    }

    if (!detalle.id_oficina) {
      return res.status(400).json({
        ok: false,
        message: `El detalle ${i + 1} debe tener id_oficina`,
      });
    }
  }

  next();
}

module.exports = { validarCrearTramite };