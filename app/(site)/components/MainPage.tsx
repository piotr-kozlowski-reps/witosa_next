'use client';

import { TEventInNewsSection, TSlide } from '@/types';
import { motion } from 'framer-motion';
import FooterMain from './footer/FooterMain';
import NewsMain from './news/NewsMain';
import MainSlider from './slider_main/MainSlider';

type Props = {
  sliderData: TSlide[];
  newsData: TEventInNewsSection[];
};

export default function MainPage(props: Props) {
  ////vars
  const { sliderData, newsData } = props;

  ////tsx
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
    >
      <MainSlider sliderData={sliderData} />
      <NewsMain newsData={newsData} />
      {/* <Test /> */}
      {/* <TestServerSession />
      <TestClientSession /> */}
      {/* </div> */}
      <FooterMain />
    </motion.div>
  );
}
