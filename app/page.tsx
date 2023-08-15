import FooterMain from './(site)/components/footer/FooterMain';
import NewsMain from './(site)/components/news/NewsMain';
import MainSlider from './(site)/components/slider_main/MainSlider';

export default function Home() {
  return (
    <main>
      <MainSlider />
      <NewsMain />
      {/* <div className="bg-red-200"> */}
      {/* <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br /> */}
      {/* <Test /> */}
      {/* <TestServerSession />
      <TestClientSession /> */}
      {/* </div> */}
      <FooterMain />
    </main>
  );
}
