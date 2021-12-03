import {
  EventScheduleResponse,
  EventScheduleResponseMinimal,
} from '../../types/EventSchedule';

export const isScheduleResponse = (
  response: EventScheduleResponse | EventScheduleResponseMinimal
): response is EventScheduleResponse => {
  return !!(response as EventScheduleResponse).createdAt;
};

export const isScheduleResponseMinimal = (
  response: EventScheduleResponse | EventScheduleResponseMinimal
): response is EventScheduleResponseMinimal => {
  return !(response as EventScheduleResponse).createdAt;
};
