import { Event } from './Event';
import { User } from './User';

export type EventSchedule = {
  _id: string;
  event: Event;
  schedule: Date;
  attendees: User[];
  interested: User[];
  createdAt: Date;
  updatedAt: Date;
  isCancelled?: boolean;
};

export type EventScheduleSortableFields = 'schedule' | 'created_at';

export type EventScheduleRequestBody = {
  schedule: string;
};
