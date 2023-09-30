import clsx from 'clsx';
import { Fragment } from 'react';

type Props = {
  buttonName: string;
  actionFn: () => void;
  isSubmit?: boolean;
  isActive?: boolean;
  isClickable?: boolean;
};

export default function TextButton(props: Props) {
  ////vars
  const {
    buttonName,
    actionFn,
    isSubmit = false,
    isActive = false,
    isClickable = true,
  } = props;

  return (
    <Fragment>
      {isClickable ? (
        <button
          className={clsx(isActive ? 'link-active' : 'link-default')}
          onClick={actionFn}
          type={isSubmit ? 'submit' : 'button'}
          aria-label={buttonName}
        >
          <span
            className={clsx(
              isActive
                ? 'font-base-bold text-skin-base'
                : 'font-base-regular text-skin-base'
              // isClickable ? 'text-skin-base' : 'text-skin-gray'
            )}
          >
            {buttonName}
          </span>
        </button>
      ) : null}
      {!isClickable ? (
        <span className="cursor-default font-base-regular text-skin-gray">
          {buttonName}
        </span>
      ) : null}
    </Fragment>
  );
}
