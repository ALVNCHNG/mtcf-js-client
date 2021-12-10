import { EventSchedule } from './EventSchedule';
import { Platform } from './Platform';
import { SchedulePlatformViewer } from './SchedulePlatformViewer';

export type SchedulePlatform = {
  _id: string;

  schedule: string;
  platform: string;

  viewers: SchedulePlatformViewer[];

  viewersCountMin: number;
  viewersCountMedian: number;
  viewersCountMax: number;
  viewersCountMean: number;

  createdAt: Date;
  updatedAt: Date;
};

export type SchedulePopulatedPlatform = Omit<
  SchedulePlatform,
  'schedule' | 'platform'
> & {
  schedule: EventSchedule;
  platform: Platform;
};

export type SchedulePlatformSortableFields = keyof Pick<
  SchedulePlatform,
  | 'viewersCountMin'
  | 'viewersCountMedian'
  | 'viewersCountMean'
  | 'viewersCountMax'
  | 'createdAt'
>;

export type SchedulePlatformRequestBody = {
  platform?: string;
  platforms?: string[];
};

export type SchedulePlatformResponse = Omit<SchedulePlatform, '_id'> & {
  id: SchedulePlatform['_id'];
};

export type SchedulePlatformResponseMinimal = Pick<
  SchedulePlatformResponse,
  | 'id'
  | 'schedule'
  | 'platform'
  | 'viewersCountMin'
  | 'viewersCountMedian'
  | 'viewersCountMax'
  | 'viewersCountMean'
>;
