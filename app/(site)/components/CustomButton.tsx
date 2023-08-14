import clsx from 'clsx';

interface Props {
  text: string;
  descriptionText: string;
  additionalClasses?: string;
  onSubmit?: boolean;
  disabled: boolean;
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
  } = props;

  ////tsx
  return (
    <button
      type={onSubmit ? 'submit' : 'button'}
      className={clsx(
        'standard-button',
        additionalClasses ? additionalClasses : ''
      )}
      aria-label={descriptionText}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
