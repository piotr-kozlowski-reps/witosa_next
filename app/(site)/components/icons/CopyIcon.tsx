import { useIconsLogicHandler } from '@/hooks/useIconsLogicHandler';
import { TIconSize } from '@/types';
import IconButtonWrapper from './IconButtonWrapper';

type Props = {
  alt: string;
  size?: TIconSize;
  additionalClasses?: string;
  actionFn: () => void;
};

export default function CopyIcon(props: Props) {
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
            d="M25.3158 14H16.4737C15.6632 14 15 14.6545 15 15.4545V25.6364H16.4737V15.4545H25.3158V14ZM27.5263 16.9091H19.4211C18.6105 16.9091 17.9474 17.5636 17.9474 18.3636V28.5455C17.9474 29.3455 18.6105 30 19.4211 30H27.5263C28.3368 30 29 29.3455 29 28.5455V18.3636C29 17.5636 28.3368 16.9091 27.5263 16.9091ZM27.5263 28.5455H19.4211V18.3636H27.5263V28.5455Z"
            fill={currentForegroundColor}
          />
          <path
            opacity="0.3"
            d="M19 18H28V29H19V18Z"
            fill={currentForegroundColor}
          />
        </svg>
      </div>
    </IconButtonWrapper>
  );
}
