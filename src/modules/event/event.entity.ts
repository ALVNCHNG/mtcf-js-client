import { Entity, EventResponse, EventResponseMinimal } from '../../types';

class EventEntity<
  TEntity extends EventResponse | EventResponseMinimal =
    | EventResponse
    | EventResponseMinimal
> extends Entity<TEntity> {
  id: string;

  attributes: TEntity;

  constructor(id: string, attributes: TEntity) {
    super();

    console.log('Generated Event Id: ', id);
    this.id = id;
    this.attributes = attributes;
  }

  getId = (): string => {
    console.log('Event Id: ', this.id);
    return this.id;
  };

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

  getSchedules = (): TEntity['schedules'] => {
    return this.attributes.schedules;
  };
}

export default EventEntity;
