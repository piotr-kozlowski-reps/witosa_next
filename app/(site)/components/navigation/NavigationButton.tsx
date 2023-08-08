import { TMode } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  buttonName: string;
  idForAriaControls: string;
  layoutState: TMode;
  getIsSubmenuVisible: () => boolean;
  toggleIsSubmenuVisible: () => void;
};

export default function NavigationButton(props: Props) {
  ////vars
  const {
    getIsSubmenuVisible,
    toggleIsSubmenuVisible,
    layoutState,
    buttonName,
    idForAriaControls,
  } = props;

  console.log(layoutState);

  ////tsx
  return (
    <button
      className={clsx(
        'transition-all',
        getIsSubmenuVisible() ? 'link-active' : 'link-default'
      )}
      onClick={() => toggleIsSubmenuVisible()}
      aria-controls={idForAriaControls}
      aria-expanded={getIsSubmenuVisible() ? true : false}
    >
      <div className="flex items-center">
        <span>{buttonName}</span>
        <span className="relative pl-1" aria-hidden="true">
          <div
            className={clsx(
              'absolute w-[6px] h-[5px] bottom-0',
              layoutState === 'LIGHT' ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Image
              src="arrow-down_black.svg"
              width={6}
              height={5}
              alt="Arrow down"
              className={clsx(
                'transition-all',
                getIsSubmenuVisible() ? 'rotate-180' : ''
              )}
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
              className={clsx(
                'transition-all',
                getIsSubmenuVisible() ? 'rotate-180' : ''
              )}
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
              className={clsx(
                'transition-all',
                getIsSubmenuVisible() ? 'rotate-180' : ''
              )}
            />
          </div>
        </span>
      </div>
    </button>
  );
}
