import { EventResponse, EventResponseMinimal } from '../../types/Event';

export const isEventResponse = (
  response: EventResponse | EventResponseMinimal
): response is EventResponse => {
  return !!(response as EventResponse).createdAt;
};

export const isEventResponseMinimal = (
  response: EventResponse | EventResponseMinimal
): response is EventResponseMinimal => {
  return !(response as EventResponse).createdAt;
};
