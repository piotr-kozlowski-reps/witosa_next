'use client';

import CustomButton from '@/app/(site)/components/CustomButton';
import { useNavigationStateAdmin } from '@/context/navigationStateAdmin';
import { signOut, useSession } from 'next-auth/react';

export default function DashboardContent() {
  ////vars
  const session = useSession();
  const { getAdminLink, setAdminLinkToBeActive, getAllAdminLinks } =
    useNavigationStateAdmin();

  ////tsx
  return (
    <div className="proper-container-classes">
      <div className="flex items-center justify-between">
        <h1 className="font-large-bold">{`Witaj, ${session?.data?.user?.name}`}</h1>
        <CustomButton
          text="Wyloguj się"
          descriptionText="Wyloguj się"
          outlined={true}
          disabled={false}
          actionFn={() => signOut()}
        />
      </div>

      <div className="mt-[37px] relative">
        <div className="absolute top-0 pt-[34px] left-0 pl-[34px] bg-skin-main-bg drop-shadow-big rounded-base  pb-[66px] right-0">
          <div className="flex flex-col items-start justify-start gap-[20px] ">
            {getAllAdminLinks().map((link) => {
              if (link.name === 'USERS' || link.name === 'LOGS') {
                return (
                  <CustomButton
                    key={link.name}
                    text={getAdminLink(link.name)!.nameToBeDisplayed}
                    descriptionText={getAdminLink(link.name)!.nameToBeDisplayed}
                    outlined={session.data?.user?.role === 'ADMIN'}
                    currentlyActive={getAdminLink(link.name)!.isCurrentlyUsed}
                    disabled={session.data?.user?.role !== 'ADMIN'}
                    actionFn={() => setAdminLinkToBeActive(link.name)}
                    additionalClasses="opacity-30"
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
        <div className="absolute top-8 pt-8 left-[193px] pl-[34px] bg-skin-main-bg drop-shadow-big rounded-base pb-[66px] right-0 outline outline-[1px] outline-cta-secondary">
          <div>
            <ul className="flex items-start justify-start gap-8 list-none">
              <li>dfv</li>
              <li>dfv</li>
              <li>dfv</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
