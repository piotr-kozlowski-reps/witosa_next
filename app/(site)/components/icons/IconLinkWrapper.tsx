import { TIconSize } from '@/types';
import clsx from 'clsx';

export default function IconLinkWrapper({
  children,
  alt,
  url,
  size = 'NORMAL',
}: {
  children: React.ReactNode;
  alt: string;
  url: string;
  size?: TIconSize;
}) {
  ////tsx
  return (
    <a
      aria-label={alt}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
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
      {children}
    </a>
  );
}
