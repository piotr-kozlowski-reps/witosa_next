import { TIconSize } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  isCurrentlyActive?: boolean;
  iconDefaultUrl: string;
  iconHoverUrl: string;
  alt: string;
  size?: TIconSize;
  actionFn: () => void;
};

export default function IconButton({
  isCurrentlyActive,
  iconDefaultUrl,
  iconHoverUrl,
  alt,
  actionFn,
  size = 'NORMAL',
}: Props) {
  ////vars
  let width = 32;
  let height = 32;
  switch (size) {
    case 'SMALL':
      width = 24;
      height = 24;
      break;

    case 'BIG':
      width = 44;
      height = 44;
      break;
  }

  let content = (
    <div className="icon-inactive" aria-current="location">
      <Image src={iconHoverUrl} width={width} height={height} alt={alt} />
    </div>
  );
  if (!isCurrentlyActive) {
    content = (
      <button
        className={clsx(
          'relative',
          size === 'NORMAL'
            ? 'w-8 h-8'
            : size === 'SMALL'
            ? 'w-6 h-6'
            : 'w-10 h-10'
        )}
        onClick={actionFn}
      >
        <span className="sr-only">{alt}</span>
        <div
          className="absolute top-0 bottom-0 left-0 right-0 opacity-100 hover:opacity-0 focus:opacity-0 drop-shadow-small"
          aria-hidden="true"
        >
          <Image
            src={iconDefaultUrl}
            width={width}
            height={height}
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
            width={width}
            height={height}
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