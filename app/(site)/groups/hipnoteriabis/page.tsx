import { getGroupsSliderData } from '@/lib/api/sliderUtils';
import { TSliderGroupsImages } from '@/types';
import FooterMain from '../../components/footer/FooterMain';
import SliderGroups from '../../components/slider_groups/SliderGroups';
import HipnoteriaBisContent from './components/HipnoteriaBisContent';

export default async function HipnoteriaBisPage() {
  ////vars
  const sliderImages: TSliderGroupsImages[] = await getGroupsSliderData();

  return (
    <main>
      <SliderGroups sliderImages={sliderImages} />
      <HipnoteriaBisContent />
      <FooterMain />
    </main>
  );
}
