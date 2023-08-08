export type TMode = 'LIGHT' | 'DARK' | 'CONTRAST';
export type TFontSize = 'NORMAL' | 'BIGGER' | 'BIGGEST';
export type TLayoutState = {
  mode: TMode;
  fontSize: TFontSize;
};

//register form
export type TRegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type TRegisterFormValuesSent = {
  name: string;
  email: string;
  password: string;
};

export type TLoginFormValues = {
  email: string;
  password: string;
};

export type NOTIFICATION_TYPES = 'ERROR' | 'SUCCESS';

export type FileList = {
  logFilesList: string;
};
export type LogFile = {
  name: string;
};

//navigation
export type TLinkName =
  | 'news'
  | 'events'
  | 'activities'
  | 'about_about'
  | 'about_rent'
  | 'about_regulations'
  | 'about_availability_declarations'
  | 'about_rodo'
  | 'groups_marzenie'
  | 'groups_marzenie_mini_mini'
  | 'groups_zajecia_utaneczniajace'
  | 'groups_hipnoteria'
  | 'groups_hipnoteria_bis'
  | 'bistro'
  | 'contact';
export type TLink = {
  name: TLinkName;
  nameToBeDisplayed: string;
  path: string;
  isCurrentlyUsed: boolean;
};
export type TSubMenu = 'about' | 'groups';

//slider
export type TEventType = 'concert' | 'workshop';
export type TMainSliderData = {
  eventType: TEventType[];
  title: string;
  date: Date;
  urlToEvent: string;
};
