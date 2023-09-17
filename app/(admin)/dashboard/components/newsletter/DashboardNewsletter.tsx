import CustomButton from '@/app/(site)/components/CustomButton';
import { TNewsletterDataCombo } from '@/types';
import { Fragment } from 'react';
import { columns } from './columns';
import NewsletterDataTable from './data-table';

type Props = {
  newsletterDataCombo: TNewsletterDataCombo;
};

export default function DashboardNewsletter(props: Props) {
  ////vars
  const { newsletterDataCombo } = props;

  const newsletterPreparedDataArray = prepareDataArray(newsletterDataCombo);

  ////tsx
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
      <NewsletterDataTable
        columns={columns}
        data={newsletterPreparedDataArray}
      />
    </Fragment>
  );
}

///utils
function prepareDataArray(newsletterAllData: TNewsletterDataCombo) {
  const status = newsletterAllData.allNewsletterAddresses.status;
  const response = newsletterAllData.allNewsletterAddresses.response;
  const isResponseAnArray = Array.isArray(response);

  if (status !== 'SUCCESS' || !isResponseAnArray) {
    return [];
  }

  return response;
}
