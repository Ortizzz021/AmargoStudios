# Amargo Studios — Frontend

Aplicación web de Amargo Studios construida con **Next.js**, **TypeScript** y **Tailwind CSS**. Incluye el sitio público (landing, servicios, contacto) y un panel de administración para gestionar clientes, cotizaciones y seguimiento.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Axios (cliente HTTP con JWT)
- React Hot Toast (notificaciones)
- Zod (validación en cliente)

## Estructura

```
frontend/
├── app/           → Rutas Next.js
├── views/         → Composición de vistas
├── components/    → Componentes reutilizables
├── hooks/         → useAuth, useClientes, useCotizaciones, useSeguimiento
├── services/      → Cliente HTTP y servicios API
├── types/         → Interfaces TypeScript
└── public/images/ → Assets del sitio original
```

## Setup local

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

La app corre en [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL base del backend API (ej: `http://localhost:3001/api/v1`) |

## Páginas

### Públicas
- `/` — Landing con video YouTube (`uZxwFYIeTm0`)
- `/nosotros` — Equipo y visión (`UZRZZYEdhJQ`)
- `/servicios` — Servicios audiovisuales (`217VGGBLuew`)
- `/contacto` — Formulario de cotización (`CWZo5vesqSI`)
- `/login` y `/register` — Autenticación
- `/privacidad` — Política de datos

### Dashboard (solo admin)
- `/dashboard` — Resumen general
- `/dashboard/clientes` — CRUD de clientes
- `/dashboard/cotizaciones` — Gestión de cotizaciones
- `/dashboard/cotizaciones/[id]` — Detalle + timeline de seguimiento
- `/dashboard/perfil` — Editar perfil

## Deploy

Desplegar en **Vercel**:

1. Conectar el repositorio
2. Root directory: `frontend`
3. Variable de entorno: `NEXT_PUBLIC_API_URL` apuntando al backend en Render/Railway

## Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run start    # Servidor producción
npm run lint     # ESLint
```
