import { TCurrentDevice } from '@/types';
import clsx from 'clsx';

interface Props {
  getCurrentDevice: () => TCurrentDevice;
}

export default function NewsInside(props: Props) {
  ////vars
  const { getCurrentDevice } = props;

  ////tsx
  return (
    <section
      className={clsx(
        getCurrentDevice() === 'MOBILE' ? 'mx-mobile-margin' : '',
        getCurrentDevice() === 'TABLET' ? 'mx-tablet-margin' : '',
        getCurrentDevice() === 'DESKTOP' ? 'desktop-container' : ''
      )}
    >
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-400 h-32">dfv</div>
        <div className="bg-red-400">sdcqasdcqadcqw</div>
        <div className="bg-red-400 h-64">qwecqwecqwec</div>
        <div className="bg-red-400">
          wc dscasd casd ca sdc asd c asdc a sdc as dc asd ca sdc
        </div>
      </div>
    </section>
  );
}
