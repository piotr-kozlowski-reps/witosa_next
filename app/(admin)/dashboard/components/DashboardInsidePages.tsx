import { useNavigationStateAdmin } from '@/context/navigationStateAdmin';
import { useSession } from 'next-auth/react';
import DashboardCyclicalActivities from './DashboardCyclicalActivities';
import DashboardEvents from './DashboardEvents';
import DashboardLogs from './DashboardLogs';
import DashboardUsers from './DashboardUsers';
import DashboardNewsletter from './newsletter/DashboardNewsletter';

export default function DashboardInsidePages() {
  ////vars
  const session = useSession();
  const isAdmin = session?.data?.user?.role === 'ADMIN';
  const { getAdminLink, setAdminLinkToBeActive, getAllAdminLinks } =
    useNavigationStateAdmin();
  const isToShowUsers = isAdmin && getAdminLink('USERS')?.isCurrentlyUsed;
  const isToShowLogs = isAdmin && getAdminLink('LOGS')?.isCurrentlyUsed;
  const isToShowNewsletter = getAdminLink('NEWSLETTER')?.isCurrentlyUsed;
  const isToShowCyclicalActivities =
    getAdminLink('CYCLICAL_ACTIVITY')?.isCurrentlyUsed;
  const isToShowEvents = getAdminLink('EVENTS')?.isCurrentlyUsed;

  ////tsx
  return (
    <div className="absolute top-8 pt-8 left-[193px] pl-[34px] bg-skin-main-bg drop-shadow-big rounded-base pb-[66px] right-0 ">
      {isToShowEvents ? <DashboardEvents /> : null}
      {isToShowCyclicalActivities ? <DashboardCyclicalActivities /> : null}
      {isToShowNewsletter ? <DashboardNewsletter /> : null}
      {isToShowUsers ? <DashboardUsers /> : null}
      {isToShowLogs ? <DashboardLogs /> : null}
    </div>
  );
}
