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
      className="standard-button"
      href={url}
      aria-label={`${descriptionText} - dowiedz się więcej.`}
    >
      {visibleText}
    </Link>
  );
}
