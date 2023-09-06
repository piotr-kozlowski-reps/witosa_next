'use client';

import CustomButton from '@/app/(site)/components/CustomButton';
import { signOut, useSession } from 'next-auth/react';

export default function DashboardContent() {
  ////vars
  const session = useSession();

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
            <CustomButton
              text="wydarzenia"
              descriptionText="wydarzenia"
              outlined={true}
              disabled={false}
              actionFn={() => {}}
            />
            <CustomButton
              text="zajęcia stałe"
              descriptionText="zajęcia stałe"
              outlined={true}
              disabled={false}
              actionFn={() => {}}
            />
            <CustomButton
              text="użytkownicy"
              descriptionText="użytkownicy"
              outlined={true}
              disabled={false}
              actionFn={() => {}}
            />
            <CustomButton
              text="logi"
              descriptionText="logi"
              outlined={true}
              disabled={false}
              actionFn={() => {}}
            />
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
