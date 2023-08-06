import { TEventType } from '@/types';

export function getPolishTypeName(type: TEventType) {
  let polishTypeName = '';

  switch (type) {
    case 'concert':
      polishTypeName = 'koncert';
      break;

    case 'workshop':
      polishTypeName = 'warsztaty';
      break;

    default:
      polishTypeName = '';
  }

  return polishTypeName;
}
