'use client';

import { motion } from 'framer-motion';
import FooterMain from './footer/FooterMain';
import NewsMain from './news/NewsMain';
import MainSlider from './slider_main/MainSlider';

export default function MainPage() {
  ////tsx
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
    >
      <MainSlider />
      <NewsMain />
      {/* <Test /> */}
      {/* <TestServerSession />
      <TestClientSession /> */}
      {/* </div> */}
      <FooterMain />
    </motion.div>
  );
}
