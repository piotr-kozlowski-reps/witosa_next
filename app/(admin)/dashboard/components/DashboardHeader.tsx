'use client';

import CustomButton from '@/app/(site)/components/CustomButton';
import { signOut } from 'next-auth/react';

type Props = {
  userName: string | null | undefined;
};

export default function DashboardHeader(props: Props) {
  ////vars
  const { userName } = props;

  ////tsx
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-large-bold text-skin-base">{`Witaj, ${userName}`}</h1>
      <CustomButton
        text="Wyloguj się"
        descriptionText="Wyloguj się"
        outlined={true}
        disabled={false}
        actionFn={() => signOut()}
      />
    </div>
  );
}
