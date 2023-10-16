import CustomButton from '@/app/(site)/components/CustomButton';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useCyclicalActivitiesState } from '@/context/cyclicalActivityState';
import { TGetAllCyclicalActivitiesResponse } from '@/types';
import { CyclicalActivity } from '@prisma/client';
import { Fragment } from 'react';
import CyclicalActivitiesDataTable from './CyclicalActivitiesDataTable';
import CyclicalActivityAddForm from './CyclicalActivityAddForm';
import { columnsCyclicalActivities } from './columnsCyclicalActivities';

type Props = {
  cyclicalActivitiesData: TGetAllCyclicalActivitiesResponse;
};

export default function DashboardCyclicalActivities(props: Props) {
  ////vars
  const { cyclicalActivitiesData } = props;
  const { getIsAddCyclicalActivityVisible, setIsAddCyclicalActivityVisible } =
    useCyclicalActivitiesState();
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
            <CyclicalActivitiesDataTable
              columns={columnsCyclicalActivities}
              data={cyclicalActivitiesData.response as CyclicalActivity[]}
            />
          </Fragment>
        </ComponentTransitionFromRightToLeft>
      ) : null}
    </Fragment>
  );
}
