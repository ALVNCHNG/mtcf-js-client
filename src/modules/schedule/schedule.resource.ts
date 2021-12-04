import axios, { AxiosInstance } from 'axios';

import {
  ErrorResponse,
  EventScheduleResponseMinimal,
  EventScheduleSortableFields,
  handleResourceError,
  ListFilterOptions,
  ListResponse,
  ListResponseMetadata,
} from '../..';
import { API_VERSION, DOMAIN, PORT, RESOURCES } from '../../config';
import EventScheduleEntity from '../event/eventSchedule.entity';

class EventResource {
  private url = `${DOMAIN}:${PORT}/api/${API_VERSION}/${RESOURCES.eventSchedules}`;

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
    options: ListFilterOptions<EventScheduleSortableFields> = {
      order: -1,
      limit: 10,
      offset: 0,
      sort: 'createdAt',
    }
  ): Promise<
    | ErrorResponse
    | {
        data: EventScheduleEntity<EventScheduleResponseMinimal>[];
        raw: EventScheduleResponseMinimal[];
        metadata: ListResponseMetadata;
      }
  > => {
    try {
      let schedules: EventScheduleEntity<EventScheduleResponseMinimal>[] = [];
      const { order, limit, offset, sort } = options;

      const {
        data: { data, metadata },
      } = await this.client.get<ListResponse<EventScheduleResponseMinimal>>(
        ``,
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
        schedules = data.map(
          (schedule) => new EventScheduleEntity(schedule.id, schedule)
        );
      }

      return {
        data: schedules,
        raw: data,
        metadata,
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };
}

export default EventResource;
