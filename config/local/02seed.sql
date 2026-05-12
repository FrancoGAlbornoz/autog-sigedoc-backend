INSERT INTO "Piso" (nombre_piso) VALUES ('Planta Baja'), ('Piso 1'), ('Piso 2');

INSERT INTO "Oficina" (nombre_oficina, id_piso) VALUES 
-- PLANTA BAJA (id_piso = 1)
('Tesoreria', 1),
('Mesa de Entrada', 1),
('Liquidacion de Haberes', 1),
('Secretaria Privada de Ganaderia y Alimentos', 1),
('Direccion de Ganaderia y Alimentos', 1),
('Tesoreria Tabaco', 1),
('Subdireccion de Suelos', 1),
('Automotor', 1),
('Area Tecnica de Ganaderia y Alimentos', 1),
('Servicio Contable', 1),
('Mayordomia', 1),
('Viaticos', 1),
('Departamento de Suelos', 1),
('Contable (Ex Com)', 1),
('Administracion de Personal', 1),
('Compras', 1),

-- PISO 1 (id_piso = 2)
('Direccion de Alimentos', 2),
('ANP', 2),
('Subdireccion de Alimentos', 2),
('Direccion de Flora y Fauna', 2),
('Jurdico', 2),
('Direccion de Industria y Comercio Exterior', 2),
('OTBN', 2),
('Cartografia', 2),

-- PISO 2 (id_piso = 3)
('Jefa De Despacho', 3),
('Despacho', 3),
('Oficina SubSecretario', 3),
('Secretaria Privada', 3),
('Administracion y Despacho', 3),
('Director FFSyS', 3);

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

-- 2. Insertar Trámite y múltiples Detalles usando un solo bloque
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
        2,                    -- id_oficina (Ordenamiento Territorial)
        2,                    -- id_sistema (SAFYC)
        1,                    -- id_tipo_tramite (Alta)
        'Lopez', 
        'Maria', 
        'Jefa de Área', 
        '3814999999', 
        'm.lopez@mdesarrollo.gob.ar', 
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
    nuevo_tramite.id_tramite, 
    d.apellido, 
    d.nombres, 
    d.cuil, 
    d.mail, 
    d.telefono, 
    d.id_oficina, 
    d.perfil
FROM nuevo_tramite, (VALUES 
    -- Usuario 1
    ('Gomez', 'Ana', '27-98765432-1', 'ana.gomez@mail.com', '3814000001', 2, 'editor'),
    -- Usuario 2
    ('Rodriguez', 'Luis', '20-11223344-5', 'l.rodriguez@mail.com', '3814000002', 2, 'consulta'),
    -- Usuario 3
    ('Sosa', 'Beatriz', '23-55667788-9', 'b.sosa@mail.com', NULL, 2, 'administrador')
) AS d(apellido, nombres, cuil, mail, telefono, id_oficina, perfil);