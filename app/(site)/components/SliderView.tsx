import { getPolishTypeName } from '@/lib/textHelpers';
import { TMainSliderData } from '@/types';
import clsx from 'clsx';

type Props = {
  slidersData: TMainSliderData[];
};

export default function SliderView(props: Props) {
  ////vars
  const { slidersData } = props;

  ////tsx
  return (
    <section>
      {/* image */}
      <div className="h-[352px] bg-skin-primary rounded-base"></div>
      {/* description */}
      <div className="mt-8">
        <div className="text-base-13">
          {slidersData[0].eventType.map((type, index) => (
            <div key={index} className="inline">
              <span>{index !== 0 ? '|' : ''}</span>
              <span className={clsx(index !== 0 ? 'mx-2' : 'mr-2')}>
                {getPolishTypeName(type)}
              </span>
            </div>
          ))}
        </div>
        <div>{slidersData[0].title}</div>
        <div>{slidersData[0].date.toISOString()}</div>
        <button>dowiedz się więcej</button>
        <p></p>
      </div>
    </section>
  );
}
