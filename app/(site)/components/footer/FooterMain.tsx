'use client';
import { useNavigationState } from '@/context/navigationState';
import clsx from 'clsx';
import { Fragment } from 'react';
import ContactInfo from './ContactInfo';
import FooterStamp from './FooterStamp';
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
        <div className="bg-skin-gray w-[753px] h-[1px] mb-24"></div>
        <div className="grid w-full grid-cols-3 gap-4 mb-16">
          <Sitemap getLinkData={getLinkData} />
          <ContactInfo getSocialLinkData={getSocialLinkData} />
          <div className="w-full bg-red-400">asdcas</div>
        </div>
        <FooterStamp />
      </div>
    </Fragment>
  );
}
