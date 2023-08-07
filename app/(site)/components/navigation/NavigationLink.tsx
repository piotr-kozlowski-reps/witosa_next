import clsx from 'clsx';
import Link from 'next/link';

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
    <div>
      {isCurrentlyUsed ? (
        <div className="pt-[3px] link-active whitespace-nowrap">
          {nameToBeDisplayed}
        </div>
      ) : (
        <Link
          href={isCurrentlyUsed ? '' : url}
          onClick={() => hideAllSubmenus()}
          className={clsx(isCurrentlyUsed ? 'link-active' : 'link-default')}
        >
          <span className="whitespace-nowrap">{nameToBeDisplayed}</span>
        </Link>
      )}
    </div>
  );
}
