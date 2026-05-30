import PublicLayout from '@/components/PublicLayout';
import ContactPage from '@/views/ContactPage';

export const metadata = { title: 'Contacto' };

export default function Page() {
  return (
    <PublicLayout>
      <ContactPage />
    </PublicLayout>
  );
}
