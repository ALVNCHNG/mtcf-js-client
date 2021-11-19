import { Entity, EventSchedule } from '../../types';

class EventSchedulesEntity extends Entity<EventSchedule> {
  id: string;

  attributes: EventSchedule;

  constructor(id: string, attributes: EventSchedule) {
    super();

    this.id = id;
    this.attributes = attributes;
  }

  getId = (): string => this.id;

  setId(id: string): this {
    this.id = id;
    return this;
  }

  getAttribute = <T extends keyof EventSchedule>(key: T): EventSchedule[T] => {
    return this.attributes[key];
  };

  getAttributes = (): EventSchedule => this.attributes;

  setAttribute = <T extends keyof EventSchedule>(
    key: T,
    value: EventSchedule[T]
  ): this => {
    this.attributes[key] = value;
    return this;
  };
}

export default EventSchedulesEntity;
