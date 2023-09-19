import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useNavigationStateAdmin } from '@/context/navigationStateAdmin';
import { TNewsletterDataCombo } from '@/types';
import { useSession } from 'next-auth/react';
import DashboardCyclicalActivities from './DashboardCyclicalActivities';
import DashboardEvents from './DashboardEvents';
import DashboardLogs from './DashboardLogs';
import DashboardNewsletter from './newsletter/DashboardNewsletter';
import DashboardUsers from './users/DashboardUsers';

type Props = {
  newsletterDataCombo: TNewsletterDataCombo;
};

export default function DashboardInsidePages(props: Props) {
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
      <ComponentTransitionFromRightToLeft>
        {isToShowEvents ? <DashboardEvents /> : null}
      </ComponentTransitionFromRightToLeft>

      <ComponentTransitionFromRightToLeft>
        {isToShowCyclicalActivities ? <DashboardCyclicalActivities /> : null}
      </ComponentTransitionFromRightToLeft>

      <ComponentTransitionFromRightToLeft>
        {isToShowNewsletter ? (
          <DashboardNewsletter
            newsletterDataCombo={props.newsletterDataCombo}
          />
        ) : null}
      </ComponentTransitionFromRightToLeft>

      <ComponentTransitionFromRightToLeft>
        {isToShowUsers ? <DashboardUsers /> : null}
      </ComponentTransitionFromRightToLeft>

      <ComponentTransitionFromRightToLeft>
        {isToShowLogs ? <DashboardLogs /> : null}
      </ComponentTransitionFromRightToLeft>
    </div>
  );
}
