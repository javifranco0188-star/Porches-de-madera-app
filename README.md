# Porches de Madera Baratos — app v3

Aplicación Expo / React Native para Android, iOS y web.

## Incluye
- Inicio con acceso a presupuesto, trabajos, WhatsApp y llamada.
- Catálogo editable: precio, imagen, categoría, descripción y orden.
- Solicitud de presupuesto con consentimiento de privacidad.
- Seguimiento del estado del pedido.
- Galería de trabajos.
- Reseñas destacadas.
- Panel privado de administración.

## Supabase
1. Conecta un proyecto Supabase.
2. Ejecuta `supabase/schema.sql`.
3. Activa Anonymous sign-ins para clientes.
4. Crea el usuario administrador en Authentication > Users.
5. Inserta su UUID en `public.admins`.
6. Configura `EXPO_PUBLIC_SUPABASE_URL` y `EXPO_PUBLIC_SUPABASE_ANON_KEY`.

## APK de prueba
El workflow `Android APK de prueba` genera un APK debug instalable y lo guarda como artefacto de GitHub Actions.

## Publicación
- Android / Google Play: AAB de producción mediante EAS.
- iPhone / App Store: build iOS mediante EAS/TestFlight.
