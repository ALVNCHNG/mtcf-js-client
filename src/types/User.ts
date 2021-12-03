import { AppMetadata } from 'auth0';

import { EventSchedule } from './EventSchedule';

export type UserEvent = {
  attended?: EventSchedule['_id'][];
  interested?: EventSchedule['_id'][];
};

export type UserAppMetadata = AppMetadata;

export interface UserMetadata {
  address?: string;
  birthDate?: Date;
  phoneNumber?: string;
}

export type Auth0User = {
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

export type CoreUser = UserEvent & {
  _id: string;
  name: string;
  address?: string;
  birthDate?: Date;
  phoneNumber?: string;
};

export interface UserRequestBody {
  email: string;
  password: string;

  firstName: string;
  lastName: string;

  address: string;
  birthDate: string;
  phoneNumber: string;
}
export interface UserEventRequestBody {
  eventScheduleId: string;
  type: keyof UserEvent;
}

export type UserFormatted = {
  id: string;

  email: string;
  isEmailVerified: boolean;

  firstName: string;
  lastName: string;

  picture: string;

  address?: string;
  birthDate?: Date;
  phoneNumber?: string;

  createdAt: Date;
  updatedAt: Date;
};

export type UserEventResponse = Pick<
  EventSchedule,
  '_id' | 'schedule' | 'isCancelled'
>[];

export type UserResponse = UserFormatted;

export type UserResponseMinimal = Pick<
  UserResponse,
  | 'id'
  | 'email'
  | 'isEmailVerified'
  | 'firstName'
  | 'lastName'
  | 'picture'
  | 'createdAt'
>;

export type UserSortableEntityFields = keyof Pick<
  UserFormatted,
  'email' | 'firstName' | 'lastName' | 'createdAt' | 'updatedAt'
>;
