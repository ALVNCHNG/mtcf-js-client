import { Entity, PlatformResponse, PlatformResponseMinimal } from '../../types';

class PlatformEntity<
  TEntity extends PlatformResponse | PlatformResponseMinimal =
    | PlatformResponse
    | PlatformResponseMinimal
> extends Entity<TEntity> {
  id: string;

  attributes: TEntity;

  constructor(id: string, attributes: TEntity) {
    super();

    this.id = id;
    this.attributes = attributes;
  }

  getId = (): string => this.id;

  setId = (id: string): this => {
    this.id = id;
    return this;
  };

  getAttribute = <T extends keyof TEntity>(key: T): TEntity[T] => {
    return this.attributes[key];
  };

  getAttributes = (): TEntity => this.attributes;

  setAttribute = <T extends keyof TEntity>(key: T, value: TEntity[T]): this => {
    this.attributes[key] = value;
    return this;
  };
}

export default PlatformEntity;
