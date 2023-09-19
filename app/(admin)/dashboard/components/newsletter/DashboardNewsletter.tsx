'use client';

import CustomButton from '@/app/(site)/components/CustomButton';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useNavigationState } from '@/context/navigationState';
import { TNewsletterDataCombo } from '@/types';
import { Fragment } from 'react';
import NewsletterAddItemForm from './NewsletterAddItemForm';
import { columns } from './columns';
import NewsletterDataTable from './data-table';

type Props = {
  newsletterDataCombo: TNewsletterDataCombo;
};

export default function DashboardNewsletter(props: Props) {
  ////vars
  const { newsletterDataCombo } = props;
  const newsletterPreparedDataArray = prepareDataArray(newsletterDataCombo);
  const {
    getIsAddNewsletterVisible,
    setIsAddNewsletterVisible,
    resetNewsletterFormikDataForPUT,
  } = useNavigationState();

  ////tsx
  return (
    <Fragment>
      {getIsAddNewsletterVisible() ? (
        <ComponentTransitionFromRightToLeft>
          <NewsletterAddItemForm />
        </ComponentTransitionFromRightToLeft>
      ) : null}

      {!getIsAddNewsletterVisible() ? (
        <ComponentTransitionFromRightToLeft>
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
                  actionFn={() => {
                    resetNewsletterFormikDataForPUT();
                    setIsAddNewsletterVisible(true);
                  }}
                />
              </div>
            </div>
            <NewsletterDataTable
              columns={columns}
              data={newsletterPreparedDataArray}
            />
          </Fragment>
        </ComponentTransitionFromRightToLeft>
      ) : null}
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
