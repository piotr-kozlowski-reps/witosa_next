'use client';

import CustomButton from '@/app/(site)/components/CustomButton';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useNavigationState } from '@/context/navigationState';
import { Fragment } from 'react';
import UserAddUserForm from './UserAddUserForm';

export default function DashboardUsers() {
  ////vars
  const { getIsAddUserVisible, setIsAddUserVisible } = useNavigationState();

  ////tsx
  return (
    <Fragment>
      {getIsAddUserVisible() ? (
        <ComponentTransitionFromRightToLeft>
          {/* <NewsletterAddItemForm /> */}
          <UserAddUserForm />
        </ComponentTransitionFromRightToLeft>
      ) : null}

      {!getIsAddUserVisible() ? (
        <ComponentTransitionFromRightToLeft>
          <Fragment>
            <div className="flex items-center justify-between mb-4 mr-8 -mt-[10px]">
              <div className="prose">
                <h3>Lista użytkowników</h3>
              </div>
              <div>
                <CustomButton
                  disabled={false}
                  text="dodaj użytkownika"
                  descriptionText="Dodaj użytkownika."
                  actionFn={() => {
                    // resetNewsletterFormikDataForPUT(); ////TODO: dołóż
                    setIsAddUserVisible(true);
                  }}
                />
              </div>
            </div>
            {/* <NewsletterDataTable
              columns={columns}
              data={newsletterPreparedDataArray}
            /> */}
          </Fragment>
        </ComponentTransitionFromRightToLeft>
      ) : null}
    </Fragment>
  );
}
