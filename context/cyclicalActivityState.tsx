import { TCyclicalActivityFormInputs } from '@/types';
import { hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';

type TCyclicalActivityState = {
  isAddCyclicalActivityVisible: boolean;
  cyclicalActivityFormikDataForPUT: TCyclicalActivityFormInputs;
  isCyclicalActivitiesMenuVisible: boolean;
};

const cyclicalActivitiesFreshObject: TCyclicalActivityFormInputs = {
  //stage1
  id: new Date().getTime().toString(),
  name: '',
  activityTypes: [],
  activitiesForWhom: [],
  places: [],
  isToBePublished: true,
  isExpiresAtRequired: false,
  expiresAt: null,

  //stage2
  shortDescription: '',
  isCustomLinkToDetails: false,
  customLinkToDetails: '',
  longDescription: '',

  images: [
    {
      id: new Date().getTime().toString(),
      file: undefined,
      url: '',
      alt: '',
      additionInfoThatMustBeDisplayed: '',
    },
  ],

  //stage3
  occurrence: [
    {
      id: new Date().getTime().toString(),
      day: 'MONDAY',
      activityStart: null,
      activityEnd: null,
    },
  ],
};

const cyclicalActivityStateData: TCyclicalActivityState = {
  isAddCyclicalActivityVisible: false,
  cyclicalActivityFormikDataForPUT: cyclicalActivitiesFreshObject,
  isCyclicalActivitiesMenuVisible: false,
};

const cyclicalActivitiesState = hookstate(
  cyclicalActivityStateData,
  devtools({ key: 'cyclicalActivitiesState' })
);

export function useCyclicalActivitiesState() {
  const state = useHookstate(cyclicalActivitiesState);

  return {
    getIsAddCyclicalActivityVisible() {
      return state.isAddCyclicalActivityVisible.get();
    },
    setIsAddCyclicalActivityVisible(isToBeVisible: boolean) {
      return state.isAddCyclicalActivityVisible.set(isToBeVisible);
    },
    getCyclicalActivityFormikDataForPUT() {
      // return state.get({ noproxy: true, stealth: true })
      //   .cyclicalActivityFormikDataForPUT;
      // return state.cyclicalActivityFormikDataForPUT.get({
      //   noproxy: true,
      //   stealth: true,
      // })
      return state.cyclicalActivityFormikDataForPUT.get();
    },
    setCyclicalActivityFormikDataForPUT(data: TCyclicalActivityFormInputs) {
      state.cyclicalActivityFormikDataForPUT.set(data);
    },
    resetCyclicalActivityFormikDataForPUT() {
      state.cyclicalActivityFormikDataForPUT.set(cyclicalActivitiesFreshObject);
    },

    // cyclical activities menu
    getIsCyclicalActivitiesMenuVisible() {
      return state.isCyclicalActivitiesMenuVisible.get();
    },
    toggleIsCyclicalActivitiesMenuVisible() {
      state.isCyclicalActivitiesMenuVisible.set(
        !state.isCyclicalActivitiesMenuVisible.get()
      );
    },
    setIsCyclicalActivitiesMenuToBeVisible() {
      state.isCyclicalActivitiesMenuVisible.set(true);
    },
  };
}
