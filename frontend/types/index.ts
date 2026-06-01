export interface Perfil {
  id: string;
  email: string;
  nombre_completo: string;
  rol: 'admin' | 'cliente' | string;
  avatar_url: string | null;
  fecha_creacion: string;
}

export interface Cliente {
  id: string;
  nombre_completo: string;
  email: string;
  telefono: string | null;
  empresa: string | null;
  fecha_creacion: string;
}

export const ESTADOS_COTIZACION = [
  'pendiente',
  'en_proceso',
  'aprobada',
  'rechazada',
  'completada',
] as const;

export type EstadoCotizacion = (typeof ESTADOS_COTIZACION)[number];

export interface Cotizacion {
  id: string;
  cliente_id: string;
  servicio: string;
  mensaje: string | null;
  presupuesto_estimado: number | null;
  fecha_tentativa: string | null;
  estado: EstadoCotizacion | string;
  asignado_a: string | null;
  fecha_creacion: string;
  cliente?: {
    id: string;
    nombre_completo: string;
    email: string;
    empresa: string | null;
  };
  perfil?: {
    id: string;
    nombre_completo: string;
    email: string;
  } | null;
}

export interface Seguimiento {
  id: string;
  cliente_id: string;
  autor_id: string;
  contenido: string;
  fecha_creacion: string;
  autor?: {
    id: string;
    nombre_completo: string;
    avatar_url: string | null;
  };
  cliente?: {
    id: string;
    nombre_completo: string;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

export interface AuthResponse {
  token: string;
  perfil: Perfil;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  nombre_completo: string;
}

export interface ContactPayload {
  nombre_completo: string;
  email: string;
  telefono?: string;
  servicio: string;
  mensaje: string;
  presupuesto_estimado?: number;
  fecha_tentativa?: string;
}

export interface CreateClientePayload {
  nombre_completo: string;
  email: string;
  telefono?: string;
  empresa?: string;
}

export interface UpdateClientePayload {
  nombre_completo?: string;
  email?: string;
  telefono?: string;
  empresa?: string;
}

export interface CreateCotizacionPayload {
  cliente_id: string;
  servicio: string;
  mensaje?: string;
  presupuesto_estimado?: number;
  fecha_tentativa?: string;
}

export interface UpdateCotizacionPayload {
  servicio?: string;
  mensaje?: string;
  presupuesto_estimado?: number;
  fecha_tentativa?: string;
  estado?: string;
  asignado_a?: string | null;
}

export interface CreateSeguimientoPayload {
  cliente_id: string;
  contenido: string;
}

export interface UpdatePerfilPayload {
  nombre_completo?: string;
  avatar_url?: string | null;
}

export interface ApiErrorResponse {
  status: 'error';
  message: string;
  errors?: Record<string, string[]>;
}
