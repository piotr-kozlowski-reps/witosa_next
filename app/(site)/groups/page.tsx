import { Metadata } from 'next';
// import { getGroupsSliderData } from '@/lib/api/sliderUtils';
// import { TSliderGroupImage } from '@/types';

import FooterMain from '../components/footer/FooterMain';
import GroupContentInfo from './components/GroupContentInfo';
// import FooterMain from '../../components/footer/FooterMain';
// import HipnoteriaContent from './components/HipnoteriaContent';
// import SliderGroupsInfo from '../../components/slider_groups/SliderGroupsInfo';

type Props = {
  searchParams: Promise<{ title: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { title } = await searchParams;

  // Fetch data based on params
  // const group = await prisma.cyclicalActivity.findFirst({
  //   where: { id: slug },
  // });

  // if (!group) {
  //   return {
  //     title: 'Grupa nie znaleziona | Art CK',
  //   };
  // }

  return {
    title: `${title} | Grupy artystyczne | Art CK`,
  };
}

export default async function GroupPage({ searchParams }: Props) {
  ////vars
  const { title } = await searchParams;

  // Fetch data based on params
  // const group = await prisma.cyclicalActivity.findFirst({
  //   where: { id: slug },
  // });

  // if (!group) {
  //   return {
  //     title: 'Grupa nie znaleziona | Art CK',
  //   };
  // }

  //   const sliderImages: TSliderGroupImage[] =
  //     await getGroupsSliderData('HIPNOTERIA');

  ///tsx
  return (
    <GroupContentInfo title={title} />

    // <main>
    //   <div className="proper-container-classes bg-skin-main-bg drop-shadow-none slider-break-point:drop-shadow-big rounded-base">
    //     <div className="flex flex-col items-start justify-start gap-6 slider-break-point:flex-row">
    //       <div className="slider-break-point:h-[638px] slider-break-point:w-[453px] w-full">
    //         <SliderGroupsInfo sliderImages={sliderImages!} />
    //       </div>

    //       <div className="flex-1 prose">
    //         <HipnoteriaContent />
    //       </div>
    //     </div>
    //   </div>

    //   <FooterMain />
    // </main>
  );
}
