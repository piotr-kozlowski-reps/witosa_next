import clsx from 'clsx';

type Props = {
  buttonName: string;
  actionFn: () => void;
};

export default function TextButton(props: Props) {
  ////vars
  const { buttonName, actionFn } = props;

  return (
    <button
      className={clsx('link-default')}
      onClick={actionFn}
      // aria-controls={idForAriaControls}
      // aria-expanded={isMenuVisible ? true : false}
      aria-label={buttonName}
    >
      <span className="font-sm-normal">{buttonName}</span>
    </button>
  );
}
