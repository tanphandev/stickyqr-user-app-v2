export type CheckUserData = {
  displayName?: string | null;
  email?: string | null;
  firstName?: string | null;
  id?: string;
  isSetPassword?: boolean;
  lastName?: string | null;
  phone?: string;
  phoneCode?: string;
  isoCode?: string;
};

export const enum AuthStepList {
  CheckPhone = 'CheckPhone',
  SignIn = 'SignIn',
  ForgotPassword = 'ForgotPassword',
  SetPassword = 'SetPassword',
}
