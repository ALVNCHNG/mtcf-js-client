import {
  PlatformResponse,
  PlatformResponseMinimal,
} from '../../types/Platform';

export const isPlatformResponse = (
  response: PlatformResponse | PlatformResponseMinimal
): response is PlatformResponse => {
  return !!(response as PlatformResponse).createdAt;
};

export const isPlatformResponseMinimal = (
  response: PlatformResponse | PlatformResponseMinimal
): response is PlatformResponseMinimal => {
  return !(response as PlatformResponse).createdAt;
};
