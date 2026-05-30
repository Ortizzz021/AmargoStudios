import PublicLayout from '@/components/PublicLayout';
import AboutPage from '@/views/AboutPage';

export const metadata = { title: 'Sobre Nosotros' };

export default function Page() {
  return (
    <PublicLayout>
      <AboutPage />
    </PublicLayout>
  );
}
