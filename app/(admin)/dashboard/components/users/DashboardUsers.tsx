'use client';

import CustomButton from '@/app/(site)/components/CustomButton';
import ComponentTransitionFromRightToLeft from '@/app/(site)/components/motionWrappers/ComponentTransitionFromRightToLeft';
import { useNavigationState } from '@/context/navigationState';
import { TGetAllUsersResponse, TUserPicked } from '@/types';
import { Fragment } from 'react';
import UserAddUserForm from './UserAddUserForm';
import UsersDataTable from './UsersDataTable';
import { columnsUsers } from './columnsUsers';

type Props = {
  usersData: TGetAllUsersResponse;
};

export default function DashboardUsers(props: Props) {
  ////vars
  const { usersData } = props;
  const {
    getIsAddUserVisible,
    setIsAddUserVisible,
    resetUserFormikDataForPUT,
  } = useNavigationState();

  ////tsx
  return (
    <Fragment>
      {getIsAddUserVisible() ? (
        <ComponentTransitionFromRightToLeft>
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
                    resetUserFormikDataForPUT();
                    setIsAddUserVisible(true);
                  }}
                />
              </div>
            </div>
            <UsersDataTable
              columns={columnsUsers}
              data={usersData.response as TUserPicked[]}
            />
          </Fragment>
        </ComponentTransitionFromRightToLeft>
      ) : null}
    </Fragment>
  );
}
