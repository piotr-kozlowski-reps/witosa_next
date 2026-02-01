import { TArtisticGroupFormInputs } from '@/types';
import { create } from 'zustand';

const artisticGroupFreshObject: TArtisticGroupFormInputs = {
  //stage1
  id: new Date().getTime().toString(),
  title: '',
  isToBePublished: true,
  detailedDescription: '',
  images: [
    {
      id: new Date().getTime().toString(),
      index: 0,
      file: undefined,
      url: '',
      alt: '',
      additionInfoThatMustBeDisplayed: '',
    },
  ],

  // activityTypes: [],
  // activitiesForWhom: [],
  // places: [],
  // isExpiresAtRequired: false,
  // expiresAt: null,

  // //stage2
  // shortDescription: '',
  // isCustomLinkToDetails: false,
  // customLinkToDetails: '',

  // //stage3
  // occurrence: [
  //   {
  //     id: new Date().getTime().toString(),
  //     day: 'MONDAY',
  //     activityStart: null,
  //     activityEnd: null,
  //   },
  // ],
};

interface TArtisticGroupStore {
  isAddArtisticGroupVisible: boolean;
  artisticGroupFormikDataForPUT: TArtisticGroupFormInputs;

  //fn
  getIsAddArtisticGroupVisible: () => boolean;
  setIsAddArtisticGroupVisible: (isToBeVisible: boolean) => void;
  resetArtisticGroupFormikDataForPUT: () => void;

  getArtisticGroupFormikDataForPUT: () => TArtisticGroupFormInputs;
}

export const useDashboardArtisticGroupsStore = create<TArtisticGroupStore>()(
  (set, get) => ({
    isAddArtisticGroupVisible: false,
    artisticGroupFormikDataForPUT: artisticGroupFreshObject,

    //fn
    getIsAddArtisticGroupVisible() {
      return get().isAddArtisticGroupVisible;
    },
    setIsAddArtisticGroupVisible: (isToBeVisible: boolean) => {
      set({ isAddArtisticGroupVisible: isToBeVisible });
    },
    resetArtisticGroupFormikDataForPUT: () => {
      set({ artisticGroupFormikDataForPUT: artisticGroupFreshObject });
    },

    getArtisticGroupFormikDataForPUT: () => {
      return get().artisticGroupFormikDataForPUT;
    },
  })
);
