import {
  CyclicalActivity,
  Day,
  Event,
  Newsletter,
  User,
  UserRole,
} from '@prisma/client';

export type TMode = 'LIGHT' | 'DARK' | 'CONTRAST';
export type TFontSize = 'NORMAL' | 'BIGGER' | 'BIGGEST';
export type TLayoutState = {
  mode: TMode;
  fontSize: TFontSize;
  foregroundColor: string;
};

//register form
export type TRegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userRole: UserRole;
};
export type TRegisterFormValuesSent = {
  name: string;
  email: string;
  password: string;
  userRole: UserRole;
};

export type TCyclicalActivitiesFormValues = Pick<
  CyclicalActivity,
  'name' | 'activityTypes' | 'activitiesForWhom' | 'places'
> & {
  expiresAt?: string;
};

export type TLoginFormValues = {
  email: string;
  password: string;
};

export type TNewsletterFormValues = {
  email: string;
};

export type TNewsletterFormValuesSent = {
  email: string;
};

export type TNotificationType = 'ERROR' | 'SUCCESS';

export type FileList = {
  logFilesList: string;
};
export type LogFile = {
  name: string;
};

//navigation
export type TLinkName =
  | 'NEWS'
  | 'EVENTS'
  | 'CYCLICAL_ACTIVITIES'
  | 'ABOUT_ABOUT'
  | 'ABOUT_RENT'
  | 'ABOUT_REGULATIONS'
  | 'ABOUT_AVAILABILITY_DECLARATIONS'
  | 'ABOUT_RODO'
  | 'GROUPS_MARZENIE_MINI_MINI'
  | 'GROUPS_MARZENIE_BIS'
  | 'GROUPS_MARZENIE'
  | 'GROUPS_HIPNOTERIA'
  | 'GROUPS_HIPNOTERIA_BIS'
  | 'BISTRO'
  | 'CONTACT'
  | 'LOGIN';
export type TsocialLinkName = 'FACEBOOK' | 'INSTAGRAM' | 'YOUTUBE';
export type TsocialLinks = {
  name: TsocialLinkName;
  path: string;
};

export type TLink = {
  name: TLinkName;
  nameToBeDisplayed: string;
  path: string;
  isCurrentlyUsed: boolean;
};
export type TSubMenu = 'ABOUT' | 'GROUPS' | 'ACCESSIBILITY';

export type TLinkAdminName =
  | 'EVENTS'
  | 'CYCLICAL_ACTIVITY'
  | 'NEWSLETTER'
  | 'USERS'
  | 'LOGS';
export type TAdminLink = {
  name: TLinkAdminName;
  nameToBeDisplayed: string;
  isCurrentlyUsed: boolean;
};

//slider
export type TEventType = 'concert' | 'workshop';
export type TMainSliderData = {
  eventType: TEventType[];
  title: string;
  date: Date;
  urlToEvent: string;
};

export type TIconSize = 'BIG' | 'NORMAL' | 'SMALL';

export type TCurrentDevice = 'MOBILE' | 'TABLET' | 'DESKTOP';

export type TEventInNewsSection = Pick<
  Event,
  | 'id'
  | 'eventTypes'
  | 'eventStartDate'
  | 'newsSectionImageUrl'
  | 'newsSectionImageAlt'
  | 'title'
  | 'shortDescription'
  | 'isDateToBeHiddenInNewsSection'
  | 'customLinkToDetails'
>;

export type TSliderGroupsImages = {
  marzenieMiniMini: TSliderGroupImage[];
  marzenieBis: TSliderGroupImage[];
  marzenie: TSliderGroupImage[];
  hipnoteriaBis: TSliderGroupImage[];
  hipnoteria: TSliderGroupImage[];
};

export type TSliderGroupImage = {
  url: string;
  alt: string;
  additionInfoThatMustBeDisplayed: string | null;
};

export type TGroups =
  | 'MARZENIE_MINI_MINI'
  | 'MARZENIE_BIS'
  | 'MARZENIE'
  | 'HIPNOTERIA_BIS'
  | 'HIPNOTERIA';

export type TDuration = {
  activityStart: Date;
  activityEnd: Date;
};

export type TCyclicalActivityOccurrenceTemporary = {
  id: string;
  day: Day;
  duration: TDuration[];
};

export type CyclicalActivityTemporary = CyclicalActivity & {
  occurrence: TCyclicalActivityOccurrenceTemporary[];
  images: TSliderGroupImage[];
  // extendedInfo?: {
  //   images: TSliderGroupImage[];
  //   description: string;
  // };
};

export type TEventTemporary = Event & {
  images: {
    url: string;
    alt: string;
    additionInfoThatMustBeDisplayed: string | null;
  }[];
};

export type TSlide = Pick<
  Event,
  | 'id'
  | 'eventTypes'
  | 'title'
  | 'eventStartDate'
  | 'sliderImageUrl'
  | 'sliderImageAlt'
  | 'visibleInSliderFrom'
  | 'visibleInSLiderTo'
>;

export type TNewsletterTemporary = {
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TStatus = 'ERROR' | 'SUCCESS';

export type TActionResponse = {
  status: TStatus;
  response: string;
};

export type TGetAllNewsletterAddressesResponse = {
  status: TStatus;
  response: string | Newsletter[];
};
export type TUserPicked = Pick<
  User,
  'id' | 'name' | 'email' | 'userRole' | 'updatedAt'
>;
export type TGetAllUsersResponse = {
  status: TStatus;
  response: string | TUserPicked[];
};

export type TGetAllCyclicalActivitiesResponse = {
  status: TStatus;
  response: string | CyclicalActivity[];
};

export type TNewsletterDataCombo = {
  allNewsletterAddresses: TGetAllNewsletterAddressesResponse;
};

export type TModalState = {
  isShowModal: boolean;
  modalContent: JSX.Element;
};

export type TNotificationState = {
  isShowNotification: boolean;
  notificationContent: string;
  notificationType: TNotificationType;
  timeoutInMilliseconds?: number;
};

export type TWhatTypeIsProvidedEnum =
  | 'IT_IS_ACTIVITY_TYPE'
  | 'IT_IS_FOR_WHOM_TYPE'
  | 'IT_IS_EVENT_TYPE'
  | 'IT_IS_PLACE_TYPE';

export type TTypeDescriber = {
  isActivityType: boolean;
  isEventType: boolean;
  isForWhomType: boolean;
  isPlaceType: boolean;
};
