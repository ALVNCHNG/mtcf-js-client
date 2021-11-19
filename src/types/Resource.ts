import { AxiosInstance } from 'axios';

import { Entity } from './Entity';
import { ListFilterOptions } from './List';
import { ErrorResponse, ListResponse } from './Server';

export abstract class Resource<
  EntityType,
  SortableEntityFields extends string,
  T = Entity<EntityType>,
  C extends AxiosInstance = AxiosInstance,
  FormData = any
> {
  abstract client: C;

  abstract getClient(): C;
  abstract setClient(client: C): this;

  abstract get(options?: ListFilterOptions<SortableEntityFields>): Promise<
    | (Omit<ListResponse<EntityType>, 'data'> & {
        data: T[];
        raw: EntityType[];
      })
    | ErrorResponse
  >;
  abstract getById(id: string): Promise<{ data: T | null } | ErrorResponse>;

  abstract create(
    formData: FormData
  ): Promise<{ data: T | null } | ErrorResponse>;

  abstract update(
    entity: T,
    formData: FormData
  ): Promise<{ data: T | null } | ErrorResponse>;

  abstract delete(entity: T): Promise<{ data: T | null } | ErrorResponse>;
}
