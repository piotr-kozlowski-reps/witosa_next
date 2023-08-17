'use client';

import { useLayoutState } from '@/context/layoutState';
import { TIconSize } from '@/types';
import clsx from 'clsx';

type Props = {
  alt: string;
  size?: TIconSize;
  url: string;
};

export default function FacebookIcon(props: Props) {
  ////vars
  const { size, alt, url } = props;
  const { getCurrentForegroundColor } = useLayoutState();

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

  ////tsx
  return (
    <a
      aria-label={alt}
      href={url}
      target="_blank"
      className={clsx(
        'relative mt-[5px] icon-active',
        size === 'NORMAL'
          ? 'w-8 h-8'
          : size === 'SMALL'
          ? 'w-6 h-6'
          : 'w-10 h-10'
      )}
    >
      <span className="sr-only">{alt}</span>
      <svg
        width={`${width}`}
        height={`${height}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="11"
          // fill="none"
          // stroke="none"
          // stroke-width="2"
        />
        <path
          d="M9.92096 18H12.4604V12.9411H14.7486L14.9999 10.4272H12.4604V9.15789C12.4604 8.80909 12.7447 8.52632 13.0953 8.52632H14.9999V6H13.0953C11.3421 6 9.92096 7.41384 9.92096 9.15789V10.4272H8.65124L8.3999 12.9411H9.92096V18Z"
          fill={`${getCurrentForegroundColor()}`}
        />
      </svg>
    </a>
  );
}
