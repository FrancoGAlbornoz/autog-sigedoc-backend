INSERT INTO "Piso" (nombre_piso) VALUES ('Planta Baja'), ('Piso 1'), ('Piso 2');

INSERT INTO "Oficina" (nombre_oficina, id_piso) VALUES 
('Servicio Contable', 1),
('Ordenamiento Territorial de Bosques Nativos', 2),
('Administracion y despacho', 3);

INSERT INTO "SistemaExterno" (nombre_sistema) VALUES ('SIGEDOC'), ('SAFYC'), ('SIAL');

INSERT INTO "TipoDeTramite" (nombre_tramite) VALUES ('Alta'), ('Baja'), ('Modificacion');

-- 2. Insertar Trámite y sus Detalles usando CTE para capturar el ID generado
-- Esto asegura que el detalle se vincule correctamente al trámite recién creado
WITH nuevo_tramite AS (
    INSERT INTO "Tramite" (
        "id_oficina", 
        "id_sistema", 
        "id_tipo_tramite", 
        "apellido_encargado", 
        "nombre_encargado", 
        "cargo", 
        "telefono", 
        "email", 
        "estado"
    ) 
    VALUES (
        1,                    -- id_oficina (Servicio Contable)
        1,                    -- id_sistema (SIGEDOC)
        1,                    -- id_tipo_tramite (Alta)
        'García', 
        'Juan', 
        'Analista', 
        '3814123456', 
        'juan@empresa.com', 
        'En proceso'
    )
    RETURNING "id_tramite"
)
INSERT INTO "Detalle" (
    "id_tramite", 
    "apellido", 
    "nombres", 
    "cuil", 
    "mail", 
    "telefono", 
    "id_oficina", 
    "perfil"
)
SELECT 
    "id_tramite", 
    'Pérez', 
    'Carlos', 
    '20-12345678-9', 
    'carlos@empresa.com', 
    '3814111111', 
    1,                        -- id_oficina del detalle
    'consulta'
FROM nuevo_tramite;