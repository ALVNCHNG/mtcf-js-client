import axios, { AxiosInstance } from 'axios';

import { API_VERSION, DOMAIN, PORT, RESOURCES } from '../../config';
import {
  ErrorResponse,
  FetchEntityResponse,
  ListFilterOptions,
  ListResponse,
  User,
  UserRequestBody,
  UserSortableEntityFields,
} from '../../types';
import { handleResourceError } from '../../utils';

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
      sort: 'created_at',
    }
  ): Promise<
    | ErrorResponse
    | (Omit<ListResponse<User>, 'data'> & { data: UserEntity[]; raw: User[] })
  > => {
    try {
      let users: UserEntity[] = [];
      const { order, limit, offset, sort } = options;

      const {
        data: { data, metadata },
      } = await this.client.get<ListResponse<User>>(`/`, {
        params: {
          limit,
          offset,
          sort,
          order,
        } as ListFilterOptions<UserSortableEntityFields>,
      });

      if (data.length > 0) {
        users = data.map(
          (user, userIndex) =>
            new UserEntity(user.user_id || userIndex.toString(), user)
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
  ): Promise<ErrorResponse | { data: UserEntity | null }> => {
    try {
      const {
        data: { data },
      } = await this.client.get<FetchEntityResponse<User>>(`${id}`, {});

      if (!data) {
        return { data: null };
      }

      return { data: new UserEntity(data._id || '', data) };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  create = async (
    formData: any
  ): Promise<ErrorResponse | { data: UserEntity | null }> => {
    try {
      const { data } = await this.client.post<User>('/', formData);

      if (!data) {
        return { data: null };
      }

      return { data: new UserEntity(data._id || '', data) };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  update = async (
    entity: UserEntity,
    formData: Omit<UserRequestBody, 'password'>
  ): Promise<ErrorResponse | { data: UserEntity | null }> => {
    try {
      const { data } = await this.client.put<User>(
        `${entity.getId()}`,
        formData
      );

      if (!data) {
        return { data: null };
      }

      return { data: new UserEntity(data._id || '', data) };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };

  delete = async (): // entity: UserEntity
  Promise<ErrorResponse | { data: UserEntity | null }> => {
    try {
      return { data: null };
    } catch (error: any) {
      return handleResourceError(error);
    }
  };
}

export default UserResource;
