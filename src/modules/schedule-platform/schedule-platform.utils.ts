import {
  SchedulePlatformResponse,
  SchedulePlatformResponseMinimal,
} from '../../types/SchedulePlatform';

export const isSchedulePlatformResponse = (
  response: SchedulePlatformResponse | SchedulePlatformResponseMinimal
): response is SchedulePlatformResponse => {
  return !!(response as SchedulePlatformResponse).viewers;
};

export const isSchedulePlatformResponseMinimal = (
  response: SchedulePlatformResponse | SchedulePlatformResponseMinimal
): response is SchedulePlatformResponseMinimal => {
  return !(response as SchedulePlatformResponse).viewers;
};
