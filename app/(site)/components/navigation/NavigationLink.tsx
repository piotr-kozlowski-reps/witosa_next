import clsx from 'clsx';
import Link from 'next/link';
import { Fragment } from 'react';

type Props = {
  url: string;
  isCurrentlyUsed: boolean;
  nameToBeDisplayed: string;
  hideAllSubmenus: () => void;
};

export default function NavigationLink(props: Props) {
  ////vars
  const { url, isCurrentlyUsed, nameToBeDisplayed, hideAllSubmenus } = props;

  ////tsx
  return (
    <Fragment>
      {isCurrentlyUsed ? (
        <a
          className="pt-[3px] link-active whitespace-nowrap"
          aria-current="page"
          aria-disabled="true"
        >
          {nameToBeDisplayed}
        </a>
      ) : (
        <Link
          href={isCurrentlyUsed ? '' : url}
          onClick={() => hideAllSubmenus()}
          className={clsx(isCurrentlyUsed ? 'link-active' : 'link-default')}
        >
          <span className="whitespace-nowrap">{nameToBeDisplayed}</span>
        </Link>
      )}
    </Fragment>
  );
}
