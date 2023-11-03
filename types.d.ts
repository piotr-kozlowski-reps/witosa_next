import {
  CyclicalActivity,
  CyclicalActivityOccurrence,
  Event,
  ImageCyclicalActivity,
  ImageEvent,
  Newsletter,
  Prisma,
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

// export type TCyclicalActivitiesFormValues = Pick<
//   CyclicalActivity,
//   | 'name'
//   | 'activityTypes'
//   | 'activitiesForWhom'
//   | 'places'
//   | 'isToBePublished'
//   | 'isExpiresAtRequired'
//   | 'expiresAt'
//   | 'shortDescription'
// >;
export type TCyclicalActivitiesFormValues =
  TCyclicalActivitiesFormValuesStageOne & TCyclicalActivitiesFormValuesStageTwo;

export type TCyclicalActivitiesFormValuesStageOne = Pick<
  CyclicalActivity,
  | 'name'
  | 'activityTypes'
  | 'activitiesForWhom'
  | 'places'
  | 'isToBePublished'
  | 'isExpiresAtRequired'
  | 'expiresAt'
>;

export type TCyclicalActivitiesFormValuesStageTwo = Pick<
  CyclicalActivity,
  | 'shortDescription'
  | 'customLinkToDetails'
  | 'isCustomLinkToDetails'
  | 'longDescription'
> & { images: TImageCyclicalActivityFormValues[] };

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

export type TIconSize = 'BIG' | 'NORMAL' | 'SMALL' | 'EXTRA_SMALL';

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

// export type TCyclicalActivityOccurrenceTemporary = {
//   id: string;
//   day: Day;
//   duration: TDuration[];
// };

export type CyclicalActivityTemporary = CyclicalActivity & {
  occurrence: CyclicalActivityOccurrence[];
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
  response: string | CyclicalActivityTemporary[];
};

export type TGetOneCyclicalActivityResponse = {
  status: TStatus;
  response: string | TCyclicalActivityWithImageAndOccurrence;
};

export type TGetAllEventsResponse = {
  status: TStatus;
  response: string | Event[];
};

export type TNewsletterDataCombo = {
  allNewsletterAddresses: TGetAllNewsletterAddressesResponse;
};

export type TModalState = {
  isShowModal: boolean;
  modalContent: React.ReactNode;
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

/**
 * @prop isAccessToStage - initially true in first element of Array
 * @prop isActive - initially true in first element of Array
 * @prop linkName
 * @callback callbackValidatingStage - callback of every stage -> validates values of that stage and gives promotion to next stage, if nothing passed the stage is considered valid (so last stage, can easily be ommited, because there's no need to check anything, becase we don't need any promotion further)
 */
export interface TFormStage {
  isAccessToStage: boolean;
  isActive: boolean;
  linkName: string;
  callbackValidatingStage?: (values: Object) => boolean;
}

export type TImageCyclicalActivityFormValues = Omit<
  ImageCyclicalActivity,
  'cyclicalActivityId'
> & {
  file?: TFileWithPreview | string;
};

export type TImageCyclicalActivityForDB = Pick<
  ImageCyclicalActivity,
  'alt' | 'additionInfoThatMustBeDisplayed' | 'url' | 'index'
> & { id?: string };

export type TImageEventForDB = Omit<ImageEvent, 'eventId' | 'id'> & {
  id?: string;
};

export type TImageCyclicalActivityAllOptional = Partial<ImageCyclicalActivity>;

export type TTypeOfImageToBeGenerated = 'IMAGE_REGULAR' | 'IMAGE_NEWS';
export type TStringToDistinguishCreatedImageName =
  | 'cyclical_activity'
  | 'event'
  | 'news';

export type TCyclicalActivityWithImageAndOccurrence = CyclicalActivity & {
  images: ImageCyclicalActivity[];
  occurrence: CyclicalActivityOccurrence[];
};

export type TFileWithPreview = (File & { preview: string }) | undefined;

export type TOccurrence = Omit<
  CyclicalActivityOccurrence,
  'cyclicalActivityId' | 'activityStart' | 'activityEnd' | 'id'
> & {
  activityStart: Date | null;
  activityEnd: Date | null;
  id?: string;
};
export type TOccurrenceWithRequiredDates = Omit<
  CyclicalActivityOccurrence,
  'cyclicalActivityId' | 'activityStart' | 'activityEnd' | 'id'
> & {
  activityStart: Date;
  activityEnd: Date;
  id?: string;
};
export type TOccurrenceWithRequiredDatesAndCyclicalActivityID = Omit<
  CyclicalActivityOccurrence,
  'activityStart' | 'activityEnd' | 'id'
> & {
  activityStart: Date;
  activityEnd: Date;
  id?: string;
};

export type TCyclicalActivityFormInputs = Omit<
  CyclicalActivity,
  'authorId' | 'createdAt' | 'updatedAt'
> & {
  images: TImageCyclicalActivityFormValues[];
  occurrence: TOccurrence[];
};

//events
export type TImageEventFormValue = Omit<ImageEvent, 'eventId'> & {
  file?: TFileWithPreview | string;
};

export type TEventWithImages = Event & {
  images: ImageEvent[];
};

export type TEventFormInputs = Omit<
  Event,
  | 'authorId'
  | 'createdAt'
  | 'updatedAt'
  | 'eventStartDate'
  | 'newsSectionImageUrl'
  | 'visibleFrom'
  | 'visibleTo'
> & {
  eventStartDate: Date | null;
  newsSectionImageUrl: TFileWithPreview | string | null;
  images: TImageEventFormValue[];
  visibleFrom: Date | null;
  visibleTo: Date | null;
};

export type TGetOneEventResponse = {
  status: TStatus;
  response: string | TEventWithImages;
};

export type TOptionsForFormikSelect<T> = {
  value: T;
  label: string;
};

export const imagePreviewType = {
  NEWS_IMAGE_PREVIEW: 'NEWS_IMAGE_PREVIEW',
  THREE_DISPLAYS_PREVIEW: 'THREE_DISPLAYS_PREVIEW',
} as const;
export type TImagePreviewType = typeof imagePreviewType;
export type TImagePreviewTypeKey = keyof TImagePreviewType;

export type TImagesToBeUpdatedDeletedCreated = {
  createdImages: string[];
  imagesToBeDeleted: string[];
  imagesToBeUpdatedPreparedForDB: Prisma.ImageEventUpdateManyMutationInput[];
  imagesToBeCreatedPreparedForDB: Prisma.ImageEventCreateManyInput[];
  imagesObjectsIDisToBeDeletedPreparedForDB: string[];
};
