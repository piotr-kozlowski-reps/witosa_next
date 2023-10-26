import { TEventFormInputs } from '@/types';
import { hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';

type TCyclicalActivityState = {
  isAddEventVisible: boolean;
  eventFormikDataForPUT: TEventFormInputs;
  isEventsMenuVisible: boolean;
};

const eventFreshObject: TEventFormInputs = {
  //stage1
  id: new Date().getTime().toString(),
  title: '',
  eventTypes: [],
  eventForWhom: [],
  places: [],
  eventStartDate: null,
  eventEndDate: null, // omited
  isToBePublished: true,
  visibleFrom: null,
  visibleTo: null,

  //stage2
  isToBeInNewsSection: true,
  isToBeOnlyInNewsSection_NotSeenInEvents: false,
  isDateToBeHiddenInNewsSection: false,
  newsSectionImageUrl: null,
  newsSectionImageAlt: '',

  //stage3
  isCustomLinkToDetails: false,
  shortDescription: '',

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
  detailedDescription: '',
  customLinkToDetails: null,
  isPayed: false,
  kindOfEnterInfo: '',
  ticketBuyingUrl: null,
  isToBeInSlider: true,
  sliderImageUrl: null,
  sliderImageAlt: null,
  visibleInSliderFrom: null,
  visibleInSliderTo: null,
};

const eventsStateData: TCyclicalActivityState = {
  isAddEventVisible: false,
  eventFormikDataForPUT: eventFreshObject,
  isEventsMenuVisible: false,
};

const eventsState = hookstate(
  eventsStateData,
  devtools({ key: 'eventsState' })
);

export function useEventsState() {
  const state = useHookstate(eventsState);

  return {
    getIsAddEventVisible() {
      return state.isAddEventVisible.get();
    },
    setIsAddEventVisible(isToBeVisible: boolean) {
      return state.isAddEventVisible.set(isToBeVisible);
    },
    getEventFormikDataForPUT() {
      return state.eventFormikDataForPUT.get({
        noproxy: true,
        stealth: true,
      });
    },
    setEventFormikDataForPUT(data: TEventFormInputs) {
      state.eventFormikDataForPUT.set(data);
    },
    resetEventFormikDataForPUT() {
      state.eventFormikDataForPUT.set(eventFreshObject);
    },

    // events menu
    getIsEventsMenuVisible() {
      return state.isEventsMenuVisible.get();
    },
    toggleIsEventsMenuVisible() {
      state.isEventsMenuVisible.set(!state.isEventsMenuVisible.get());
    },
    setIsEventsMenuToBeVisible() {
      state.isEventsMenuVisible.set(true);
    },
  };
}
