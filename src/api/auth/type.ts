export interface CheckUserDto {
  code: string;
}

export interface CheckUser {
  id: string;
  displayName: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  isSetPassword: boolean;
}

export interface LoginWithPasswordDto {
  username: string;
  password: string;
}

export interface LoginWithPassword {
  accessToken: string;
  displayName: string;
  email: string | null;
  expiresIn: string;
  phone: string;
  refreshToken: string;
  userId: string;
}

export interface Profile {
  address: Address | null;
  avatar: any;
  avatarId: string | null;
  createdAt: string;
  dateOfBirth: string | null;
  displayName: string;
  email: string | null;
  emailVerified: string | null;
  firstName: string | null;
  gender: string | null;
  id: string;
  isActive: true;
  language: string | null;
  lastName: string | null;
  lifetimePoints: 10;
  phone: string;
  phoneVerified: string | null;
  timeZone: string;
  totalPoints: 10;
  updatedAt: string;
  username: string | null;
}

export type Address = {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
};

export interface RefreshTokenDto {
  token: string;
}
export interface RefreshToken {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
  userId: string;
  displayName: string;
}

export interface SetPasswordIsValidDto {
  identity: string;
  verifyId: string;
  code: string;
}

export interface ForgotPasswordDto extends CheckUserDto {}

export interface ForgotPassword {
  id: string;
}

export interface ForgotPasswordIsValidCodeDto {
  identity: string;
  verifyId: string;
  code: string;
}

export interface ForgotPasswordResendDto {
  identity: string;
  verifyId: string;
  isVoice: boolean;
}

export interface ForgotPasswordResend extends ForgotPassword {}

export interface ForgotPasswordVerifyDto {
  id: string;
  code: string;
  password: string;
}

export interface SetPasswordDto extends CheckUserDto {}

export interface SetPassword {
  id: string;
  isSent: boolean;
  message: string;
}

export interface SharedDataForm {
  id?: string;
  code?: string;
}

export interface SetPasswordResendDto {
  isVoice?: boolean;
  phone: string;
  verifyId: string;
  method?: string;
  mValue?: string;
}

export interface SetPasswordResend extends ForgotPassword {}

export interface SetPasswordVerifyDto {
  username: string;
  verifyId: string;
  code: string;
  password: string;
}

export interface SetPasswordVerify {
  accessToken: string;
  displayName: string;
  email: string | null;
  expiresIn: string;
  phone: string;
  refreshToken: string;
  userId: string;
}

export interface ForgotPasswordDto extends CheckUserDto {}

export interface ForgotPassword {
  id: string;
}
