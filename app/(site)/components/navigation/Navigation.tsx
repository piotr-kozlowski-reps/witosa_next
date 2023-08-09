'use client';

import { useNavigationState } from '@/context/navigationState';
import { useGetCurrentDevice } from '@/hooks/useGetCurrentDevice';
import { Fragment } from 'react';
import NavigationDesktop from './NavigationDesktop';
import NavigationMobileAndTablet from './NavigationMobileAndTablet';

export default function Navigation() {
  ////vars
  useGetCurrentDevice();
  const { getCurrentDevice } = useNavigationState();

  // const signOutHandler = () => {
  //   console.log('signOut');
  //   signOut();
  // };

  ////tsx
  return (
    <Fragment>
      {getCurrentDevice() === 'MOBILE' || getCurrentDevice() === 'TABLET' ? (
        <NavigationMobileAndTablet getCurrentDevice={getCurrentDevice} />
      ) : null}
      {getCurrentDevice() === 'DESKTOP' ? <NavigationDesktop /> : null}

      <div id="main_content"></div>
    </Fragment>
  );
}
