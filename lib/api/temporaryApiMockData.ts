import { Slide } from '@prisma/client';

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

// export const allEventsMockData: Event[] = [
//   {
//     id: 'asd678dfv8dfv6sd67fv',
//     title: 'Pink Floyd - Dark side of the moon.',
//   },
// ];
