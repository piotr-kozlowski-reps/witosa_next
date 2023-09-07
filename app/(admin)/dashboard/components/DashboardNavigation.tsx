'use client';

import CustomButton from '@/app/(site)/components/CustomButton';
import { useNavigationStateAdmin } from '@/context/navigationStateAdmin';

type Props = {
  isAdmin: boolean;
};

export default function DashboardNavigation(props: Props) {
  ////vars
  const { isAdmin } = props;
  const { getAdminLink, setAdminLinkToBeActive, getAllAdminLinks } =
    useNavigationStateAdmin();

  ////tsx
  return (
    <div className="absolute top-0 pt-[34px] left-0 pl-[34px] bg-skin-main-bg drop-shadow-big rounded-base  pb-[66px] right-0">
      <div className="flex flex-col items-start justify-start gap-[20px] ">
        {getAllAdminLinks().map((link) => {
          if (link.name === 'USERS' || link.name === 'LOGS') {
            return (
              <CustomButton
                key={link.name}
                text={getAdminLink(link.name)!.nameToBeDisplayed}
                descriptionText={getAdminLink(link.name)!.nameToBeDisplayed}
                outlined={isAdmin}
                currentlyActive={getAdminLink(link.name)!.isCurrentlyUsed}
                disabled={!isAdmin}
                actionFn={() => setAdminLinkToBeActive(link.name)}
                additionalClasses={isAdmin ? '' : 'opacity-30'}
              />
            );
          }

          return (
            <CustomButton
              key={link.name}
              text={getAdminLink(link.name)!.nameToBeDisplayed}
              descriptionText={getAdminLink(link.name)!.nameToBeDisplayed}
              outlined={true}
              currentlyActive={getAdminLink(link.name)!.isCurrentlyUsed}
              disabled={false}
              actionFn={() => setAdminLinkToBeActive(link.name)}
            />
          );
        })}
      </div>
    </div>
  );
}
