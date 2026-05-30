import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="not-found-page">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p className="mb-lg">La página que buscas no existe o fue movida.</p>
        <Link href="/" className="btn btn-primary">Volver al inicio</Link>
      </div>
    </PublicLayout>
  );
}
