import { useIconsLogicHandler } from '@/hooks/useIconsLogicHandler';
import { TIconSize } from '@/types';
import clsx from 'clsx';
import IconButtonWrapper from './IconButtonWrapper';

type Props = {
  alt: string;
  size?: TIconSize;
  additionalClasses?: string;
  actionFn: () => void;
  isToBeRotatedToBeVertical?: boolean;
  isToBeFlippedToBeNextButton?: boolean;
  isDefaultStateOrRotatedState?: boolean;
  disabled?: boolean;
};

export default function GoToStartIcon(props: Props) {
  ////vars
  const {
    size,
    alt,
    additionalClasses,
    isToBeRotatedToBeVertical = false,
    isToBeFlippedToBeNextButton = false,
    isDefaultStateOrRotatedState,
    actionFn,
    disabled = false,
  } = props;
  const { width, height, currentForegroundColor } = useIconsLogicHandler(size);

  ////tsx
  return (
    <IconButtonWrapper
      actionFn={actionFn}
      additionalClasses={additionalClasses}
      alt={alt}
      disabled={disabled}
    >
      <div
        style={{ width: width, height: height }}
        className={clsx(
          isToBeRotatedToBeVertical
            ? isDefaultStateOrRotatedState
              ? 'rotate-90'
              : '-rotate-90'
            : '',
          isToBeFlippedToBeNextButton
            ? isDefaultStateOrRotatedState
              ? 'rotate-180'
              : '-rotate-180'
            : ''
        )}
      >
        <svg
          width={width}
          height={height}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.7055 30.348C29.5632 30.348 29.4107 30.3073 29.248 30.226C29.1057 30.1243 28.9837 30.043 28.882 29.982L19.8845 23.76C19.5592 23.5363 19.3253 23.3127 19.183 23.089C19.061 22.8653 19 22.6213 19 22.357V21.991C19 21.7063 19.061 21.4623 19.183 21.259C19.3253 21.0353 19.5592 20.8117 19.8845 20.588L28.882 14.366C28.9837 14.305 29.1057 14.2338 29.248 14.1525C29.4107 14.0508 29.5632 14 29.7055 14C29.8682 14 30.0105 14.0508 30.1325 14.1525C30.2545 14.2542 30.3155 14.4067 30.3155 14.61V15.1285C30.3155 15.3318 30.2647 15.5047 30.163 15.647C30.0817 15.769 29.919 15.9113 29.675 16.074L20.8605 22.174L29.675 28.274C29.919 28.4367 30.0817 28.5892 30.163 28.7315C30.2647 28.8535 30.3155 29.0162 30.3155 29.2195V29.738C30.3155 29.9413 30.2545 30.0938 30.1325 30.1955C30.0105 30.2972 29.8682 30.348 29.7055 30.348Z"
            fill={currentForegroundColor}
          />
          <path
            d="M23.7055 30.348C23.5632 30.348 23.4107 30.3073 23.248 30.226C23.1057 30.1243 22.9837 30.043 22.882 29.982L13.8845 23.76C13.5592 23.5363 13.3253 23.3127 13.183 23.089C13.061 22.8653 13 22.6213 13 22.357V21.991C13 21.7063 13.061 21.4623 13.183 21.259C13.3253 21.0353 13.5592 20.8117 13.8845 20.588L22.882 14.366C22.9837 14.305 23.1057 14.2338 23.248 14.1525C23.4107 14.0508 23.5632 14 23.7055 14C23.8682 14 24.0105 14.0508 24.1325 14.1525C24.2545 14.2542 24.3155 14.4067 24.3155 14.61V15.1285C24.3155 15.3318 24.2647 15.5047 24.163 15.647C24.0817 15.769 23.919 15.9113 23.675 16.074L14.8605 22.174L23.675 28.274C23.919 28.4367 24.0817 28.5892 24.163 28.7315C24.2647 28.8535 24.3155 29.0162 24.3155 29.2195V29.738C24.3155 29.9413 24.2545 30.0938 24.1325 30.1955C24.0105 30.2972 23.8682 30.348 23.7055 30.348Z"
            fill={currentForegroundColor}
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
    </IconButtonWrapper>
  );
}
