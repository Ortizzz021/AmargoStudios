'use client';

import AdminRoute from '@/components/AdminRoute';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminRoute>
      <div className="dashboard-layout">
        <DashboardSidebar />
        <main className="dashboard-main">{children}</main>
      </div>
    </AdminRoute>
  );
}
