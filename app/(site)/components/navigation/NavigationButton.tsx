'use client';

import { TMode } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  buttonName: string;

  idForAriaControls: string;

  /** layoutState for coloring arrow icon - according to layout mode */
  layoutState: TMode;

  getIsSubmenuVisible: () => boolean;

  toggleIsSubmenuVisible: () => void;

  /** if true -> takes another set pf css classes to make buttons big enough for mobiles to be clearly visible */
  isMobileButton?: boolean;

  idToJumpWhenButtonClicked?: string;
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
    idToJumpWhenButtonClicked,
  } = props;

  const cssButtonClasses = getCssButtonClasses(
    getIsSubmenuVisible(),
    isMobileButton
  );

  const cssIconClasses = getCssIconClasses(
    getIsSubmenuVisible(),
    isMobileButton
  );

  const buttonActionHandler = () => {
    toggleIsSubmenuVisible();
    if (idToJumpWhenButtonClicked) {
      window.location.href = `#${idToJumpWhenButtonClicked}`;
    }
  };

  ////tsx
  return (
    <button
      className={clsx('transition-all', cssButtonClasses)}
      onClick={buttonActionHandler}
      aria-controls={idForAriaControls}
      aria-expanded={getIsSubmenuVisible() ? true : false}
    >
      <div className="flex items-center">
        <span>{buttonName}</span>
        <span className="relative pl-1" aria-hidden="true">
          <div
            className={clsx(
              'absolute w-[6px] h-[5px] bottom-0 ',
              layoutState === 'LIGHT' ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}arrow-down_black.svg`}
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
              src={`${process.env.NEXT_PUBLIC_BASE_URL}arrow-down_white.svg`}
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
              src={`${process.env.NEXT_PUBLIC_BASE_URL}arrow-down_yellow.svg`}
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

////helpers
function getCssButtonClasses(
  isSubmenuVisible: boolean,
  isMobileButton: boolean
) {
  let cssButtonClasses = '';

  if (isSubmenuVisible && isMobileButton) {
    cssButtonClasses = 'link-mobile-active  pt-2';
  }
  if (!isSubmenuVisible && !isMobileButton) {
    cssButtonClasses = 'link-default-different-pseudo-after';
  }
  if (isSubmenuVisible && !isMobileButton) {
    cssButtonClasses = 'link-active--different-pseudo-after';
  }
  if (!isSubmenuVisible && isMobileButton) {
    cssButtonClasses = 'link-mobile-default  pt-2';
  }

  return cssButtonClasses;
}

function getCssIconClasses(isSubmenuVisible: boolean, isMobileButton: boolean) {
  let cssIconClasses = '';
  if (isSubmenuVisible && isMobileButton) {
    cssIconClasses = 'rotate-90';
  }
  if (!isSubmenuVisible && isMobileButton) {
    cssIconClasses = '-rotate-90';
  }
  if (isSubmenuVisible && !isMobileButton) {
    cssIconClasses = 'rotate-180';
  }
  if (!isSubmenuVisible && !isMobileButton) {
    cssIconClasses = '';
  }

  return cssIconClasses;
}
