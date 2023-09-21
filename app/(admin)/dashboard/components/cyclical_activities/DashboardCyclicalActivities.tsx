import CustomButton from '@/app/(site)/components/CustomButton';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useNavigationState } from '@/context/navigationState';
import { Fragment } from 'react';
import CyclicalActivityAddForm from './CyclicalActivityAddForm';

export default function DashboardCyclicalActivities() {
  const { getIsAddCyclicalActivityVisible, setIsAddCyclicalActivityVisible } =
    useNavigationState();
  ////tsx
  return (
    <Fragment>
      {getIsAddCyclicalActivityVisible() ? (
        <ComponentTransitionFromRightToLeft>
          <CyclicalActivityAddForm />
        </ComponentTransitionFromRightToLeft>
      ) : null}

      {!getIsAddCyclicalActivityVisible() ? (
        <ComponentTransitionFromRightToLeft>
          <Fragment>
            <div className="flex items-center justify-between mb-4 mr-8 -mt-[10px]">
              <div className="prose">
                <h3>Lista zajęć stałych</h3>
              </div>
              <div>
                <CustomButton
                  disabled={false}
                  text="dodaj zajęcia"
                  descriptionText="dodaj zajęcia"
                  actionFn={() => {
                    // resetNewsletterFormikDataForPUT(); //TODO: add reset later
                    setIsAddCyclicalActivityVisible(true);
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
