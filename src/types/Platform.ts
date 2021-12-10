export type Platform = {
  _id: string;
  name: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// export type PopulatedPlatform = Omit<Platform, ''> & {};

export type PlatformSortableFields = keyof Pick<Platform, 'name' | 'createdAt'>;

export type PlatformRequestBody = {
  name: string;
  isArchived?: boolean;
};

export type PlatformResponse = Omit<Platform, '_id'> & {
  id: Platform['_id'];
};

export type PlatformResponseMinimal = Pick<
  PlatformResponse,
  'id' | 'name' | 'isArchived'
>;
