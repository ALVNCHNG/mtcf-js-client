import axios, { AxiosInstance } from 'axios';

import {
  ErrorResponse,
  EventRequestBody,
  EventResponse,
  EventResponseMinimal,
  EventScheduleRequestBody,
  EventScheduleResponse,
  EventScheduleResponseMinimal,
  EventScheduleSortableFields,
  EventSortableFields,
  FetchEntityResponse,
  handleResourceError,
  ListFilterOptions,
  ListResponse,
  ListResponseMetadata,
  ServerResponseWithEntity,
  UserEntity,
  UserResponse,
  UserSortableEntityFields,
} from '../..';
import { API_VERSION, DOMAIN, PORT, RESOURCES } from '../../config';

import EventEntity from './event.entity';
import EventScheduleEntity from './eventSchedule.entity';

class EventResource {
  private url = `${DOMAIN}:${PORT}/api/${API_VERSION}/${RESOURCES.events}`;

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
    options: ListFilterOptions<EventSortableFields> = {
      order: -1,
      limit: 10,
      offset: 0,
      sort: 'createdAt',
    }
  ): Promise<
    | ErrorResponse
    | {
        data: EventEntity<EventResponseMinimal>[];
        raw: EventResponseMinimal[];
        metadata: ListResponseMetadata;
      }
  > => {
    try {
      let events: EventEntity<EventResponseMinimal>[] = [];
      const { order, limit, offset, sort } = options;

      const {
        data: { data, metadata },
      } = await this.client.get<ListResponse<EventResponseMinimal>>(``, {
        params: {
          limit,
          offset,
          sort,
          order,
        } as ListFilterOptions<EventSortableFields>,
      });

      if (data.length > 0) {
        events = data.map((event) => new EventEntity(event.id, event));
      }

      return {
        data: events,
        raw: data,
        metadata,
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  getById = async (
    id: string
  ): Promise<ErrorResponse | { data: EventEntity<EventResponse> | null }> => {
    try {
      const {
        data: { data },
      } = await this.client.get<FetchEntityResponse<EventResponse>>(`${id}`);

      if (!data) {
        return { data: null };
      }

      return { data: new EventEntity(data.id, data) };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  create = async (
    formData: EventRequestBody
  ): Promise<ErrorResponse | { data: EventEntity<EventResponse> | null }> => {
    try {
      const {
        data: { data },
      } = await this.client.post<ServerResponseWithEntity<EventResponse>>(
        '',
        formData
      );

      if (!data) {
        return { data: null };
      }

      return { data: new EventEntity<EventResponse>(data.id, data) };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  update = async (
    event: EventEntity<EventResponse | EventResponseMinimal>,
    formData: EventRequestBody
  ): Promise<ErrorResponse | { data: EventEntity<EventResponse> | null }> => {
    try {
      const {
        data: { data },
      } = await this.client.put<ServerResponseWithEntity<EventResponse>>(
        `${event.getAttribute('id')}`,
        formData
      );

      if (!data) {
        return { data: null };
      }

      console.log('Id: ', data.id);

      return { data: new EventEntity<EventResponse>(data.id, data) };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  delete = async (
    entity: EventEntity<EventResponse | EventResponseMinimal>
  ): Promise<ErrorResponse | { data: EventEntity<EventResponse> | null }> => {
    try {
      const { data: responseData } = await this.client.delete<
        ServerResponseWithEntity<EventResponse>
      >(`${entity.getId()}`);

      if (!responseData.data) {
        return { data: null };
      }

      const { data } = responseData;

      return { data: new EventEntity<EventResponse>(data.id, data) };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  createSchedule = async (
    event: EventEntity,
    formData: EventScheduleRequestBody
  ) => {
    try {
      const { data: responseData } = await this.client.post<
        ServerResponseWithEntity<EventScheduleResponse>
      >(`/${event.getId()}/schedules`, formData);

      if (!responseData.data) {
        return { data: null };
      }

      const { data } = responseData;

      return { data: new EventScheduleEntity(data.id, data) };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  getSchedules = async (
    event: EventEntity,
    options: ListFilterOptions<EventScheduleSortableFields> = {
      order: -1,
      limit: 10,
      offset: 0,
      sort: 'createdAt',
    }
  ) => {
    try {
      let eventSchedules: EventScheduleEntity<EventScheduleResponseMinimal>[] =
        [];
      const { order, limit, offset, sort } = options;

      const {
        data: { data, metadata },
      } = await this.client.get<ListResponse<EventScheduleResponseMinimal>>(
        `/${event.id}/${RESOURCES.eventSchedules}/`,
        {
          params: {
            limit,
            offset,
            sort,
            order,
          } as ListFilterOptions<EventScheduleSortableFields>,
        }
      );

      if (data.length > 0) {
        eventSchedules = data.map(
          (eventSchedule) =>
            new EventScheduleEntity(eventSchedule.id, eventSchedule)
        );
      }

      return {
        data: eventSchedules,
        raw: data,
        metadata,
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  deleteSchedule = async (schedule: EventScheduleEntity) => {
    const { getAttribute, getId } = schedule;
    try {
      const {
        data: { data },
      } = await this.client.delete<
        ServerResponseWithEntity<EventScheduleResponse>
      >(`/${getAttribute('event')}/${RESOURCES.eventSchedules}/${getId()}`);

      if (!data) {
        return { data: null };
      }

      return {
        data: new EventScheduleEntity<EventScheduleResponse>(data.id, data),
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  getAttendees = async (
    entities: { event: EventEntity; eventSchedule: EventScheduleEntity },
    options: ListFilterOptions<UserSortableEntityFields> = {
      order: -1,
      limit: 10,
      offset: 0,
      sort: 'createdAt',
    }
  ) => {
    let users: UserEntity<UserResponse>[] = [];
    const { event, eventSchedule } = entities;
    const { order, limit, offset, sort } = options;

    try {
      const {
        data: { data, metadata },
      } = await this.client.get<ListResponse<UserResponse>>(
        `/${event.getId()}/${
          RESOURCES.eventSchedules
        }/${eventSchedule.getId()}/attendees`,
        {
          params: {
            limit,
            offset,
            sort,
            order,
          } as ListFilterOptions<UserSortableEntityFields>,
        }
      );

      if (data.length > 0) {
        users = data.map((user) => new UserEntity(user.id, user));
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

  getInterestedUsers = async (
    entities: { event: EventEntity; eventSchedule: EventScheduleEntity },
    options: ListFilterOptions<UserSortableEntityFields> = {
      order: -1,
      limit: 10,
      offset: 0,
      sort: 'createdAt',
    }
  ) => {
    let users: UserEntity<UserResponse>[] = [];
    const { event, eventSchedule } = entities;
    const { order, limit, offset, sort } = options;

    try {
      const {
        data: { data, metadata },
      } = await this.client.get<ListResponse<UserResponse>>(
        `/${event.getId()}/${
          RESOURCES.eventSchedules
        }/${eventSchedule.getId()}/interested`,
        {
          params: {
            limit,
            offset,
            sort,
            order,
          } as ListFilterOptions<UserSortableEntityFields>,
        }
      );

      if (data.length > 0) {
        users = data.map((user) => new UserEntity(user.id, user));
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
}

export default EventResource;
