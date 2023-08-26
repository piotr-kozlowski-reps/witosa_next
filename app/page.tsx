import { motion } from 'framer-motion';
import FooterMain from './(site)/components/footer/FooterMain';
import NewsMain from './(site)/components/news/NewsMain';
import MainSlider from './(site)/components/slider_main/MainSlider';

export default function Home() {
  return (
    <motion.main
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
    </motion.main>
  );
}
