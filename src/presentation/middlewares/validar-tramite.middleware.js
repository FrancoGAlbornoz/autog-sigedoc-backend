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

  // --- NUEVA LÓGICA DE VALIDACIÓN CONDICIONAL ---
  // Solo validamos 'detalles' si es Alta (1) o Baja (2)
  if (id_tipo_tramite === 1 || id_tipo_tramite === 2) {

    if (!detalles || !Array.isArray(detalles) || detalles.length === 0) {
      return res.status(400).json({
        ok: false,
        message: 'Debe incluir al menos un solicitante en el trámite',
      });
    }

    // Validar campos obligatorios de cada detalle
    for (let i = 0; i < detalles.length; i++) {
      const detalle = detalles[i];

      // Exigimos nombres y apellido siempre para Alta/Baja
      if (!detalle.apellido || !detalle.nombres) {
        return res.status(400).json({
          ok: false,
          message: `El detalle ${i + 1} debe tener apellido y nombres`,
        });
      }

      // Si es Alta (1), exigimos CUIL y Mail
      if (id_tipo_tramite === 1) {
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
      }

      // Si es Baja (2), exigiremos 'usuario_sigedoc'
      if (id_tipo_tramite === 2) {
        if (!detalle.usuario_sigedoc) {
          return res.status(400).json({
            ok: false,
            message: `El detalle ${i + 1} debe tener el usuario de Sigedoc`,
          });
        }
      }
    }
  }

  // Si pasa todas las validaciones pertinentes, sigue su curso
  next();
}

module.exports = { validarCrearTramite };