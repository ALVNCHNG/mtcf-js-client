import { EventResource, ScheduleResource, UserResource } from './modules';

export * from './types';
export * from './modules';
export * from './utils';
export * from './errors';

const resources = {
  event: new EventResource(),
  schedule: new ScheduleResource(),
  user: new UserResource(),
};

export default resources;
