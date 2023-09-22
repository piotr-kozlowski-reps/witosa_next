import { useIconsLogicHandler } from '@/hooks/useIconsLogicHandler';
import { TIconSize } from '@/types';
import IconButtonWrapper from './IconButtonWrapper';

type Props = {
  alt: string;
  size?: TIconSize;
  additionalClasses?: string;
  actionFn: () => void;
};

export default function HamburgerIcon(props: Props) {
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
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="20"
            r="19"
            // fill="#F16730"
            // stroke="#F16730"
            // strokeWidth="2"
          />
          <path
            // fill-rule="evenodd"
            // clip-rule="evenodd"
            d="M12.6538 12C12.2927 12 12 12.398 12 12.8889C12 13.3798 12.2927 13.7778 12.6538 13.7778H28.3462C28.7072 13.7778 29 13.3798 29 12.8889C29 12.398 28.7072 12 28.3462 12H12.6538ZM12 20C12 19.5091 12.2927 19.1111 12.6538 19.1111H28.3462C28.7072 19.1111 29 19.5091 29 20C29 20.4909 28.7072 20.8889 28.3462 20.8889H12.6538C12.2927 20.8889 12 20.4909 12 20ZM12 27.1111C12 26.6203 12.2927 26.2222 12.6538 26.2222H28.3462C28.7072 26.2222 29 26.6203 29 27.1111C29 27.602 28.7072 28 28.3462 28H12.6538C12.2927 28 12 27.602 12 27.1111Z"
            fill={currentForegroundColor}
          />
        </svg>
      </div>
    </IconButtonWrapper>
  );
}
