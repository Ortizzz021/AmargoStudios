'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#262626',
          color: '#F2F2F2',
          border: '1px solid rgba(2, 89, 57, 0.4)',
        },
        success: {
          iconTheme: { primary: '#025939', secondary: '#F2F2F2' },
        },
        error: {
          iconTheme: { primary: '#f87171', secondary: '#F2F2F2' },
        },
      }}
    />
  );
}
