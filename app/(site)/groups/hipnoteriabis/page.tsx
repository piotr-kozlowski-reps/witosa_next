import { getGroupsSliderData } from '@/lib/api/sliderUtils';
import { TSliderGroupImage } from '@/types';
import FooterMain from '../../components/footer/FooterMain';
import SliderGroups from '../../components/slider_groups/SliderGroups';
import HipnoteriaBisContent from './components/HipnoteriaBisContent';

export default async function HipnoteriaBisPage() {
  ////vars
  const sliderImages: TSliderGroupImage[] = await getGroupsSliderData(
    'HIPNOTERIA_BIS'
  );

  ////tsx
  return (
    <main>
      <SliderGroups sliderImages={sliderImages} />
      <HipnoteriaBisContent />
      <FooterMain />
    </main>
  );
}
