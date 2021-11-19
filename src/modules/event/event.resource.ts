import axios, { AxiosInstance } from 'axios';
import { Types } from 'mongoose';

import { API_VERSION, DOMAIN, PORT, RESOURCES } from '../../config';
import {
  Entity,
  ErrorResponse,
  Event,
  EventRequestBody,
  EventSchedule,
  EventScheduleRequestBody,
  EventScheduleSortableFields,
  EventSortableFields,
  FetchEntityResponse,
  ListFilterOptions,
  ListResponse,
  ListResponseMetadata,
  ServerResponseWithEntity,
} from '../../types';
import { handleResourceError } from '../../utils';

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
      sort: 'created_at',
    }
  ): Promise<
    | ErrorResponse
    | {
        data: EventEntity[];
        raw: Event[];
        metadata: ListResponseMetadata;
      }
  > => {
    try {
      let events: EventEntity[] = [];
      const { order, limit, offset, sort } = options;

      const {
        data: { data, metadata },
      } = await this.client.get<ListResponse<Event>>(`/`, {
        params: {
          limit,
          offset,
          sort,
          order,
        } as ListFilterOptions<EventSortableFields>,
      });

      if (data.length > 0) {
        events = data.map(
          (event, eventIndex) =>
            new EventEntity(
              new Types.ObjectId(event._id).toString() || eventIndex.toString(),
              event
            )
        );
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
  ): Promise<ErrorResponse | { data: Entity<Event> | null }> => {
    try {
      const {
        data: { data },
      } = await this.client.get<FetchEntityResponse<Event>>(`${id}`, {});

      if (!data) {
        return { data: null };
      }

      return { data: new EventEntity(data._id || '', data) };
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
      sort: 'created_at',
    }
  ) => {
    try {
      let eventSchedules: EventScheduleEntity[] = [];
      const { order, limit, offset, sort } = options;

      const {
        data: { data, metadata },
      } = await this.client.get<ListResponse<EventSchedule>>(
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
          (eventSchedule, eventScheduleIndex) =>
            new EventScheduleEntity(
              new Types.ObjectId(eventSchedule._id).toString() ||
                eventScheduleIndex.toString(),
              eventSchedule
            )
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

  create = async (
    formData: EventRequestBody
  ): Promise<ErrorResponse | { data: Entity<Event> | null }> => {
    try {
      const { data: responseData } = await this.client.post<
        ServerResponseWithEntity<Event>
      >('/', formData);

      if (!responseData.data) {
        return { data: null };
      }

      const { data } = responseData;

      return { data: new EventEntity(data._id, data) };
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
        ServerResponseWithEntity<EventSchedule>
      >(`/${event.getId()}/schedules`, formData);

      if (!responseData.data) {
        return { data: null };
      }

      const { data } = responseData;

      return { data: new EventScheduleEntity(data._id, data) };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  update = async (
    event: EventEntity,
    formData: EventRequestBody
  ): Promise<ErrorResponse | { data: EventEntity | null }> => {
    try {
      const { data: responseData } = await this.client.put<
        ServerResponseWithEntity<Event>
      >(`${event.getId()}`, formData);

      if (!responseData.data) {
        return { data: null };
      }

      const { data } = responseData;

      return { data: new EventEntity(data._id, data) };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  delete = async (
    entity: Entity<Event>
  ): Promise<ErrorResponse | { data: Entity<Event> | null }> => {
    try {
      const { data: responseData } = await this.client.delete<
        ServerResponseWithEntity<Event>
      >(`${entity.getId()}`);

      if (!responseData.data) {
        return { data: null };
      }

      const { data } = responseData;

      return { data: new EventEntity(data._id, data) };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  // delete = async (entity: Entity<Event>): Promise<Entity<Event> | null> => {

  // };
}

export default EventResource;
