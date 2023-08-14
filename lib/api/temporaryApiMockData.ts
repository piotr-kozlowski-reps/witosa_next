import { Event, Slide } from '@prisma/client';

export const mainSliderMockData: Slide[] = [
  {
    id: '2f4e7c17-0b04-4881-8456-ce6bf7fde841',
    eventType: ['CONCERT'],
    slideTitle: 'Pink Floyd - Dark side of the moon.',
    slideAlt: 'Koncert zespołu Pink Floyd, z płytą: Dark side of the moon.',
    eventDate: new Date('2023-09-13T19:30:00'),
    eventUrl: '#',
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    slideUrl: ``,
    visibleFrom: new Date('2023-08-10T11:00:24.968Z'),
    visibleUntil: new Date('2023-09-10T11:00:24.968Z'),
  },
];

export const allEventsMockData: Event[] = [
  {
    id: '854e7c17-0b04-4881-8456-ce6bf7fde841',
    eventTypes: ['CONCERT'],
    title: 'Pink Floyd - Dark side of the moon',
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    isToBeInNewsSection: true,
    newsSectionImageUrl: '',
    shortDescription:
      'Pink Floyd – brytyjski zespół rockowy założony w 1965 roku w Londynie. Ich twórczość, początkowo klasyfikowana jako rock psychodeliczny, w późniejszych latach nabrała cech rocka progresywnego. Grupa znana jest z filozoficznie zabarwionych tekstów piosenek, eksperymentów z dźwiękiem, innowacyjnego podejścia do kwestii grafiki w albumach oraz rozbudowanych występów koncertowych. Sprzedali na całym świecie ponad 250 milionów albumów[5][6][7] (z tego ok. 74,5 miliona w samych Stanach Zjednoczonych)[8].',
    eventStartDate: new Date('2023-09-02T21:00:24.968Z'),
    eventEndDate: new Date('2023-09-02T23:00:24.968Z'),
    isToBePublished: true,
  },
  {
    id: '854e7c17-0584-4881-8456-ce6bf7fde841',
    eventTypes: ['WORKSHOP'],
    title: 'Joanna Chalicka - A gdzież moje konie wrone',
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    isToBeInNewsSection: true,
    newsSectionImageUrl: '',
    shortDescription:
      'Koncert dawnych pieśni wiejskich, wiosennych, letnich, weselnych oraz śpiewanych opowieści z różnych regionów Polski i Ukrainy w wykonaniu uczestniczek zajęć Jagny Knittel pt. „Śpiewanie po staremu”.',
    eventStartDate: new Date('2023-09-01T18:00:24.968Z'),
    eventEndDate: new Date('2023-09-02T21:00:24.968Z'),
    isToBePublished: true,
  },
];
