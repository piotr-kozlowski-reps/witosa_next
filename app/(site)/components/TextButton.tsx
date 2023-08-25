import clsx from 'clsx';

type Props = {
  buttonName: string;
};

export default function TextButton(props: Props) {
  ////vars
  const { buttonName } = props;

  return (
    <button
      className={clsx('link-default')}
      // onClick={toggleMenuVisibility}
      // aria-controls={idForAriaControls}
      // aria-expanded={isMenuVisible ? true : false}
      aria-label={buttonName}
    >
      <span className="font-sm-normal">{buttonName}</span>
    </button>
  );
}
