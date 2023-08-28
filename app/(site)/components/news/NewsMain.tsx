import { getNewsDataSorted } from '@/lib/api/newsUtils';
import { TEventInNewsSection } from '@/types';
import NewsInside from './NewsInside';

async function NewsMain() {
  ////vars
  const newsData: TEventInNewsSection[] = await getNewsDataSorted();

  // console.log('newsData.length: ', newsData.length);
  // console.log({ newsData });

  ////tsx
  return <NewsInside newsData={newsData} />;
}

export default NewsMain;
