export const YOUTUBE_VIDEOS = {
  home: 'uZxwFYIeTm0',
  about: 'UZRZZYEdhJQ',
  services: '217VGGBLuew',
  contact: 'CWZo5vesqSI',
} as const;

export function getYoutubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${videoId}&playsinline=1&disablekb=1&modestbranding=1`;
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr));
}

export function formatDateTime(dateStr: string): string {
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

export function formatEstado(estado: string): string {
  return estado.replace(/_/g, ' ');
}
