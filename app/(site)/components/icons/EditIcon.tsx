import { useIconsLogicHandler } from '@/hooks/useIconsLogicHandler';
import { TIconSize } from '@/types';
import IconButtonWrapper from './IconButtonWrapper';

type Props = {
  alt: string;
  size?: TIconSize;
  additionalClasses?: string;
  actionFn: () => void;
};

export default function EditIcon(props: Props) {
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
          <path
            d="M26.1942 14.2466C26.3522 14.0887 26.5663 14 26.7896 14C27.0129 14 27.2271 14.0887 27.385 14.2466L30.7534 17.615C30.9113 17.7729 31 17.9871 31 18.2104C31 18.4337 30.9113 18.6478 30.7534 18.8058L19.8059 29.7533C19.6481 29.9112 19.4339 30 19.2106 30H15.8421C15.6188 30 15.4046 29.9113 15.2466 29.7534C15.0887 29.5954 15 29.3812 15 29.1579V25.7894C15 25.5661 15.0888 25.3519 15.2467 25.1941L23.6679 16.7729L26.1942 14.2466ZM24.2633 18.559L16.6842 26.1381V28.3158H18.8619L26.441 20.7367L24.2633 18.559ZM27.6317 19.546L28.9673 18.2104L26.7896 16.0327L25.454 17.3683L27.6317 19.546Z"
            fill={currentForegroundColor}
          />
        </svg>
      </div>
    </IconButtonWrapper>
  );
}
