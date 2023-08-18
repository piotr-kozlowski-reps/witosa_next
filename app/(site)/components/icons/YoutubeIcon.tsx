'use client';

import { useIconsLogicHandler } from '@/hooks/useIconsLogicHandler';
import { TIconSize } from '@/types';
import IconLinkWrapper from './IconLinkWrapper';

type Props = {
  alt: string;
  size?: TIconSize;
  url: string;
};

export default function YoutubeIcon(props: Props) {
  ////vars
  const { size, alt, url } = props;
  const { width, height, currentForegroundColor } = useIconsLogicHandler(size);

  ////tsx
  return (
    <IconLinkWrapper alt={alt} url={url}>
      <svg
        width={`${width}`}
        height={`${height}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="11" />
        <path
          d="M17.7496 9.61883C17.6812 9.38289 17.5473 9.16773 17.3612 8.99487C17.175 8.82202 16.9432 8.69754 16.6888 8.63389C15.7527 8.40039 12 8.40039 12 8.40039C12 8.40039 8.24732 8.40039 7.31116 8.63265C7.05672 8.69609 6.82477 8.8205 6.63858 8.99339C6.45239 9.16627 6.31853 9.38155 6.25045 9.61759C6 10.487 6 12.3004 6 12.3004C6 12.3004 6 14.1138 6.25045 14.982C6.38839 15.4614 6.79554 15.839 7.31116 15.9669C8.24732 16.2004 12 16.2004 12 16.2004C12 16.2004 15.7527 16.2004 16.6888 15.9669C17.2058 15.839 17.6116 15.4614 17.7496 14.982C18 14.1138 18 12.3004 18 12.3004C18 12.3004 18 10.487 17.7496 9.61883ZM10.808 13.9647V10.6361L13.9152 12.288L10.808 13.9647Z"
          fill={currentForegroundColor}
        />
      </svg>
    </IconLinkWrapper>
  );
}
