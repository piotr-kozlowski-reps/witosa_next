'use client';
import { useNavigationState } from '@/context/navigationState';
import clsx from 'clsx';
import { Fragment } from 'react';
import HorizontalSeparatorLine from '../HorizontalSeparatorLine';
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
      {/* tu pod */}
      <div className="mt-[192px] proper-container-classes">
        <HorizontalSeparatorLine
          additionalClasses={getCurrentDevice() !== 'DESKTOP' ? 'w-full' : ''}
        />
        <div
          className={clsx(
            'grid w-full gap-y-24 mb-16',
            getCurrentDevice() === 'MOBILE'
              ? 'grid-cols-1 gap-x-mobile-margin'
              : '',
            getCurrentDevice() === 'TABLET'
              ? 'grid-cols-2 gap-x-tablet-margin'
              : '',
            getCurrentDevice() === 'DESKTOP' ? 'grid-cols-3 gap-x-4' : ''
          )}
        >
          <Sitemap
            getLinkData={getLinkData}
            getCurrentDevice={getCurrentDevice}
          />
          <ContactInfo
            getSocialLinkData={getSocialLinkData}
            getCurrentDevice={getCurrentDevice}
          />
          <NewsLetter getCurrentDevice={getCurrentDevice} />
        </div>
        <FooterStamp />
      </div>
    </Fragment>
  );
}
