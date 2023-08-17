'use client';

import { useLayoutState } from '@/context/layoutState';
import { TIconSize } from '@/types';
import clsx from 'clsx';
import { useRef } from 'react';

type Props = {
  alt: string;
  size?: TIconSize;
  url: string;
};

export default function InstagramIcon(props: Props) {
  ////vars
  const { size, alt, url } = props;
  const svgRef = useRef<SVGSVGElement>(null);
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
      // onClick={actionFn}
    >
      <span className="sr-only">{alt}</span>
      <svg
        width={`${width}`}
        height={`${height}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="11" />
        <path
          // fill-rule="evenodd"
          // clip-rule="evenodd"
          d="M9.6 6C7.61178 6 6 7.61178 6 9.6V14.4C6 16.3882 7.61178 18 9.6 18H14.4C16.3882 18 18 16.3882 18 14.4V9.6C18 7.61178 16.3882 6 14.4 6H9.6ZM9.2 12C9.2 10.4536 10.4536 9.2 12 9.2C13.5464 9.2 14.8 10.4536 14.8 12C14.8 13.5464 13.5464 14.8 12 14.8C10.4536 14.8 9.2 13.5464 9.2 12ZM14.8 9.2H15.6V8.4H14.8V9.2Z"
          fill={`${getCurrentForegroundColor()}`}
        />
        <path
          d="M12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10Z"
          fill={`${getCurrentForegroundColor()}`}
        />
      </svg>
      {/* <svg
        style={{ color: 'var(--color-foreground-base)' }}
        ref={svgRef}
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
      </svg> */}
    </a>
  );
}
