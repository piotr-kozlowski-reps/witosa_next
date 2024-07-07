import clsx from 'clsx';
import { Fragment } from 'react';
import { useFormStatus } from 'react-dom';

interface Props {
  text: string;
  descriptionText: string;
  additionalClasses?: string;
  onSubmit?: boolean;
  disabled: boolean;
  outlined?: boolean;
  currentlyActive?: boolean;
  actionFn?: () => void;
  id?: string;
  isChosen?: boolean;
}

export default function CustomButton(props: Props) {
  ////vars
  const { pending } = useFormStatus();
  const {
    id,
    text,
    descriptionText,
    additionalClasses,
    onSubmit = false,
    disabled,
    outlined = false,
    actionFn = () => {},
    currentlyActive = false,
    isChosen = false,
  } = props;

  ////tsx
  return (
    <Fragment>
      {currentlyActive ? (
        <div className="standard-button-non-clickable">{text}</div>
      ) : (
        <button
          id={id}
          type={onSubmit ? 'submit' : 'button'}
          className={clsx(
            isChosen
              ? 'chosen-button'
              : outlined
              ? 'outlined-button'
              : 'standard-button',
            additionalClasses ? additionalClasses : ''
          )}
          aria-label={descriptionText}
          disabled={disabled || pending}
          onClick={actionFn}
        >
          {pending ? `${text} ...` : text}
        </button>
      )}
    </Fragment>
  );
}
