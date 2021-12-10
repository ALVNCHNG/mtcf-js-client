import {
  EventResource,
  PlatformResource,
  SchedulePlatformResource,
  ScheduleResource,
  UserResource,
} from './modules';

export * from './types';
export * from './modules';
export * from './utils';
export * from './errors';

const resources = {
  event: new EventResource(),
  platform: new PlatformResource(),
  schedule: new ScheduleResource(),
  schedulePlatform: new SchedulePlatformResource(),
  user: new UserResource(),
};

export default resources;
