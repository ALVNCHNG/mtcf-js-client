import { AppMetadata } from 'auth0';

import { EventSchedule } from './EventSchedule';

export type UserAppMetadata = AppMetadata;

export interface UserMetadata {
  address: string;
  birthDate: Date;
  phoneNumber: string;
  attendedEvents: EventSchedule[];
  interestedEvents: EventSchedule[];
}

export type User = {
  created_at: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
  user_id: string;
  user_metadata: UserMetadata;
};

export interface UserRequestBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  address: string;
}

export type UserSortableEntityFields = keyof Pick<
  User,
  | 'email'
  | 'family_name'
  | 'given_name'
  | 'name'
  | 'nickname'
  | 'created_at'
  | 'updated_at'
>;
