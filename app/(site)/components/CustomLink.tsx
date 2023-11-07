import clsx from 'clsx';
import Link from 'next/link';
import { Fragment } from 'react';

interface Props {
  visibleText: string;
  descriptionText: string;
  url: string;
  additionalCssClasses?: string;
  inactiveLink?: boolean;
}
export default function CustomLink(props: Props) {
  ////vars
  const {
    visibleText,
    url,
    descriptionText,
    additionalCssClasses,
    inactiveLink = false,
  } = props;
  ////tsx
  return (
    <Fragment>
      {inactiveLink ? (
        <button className="standard-button mt-[-6px]" disabled={true}>
          {visibleText}
        </button>
      ) : (
        <Link
          className={clsx(
            'py-[9px] standard-button',
            additionalCssClasses ? additionalCssClasses : ''
          )}
          href={url}
          aria-label={`${descriptionText} - dowiedz się więcej.`}
        >
          <span aria-hidden>{visibleText}</span>
        </Link>
      )}
    </Fragment>
  );
}
