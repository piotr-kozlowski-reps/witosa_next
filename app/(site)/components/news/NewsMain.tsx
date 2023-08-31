import { TEventInNewsSection } from '@/types';
import NewsInside from './NewsInside';

type Props = {
  newsData: TEventInNewsSection[];
};

export default function NewsMain(props: Props) {
  ////vars
  const { newsData } = props;

  ////tsx
  return <NewsInside newsData={newsData} />;
}
