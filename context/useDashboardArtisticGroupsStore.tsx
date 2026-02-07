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
};

interface TArtisticGroupStore {
  isAddArtisticGroupVisible: boolean;
  artisticGroupFormikDataForPUT: TArtisticGroupFormInputs;

  //fn
  getIsAddArtisticGroupVisible: () => boolean;
  setIsAddArtisticGroupVisible: (isToBeVisible: boolean) => void;
  resetArtisticGroupFormikDataForPUT: () => void;

  getArtisticGroupFormikDataForPUT: () => TArtisticGroupFormInputs;
  setArtisticGroupFormikDataForPUT: (data: TArtisticGroupFormInputs) => void;
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
    setArtisticGroupFormikDataForPUT: (data: TArtisticGroupFormInputs) => {
      set({ artisticGroupFormikDataForPUT: data });
    },
  })
);
