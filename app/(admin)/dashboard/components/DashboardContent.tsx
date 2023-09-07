'use client';

import { useSession } from 'next-auth/react';
import DashboardHeader from './DashboardHeader';
import DashboardInsidePages from './DashboardInsidePages';
import DashboardNavigation from './DashboardNavigation';

export default async function DashboardContent() {
  ////vars
  const session = useSession();
  const isAdmin = session?.data?.user?.role === 'ADMIN';

  ////tsx
  return (
    <div className="proper-container-classes">
      <DashboardHeader userName={session?.data?.user?.name} />

      <div className="mt-[37px] relative">
        <DashboardNavigation isAdmin={isAdmin} />
        <DashboardInsidePages />
      </div>
    </div>
  );
}
