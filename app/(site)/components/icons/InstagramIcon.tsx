import { useIconsLogicHandler } from '@/hooks/useIconsLogicHandler';
import { TIconSize } from '@/types';
import IconLinkWrapper from './IconLinkWrapper';

type Props = {
  alt: string;
  size?: TIconSize;
  url: string;
};

export default function InstagramIcon(props: Props) {
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
          d="M9.6 6C7.61178 6 6 7.61178 6 9.6V14.4C6 16.3882 7.61178 18 9.6 18H14.4C16.3882 18 18 16.3882 18 14.4V9.6C18 7.61178 16.3882 6 14.4 6H9.6ZM9.2 12C9.2 10.4536 10.4536 9.2 12 9.2C13.5464 9.2 14.8 10.4536 14.8 12C14.8 13.5464 13.5464 14.8 12 14.8C10.4536 14.8 9.2 13.5464 9.2 12ZM14.8 9.2H15.6V8.4H14.8V9.2Z"
          fill={currentForegroundColor}
        />
        <path
          d="M12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10Z"
          fill={currentForegroundColor}
        />
      </svg>
    </IconLinkWrapper>
  );
}