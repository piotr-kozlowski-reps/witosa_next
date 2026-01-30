import { getGroupsSliderData } from '@/lib/api/sliderUtils';
import { TSliderGroupImage } from '@/types';
import { Metadata } from 'next';
import FooterMain from '../../components/footer/FooterMain';
import HipnoteriaBisContent from './components/HipnoteriaBisContent';
import SliderGroupsInfo from '../../components/slider_groups/SliderGroupsInfo';

export const metadata: Metadata = {
  title: 'Hipnoteria bis | Grupy artystyczne | Art CK',
};

export default async function HipnoteriaBisPage() {
  ////vars
  const sliderImages: TSliderGroupImage[] =
    await getGroupsSliderData('HIPNOTERIA_BIS');

  ////tsx
  return (
    <main>
      <div className="proper-container-classes bg-skin-main-bg drop-shadow-none slider-break-point:drop-shadow-big rounded-base">
        <div className="flex flex-col items-start justify-start gap-6 slider-break-point:flex-row">
          <div className="slider-break-point:h-[638px] slider-break-point:w-[453px] w-full">
            <SliderGroupsInfo sliderImages={sliderImages!} />
          </div>

          <div className="flex-1 prose">
            <HipnoteriaBisContent />
          </div>
        </div>
      </div>

      <FooterMain />
    </main>
  );
}
