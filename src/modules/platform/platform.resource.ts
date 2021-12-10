import axios, { AxiosInstance } from 'axios';

import {
  ErrorResponse,
  handleResourceError,
  ListFilterOptions,
  ListResponse,
  ListResponseMetadata,
  PlatformRequestBody,
  PlatformResponse,
  PlatformResponseMinimal,
  PlatformSortableFields,
} from '../..';
import { API_VERSION, DOMAIN, PORT, RESOURCES } from '../../config';

import PlatformEntity from './platform.entity';

class PlatformResource {
  private url = `${DOMAIN}:${PORT}/api/${API_VERSION}/${RESOURCES.platforms}`;

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
    formData: PlatformRequestBody
  ): Promise<
    | ErrorResponse
    | {
        data: PlatformEntity<PlatformResponse> | null;
        raw: PlatformResponse | null;
      }
  > => {
    try {
      const {
        data: { data },
      } = await this.client.post<{ data: PlatformResponse }>('', formData);

      if (!data) {
        return {
          data: null,
          raw: null,
        };
      }

      return {
        data: new PlatformEntity<PlatformResponse>(data.id, data),
        raw: data,
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  get = async (
    options: ListFilterOptions<PlatformSortableFields> = {
      limit: 10,
      offset: 0,
      sort: 'name',
      order: 1,
    }
  ): Promise<
    | ErrorResponse
    | {
        data: PlatformEntity<PlatformResponseMinimal>[];
        raw: PlatformResponseMinimal[];
        metadata: ListResponseMetadata;
      }
  > => {
    try {
      let platforms: PlatformEntity<PlatformResponseMinimal>[] = [];

      const { order, limit, offset, sort } = options;

      const {
        data: { data, metadata },
      } = await this.client.get<ListResponse<PlatformResponseMinimal>>(``, {
        params: {
          limit,
          offset,
          sort,
          order,
        } as ListFilterOptions<PlatformSortableFields>,
      });

      if (data.length > 0) {
        platforms = data.map(
          (schedule) => new PlatformEntity(schedule.id, schedule)
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

  getById = async (
    platform: PlatformEntity
  ): Promise<
    | ErrorResponse
    | {
        data: PlatformEntity<PlatformResponse> | null;
        raw: PlatformResponse | null;
      }
  > => {
    try {
      const {
        data: { data },
      } = await this.client.get<{ data: PlatformResponse }>(
        `/${platform.getId()}`
      );

      if (!data) {
        return {
          data: null,
          raw: null,
        };
      }

      return {
        data: new PlatformEntity<PlatformResponse>(data.id, data),
        raw: data,
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  update = async (
    formData: PlatformRequestBody,
    platform: PlatformEntity
  ): Promise<
    | ErrorResponse
    | {
        data: PlatformEntity<PlatformResponse> | null;
        raw: PlatformResponse | null;
      }
  > => {
    try {
      const {
        data: { data },
      } = await this.client.put<{ data: PlatformResponse }>(
        `/${platform.getId()}`,
        formData
      );

      if (!data) {
        return {
          data: null,
          raw: null,
        };
      }

      return {
        data: new PlatformEntity<PlatformResponse>(data.id, data),
        raw: data,
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  delete = async (
    platform: PlatformEntity
  ): Promise<
    | ErrorResponse
    | {
        data: PlatformEntity<PlatformResponse> | null;
        raw: PlatformResponse | null;
      }
  > => {
    try {
      const {
        data: { data },
      } = await this.client.delete<{ data: PlatformResponse }>(
        `/${platform.getId()}`
      );

      if (!data) {
        return {
          data: null,
          raw: null,
        };
      }

      return {
        data: new PlatformEntity<PlatformResponse>(data.id, data),
        raw: data,
      };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };
}

export default PlatformResource;
