import { TMode } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  buttonName: string;
  idForAriaControls: string;
  layoutState: TMode;
  getIsSubmenuVisible: () => boolean;
  toggleIsSubmenuVisible: () => void;
  isMobileButton?: boolean;
};

export default function NavigationButton(props: Props) {
  ////vars
  const {
    getIsSubmenuVisible,
    toggleIsSubmenuVisible,
    layoutState,
    buttonName,
    idForAriaControls,
    isMobileButton = false,
  } = props;

  let cssButtonClasses = '';
  if (getIsSubmenuVisible() && isMobileButton) {
    cssButtonClasses = 'link-mobile-active';
  }
  if (!getIsSubmenuVisible() && !isMobileButton) {
    cssButtonClasses = 'link-default';
  }
  if (getIsSubmenuVisible() && !isMobileButton) {
    cssButtonClasses = 'link-active';
  }
  if (!getIsSubmenuVisible() && isMobileButton) {
    cssButtonClasses = 'link-mobile-default';
  }

  let cssIconClasses = '';
  if (getIsSubmenuVisible() && isMobileButton) {
    cssIconClasses = 'rotate-90';
  }
  if (!getIsSubmenuVisible() && isMobileButton) {
    cssIconClasses = '-rotate-90';
  }
  if (getIsSubmenuVisible() && !isMobileButton) {
    cssIconClasses = 'rotate-180';
  }
  if (!getIsSubmenuVisible() && !isMobileButton) {
    cssIconClasses = '';
  }

  ////tsx
  return (
    <button
      className={clsx('transition-all', cssButtonClasses)}
      onClick={() => toggleIsSubmenuVisible()}
      aria-controls={idForAriaControls}
      aria-expanded={getIsSubmenuVisible() ? true : false}
    >
      <div className="flex items-center">
        <span
          className={clsx(isMobileButton ? 'py-[10px] pl-2 bg-red-500' : '')}
        >
          {buttonName}
        </span>
        <span className="relative pl-1" aria-hidden="true">
          <div
            className={clsx(
              'absolute w-[6px] h-[5px] bottom-0 ',
              layoutState === 'LIGHT' ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Image
              src="arrow-down_black.svg"
              width={6}
              height={5}
              alt="Arrow down"
              className={clsx('transition-all', cssIconClasses)}
            />
          </div>
          <div
            className={clsx(
              'absolute w-[6px] h-[5px] bottom-0',
              layoutState === 'DARK' ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Image
              src="arrow-down_white.svg"
              width={6}
              height={5}
              alt="Arrow down"
              className={clsx('transition-all', cssIconClasses)}
            />
          </div>
          <div
            className={clsx(
              'absolute w-[6px] h-[5px] bottom-0',
              layoutState === 'CONTRAST' ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Image
              src="arrow-down_yellow.svg"
              width={6}
              height={5}
              alt="Arrow down"
              className={clsx('transition-all', cssIconClasses)}
            />
          </div>
        </span>
      </div>
    </button>
  );
}
