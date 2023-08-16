import { getGroupsSliderData } from '@/lib/api/sliderUtils';
import { TSliderGroupImage } from '@/types';
import FooterMain from '../../components/footer/FooterMain';
import SliderGroups from '../../components/slider_groups/SliderGroups';
import MarzenieContent from './components/Marzenie/MarzenieContent';

export default async function MarzeniePage() {
  ////vars
  const sliderImages: TSliderGroupImage[] = await getGroupsSliderData(
    'MARZENIE'
  );

  ///tsx
  return (
    <main>
      <SliderGroups sliderImages={sliderImages} />
      <MarzenieContent />
      <FooterMain />
    </main>
  );
}
