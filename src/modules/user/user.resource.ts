import axios, { AxiosInstance } from 'axios';

import { API_VERSION, DOMAIN, PORT, RESOURCES } from '../../config';
import {
  ErrorResponse,
  EventScheduleResponseMinimal,
  EventScheduleSortableFields,
  FetchEntityResponse,
  ListFilterOptions,
  ListResponse,
  ServerResponseWithEntity,
  UserEvent,
  UserEventRequestBody,
  UserRequestBody,
  UserResponse,
  UserResponseMinimal,
  UserSortableEntityFields,
} from '../../types';
import { handleResourceError } from '../../utils';
import EventScheduleEntity from '../event/eventSchedule.entity';

import UserEntity from './user.entity';

class UserResource {
  private url = `${DOMAIN}:${PORT}/api/${API_VERSION}/${RESOURCES.users}`;

  client: AxiosInstance = axios.create();

  constructor() {
    this.client.defaults.baseURL = this.url;
  }

  getClient = (): AxiosInstance => {
    return this.client;
  };

  setClient = (client: AxiosInstance): this => {
    this.client = client;
    return this;
  };

  get = async (
    options: ListFilterOptions<UserSortableEntityFields> = {
      order: -1,
      limit: 10,
      offset: 0,
      sort: 'createdAt',
    }
  ): Promise<
    | ErrorResponse
    | (Omit<ListResponse<UserResponseMinimal>, 'data'> & {
        data: UserEntity<UserResponseMinimal>[];
        raw: UserResponseMinimal[];
      })
  > => {
    try {
      let users: UserEntity<UserResponseMinimal>[] = [];
      const { order, limit, offset, sort } = options;

      const {
        data: { data, metadata },
      } = await this.client.get<ListResponse<UserResponseMinimal>>(`/`, {
        params: {
          limit,
          offset,
          sort,
          order,
        } as ListFilterOptions<UserSortableEntityFields>,
      });

      if (data.length > 0) {
        users = data.map(
          (user) => new UserEntity<UserResponseMinimal>(user.id, user)
        );
      }

      return {
        data: users,
        raw: data,
        metadata,
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  getById = async (
    id: string
  ): Promise<
    | ErrorResponse
    | { data: UserEntity<UserResponse> | null; raw: UserResponse | null }
  > => {
    try {
      const {
        data: { data },
      } = await this.client.get<FetchEntityResponse<UserResponse>>(`${id}`, {});

      if (!data) {
        return { data: null, raw: null };
      }

      return { data: new UserEntity(data.id, data), raw: data };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  create = async (
    formData: UserRequestBody
  ): Promise<
    | ErrorResponse
    | { data: UserEntity<UserResponse> | null; raw: UserResponse | null }
  > => {
    try {
      const { data } = await this.client.post<UserResponse>('/', formData);

      if (!data) {
        return { data: null, raw: null };
      }

      return { data: new UserEntity(data.id, data), raw: data };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  update = async (
    user: UserEntity,
    formData: Omit<UserRequestBody, 'password'>
  ): Promise<
    | ErrorResponse
    | { data: UserEntity<UserResponse> | null; raw: UserResponse | null }
  > => {
    try {
      const { data } = await this.client.put<UserResponse>(
        `${user.getId()}`,
        formData
      );

      if (!data) {
        return { data: null, raw: null };
      }

      return { data: new UserEntity(data.id, data), raw: data };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  delete = async (): Promise<
    | ErrorResponse
    | { data: UserEntity<UserResponse> | null; raw: UserResponse | null }
  > => {
    try {
      return { data: null, raw: null };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  /**
   * Add Event to User
   * @param entities - Required Entities
   * @param entities.event - Event Schedule Entity
   * @param entities.user - User Entity
   * @param type - `attended`|`interested`
   * @returns Array of Event Schedule Entity
   */
  addEvent = async (
    entities: {
      event: EventScheduleEntity;
      user: UserEntity;
    },
    type: keyof UserEvent = 'attended'
  ): Promise<
    | ErrorResponse
    | { data: EventScheduleEntity<EventScheduleResponseMinimal>[] | null }
  > => {
    const { event, user } = entities;
    try {
      const {
        data: { data },
      } = await this.client.post<
        ServerResponseWithEntity<EventScheduleResponseMinimal[]>
      >(`${this.url}/${user.getId()}/events`, {
        type,
        eventScheduleId: event.getId(),
      } as UserEventRequestBody);

      if (!data) {
        return { data: null };
      }

      return {
        data: data.map(
          (eventSchedule) =>
            new EventScheduleEntity(eventSchedule.id, eventSchedule)
        ),
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  /**
   * Get User Events
   * @param user - User Entity
   * @param options - Additional Options
   * @param options.type - `attended`|`interested`
   * @param options.limit - Limit return data
   * @param options.offset - Number of page to skip
   * @param options.sort - Event Schedule field to sort
   * @param options.order -  `1` for ascending, `-1` for descending
   * @returns Array of Event Schedule Entity
   */
  getEvents = async (
    user: UserEntity,
    options: ListFilterOptions<EventScheduleSortableFields> & {
      type: keyof UserEvent;
    } = {
      type: 'attended',
      limit: 10,
      offset: 0,
      sort: 'createdAt',
      order: -1,
    }
  ): Promise<
    | ErrorResponse
    | (Omit<ListResponse<EventScheduleResponseMinimal>, 'data'> & {
        data: EventScheduleEntity<EventScheduleResponseMinimal>[];
        raw: EventScheduleResponseMinimal[];
      })
  > => {
    let eventSchedules: EventScheduleEntity<EventScheduleResponseMinimal>[] =
      [];
    const { type, limit, offset, order, sort } = options;

    try {
      const {
        data: { data, metadata },
      } = await this.client.get<ListResponse<EventScheduleResponseMinimal>>(
        `${this.url}/${user.getId()}/events`,
        {
          params: {
            type,
            limit,
            offset,
            sort,
            order,
          } as ListFilterOptions<EventScheduleSortableFields> & {
            type: keyof UserEvent;
          },
        }
      );

      if (data.length > 0) {
        eventSchedules = data.map(
          (eventSchedule) =>
            new EventScheduleEntity(eventSchedule.id, eventSchedule)
        );
      }

      return {
        metadata,
        data: eventSchedules,
        raw: data,
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  /**
   * Remove Event to User
   * @param entities - Required Entities
   * @param entities.event - Event Schedule Entity
   * @param entities.user - User Entity
   * @param type - `attended`|`interested`
   * @returns Array of Event Schedule Entity
   */
  deleteEvent = async (
    entities: {
      event: EventScheduleEntity;
      user: UserEntity;
    },
    type: keyof UserEvent = 'attended'
  ) => {
    const { event, user } = entities;
    try {
      const {
        data: { data },
      } = await this.client.delete<
        ServerResponseWithEntity<EventScheduleResponseMinimal[]>
      >(`${this.url}/${user.getId()}/events/${event.getId()}`, {
        params: {
          type,
        },
      });

      if (!data) {
        return { data: null };
      }

      return {
        data: data.map(
          (eventSchedule) =>
            new EventScheduleEntity(eventSchedule.id, eventSchedule)
        ),
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };
}

export default UserResource;
