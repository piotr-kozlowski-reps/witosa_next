import { EventsType } from '@prisma/client';

export function getPolishTypeName(type: EventsType) {
  let polishTypeName = '';

  switch (type) {
    case 'CONCERT':
      polishTypeName = 'koncert';
      break;

    case 'WORKSHOP':
      polishTypeName = 'warsztaty';
      break;

    default:
      polishTypeName = '';
  }

  return polishTypeName;
}
