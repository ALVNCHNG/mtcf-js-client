import { EventSchedule } from './EventSchedule';

export interface Event {
  _id: string;
  name: string;
  description: string;
  schedules: EventSchedule['_id'][];
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type EventSortableFields = 'name' | 'created_at';

export interface EventRequestBody {
  name: string;
  description: string;
}
