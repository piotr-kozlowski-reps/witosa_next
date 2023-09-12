import { Fragment, useEffect, useState } from 'react';
import NewsletterDataTable from './data-table';
import { columns } from './columns';
import { newsletterMockData } from '@/lib/api/temporaryApiMockData';
import { getAllNewsletterAddresses } from '@/actions/newsletterActions';
import { Newsletter } from '@prisma/client';
import CustomButton from '@/app/(site)/components/CustomButton';

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
      <div className="flex justify-between items-center mr-8 mb-4">
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
      <NewsletterDataTable columns={columns} data={newsletterMockData} />;
    </Fragment>
  );
}
