import PublicLayout from '@/components/PublicLayout';
import ServicesPage from '@/views/ServicesPage';

export const metadata = { title: 'Servicios' };

export default function Page() {
  return (
    <PublicLayout>
      <ServicesPage />
    </PublicLayout>
  );
}
