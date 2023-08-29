import { getGroupsSliderData } from '@/lib/api/sliderUtils';
import { TSliderGroupImage } from '@/types';
import { Metadata } from 'next';
import FooterMain from '../../components/footer/FooterMain';
import SliderGroups from '../../components/slider_groups/SliderGroups';
import HipnoteriaContent from './components/HipnoteriaContent';

export const metadata: Metadata = {
  title: 'Hipnoteria | Grupy artystyczne | Art CK',
};

export default async function HipnoteriaPage() {
  ////vars
  const sliderImages: TSliderGroupImage[] = await getGroupsSliderData(
    'HIPNOTERIA'
  );

  ///tsx
  return (
    <main>
      <SliderGroups sliderImages={sliderImages} />
      <HipnoteriaContent />
      <FooterMain />
    </main>
  );
}
