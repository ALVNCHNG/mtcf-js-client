import axios, { AxiosInstance } from 'axios';

import { ScheduleEntity } from '..';
import {
  ErrorResponse,
  handleResourceError,
  ListFilterOptions,
  ListResponse,
  ListResponseMetadata,
  SchedulePlatformRequestBody,
  SchedulePlatformResponse,
  SchedulePlatformResponseMinimal,
  SchedulePlatformSortableFields,
} from '../..';
import { API_VERSION, DOMAIN, PORT, RESOURCES } from '../../config';

import SchedulePlatformEntity from './schedule-platform.entity';

class SchedulePlatformResource {
  private url = `${DOMAIN}:${PORT}/api/${API_VERSION}/${RESOURCES.schedules}`;

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

  create = async (
    schedule: ScheduleEntity,
    formData: SchedulePlatformRequestBody
  ): Promise<
    | ErrorResponse
    | {
        data: SchedulePlatformEntity<SchedulePlatformResponse> | null;
        raw: SchedulePlatformResponse | null;
      }
  > => {
    try {
      const {
        data: { data },
      } = await this.client.post<{ data: SchedulePlatformResponse }>(
        `/${schedule.getId()}/${RESOURCES.platforms}`,
        formData
      );

      if (!data) {
        return {
          data: null,
          raw: null,
        };
      }

      return {
        data: new SchedulePlatformEntity<SchedulePlatformResponse>(
          data.id,
          data
        ),
        raw: data,
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  get = async (
    schedule: ScheduleEntity,
    options: ListFilterOptions<SchedulePlatformSortableFields> = {
      limit: 10,
      offset: 0,
      sort: 'createdAt',
      order: -1,
    }
  ): Promise<
    | ErrorResponse
    | {
        data: SchedulePlatformEntity<SchedulePlatformResponseMinimal>[];
        raw: SchedulePlatformResponseMinimal[];
        metadata: ListResponseMetadata;
      }
  > => {
    try {
      let platforms: SchedulePlatformEntity<SchedulePlatformResponseMinimal>[] =
        [];

      const { order, limit, offset, sort } = options;

      const {
        data: { data, metadata },
      } = await this.client.get<ListResponse<SchedulePlatformResponseMinimal>>(
        `/${schedule.getId()}/${RESOURCES.platforms}`,
        {
          params: {
            limit,
            offset,
            sort,
            order,
          } as ListFilterOptions<SchedulePlatformSortableFields>,
        }
      );

      if (data.length > 0) {
        platforms = data.map(
          (schedule) => new SchedulePlatformEntity(schedule.id, schedule)
        );
      }

      return {
        data: platforms,
        raw: data,
        metadata,
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  getById = async (entities: {
    schedule: ScheduleEntity;
    platform: SchedulePlatformEntity;
  }): Promise<
    | ErrorResponse
    | {
        data: SchedulePlatformEntity<SchedulePlatformResponse> | null;
        raw: SchedulePlatformResponse | null;
      }
  > => {
    const { platform, schedule } = entities;
    try {
      const {
        data: { data },
      } = await this.client.get<{ data: SchedulePlatformResponse }>(
        `/${schedule.getId()}/${RESOURCES.platforms}/${platform.getId()}`
      );

      if (!data) {
        return {
          data: null,
          raw: null,
        };
      }

      return {
        data: new SchedulePlatformEntity<SchedulePlatformResponse>(
          data.id,
          data
        ),
        raw: data,
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  update = async (
    formData: SchedulePlatformRequestBody,
    entities: {
      schedule: ScheduleEntity;
      platform: SchedulePlatformEntity;
    }
  ): Promise<
    | ErrorResponse
    | {
        data: SchedulePlatformEntity<SchedulePlatformResponse> | null;
        raw: SchedulePlatformResponse | null;
      }
  > => {
    const { platform, schedule } = entities;
    try {
      const {
        data: { data },
      } = await this.client.put<{ data: SchedulePlatformResponse }>(
        `/${schedule.getId()}/${RESOURCES.platforms}/${platform.getId()}`,
        formData
      );

      if (!data) {
        return {
          data: null,
          raw: null,
        };
      }

      return {
        data: new SchedulePlatformEntity<SchedulePlatformResponse>(
          data.id,
          data
        ),
        raw: data,
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  delete = async (entities: {
    schedule: ScheduleEntity;
    platform: SchedulePlatformEntity;
  }): Promise<
    | ErrorResponse
    | {
        data: SchedulePlatformEntity<SchedulePlatformResponse> | null;
        raw: SchedulePlatformResponse | null;
      }
  > => {
    const { platform, schedule } = entities;
    try {
      const {
        data: { data },
      } = await this.client.delete<{ data: SchedulePlatformResponse }>(
        `/${schedule.getId()}/${RESOURCES.platforms}/${platform.getId()}`
      );

      if (!data) {
        return {
          data: null,
          raw: null,
        };
      }

      return {
        data: new SchedulePlatformEntity<SchedulePlatformResponse>(
          data.id,
          data
        ),
        raw: data,
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };
}

export default SchedulePlatformResource;
