import { EventSchedule } from './EventSchedule';

export interface Event {
  _id: string;

  name: string;
  description: string;

  schedules: string[];

  isArchived: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface PopulatedEvent extends Omit<Event, 'schedules'> {
  schedules: EventSchedule[];
}

export type EventSortableFields = 'name' | 'createdAt';

export interface EventRequestBody {
  name: string;
  description: string;
}

export type EventResponse = {
  id: string;

  name: string;
  description: string;

  schedules: string[];

  isArchived: boolean;

  createdAt: Date;
  updatedAt: Date;
};

export type EventResponseMinimal = Pick<
  EventResponse,
  'id' | 'name' | 'description' | 'isArchived' | 'schedules'
>;
