import clsx from 'clsx';
import { Fragment } from 'react';

type Props = {
  buttonName: string;
  actionFn: () => void;
  isSubmit?: boolean;
  isActive?: boolean;
  isAccessToStage?: boolean;
};

export default function TextButton(props: Props) {
  ////vars
  const {
    buttonName,
    actionFn,
    isSubmit = false,
    isActive = false,
    isAccessToStage = true,
  } = props;

  // console.log(buttonName, isAccessToStage, isActive);

  return (
    <Fragment>
      {isAccessToStage ? (
        <button
          className={clsx(
            isActive ? 'link-active' : isAccessToStage ? 'link-default' : ''
          )}
          onClick={actionFn}
          type={isSubmit ? 'submit' : 'button'}
          aria-label={buttonName}
        >
          <span
            className={clsx(
              isActive
                ? 'font-base-bold text-skin-base'
                : 'font-base-regular text-skin-base',
              isAccessToStage ? 'text-skin-base' : 'text-skin-gray'
            )}
          >
            {buttonName}
          </span>
        </button>
      ) : null}
      {!isAccessToStage ? (
        <span className="opacity-50 cursor-default font-base-regular text-skin-gray">
          {buttonName}
        </span>
      ) : null}
    </Fragment>
  );
}
