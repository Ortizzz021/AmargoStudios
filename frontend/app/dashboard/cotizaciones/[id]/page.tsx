import CotizacionDetailPage from '@/views/dashboard/CotizacionDetailPage';

export const metadata = { title: 'Detalle de Cotización' };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <CotizacionDetailPage id={id} />;
}
