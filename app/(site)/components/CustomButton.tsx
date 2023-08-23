import clsx from 'clsx';

interface Props {
  text: string;
  descriptionText: string;
  additionalClasses?: string;
  onSubmit?: boolean;
  disabled: boolean;
  outlined?: boolean;
  actionFn?: () => void;
  // url: string;
}

export default function CustomButton(props: Props) {
  ////vars
  const {
    text,
    descriptionText,
    additionalClasses,
    onSubmit = false,
    disabled,
    outlined = false,
    actionFn = () => {},
  } = props;

  ////tsx
  return (
    <button
      type={onSubmit ? 'submit' : 'button'}
      className={clsx(
        outlined ? 'outlined-button' : 'standard-button',
        additionalClasses ? additionalClasses : ''
      )}
      aria-label={descriptionText}
      disabled={disabled}
      onClick={actionFn}
    >
      {text}
    </button>
  );
}
