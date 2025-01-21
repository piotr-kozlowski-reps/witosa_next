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
  const {
    getIsAddCyclicalActivityVisible,
    setIsAddCyclicalActivityVisible,
    resetCyclicalActivityFormikDataForPUT,
  } = useCyclicalActivitiesState();

  //sort cyclicalActivities by creation date
  const sortedCyclicalActivities = (
    cyclicalActivitiesData.response as CyclicalActivity[]
  ).sort(function (a, b) {
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
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
                    resetCyclicalActivityFormikDataForPUT();
                    setIsAddCyclicalActivityVisible(true);
                  }}
                />
              </div>
            </div>
            <CyclicalActivitiesDataTable
              columns={columnsCyclicalActivities}
              data={sortedCyclicalActivities}
            />
          </Fragment>
        </ComponentTransitionFromRightToLeft>
      ) : null}
    </Fragment>
  );
}
