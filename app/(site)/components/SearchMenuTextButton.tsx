import clsx from 'clsx';

type Props = {
  buttonName: string;
  idForAriaControls: string;
  toggleMenuVisibility: () => void;
  isMenuVisible: boolean;

  // /** layoutState for coloring arrow icon - according to layout mode */
  // layoutState: TMode;

  // getIsSubmenuVisible: () => boolean;

  // toggleIsSubmenuVisible: () => void;

  // /** if true -> takes another set pf css classes to make buttons big enough for mobiles to be clearly visible */
  // isMobileButton?: boolean;

  // idToJumpWhenButtonClicked?: string;
};

export default function SearchMenuTextButton(props: Props) {
  ////vars
  const { buttonName, idForAriaControls, toggleMenuVisibility, isMenuVisible } =
    props;

  ////tsx
  return (
    <button
      className={clsx('link-mobile-default mt-[17px]')}
      onClick={toggleMenuVisibility}
      aria-controls={idForAriaControls}
      aria-expanded={isMenuVisible ? true : false}
      aria-label={buttonName}
    >
      <div>
        <span className="">{buttonName}</span>
      </div>
    </button>
  );
}
