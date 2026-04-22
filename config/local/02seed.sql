--Seed o semilla inicial para poblar las tablas con datos de ejemplo

INSERT INTO "Piso" (nombre_piso) VALUES ('Planta Baja'), ('Piso 1'), ('Piso 2');

INSERT INTO "Oficina" (nombre_oficina, id_piso) VALUES 
('Servicio Contable', 1),
('Ordenamiento Territorial de Bosques Nativos', 2),
('Administracion y despacho', 3);

INSERT INTO "SistemaExterno" (nombre_sistema) VALUES ('SIGEDOC'), ('SAFYC'), ('SIAL');

INSERT INTO "TipoDeTramite" (nombre_tramite) VALUES ('Alta'), ('Baja'), ('Modificacion');