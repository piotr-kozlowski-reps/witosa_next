'use client';

import { useNavigationState } from '@/context/navigationState';
import Image from 'next/image';
import Link from 'next/link';
import NavigationLink from './NavigationLink';

export default function Navbar() {
  ////vars
  const { getLinkData } = useNavigationState();

  // const signOutHandler = () => {
  //   console.log('signOut');
  //   signOut();
  // };

  ////tsx
  return (
    <nav className="flex items-center justify-between bg-skin-fill">
      <div className="mt-10">
        <Link href={'/'}>
          <Image src="artck_logo.svg" width={77} height={24} alt="artck_logo" />
        </Link>
      </div>
      <div className="flex gap-6">
        <NavigationLink
          url={getLinkData('news')?.path!}
          isCurrentlyUsed={getLinkData('news')?.isCurrentlyUsed!}
          nameToBeDisplayed={getLinkData('news')?.nameToBeDisplayed!}
        />
        <NavigationLink
          url={getLinkData('events')?.path!}
          isCurrentlyUsed={getLinkData('events')?.isCurrentlyUsed!}
          nameToBeDisplayed={getLinkData('events')?.nameToBeDisplayed!}
        />
        <NavigationLink
          url={getLinkData('activities')?.path!}
          isCurrentlyUsed={getLinkData('activities')?.isCurrentlyUsed!}
          nameToBeDisplayed={getLinkData('activities')?.nameToBeDisplayed!}
        />
        <NavigationLink
          url={getLinkData('groups')?.path!}
          isCurrentlyUsed={getLinkData('groups')?.isCurrentlyUsed!}
          nameToBeDisplayed={getLinkData('groups')?.nameToBeDisplayed!}
        />
        <div>
          <button
            className="link-default"
            onClick={() => alert('not implemented')}
          >
            o nas
          </button>
        </div>
        <NavigationLink
          url={getLinkData('bistro')?.path!}
          isCurrentlyUsed={getLinkData('bistro')?.isCurrentlyUsed!}
          nameToBeDisplayed={getLinkData('bistro')?.nameToBeDisplayed!}
        />
        <NavigationLink
          url={getLinkData('contact')?.path!}
          isCurrentlyUsed={getLinkData('contact')?.isCurrentlyUsed!}
          nameToBeDisplayed={getLinkData('contact')?.nameToBeDisplayed!}
        />
      </div>
    </nav>
  );
}
