import Link from 'next/link';

interface Props {
  visibleText: string;
  descriptionText: string;
  url: string;
}
export default function CustomLink(props: Props) {
  ////vars
  const { visibleText, url, descriptionText } = props;
  ////tsx
  return (
    <Link
      className="px-6 py-2 font-light no-underline bg-skin-cta-primary rounded-base text-base-13 text-skin-inverted hover:bg-skin-cta-secondary"
      href={url}
      aria-label={`${descriptionText} - dowiedz się więcej.`}
    >
      {visibleText}
    </Link>
  );
}
