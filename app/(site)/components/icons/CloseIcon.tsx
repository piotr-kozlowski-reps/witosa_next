import { useIconsLogicHandler } from '@/hooks/useIconsLogicHandler';
import { TIconSize } from '@/types';
import IconButtonWrapper from './IconButtonWrapper';

type Props = {
  alt: string;
  size?: TIconSize;
  additionalClasses?: string;
  actionFn: () => void;
};

export default function CloseIcon(props: Props) {
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
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="22"
            cy="22"
            r="21"
            // fill="#F16730"
            // stroke="#F16730"
            // stroke-width="2"
          />
          <path
            d="M14.2755 28.2949C13.9246 28.6185 13.91 29.1735 14.2428 29.5343C14.5756 29.8951 15.1299 29.9253 15.4808 29.6017L30.7285 15.5382C31.0793 15.2146 31.0939 14.6596 30.7611 14.2988C30.4283 13.938 29.874 13.9078 29.5232 14.2314L14.2755 28.2949Z"
            fill={currentForegroundColor}
          />
          <path
            d="M29.2072 29.8791C29.5447 30.2166 30.0998 30.2088 30.4469 29.8617C30.794 29.5146 30.8018 28.9595 30.4643 28.622L15.7967 13.9545C15.4593 13.617 14.9041 13.6248 14.557 13.9718C14.21 14.3189 14.2022 14.8741 14.5397 15.2115L29.2072 29.8791Z"
            fill={currentForegroundColor}
          />
        </svg>
      </div>
    </IconButtonWrapper>
  );
}
