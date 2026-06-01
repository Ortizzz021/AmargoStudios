# 🎬 Amargo Studios - Frontend

Frontend profesional del sistema de gestión de clientes, cotizaciones y seguimientos para la agencia audiovisual Amargo Studios. Interfaz moderna construida con Next.js, TypeScript y Tailwind CSS.

## 📋 Tabla de Contenidos

- [Tecnologías](#-tecnologías)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecutar](#-ejecutar)
- [Estructura](#-estructura)
- [Características](#-características)
- [Autenticación](#-autenticación)
- [Componentes](#-componentes)
- [Hooks](#-hooks)
- [Troubleshooting](#-troubleshooting)

## 🛠️ Tecnologías

| Componente | Versión | Propósito |
|-----------|---------|----------|
| **Next.js** | 16.2 | Framework React |
| **React** | 19.2 | Librería UI |
| **TypeScript** | 5.0 | Tipado estático |
| **Tailwind CSS** | 4.0 | Estilos CSS |
| **Axios** | 1.16 | Cliente HTTP |
| **Zod** | 4.4 | Validación de esquemas |
| **Lucide React** | - | Iconos |
| **react-hot-toast** | - | Notificaciones |
| **ESLint** | 9.0 | Linting |
| **Prettier** | 3.8 | Formateo |

## 📋 Requisitos

- **Node.js** 18 o superior
- **npm** 9+ o **yarn**
- **Backend API** ejecutándose en `http://localhost:3001`
- **Git**

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repo-url>
cd AmargoStudios/frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto frontend:

```bash
cp .env.example .env.local
```

Edita `.env.local`:

```env
# URL de la API Backend
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

**Nota**: Las variables prefijadas con `NEXT_PUBLIC_` son públicas y accesibles en el navegador. No incluyas secretos ahí.

## ▶️ Ejecutar

### Desarrollo (con hot reload)

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

**Credenciales de prueba:**
- Email: `admin@admin.com`
- Contraseña: `Admin123!`

### Producción

```bash
# Compilar para producción
npm run build

# Iniciar servidor de producción
npm run start
```

## ⚙️ Configuración Adicional

### Lint y Formateo

```bash
# Ejecutar ESLint
npm run lint

# Formatear código automáticamente
npm run format

# Verificar tipos TypeScript
npm run type-check
```

## 📁 Estructura del Proyecto

```
frontend/
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # Layout del área admin
│   │   └── page.tsx            # Página de login
│   ├── dashboard/
│   │   ├── layout.tsx          # Layout del dashboard
│   │   ├── page.tsx            # Dashboard home (stats)
│   │   ├── clientes/
│   │   │   └── page.tsx        # Gestión de clientes
│   │   ├── cotizaciones/
│   │   │   ├── page.tsx        # Listado de cotizaciones
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Detalle de cotización
│   │   └── perfil/
│   │       └── page.tsx        # Editar perfil
│   ├── contacto/
│   │   └── page.tsx            # Formulario de contacto público
│   ├── nosotros/
│   │   └── page.tsx            # Página "Nosotros"
│   ├── servicios/
│   │   └── page.tsx            # Página de servicios
│   ├── privacidad/
│   │   └── page.tsx            # Política de privacidad
│   ├── register/
│   │   └── page.tsx            # Registro de usuarios
│   ├── layout.tsx              # Layout raíz
│   ├── page.tsx                # Home público
│   ├── globals.css             # Estilos globales
│   └── not-found.tsx           # Página 404
│
├── components/
│   ├── AdminRoute.tsx          # Rutas solo admin
│   ├── PrivateRoute.tsx        # Rutas autenticadas
│   ├── Navbar.tsx              # Barra de navegación
│   ├── Footer.tsx              # Footer
│   ├── FormField.tsx           # Inputs reutilizables
│   ├── Modal.tsx               # Modal genérico
│   ├── LoadingSpinner.tsx      # Spinner de carga
│   ├── ErrorMessage.tsx        # Componente de error
│   ├── EmptyState.tsx          # Estado vacío
│   ├── ScrollAnimations.tsx    # Animaciones en scroll
│   ├── ToastProvider.tsx       # Notificaciones toast
│   └── dashboard/
│       ├── ClientesTable.tsx   # Tabla de clientes
│       ├── CotizacionesTable.tsx # Tabla de cotizaciones
│       ├── SeguimientoTimeline.tsx # Timeline de seguimiento
│       └── DashboardStats.tsx  # Tarjetas de estadísticas
│
├── hooks/
│   ├── useAuth.tsx             # Contexto de autenticación
│   ├── useClientes.ts          # Hook de clientes
│   ├── useCotizaciones.ts      # Hook de cotizaciones
│   └── useSeguimiento.ts       # Hook de seguimientos
│
├── services/
│   ├── api.ts                  # Cliente Axios con interceptores
│   ├── authService.ts          # Servicio de autenticación
│   ├── clienteService.ts       # Servicio de clientes
│   ├── cotizacionService.ts    # Servicio de cotizaciones
│   ├── seguimientoService.ts   # Servicio de seguimientos
│   ├── perfilService.ts        # Servicio de perfiles
│   └── contactService.ts       # Servicio de contacto
│
├── types/
│   └── index.ts                # Interfaces compartidas
│
├── views/
│   ├── LoginPage.tsx           # Vista de login
│   ├── RegisterPage.tsx        # Vista de registro
│   ├── HomePage.tsx            # Vista home
│   ├── ContactPage.tsx         # Vista de contacto
│   ├── ServicesPage.tsx        # Vista de servicios
│   ├── AboutPage.tsx           # Vista de nosotros
│   └── dashboard/
│       ├── DashboardHomePage.tsx
│       ├── ClientesDashboardPage.tsx
│       ├── CotizacionesDashboardPage.tsx
│       └── CotizacionDetailPage.tsx
│
├── lib/
│   └── utils.ts                # Utilidades
│
├── public/
│   └── images/                 # Imágenes estáticas
│
├── next.config.ts              # Configuración Next.js
├── tsconfig.json               # Configuración TypeScript
├── tailwind.config.ts          # Configuración Tailwind
├── postcss.config.mjs          # Configuración PostCSS
└── .env.example                # Variables de ejemplo
```

## ⭐ Características

### 📱 Página Pública
- Home con hero section y servicios
- Página de "Nosotros"
- Catálogo de servicios
- Formulario de contacto
- Política de privacidad
- Responsive design

### 🔐 Autenticación
- ✅ Login con email/contraseña
- ✅ Registro de nuevos usuarios
- ✅ Logout seguro
- ✅ Persistencia de sesión en localStorage
- ✅ Protección de rutas (PrivateRoute, AdminRoute)
- ✅ Redirección automática 401 al login

### 📊 Dashboard Admin
- **Home**: Estadísticas principales, conteo de clientes, estados de cotizaciones
- **Clientes**: Listado, búsqueda, crear, editar, eliminar
- **Cotizaciones**: Listado con filtros, detalle con historial de seguimiento
- **Perfil**: Editar información personal
- **Paginación**: En todos los listados

### 🎨 Componentes Reutilizables
- Inputs con validación y mensajes de error
- Modal genérico
- Tabla de datos
- Spinner de carga
- Estados vacíos
- Tarjetas de estadísticas

## 🔐 Autenticación

### Flujo de Login

1. Usuario ingresa email y contraseña
2. API valida credenciales
3. Backend retorna JWT token
4. Frontend guarda token en `localStorage`
5. Axios interceptor agrega token en headers
6. Token se envía en cada petición: `Authorization: Bearer <token>`

### Persistencia de Sesión

```typescript
// Datos almacenados en localStorage
- amargo_token: JWT token
- PERFIL_KEY: Datos del usuario

// Al recargar la página:
- Se restauran automáticamente desde localStorage
- Se valida el token
- Si es inválido, redirige a login
```

### Manejo de 401

Cuando la API retorna 401 (token expirado o inválido):
1. Axios interceptor lo detecta
2. Limpia el token de localStorage
3. Redirige a `/admin` (login)

## 🪝 Hooks Personalizados

### useAuth()

Proporciona contexto de autenticación:

```typescript
const { 
  isAuthenticated,   // boolean
  isAdmin,          // boolean
  user,             // Perfil actual
  login,            // (credentials) => Promise
  register,         // (data) => Promise
  logout,           // () => void
  isLoading         // boolean
} = useAuth();
```

### useClientes()

Gestiona estado de clientes:

```typescript
const {
  clientes,         // Cliente[]
  isLoading,        // boolean
  error,            // string | null
  paginationMeta,   // { page, total, totalPages }
  fetchClientes,    // () => Promise
  createCliente,    // (data) => Promise
  updateCliente,    // (id, data) => Promise
  deleteCliente,    // (id) => Promise
} = useClientes();
```

### useCotizaciones()

Gestiona estado de cotizaciones con filtros:

```typescript
const {
  cotizaciones,     // Cotizacion[]
  filters,          // { estado, fechaDesde, ... }
  fetchCotizaciones,
  createCotizacion,
  updateCotizacion,
  deleteCotizacion,
  setFilters,
} = useCotizaciones();
```

### useSeguimiento()

Gestiona notas de seguimiento:

```typescript
const {
  seguimientos,     // Seguimiento[]
  fetchSeguimientos,
  createSeguimiento,
  deleteSeguimiento,
} = useSeguimiento();
```

## 📡 Servicios API

Todos los servicios usan Axios con autenticación automática.

### authService

```typescript
await authService.login({ email, password });
await authService.register({ email, password, nombre_completo });
await authService.logout();
```

### clienteService

```typescript
await clienteService.getAll({ page, limit, nombre, empresa });
await clienteService.getById(id);
await clienteService.create(data);
await clienteService.update(id, data);
await clienteService.delete(id);
```

### cotizacionService

```typescript
await cotizacionService.getAll({ page, limit, estado, cliente_id });
await cotizacionService.getById(id);
await cotizacionService.create(data);
await cotizacionService.update(id, data);
await cotizacionService.delete(id);
```

## 🔍 Ejemplos de Uso

### Obtener lista de clientes

```typescript
const { clientes, fetchClientes } = useClientes();

useEffect(() => {
  fetchClientes();
}, []);

return (
  <div>
    {clientes.map(cliente => (
      <div key={cliente.id}>{cliente.nombre_completo}</div>
    ))}
  </div>
);
```

### Crear un cliente

```typescript
const { createCliente } = useClientes();

const handleCreate = async (data) => {
  try {
    await createCliente(data);
    toast.success('Cliente creado');
  } catch (error) {
    toast.error('Error al crear cliente');
  }
};
```

### Proteger una ruta

```typescript
// Solo usuarios autenticados
<PrivateRoute>
  <DashboardPage />
</PrivateRoute>

// Solo administradores
<AdminRoute>
  <AdminPanel />
</AdminRoute>
```

## 🐛 Troubleshooting

### Error: "Cannot GET /"

El servidor Next.js no está ejecutándose. Ejecuta:

```bash
npm run dev
```

### Error: "API is not reachable"

Verifica que el backend está ejecutándose en `http://localhost:3001` y que `NEXT_PUBLIC_API_URL` es correcto en `.env.local`.

### Error de autenticación

- Limpia localStorage: `localStorage.clear()`
- Recarga la página
- Intenta login nuevamente

### Componentes no cargan

Asegúrate de que:
- El hook `useAuth()` está siendo usado dentro de un `<AuthProvider>`
- La ruta está protegida con `<PrivateRoute>` o `<AdminRoute>`

### TypeScript errors

```bash
# Regenerar tipos
npm run type-check

# Si persiste, limpia y reinstala
rm -rf node_modules .next
npm install
npm run build
```

## 📚 Documentación Adicional

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de Axios](https://axios-http.com/docs/intro)
- [Documentación de Zod](https://zod.dev/)

## 🚀 Deployment

### Vercel (Recomendado)

```bash
# Conectar repositorio en Vercel
# Configurar variable de entorno:
NEXT_PUBLIC_API_URL=<url-backend-produccion>
# Deploy automático en cada push
```

### Otros Providers

```bash
npm run build
npm run start
```

## 👥 Contribuir

1. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
2. Commit: `git commit -m "Agregar nueva funcionalidad"`
3. Push: `git push origin feature/nueva-funcionalidad`
4. Pull Request

## 📄 Licencia

Proyecto privado de Amargo Studios.
