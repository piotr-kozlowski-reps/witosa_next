import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useDashboardPagesController } from '@/hooks/useDashboardPagesController';
import {
  TGetAllCyclicalActivitiesResponse,
  TGetAllEventsResponse,
  TGetAllUsersResponse,
  TNewsletterDataCombo,
} from '@/types';
import { Fragment } from 'react';
import DashboardLogs from './DashboardLogs';
import DashboardCyclicalActivities from './cyclical_activities/DashboardCyclicalActivities';
import DashboardEvents from './events/DashboardEvents';
import DashboardNewsletter from './newsletter/DashboardNewsletter';
import DashboardUsers from './users/DashboardUsers';

type Props = {
  newsletterDataCombo: TNewsletterDataCombo;
  usersData: TGetAllUsersResponse;
  cyclicalActivitiesData: TGetAllCyclicalActivitiesResponse;
  eventsData: TGetAllEventsResponse;
};

export default function DashboardInsidePages(props: Props) {
  ////vars
  const { cyclicalActivitiesData, newsletterDataCombo, usersData, eventsData } =
    props;
  const {
    isToShowUsers,
    isToShowCyclicalActivities,
    isToShowEvents,
    isToShowLogs,
    isToShowNewsletter,
  } = useDashboardPagesController();

  ////tsx
  return (
    <Fragment>
      <div className="absolute top-8 pt-8 left-[193px] pl-[34px] bg-skin-main-bg drop-shadow-big rounded-base pb-[66px] right-0">
        <ComponentTransitionFromRightToLeft>
          {isToShowEvents ? <DashboardEvents eventsData={eventsData} /> : null}
        </ComponentTransitionFromRightToLeft>

        <ComponentTransitionFromRightToLeft>
          {isToShowCyclicalActivities ? (
            <DashboardCyclicalActivities
              cyclicalActivitiesData={cyclicalActivitiesData}
            />
          ) : null}
        </ComponentTransitionFromRightToLeft>

        <ComponentTransitionFromRightToLeft>
          {isToShowNewsletter ? (
            <DashboardNewsletter newsletterDataCombo={newsletterDataCombo} />
          ) : null}
        </ComponentTransitionFromRightToLeft>

        <ComponentTransitionFromRightToLeft>
          {isToShowUsers ? <DashboardUsers usersData={usersData} /> : null}
        </ComponentTransitionFromRightToLeft>

        <ComponentTransitionFromRightToLeft>
          {isToShowLogs ? <DashboardLogs /> : null}
        </ComponentTransitionFromRightToLeft>
      </div>
    </Fragment>
  );
}
