import clsx from 'clsx';
import { Fragment } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

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
  // actionFn?: (() => void) | ((adminLinkName: TLinkAdminName) => void) | void;
  // url: string;
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
            outlined ? 'outlined-button' : 'standard-button',
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
