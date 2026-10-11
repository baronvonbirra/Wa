-- Permitir acceso de lectura publica a todas las tablas del viaje en Supabase
-- Habilitar RLS y permitir acceso completo (lectura y escritura pública/anon) a la tabla interactive_items
ALTER TABLE interactive_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select" ON interactive_items;
CREATE POLICY "Allow public select" ON interactive_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert" ON interactive_items;
CREATE POLICY "Allow public insert" ON interactive_items FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update" ON interactive_items;
CREATE POLICY "Allow public update" ON interactive_items FOR UPDATE WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete" ON interactive_items;
CREATE POLICY "Allow public delete" ON interactive_items FOR DELETE USING (true);
