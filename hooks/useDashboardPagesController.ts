import { useNavigationStateAdmin } from '@/context/navigationStateAdmin';
import { useSession } from 'next-auth/react';

export function useDashboardPagesController() {
  ////vars
  const session = useSession();
  const isAdmin = session?.data?.user?.userRole === 'ADMIN';
  const { getAdminLink } = useNavigationStateAdmin();
  const isToShowUsers = isAdmin && getAdminLink('USERS')?.isCurrentlyUsed;
  const isToShowLogs = isAdmin && getAdminLink('LOGS')?.isCurrentlyUsed;
  const isToShowNewsletter = getAdminLink('NEWSLETTER')?.isCurrentlyUsed;
  const isToShowCyclicalActivities =
    getAdminLink('CYCLICAL_ACTIVITY')?.isCurrentlyUsed;
  const isToShowEvents = getAdminLink('EVENTS')?.isCurrentlyUsed;

  return {
    isToShowUsers,
    isToShowLogs,
    isToShowNewsletter,
    isToShowCyclicalActivities,
    isToShowEvents,
  };
}
