import { mainSliderMockData } from '@/lib/api/temporaryApiMockData';
import SliderView from './SliderView';

export default function MainSlider() {
  const slidersData = mainSliderMockData;

  return (
    <section className="desktop-container">
      <SliderView slidersData={slidersData} />
    </section>
  );
}
