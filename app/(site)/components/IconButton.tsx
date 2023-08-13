import { TIconSize } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  isCurrentlyActive?: boolean;
  isLink?: boolean;
  linkUrl?: string;
  iconDefaultUrl: string;
  iconHoverUrl: string;
  alt: string;
  size?: TIconSize;
  actionFn: () => void;
};

export default function IconButton({
  isCurrentlyActive,
  isLink = false,
  linkUrl,
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
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_URL}${iconHoverUrl}`}
        width={width}
        height={height}
        alt={alt}
      />
    </div>
  );
  if (!isCurrentlyActive && !isLink) {
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
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${iconDefaultUrl}`}
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
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${iconHoverUrl}`}
            width={width}
            height={height}
            alt={alt}
            aria-hidden="true"
          />
        </div>
      </button>
    );
  }

  if (isLink) {
    content = (
      <Link
        href={linkUrl || '#'}
        className={clsx(
          'relative block',
          size === 'NORMAL'
            ? 'w-8 h-8'
            : size === 'SMALL'
            ? 'w-6 h-6'
            : 'w-10 h-10'
        )}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className="absolute top-0 bottom-0 left-0 right-0 opacity-100 hover:opacity-0 focus:opacity-0 drop-shadow-small"
          aria-hidden="true"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${iconDefaultUrl}`}
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
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${iconHoverUrl}`}
            width={width}
            height={height}
            alt={alt}
            aria-hidden="true"
          />
        </div>
      </Link>
    );
  }

  ////tsx
  return content;
}
