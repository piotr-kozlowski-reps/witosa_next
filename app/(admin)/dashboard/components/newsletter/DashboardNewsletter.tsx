import CustomButton from '@/app/(site)/components/CustomButton';
import { newsletterMockData } from '@/lib/api/temporaryApiMockData';
import { Fragment } from 'react';
import { columns } from './columns';
import NewsletterDataTable from './data-table';

export default function DashboardNewsletter() {
  // const [newsletterAddresses, setNewsletterAddresses] = useState<Newsletter[]>(
  //   []
  // );

  // useEffect(async () => {
  //   async function getData() {
  //     return await getAllNewsletterAddresses();
  //   }

  //   const fetchedNewsletterAddresses = getData();
  //   setNewsletterAddresses(fetchedNewsletterAddresses)
  // }, []);

  return (
    <Fragment>
      <div className="flex items-center justify-between mb-4 mr-8 -mt-[10px]">
        <div className="prose">
          <h3>Lista e-maili newslettera</h3>
        </div>
        <div>
          <CustomButton
            disabled={false}
            text="dodaj email"
            descriptionText="dodaj email"
            actionFn={() => alert('not implemented')}
          />
        </div>
      </div>
      <NewsletterDataTable columns={columns} data={newsletterMockData} />
    </Fragment>
  );
}
