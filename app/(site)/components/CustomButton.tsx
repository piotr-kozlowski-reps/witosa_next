import { TLinkAdminName } from '@/types';
import clsx from 'clsx';
import { Fragment } from 'react';

interface Props {
  text: string;
  descriptionText: string;
  additionalClasses?: string;
  onSubmit?: boolean;
  disabled: boolean;
  outlined?: boolean;
  currentlyActive?: boolean;
  actionFn?: (() => void) | ((adminLinkName: TLinkAdminName) => void) | void;
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
    currentlyActive = false,
  } = props;

  ////tsx
  return (
    <Fragment>
      {currentlyActive ? (
        <div className="standard-button-non-clickable">{text}</div>
      ) : (
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
      )}
    </Fragment>
  );
}
