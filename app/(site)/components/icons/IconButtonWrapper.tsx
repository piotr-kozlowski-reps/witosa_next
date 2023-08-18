import { TIconSize } from '@/types';
import clsx from 'clsx';

interface Props {
  alt: string;
  actionFn: () => void;
  additionalClasses?: string;
  size?: TIconSize;
  children: React.ReactNode;
}

export default function IconButtonWrapper(props: Props) {
  ////vars
  const { actionFn, additionalClasses, alt, children } = props;

  ////tsx
  return (
    <button
      onClick={actionFn}
      className={clsx(
        'icon-active w-full h-full',
        additionalClasses ? additionalClasses : ''
      )}
      aria-label={alt}
    >
      <span className="sr-only">{alt}</span>
      {children}
    </button>
  );
}
