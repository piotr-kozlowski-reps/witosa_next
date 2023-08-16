import { getGroupsSliderData } from '@/lib/api/sliderUtils';
import { TSliderGroupImage } from '@/types';
import FooterMain from '../../components/footer/FooterMain';
import SliderGroups from '../../components/slider_groups/SliderGroups';
import MarzenieBisContent from './components/MarzenieBisContent';

export default async function MarzenieBisPage() {
  ////vars
  const sliderImages: TSliderGroupImage[] = await getGroupsSliderData(
    'MARZENIE_BIS'
  );

  ///tsx
  return (
    <main>
      <SliderGroups sliderImages={sliderImages} />
      <MarzenieBisContent />
      <FooterMain />
    </main>
  );
}
