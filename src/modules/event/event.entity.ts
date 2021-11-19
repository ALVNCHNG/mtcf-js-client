import { Entity, Event } from '../../types';

class EventEntity extends Entity<Event> {
  id: string;

  attributes: Event;

  constructor(id: string, attributes: Event) {
    super();

    this.id = id;
    this.attributes = attributes;
  }

  getId = (): string => this.id;

  setId(id: string): this {
    this.id = id;
    return this;
  }

  getAttribute = <T extends keyof Event>(key: T): Event[T] => {
    return this.attributes[key];
  };

  getAttributes = (): Event => this.attributes;

  setAttribute = <T extends keyof Event>(key: T, value: Event[T]): this => {
    this.attributes[key] = value;
    return this;
  };

  getSchedules = () => {
    return this.attributes.schedules;
  };
}

export default EventEntity;
