# Real Manin FC

Aplicación mobile-first para saber cuándo juega Real Manin FC y quién viene a cada partido. Incluye selección rápida de jugador, calendario completo, respuestas `Voy`, `Dudoso` y `No voy`, convocatoria por jornada y persistencia compartida con Supabase.

## Requisitos

- Node.js 20 o superior
- Un proyecto Supabase

## Instalación

```bash
npm install
copy .env.example .env
npm run dev
```

Sin variables de Supabase la app arranca en modo local de previsualización con el calendario real incluido. Las respuestas no se comparten entre dispositivos hasta configurar Supabase.

## Variables de entorno

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-publica
VITE_BASE_PATH=/real_manin_fc/
```

No uses nunca `service_role` en el frontend.

## Configurar Supabase

1. Crea un proyecto nuevo en Supabase.
2. Abre el SQL Editor y ejecuta [`supabase/schema.sql`](supabase/schema.sql).
3. Ejecuta [`supabase/seed.sql`](supabase/seed.sql).
4. Copia la URL y la clave `anon` en `.env`.
5. Reinicia `npm run dev`.

La aplicación usa RLS con acceso de enlace para un grupo pequeño sin autenticación tradicional: cualquiera que tenga el enlace puede leer el calendario y las convocatorias, responder y añadir un nombre de invitado. Es una decisión deliberada para este caso de uso; añade autenticación y políticas más restrictivas si la aplicación deja de ser privada.

## Ejecutar y comprobar

```bash
npm run dev
npm run lint
npm test
npm run build
```

## Desplegar en GitHub Pages

El workflow [`deploy.yml`](.github/workflows/deploy.yml) instala, valida, compila y publica automáticamente al hacer push a `main`. En GitHub, activa Pages con la fuente **GitHub Actions** y crea los secrets `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`. El workflow calcula automáticamente la ruta del repositorio para Vite.

## Actualizar calendario

Edita la lista de jornadas en `supabase/seed.sql` y vuelve a ejecutarla en el SQL Editor. El calendario inicial se transcribió del asset real `calendario-real-manin-2026-2027.jpg` incluido en el paquete; la sede es Escola Pia F7 en todas las filas visibles.

## Añadir jugadores

Los jugadores habituales iniciales están en `supabase/seed.sql`. Para participantes extra, usa `Otro jugador` u `Otro fan` desde la app: se normalizan espacios, se reutiliza un nombre existente sin distinguir mayúsculas y se crea con su tipo correspondiente. La convocatoria separa ambos grupos.

## Estructura

- `src/pages`: Inicio, Calendario, Convocatoria y detalle de partido.
- `src/components`: tarjetas, navegación, asistencia, selector e identidad visual.
- `src/lib`: fechas en `Europe/Madrid`, nombres y lógica de asistencia.
- `src/services/supabase.ts`: acceso a datos y Realtime.
- `supabase/`: esquema, RLS y seed real.
