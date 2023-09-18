import { useIconsLogicHandler } from '@/hooks/useIconsLogicHandler';
import { TIconSize } from '@/types';

type Props = {
  alt: string;
  size?: TIconSize;
  // additionalClasses?: string;
  // actionFn: () => void;
  // isToBeRotatedToBeVertical?: boolean;
  // isToBeFlippedToBeNextButton?: boolean;
  // isDefaultStateOrRotatedState?: boolean;
  // disabled?: boolean;
};

export default function SuccessIcon(props: Props) {
  ////vars
  const {
    size,
    alt,
    // additionalClasses,
    // isToBeRotatedToBeVertical = false,
    // isToBeFlippedToBeNextButton = false,
    // isDefaultStateOrRotatedState,
    // actionFn,
    // disabled = false,
  } = props;
  const { width, height, currentForegroundColor } = useIconsLogicHandler(size);

  ////tsx
  return (
    <div style={{ width: width, height: height }} aria-label={alt}>
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
      {/* <svg
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
          d="M26.7055 30.348C26.5632 30.348 26.4107 30.3073 26.248 30.226C26.1057 30.1243 25.9837 30.043 25.882 29.982L16.8845 23.76C16.5592 23.5363 16.3253 23.3127 16.183 23.089C16.061 22.8653 16 22.6213 16 22.357V21.991C16 21.7063 16.061 21.4623 16.183 21.259C16.3253 21.0353 16.5592 20.8117 16.8845 20.588L25.882 14.366C25.9837 14.305 26.1057 14.2338 26.248 14.1525C26.4107 14.0508 26.5632 14 26.7055 14C26.8682 14 27.0105 14.0508 27.1325 14.1525C27.2545 14.2542 27.3155 14.4067 27.3155 14.61V15.1285C27.3155 15.3318 27.2647 15.5047 27.163 15.647C27.0817 15.769 26.919 15.9113 26.675 16.074L17.8605 22.174L26.675 28.274C26.919 28.4367 27.0817 28.5892 27.163 28.7315C27.2647 28.8535 27.3155 29.0162 27.3155 29.2195V29.738C27.3155 29.9413 27.2545 30.0938 27.1325 30.1955C27.0105 30.2972 26.8682 30.348 26.7055 30.348Z"
          fill={currentForegroundColor}
        />
      </svg> */}
    </div>
  );
}
