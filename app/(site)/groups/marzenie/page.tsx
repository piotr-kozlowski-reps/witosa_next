import { getGroupsSliderData } from '@/lib/api/sliderUtils';
import { TSliderGroupImage } from '@/types';
import { Metadata } from 'next';
import FooterMain from '../../components/footer/FooterMain';
import SliderGroups from '../../components/slider_groups/SliderGroups';
import MarzenieContent from './components/Marzenie/MarzenieContent';

export const metadata: Metadata = {
  title: 'Marzenie | Grupy artystyczne | Art CK',
};

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
