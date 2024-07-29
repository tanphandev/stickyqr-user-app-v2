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
