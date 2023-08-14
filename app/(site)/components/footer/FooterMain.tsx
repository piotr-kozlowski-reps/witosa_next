'use client';
import { useNavigationState } from '@/context/navigationState';
import clsx from 'clsx';
import { Fragment } from 'react';
import ContactInfo from './ContactInfo';
import FooterStamp from './FooterStamp';
import NewsLetter from './Newsletter';
import Sitemap from './Sitemap';

export default function FooterMain() {
  ////vars
  const { getCurrentDevice, getLinkData, getSocialLinkData } =
    useNavigationState();

  ////tsx
  return (
    <Fragment>
      <div
        className={clsx(
          'mt-[192px]',
          getCurrentDevice() === 'MOBILE' ? 'mx-mobile-margin' : '',
          getCurrentDevice() === 'TABLET' ? 'mx-tablet-margin' : '',
          getCurrentDevice() === 'DESKTOP' ? 'desktop-container' : ''
        )}
      >
        <div
          className={clsx(
            'bg-skin-gray w-[753px] h-[1px] mb-24',
            getCurrentDevice() !== 'DESKTOP' ? 'w-full' : ''
          )}
        ></div>
        <div
          className={clsx(
            'grid w-full gap-x-4 gap-y-24 mb-16',
            getCurrentDevice() === 'MOBILE' ? 'grid-cols-1' : '',
            getCurrentDevice() === 'TABLET' ? 'grid-cols-2' : '',
            getCurrentDevice() === 'DESKTOP' ? 'grid-cols-3' : ''
          )}
        >
          <Sitemap
            getLinkData={getLinkData}
            getCurrentDevice={getCurrentDevice}
          />
          <ContactInfo getSocialLinkData={getSocialLinkData} />
          <NewsLetter />
        </div>
        <FooterStamp />
      </div>
    </Fragment>
  );
}
