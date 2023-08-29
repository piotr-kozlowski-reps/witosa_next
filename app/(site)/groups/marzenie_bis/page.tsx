import { getGroupsSliderData } from '@/lib/api/sliderUtils';
import { TSliderGroupImage } from '@/types';
import { Metadata } from 'next';
import FooterMain from '../../components/footer/FooterMain';
import SliderGroups from '../../components/slider_groups/SliderGroups';
import MarzenieBisContent from './components/MarzenieBisContent';

export const metadata: Metadata = {
  title: 'Marzenie bis | Grupy artystyczne | Art CK',
};

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
