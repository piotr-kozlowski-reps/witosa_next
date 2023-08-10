import clsx from 'clsx';
import Link from 'next/link';
import { Fragment } from 'react';

type Props = {
  url: string;
  isCurrentlyUsed: boolean;
  nameToBeDisplayed: string;
  hideAllSubmenus: () => void;
  isMobileLink?: boolean;
};

export default function NavigationLink(props: Props) {
  ////vars
  const {
    url,
    isCurrentlyUsed,
    nameToBeDisplayed,
    hideAllSubmenus,
    isMobileLink = false,
  } = props;

  const standardLinkDefaultClasses = 'link-default';
  const standardLinkActiveClasses = 'link-active';
  const mobileLinkDefaultClasses = 'link-mobile-default pt-2';
  const mobileLinkActiveClasses = 'link-mobile-active pt-2';

  ////tsx
  return (
    <Fragment>
      {isCurrentlyUsed ? (
        <a
          className={
            (clsx('pt-[3px] whitespace-nowrap'),
            isMobileLink ? mobileLinkActiveClasses : standardLinkActiveClasses)
          }
          aria-current="page"
          aria-disabled="true"
        >
          {nameToBeDisplayed}
        </a>
      ) : (
        <div>
          <Link
            href={url}
            onClick={() => hideAllSubmenus()}
            className={clsx(
              isMobileLink
                ? mobileLinkDefaultClasses
                : standardLinkDefaultClasses
            )}
          >
            <span className="whitespace-nowrap">{nameToBeDisplayed}</span>
          </Link>
        </div>
      )}
    </Fragment>
  );
}
