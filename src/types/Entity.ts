export type TEntityAttributes = Record<string, any>;

export abstract class Entity<Attributes extends TEntityAttributes> {
  abstract id: string;
  abstract attributes: Attributes;

  abstract getId(): string;
  abstract setId(id: string): this;

  abstract getAttribute<T extends keyof Attributes>(key: T): Attributes[T];
  abstract getAttributes(): Attributes;
  abstract setAttribute<T extends keyof Attributes>(
    key: T,
    value: Attributes[T]
  ): this;
}
