import { Entity, User, UserMetadata } from '../../types';

class UserEntity extends Entity<User> {
  id;

  attributes: User;

  constructor(id: string, attributes: User) {
    super();

    this.id = id;
    this.attributes = attributes;
  }

  getId = (): string => this.id;

  setId(id: string): this {
    this.id = id;
    return this;
  }

  getAttribute = <T extends keyof User>(key: T): User[T] => {
    return this.attributes[key];
  };

  getAttributes = (): User => this.attributes;

  setAttribute = <T extends keyof User>(key: T, value: User[T]): this => {
    this.attributes[key] = value;
    return this;
  };

  getAttendedEvents = (): UserMetadata['attendedEvents'] => {
    return this.attributes.user_metadata?.attendedEvents || [];
  };

  getInterestedEvents = (): UserMetadata['interestedEvents'] => {
    return this.attributes.user_metadata?.interestedEvents || [];
  };
}

export default UserEntity;
