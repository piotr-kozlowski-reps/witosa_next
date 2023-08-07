import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  buttonName: string;
  getIsSubmenuVisible: () => boolean;
  toggleIsSubmenuVisible: () => void;
};

export default function NavigationButton(props: Props) {
  ////vars
  const { getIsSubmenuVisible, toggleIsSubmenuVisible, buttonName } = props;

  ////tsx
  return (
    <button
      className={clsx(
        'transition-all',
        getIsSubmenuVisible() ? 'link-active' : 'link-default'
      )}
      onClick={() => toggleIsSubmenuVisible()}
    >
      <div className="flex items-center">
        <span>{buttonName}</span>
        <span className="pl-1">
          <Image
            src="arrow-down.svg"
            width={6}
            height={5}
            alt="Arrow down"
            className={clsx(
              'transition-all',
              getIsSubmenuVisible() ? 'rotate-180' : ''
            )}
          />
        </span>
      </div>
    </button>
  );
}
