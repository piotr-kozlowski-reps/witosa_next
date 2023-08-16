import { getGroupsSliderData } from '@/lib/api/sliderUtils';
import { TSliderGroupImage } from '@/types';
import FooterMain from '../../components/footer/FooterMain';
import SliderGroups from '../../components/slider_groups/SliderGroups';
import MarzenieMiniMiniContent from './components/MarzenieMiniMiniContent';

export default async function MarzenieMiniMiniPage() {
  ////vars
  const sliderImages: TSliderGroupImage[] = await getGroupsSliderData(
    'MARZENIE_MINI_MINI'
  );
  ////tsx
  return (
    <main>
      <SliderGroups sliderImages={sliderImages} />
      <MarzenieMiniMiniContent />
      <FooterMain />
    </main>
  );
}
