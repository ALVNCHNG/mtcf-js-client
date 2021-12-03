import { Event } from './Event';
import { CoreUser } from './User';

export type EventSchedule = {
  _id: string;
  event: string;
  schedule: Date;
  attendees: string[];
  interested: string[];
  createdAt: Date;
  updatedAt: Date;
  isCancelled: boolean;
};

export type PopulatedEventSchedule = Omit<
  EventSchedule,
  'event' | 'attendees' | 'interested'
> & {
  event: Event;
  attendees: CoreUser[];
  interested: CoreUser[];
};

export type EventScheduleSortableFields = 'schedule' | 'createdAt';

export type EventScheduleUserType = 'attendees' | 'interested';

export type EventScheduleRequestBody = {
  schedule: string;
};

export type EventScheduleUserRequestBody = {
  userId: string;
};

export type EventScheduleResponse = {
  id: string;

  event: string;

  schedule: Date;

  attendees: string[];
  interested: string[];

  isCancelled: boolean;

  createdAt: Date;
  updatedAt: Date;
};

export type EventScheduleResponseMinimal = Pick<
  EventScheduleResponse,
  'id' | 'event' | 'schedule' | 'isCancelled' | 'attendees' | 'interested'
>;
