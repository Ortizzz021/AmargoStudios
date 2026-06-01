# Amargo Studios - Frontend

Frontend del sistema de gestión de clientes, cotizaciones y seguimientos para la agencia audiovisual Amargo Studios.

## Tecnologías

- **Framework:** Next.js 16
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Cliente HTTP:** Axios
- **Validación:** Zod v4
- **Iconos:** Lucide React
- **Notificaciones:** react-hot-toast

## Requisitos Previos

1. Clonar el repositorio
2. Tener Node.js >= 18 instalado

## Instalación

```bash
npm install
```

## Configuración

Crear un archivo `.env.local` en la raíz del proyecto con:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Compila para producción
npm run start    # Inicia servidor de producción
npm run lint     # Ejecuta ESLint
```

## Estructura del Proyecto

```
frontend/
├── app/                # Páginas (Next.js App Router)
│   ├── admin/          # Login
│   ├── dashboard/      # Panel admin (protegido)
│   ├── register/       # Registro
│   ├── contacto/       # Formulario de contacto público
│   ├── nosotros/       # Página "Nosotros"
│   ├── servicios/      # Página "Servicios"
│   ├── privacidad/     # Política de privacidad
│   └── not-found.tsx   # Página 404
├── components/         # Componentes reutilizables
├── hooks/              # Custom hooks (auth, clientes, cotizaciones, seguimiento)
├── services/           # Capa de servicios API
├── types/              # Interfaces de TypeScript
├── views/              # Componentes de página (lógica de UI)
└── lib/                # Utilidades
```

## Endpoints que consume

| Recurso | Métodos |
|---------|---------|
| /api/v1/auth | POST /login, POST /register |
| /api/v1/clientes | GET, POST, PUT, DELETE |
| /api/v1/cotizaciones | GET, POST, PUT, DELETE |
| /api/v1/seguimiento | GET, POST, DELETE |
| /api/v1/perfiles | GET, PUT |
| /api/v1/contact | POST |
