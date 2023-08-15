import { getNewsDataSorted } from '@/lib/api/newsUtils';
import { TEventInNewsSection } from '@/types';
import NewsInside from './NewsInside';

async function NewsMain() {
  ////vars
  const newsData: TEventInNewsSection[] = await getNewsDataSorted();

  ////tsx
  return <NewsInside newsData={newsData} />;
}

export default NewsMain;
