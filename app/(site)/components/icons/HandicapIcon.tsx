import { useIconsLogicHandler } from '@/hooks/useIconsLogicHandler';
import { TIconSize } from '@/types';
import IconButtonWrapper from './IconButtonWrapper';

type Props = {
  alt: string;
  size?: TIconSize;
  additionalClasses?: string;
  actionFn: () => void;
};

export default function HandicapIcon(props: Props) {
  ////vars
  const { size, alt, additionalClasses, actionFn } = props;
  const { width, height, currentForegroundColor } = useIconsLogicHandler(size);

  ////tsx
  return (
    <IconButtonWrapper
      actionFn={actionFn}
      additionalClasses={additionalClasses}
      alt={alt}
    >
      <div style={{ width: width, height: height }}>
        <svg
          width={width}
          height={height}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="16"
            cy="16"
            r="15"
            // fill="#F16730"
            // stroke="#F16730"
            // stroke-width="2"
          />
          <path
            d="M13.4372 14.6728V16.428C12.5291 16.9816 11.9186 18.016 11.9186 19.2C11.9186 20.968 13.2778 22.4 14.9559 22.4C16.0797 22.4 17.0615 21.7568 17.5869 20.8H19.2522C18.6272 22.664 16.9392 24 14.9559 24C12.4395 24 10.3999 21.8512 10.3999 19.2C10.3999 17.1096 11.668 15.332 13.4372 14.6728ZM16.4745 20C15.2163 20 14.1965 18.9256 14.1965 17.6V14.4C14.1965 13.0744 15.2163 12 16.4745 12C17.7327 12 18.7525 13.0744 18.7525 14.4V18.4H19.8414C20.3334 18.4 20.7928 18.6512 21.0761 19.0688L21.1436 19.1768L23.1999 22.7888L21.8984 23.6112L19.8406 20H16.4745ZM16.4745 8C17.5224 8 18.3729 8.896 18.3729 10C18.3729 11.104 17.5224 12 16.4745 12C15.4267 12 14.5762 11.104 14.5762 10C14.5762 8.896 15.4267 8 16.4745 8Z"
            fill={currentForegroundColor}
          />
        </svg>
      </div>
    </IconButtonWrapper>
  );
}

// ////tsx
// return (
//   <IconLinkWrapper alt={alt} url={url}>
//     <svg
//       width={`${width}`}
//       height={`${height}`}
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <circle cx="12" cy="12" r="11" />
//       <path
//         d="M17.7496 9.61883C17.6812 9.38289 17.5473 9.16773 17.3612 8.99487C17.175 8.82202 16.9432 8.69754 16.6888 8.63389C15.7527 8.40039 12 8.40039 12 8.40039C12 8.40039 8.24732 8.40039 7.31116 8.63265C7.05672 8.69609 6.82477 8.8205 6.63858 8.99339C6.45239 9.16627 6.31853 9.38155 6.25045 9.61759C6 10.487 6 12.3004 6 12.3004C6 12.3004 6 14.1138 6.25045 14.982C6.38839 15.4614 6.79554 15.839 7.31116 15.9669C8.24732 16.2004 12 16.2004 12 16.2004C12 16.2004 15.7527 16.2004 16.6888 15.9669C17.2058 15.839 17.6116 15.4614 17.7496 14.982C18 14.1138 18 12.3004 18 12.3004C18 12.3004 18 10.487 17.7496 9.61883ZM10.808 13.9647V10.6361L13.9152 12.288L10.808 13.9647Z"
//         fill={currentForegroundColor}
//       />
//     </svg>
//   </IconLinkWrapper>
// );
