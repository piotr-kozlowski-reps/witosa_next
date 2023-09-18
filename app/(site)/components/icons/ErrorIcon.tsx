import { useIconsLogicHandler } from '@/hooks/useIconsLogicHandler';
import { TIconSize } from '@/types';

type Props = {
  alt: string;
  size?: TIconSize;
  additionalClasses?: string;
};

export default function ErrorIcon(props: Props) {
  ////vars
  const { size, alt, additionalClasses } = props;
  const { width, height, currentForegroundColor } = useIconsLogicHandler(size);

  ////tsx
  return (
    <div
      style={{ width: width, height: height }}
      aria-label={alt}
      className={additionalClasses}
    >
      <svg
        width="26"
        height="24"
        viewBox="0 0 26 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.0015 9H14V15.875H12.0015V9ZM12 17.25H14V20H12V17.25Z"
          fill="#FF1A00"
        />
        <path
          d="M15.4602 1.42694C14.9758 0.546858 14.0323 0 12.9996 0C11.967 0 11.0234 0.546859 10.5391 1.42828L0.32673 20.0551C0.100116 20.4641 -0.0121387 20.9231 0.0010401 21.3868C0.0142189 21.8505 0.152375 22.3029 0.401882 22.6993C0.647795 23.0976 0.997032 23.427 1.41511 23.6551C1.8332 23.8832 2.30566 24.002 2.78588 24H23.2134C24.1987 24 25.0908 23.5136 25.5987 22.6993C25.8479 22.3028 25.9858 21.8504 25.999 21.3868C26.0121 20.9232 25.9001 20.4642 25.6739 20.0551L15.4602 1.42694ZM1.41511 22L12.9996 2L24.5 22L1.41511 22Z"
          fill="#FF1A00"
        />
      </svg>
    </div>
  );
}
