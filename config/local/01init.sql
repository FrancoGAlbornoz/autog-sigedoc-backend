CREATE TYPE "estado_tramite_enum" AS ENUM (
  'En proceso',
  'Enviado',
  'Completado',
  'No completado'
);

CREATE TABLE "Piso" (
  "id_piso" SERIAL PRIMARY KEY,
  "nombre_piso" varchar NOT NULL UNIQUE
);

CREATE TABLE "Oficina" (
  "id_oficina" SERIAL PRIMARY KEY,
  "nombre_oficina" varchar NOT NULL,
  "id_piso" int NOT NULL
);

CREATE TABLE "SistemaExterno" (
  "id_sistema" SERIAL PRIMARY KEY,
  "nombre_sistema" varchar NOT NULL UNIQUE
);

CREATE TABLE "TipoDeTramite" (
  "id_tipo_tramite" SERIAL PRIMARY KEY,
  "nombre_tramite" varchar NOT NULL UNIQUE
);

CREATE TABLE "Tramite" (
  "id_tramite" SERIAL PRIMARY KEY,
  "id_oficina" int NOT NULL,
  "id_sistema" int NOT NULL,
  "id_tipo_tramite" int NOT NULL,
  "apellido_encargado" varchar NOT NULL,
  "nombre_encargado" varchar NOT NULL,
  "cargo" varchar,
  "url_pdf" varchar,
  "telefono" varchar,
  "email" varchar,
  "estado" estado_tramite_enum DEFAULT 'En proceso'
);


CREATE TABLE "Detalle" (
  "id_detalle" SERIAL PRIMARY KEY,
  "id_tramite" int NOT NULL,
  "apellido" varchar NOT NULL,
  "nombres" varchar NOT NULL,
  "cuil" varchar NOT NULL,
  "mail" varchar NOT NULL,
  "telefono" varchar,
  "id_oficina" int NOT NULL,
  "perfil" varchar,
  "condicion" varchar(50) -- <--- LO METEMOS DIRECTAMENTE ACÁ
);

-- Las relaciones se mantienen igual, el SERIAL no afecta a las FK
ALTER TABLE "Oficina" ADD FOREIGN KEY ("id_piso") REFERENCES "Piso" ("id_piso");
ALTER TABLE "Tramite" ADD FOREIGN KEY ("id_oficina") REFERENCES "Oficina" ("id_oficina");
ALTER TABLE "Tramite" ADD FOREIGN KEY ("id_sistema") REFERENCES "SistemaExterno" ("id_sistema");
ALTER TABLE "Tramite" ADD FOREIGN KEY ("id_tipo_tramite") REFERENCES "TipoDeTramite" ("id_tipo_tramite");
ALTER TABLE "Detalle" ADD FOREIGN KEY ("id_tramite") REFERENCES "Tramite" ("id_tramite");


-- CREATE TABLE "Tramite" (
--   "id_tramite" SERIAL PRIMARY KEY,
--   "id_oficina" int NOT NULL,
--   "id_sistema" int NOT NULL,
--   "id_tipo_tramite" int NOT NULL,
--   "apellido_encargado" varchar NOT NULL,
--   "nombre_encargado" varchar NOT NULL,
--   "nombre_jefe" varchar NOT NULL,
--   "cargo" varchar,
--   "url_pdf" varchar,
--   "telefono" varchar,
--   "email" varchar,
--   "estado" estado_tramite_enum DEFAULT 'En proceso'
-- );
