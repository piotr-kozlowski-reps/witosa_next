import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  visibleText: string;
  descriptionText: string;
  url: string;
  additionalCssClasses?: string;
}
export default function CustomLink(props: Props) {
  ////vars
  const { visibleText, url, descriptionText, additionalCssClasses } = props;
  ////tsx
  return (
    <Link
      className={clsx(
        'standard-button',
        additionalCssClasses ? additionalCssClasses : ''
      )}
      href={url}
      aria-label={`${descriptionText} - dowiedz się więcej.`}
    >
      <span aria-hidden>{visibleText}</span>
    </Link>
  );
}
