import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useDashboardArtisticGroupsStore } from '@/context/useDashboardArtisticGroupsStore';
import { TGetAllArtisticGroupsResponse } from '@/types';
import React, { Fragment } from 'react';
import CustomButton from '@/app/(site)/components/CustomButton';
import ArtisticGroupsDataTable from './ArtisticGroupsDataTable';
import ArtisticGroupAddForm from './ArtisticGroupAddForm';

type Props = {
  artisticGroupsData: TGetAllArtisticGroupsResponse;
};

export default function DashboardArtisticGroups(props: Props) {
  ////vars
  const { artisticGroupsData } = props;
  const {
    getIsAddArtisticGroupVisible,
    setIsAddArtisticGroupVisible,
    resetArtisticGroupFormikDataForPUT,
  } = useDashboardArtisticGroupsStore();

  ////tsx
  return (
    <Fragment>
      {getIsAddArtisticGroupVisible() ? (
        <ComponentTransitionFromRightToLeft>
          <ArtisticGroupAddForm />
        </ComponentTransitionFromRightToLeft>
      ) : null}

      {!getIsAddArtisticGroupVisible() ? (
        <ComponentTransitionFromRightToLeft>
          <Fragment>
            <div className="flex items-center justify-between mb-4 mr-8 -mt-[10px]">
              <div className="prose">
                <h3>Lista grup artystycznych</h3>
              </div>
              <div>
                <CustomButton
                  disabled={false}
                  text="dodaj grupę"
                  descriptionText="dodaj grupę"
                  actionFn={() => {
                    resetArtisticGroupFormikDataForPUT();
                    setIsAddArtisticGroupVisible(true);
                  }}
                />
              </div>
            </div>
            <ArtisticGroupsDataTable
            // columns={columnsCyclicalActivities}
            // data={sortedCyclicalActivities}
            />
          </Fragment>
        </ComponentTransitionFromRightToLeft>
      ) : null}
    </Fragment>
  );
}
