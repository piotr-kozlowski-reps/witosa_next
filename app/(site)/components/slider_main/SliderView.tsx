'use client';

import { useAdjustContainerWIdthsAndMargins } from '@/hooks/useAdjustContainerWIdthsAndMargins';
import { Slide } from '@prisma/client';
import SliderContent from './SliderContent';

type Props = {
  sliderData: Slide[];
};

export default function SliderView(props: Props) {
  ////vars
  const { sliderData } = props;
  const containerProperClasses = useAdjustContainerWIdthsAndMargins();

  ////tsx
  return (
    <section className={containerProperClasses}>
      <SliderContent slide={sliderData[0]} eventId={sliderData[0].id} />

      {/* description */}
      <div className="mt-8 prose"></div>
    </section>
  );
}
