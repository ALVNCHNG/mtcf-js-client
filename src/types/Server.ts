import { Request, Response } from 'express';

import { TEntityAttributes } from './Entity';
import { SerializedError } from './Error';

export interface FetchEntityResponse<Entity> {
  data: Entity;
}

export interface ErrorResponse {
  errors: SerializedError[];
}

export interface ListResponseMetadata {
  count: number;
  offset?: number;
  limit?: number;
  total: number;
}

export interface ListResponse<ResponseEntity> {
  metadata: ListResponseMetadata;
  data: ResponseEntity[];
}

export interface ServerResponseWithEntity<
  EntityAttributes extends TEntityAttributes
> {
  data: EntityAttributes | null;
}

export type ServerCreateRequest<
  Params extends Record<string, string>,
  EntityAttributes extends TEntityAttributes,
  ReqBody
> = Request<Params, ServerCreateResponse<EntityAttributes>, ReqBody>;

export type ServerCreateResponse<EntityAttributes extends TEntityAttributes> =
  Response<ServerResponseWithEntity<EntityAttributes>>;

export type ServerGetRequest<
  Params extends Record<string, string>,
  EntityAttributes extends TEntityAttributes
> = Request<Params, ServerGetResponse<EntityAttributes>>;

export type ServerGetResponse<EntityAttributes extends TEntityAttributes> =
  Response<ListResponse<EntityAttributes> | null>;

export type ServerGetByIdRequest<
  Params extends Record<string, string>,
  EntityAttributes extends TEntityAttributes
> = Request<Params, ServerGetByIdResponse<EntityAttributes>>;

export type ServerGetByIdResponse<EntityAttributes extends TEntityAttributes> =
  Response<ServerResponseWithEntity<EntityAttributes>>;

export type ServerUpdateResponse<EntityAttributes extends TEntityAttributes> =
  Response<ServerResponseWithEntity<EntityAttributes>>;

export type ServerUpdateRequest<
  Params extends Record<string, string>,
  EntityAttributes extends TEntityAttributes,
  ReqBody
> = Request<Params, ServerUpdateResponse<EntityAttributes>, ReqBody>;

export type ServerDeleteRequest<
  Params extends Record<string, string>,
  EntityAttributes extends TEntityAttributes
> = Request<Params, ServerDeleteResponse<EntityAttributes>>;

export type ServerDeleteResponse<EntityAttributes extends TEntityAttributes> =
  Response<ServerResponseWithEntity<EntityAttributes>>;
