import clsx from 'clsx';
import Link from 'next/link';

type Props = {
  url: string;
  isCurrentlyUsed: boolean;
  nameToBeDisplayed: string;
};

export default function NavigationLink(props: Props) {
  ////vars
  const { url, isCurrentlyUsed, nameToBeDisplayed } = props;

  ////tsx
  return (
    <div>
      {isCurrentlyUsed ? (
        <div className="pt-1 link-active">{nameToBeDisplayed}</div>
      ) : (
        <Link
          href={isCurrentlyUsed ? '' : url}
          className={clsx(isCurrentlyUsed ? 'link-active' : 'link-default')}
        >
          {nameToBeDisplayed}
        </Link>
      )}
    </div>
  );
}
