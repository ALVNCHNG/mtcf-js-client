import {
  AppMetadata,
  User as Auth0User,
  UserMetadata as Auth0UserMetadata,
} from 'auth0';

import { EventSchedule } from './EventSchedule';

export type UserAppMetadata = AppMetadata;

export interface UserMetadata extends Auth0UserMetadata {
  address: string;
  birthDate: Date;
  phoneNumber: string;
  attendedEvents: EventSchedule[];
  interestedEvents: EventSchedule[];
}

export type User = Auth0User;

export interface UserRequestBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: Date;
  address: string;
}

export type UserSortableEntityFields = keyof Pick<
  User,
  | 'email'
  | 'family_name'
  | 'given_name'
  | 'name'
  | 'nickname'
  | 'phone_number'
  | 'created_at'
  | 'updated_at'
>;
