import Image from 'next/image';

type Props = {
  isCurrentlyActive?: boolean;
  iconDefaultUrl: string;
  iconHoverUrl: string;
  alt: string;
  actionFn: () => void;
};

export default function IconButton(props: Props) {
  ////vars
  const { isCurrentlyActive, iconDefaultUrl, iconHoverUrl, alt, actionFn } =
    props;

  let content = (
    <div className="icon-inactive" aria-current="location">
      <Image src={iconHoverUrl} width={32} height={32} alt={alt} />
    </div>
  );
  if (!isCurrentlyActive) {
    content = (
      <button className="relative w-8 h-8" onClick={() => actionFn()}>
        <span className="sr-only">{alt}</span>
        <div
          className="absolute top-0 bottom-0 left-0 right-0 opacity-100 hover:opacity-0 focus:opacity-0"
          aria-hidden="true"
        >
          <Image
            src={iconDefaultUrl}
            width={32}
            height={32}
            alt={alt}
            aria-hidden="true"
          />
        </div>
        <div
          className="absolute top-0 bottom-0 left-0 right-0 opacity-0 hover:opacity-100 focus:opacity-100 icon-active"
          aria-hidden="true"
        >
          <Image
            src={iconHoverUrl}
            width={32}
            height={32}
            alt={alt}
            aria-hidden="true"
          />
        </div>
      </button>
    );
  }

  ////tsx
  return content;
}
