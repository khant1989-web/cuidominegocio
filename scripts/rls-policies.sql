-- ============================================================
-- SE+ Cuido Mi Negocio — Row Level Security (RLS) Policies
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. HABILITAR RLS EN TODAS LAS TABLAS
-- ------------------------------------------------------------
ALTER TABLE beneficiarios           ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipo_registro           ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipo_documento          ENABLE ROW LEVEL SECURITY;
ALTER TABLE evento_caracterizacion  ENABLE ROW LEVEL SECURITY;
ALTER TABLE evento_entrega          ENABLE ROW LEVEL SECURITY;
ALTER TABLE acta_firmada            ENABLE ROW LEVEL SECURITY;


-- 2. TABLA PRINCIPAL: beneficiarios
--    Solo usuarios autenticados pueden leer, crear, actualizar.
--    No se permite DELETE físico (soft delete via deleted_at).
-- ------------------------------------------------------------
CREATE POLICY "beneficiarios_select"
  ON beneficiarios FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "beneficiarios_insert"
  ON beneficiarios FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "beneficiarios_update"
  ON beneficiarios FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- No se crea policy de DELETE → el borrado es lógico (deleted_at)


-- 3. TABLAS CATÁLOGO: solo lectura para autenticados
--    (tipo_registro, tipo_documento, evento_*, acta_firmada)
-- ------------------------------------------------------------
CREATE POLICY "tipo_registro_select"
  ON tipo_registro FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "tipo_documento_select"
  ON tipo_documento FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "evento_caracterizacion_select"
  ON evento_caracterizacion FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "evento_entrega_select"
  ON evento_entrega FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "acta_firmada_select"
  ON acta_firmada FOR SELECT
  TO authenticated USING (true);


-- 4. VERIFICAR ESTADO (opcional, para confirmar)
-- ------------------------------------------------------------
-- SELECT tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public';
