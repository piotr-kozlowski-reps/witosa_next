import { getNewsData } from '@/lib/api/newsUtils';
import { TEventInNewsSection } from '@/types';

async function NewsMain() {
  ////vars
  const newsData: TEventInNewsSection[] = await getNewsData();
  ////tsx
  return <div>NewsMain</div>;
}

export default NewsMain;
