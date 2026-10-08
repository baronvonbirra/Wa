-- Permitir acceso de lectura publica a todas las tablas del viaje en Supabase
CREATE POLICY "Permitir lectura publica" ON itinerary_places FOR SELECT USING (true);
CREATE POLICY "Permitir lectura publica" ON hotels FOR SELECT USING (true);
CREATE POLICY "Permitir lectura publica" ON flights FOR SELECT USING (true);
CREATE POLICY "Permitir lectura publica" ON trip_tasks FOR SELECT USING (true);
CREATE POLICY "Permitir lectura publica" ON packing_list_items FOR SELECT USING (true);
