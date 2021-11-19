import { EventResource, UserResource } from './modules';

export * from './types';
export * from './modules';
export * from './utils';
export * from './errors';

const resources = {
  event: new EventResource(),
  user: new UserResource(),
};

export default resources;
