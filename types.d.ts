export type TMode = 'NORMAL' | 'HIGH_CONTRAST';
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
  | 'groups'
  | 'bistro'
  | 'contact';
