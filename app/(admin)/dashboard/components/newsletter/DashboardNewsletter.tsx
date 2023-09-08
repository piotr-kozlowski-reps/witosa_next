import NewsletterDataTable from './data-table';
import { columns } from './columns';
import { newsletterMockData } from '@/lib/api/temporaryApiMockData';

export default function DashboardNewsletter() {
  return <NewsletterDataTable columns={columns} data={newsletterMockData} />;
}
