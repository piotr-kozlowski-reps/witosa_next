import { useIconsLogicHandler } from '@/hooks/useIconsLogicHandler';
import { TIconSize } from '@/types';

type Props = {
  alt: string;
  size?: TIconSize;
  additionalClasses?: string;
};

export default function SuccessIcon(props: Props) {
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
        width="34"
        height="24"
        viewBox="0 0 34 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.1373 24L0.273513 11.884C0.0871651 11.6616 -0.0102092 11.3754 0.000848304 11.0828C0.0119058 10.7901 0.130581 10.5125 0.333158 10.3055C0.535735 10.0984 0.807293 9.97707 1.09357 9.96576C1.37984 9.95446 1.65974 10.054 1.87734 10.2445L12.1146 20.7094L32.1227 0.279595C32.3403 0.0891035 32.6202 -0.0104362 32.9064 0.000867169C33.1927 0.0121706 33.4643 0.133485 33.6668 0.340567C33.8694 0.547649 33.9881 0.825246 33.9991 1.11789C34.0102 1.41053 33.9128 1.69665 33.7265 1.91909L12.1373 24Z"
          fill="#256254"
        />
      </svg>
    </div>
  );
}
