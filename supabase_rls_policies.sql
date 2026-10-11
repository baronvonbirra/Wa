-- Permitir acceso de lectura publica a todas las tablas del viaje en Supabase
-- Habilitar RLS y permitir acceso completo (lectura y escritura pública / anon / authenticated) a la tabla interactive_items
ALTER TABLE interactive_items ENABLE ROW LEVEL SECURITY;

-- Limpieza de políticas previas si existen
DROP POLICY IF EXISTS "Allow public select" ON interactive_items;
DROP POLICY IF EXISTS "Allow public insert" ON interactive_items;
DROP POLICY IF EXISTS "Allow public update" ON interactive_items;
DROP POLICY IF EXISTS "Allow public delete" ON interactive_items;

-- Políticas explícitas para acceso público (anon y authenticated)
CREATE POLICY "Allow public select" ON interactive_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert" ON interactive_items FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update" ON interactive_items FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete" ON interactive_items FOR DELETE TO anon, authenticated USING (true);
