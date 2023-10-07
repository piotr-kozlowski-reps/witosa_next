import { TIconSize } from '@/types';
import clsx from 'clsx';

interface Props {
  alt: string;
  actionFn: () => void;
  additionalClasses?: string;
  size?: TIconSize;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function IconButtonWrapper(props: Props) {
  ////vars
  const {
    actionFn,
    additionalClasses,
    alt,
    children,
    disabled = false,
  } = props;

  ////tsx
  return (
    <button
      onClick={actionFn}
      type="button"
      className={clsx(
        ' w-full h-full',
        additionalClasses ? additionalClasses : '',
        disabled ? 'opacity-25 icon-disabled' : 'opacity-100 icon-active'
      )}
      aria-label={alt}
      disabled={disabled}
    >
      <span className="sr-only">{alt}</span>
      {children}
    </button>
  );
}
