import { CyclicalActivityTemporary } from '@/types';
import { describe, expect, it } from 'vitest';
import { getCyclicalActivitiesByDayOfTheWeekSortedByDate } from './cyclicalActivitiesUtils';

describe('getCyclicalActivitiesByDayOfTheWeekSortedByDate()', () => {
  const inputData: CyclicalActivityTemporary[] = [
    {
      id: '89a9598f-7c4f-4f69-a03a-72d52c547925',
      name: 'no wednesday',
      activityTypes: ['DANCE'],
      activitiesForWhom: ['TEENS'],
      shortDescription: 'sdfvjk,gjk,kj',
      longDescription: '<p>sdfvsdfvgjkl</p>',
      places: ['DANCING_ROOM'],
      isCustomLinkToDetails: false,
      customLinkToDetails: null,
      isExpiresAtRequired: false,
      expiresAt: null,
      isToBePublished: true,
      createdAt: new Date('2023-11-02T13:06:26.000Z'),
      updatedAt: new Date('2023-11-03T07:41:11.000Z'),
      authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
      images: [],

      occurrence: [
        {
          id: '2507a2aa-36be-442b-b55a-22f4ddbe23eb',
          day: 'MONDAY',
          activityStart: new Date('2023-11-02T09:45:00.000Z'),
          activityEnd: new Date('2023-11-02T22:59:00.000Z'),
          cyclicalActivityId: '89a9598f-7c4f-4f69-a03a-72d52c547925',
        },
      ],
    },

    {
      id: '89a9598f-7c4f-4f69-a03a-72d52c547925',
      name: 'wednesday 2',
      activityTypes: ['DANCE'],
      activitiesForWhom: ['TEENS'],
      shortDescription: 'sdfvjk,gjk,kj',
      longDescription: '<p>sdfvsdfvgjkl</p>',
      places: ['DANCING_ROOM'],
      isCustomLinkToDetails: false,
      customLinkToDetails: null,
      isExpiresAtRequired: false,
      expiresAt: null,
      isToBePublished: true,
      createdAt: new Date('2023-11-02T13:06:26.000Z'),
      updatedAt: new Date('2023-11-03T07:41:11.000Z'),
      authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
      images: [],
      occurrence: [
        {
          id: '2507a2aa-36be-442b-b55a-22f4ddbe23eb',
          day: 'WEDNESDAY',
          activityStart: new Date('2023-11-02T09:45:00.000Z'),
          activityEnd: new Date('2023-11-02T22:59:00.000Z'),
          cyclicalActivityId: '89a9598f-7c4f-4f69-a03a-72d52c547925',
        },
      ],
    },

    {
      id: '8ea0f6f8-7edb-424f-b514-604f86d106e1',
      name: 'wednesday 3',
      activityTypes: ['DANCE'],
      activitiesForWhom: ['TEENS'],
      shortDescription: 'krótki',
      longDescription: '<p>długi</p>',
      places: ['ART_ROOM'],
      isCustomLinkToDetails: false,
      customLinkToDetails: null,
      isExpiresAtRequired: false,
      expiresAt: null,
      isToBePublished: true,
      createdAt: new Date('2023-11-07T08:23:19.000Z'),
      updatedAt: new Date('2023-11-07T08:23:19.000Z'),
      authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
      images: [],

      occurrence: [
        {
          id: 'f6e8d8ac-c6ab-455d-a04b-8a692d7b6c9b',
          day: 'WEDNESDAY',
          activityStart: new Date('2023-11-07T10:59:00.000Z'),
          activityEnd: new Date('2023-11-07T11:01:00.000Z'),
          cyclicalActivityId: '8ea0f6f8-7edb-424f-b514-604f86d106e1',
        },
      ],
    },

    {
      id: '6150b60e-b581-42fe-bb75-ac808859800d',
      name: 'wednesday 1,2,5',
      activityTypes: ['DANCE'],
      activitiesForWhom: ['TEENS'],
      shortDescription: 'ergvwertfg',
      longDescription: '<p>retgbeytbtryb</p>',
      places: ['ART_ROOM'],
      isCustomLinkToDetails: false,
      customLinkToDetails: null,
      isExpiresAtRequired: false,
      expiresAt: null,
      isToBePublished: true,
      createdAt: new Date('2023-11-09T17:28:26.000Z'),
      updatedAt: new Date('2023-11-09T17:28:26.000Z'),
      authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
      images: [],

      occurrence: [
        {
          id: '9a25b621-4090-4f48-a301-4fd44503c5a0',
          day: 'WEDNESDAY',
          activityStart: new Date('2023-11-09T14:00:00.000Z'),
          activityEnd: new Date('2023-11-09T16:00:00.000Z'),
          cyclicalActivityId: '6150b60e-b581-42fe-bb75-ac808859800d',
        },

        {
          id: 'f42d9aaa-3ddf-4846-b494-afb4dd9fbcfc',
          day: 'WEDNESDAY',
          activityStart: new Date('2023-11-09T07:36:00.000Z'),
          activityEnd: new Date('2023-11-09T12:50:00.000Z'),
          cyclicalActivityId: '6150b60e-b581-42fe-bb75-ac808859800d',
        },

        {
          id: 'f42d9aaa-3ddf-4846-b494-afb4dd9fbcfc',
          day: 'WEDNESDAY',
          activityStart: new Date('2023-11-09T07:20:00.000Z'),
          activityEnd: new Date('2023-11-09T12:50:00.000Z'),
          cyclicalActivityId: '6150b60e-b581-42fe-bb75-ac808859800d',
        },

        {
          id: 'f42d9aaa-3ddf-4846-b494-afb4dd9fbcfc',
          day: 'MONDAY',
          activityStart: new Date('2023-11-09T07:20:00.000Z'),
          activityEnd: new Date('2023-11-09T12:50:00.000Z'),
          cyclicalActivityId: '6150b60e-b581-42fe-bb75-ac808859800d',
        },
      ],
    },
  ];

  const inputDataWithNoWednesday: CyclicalActivityTemporary[] = [
    {
      id: '89a9598f-7c4f-4f69-a03a-72d52c547925',
      name: 'no wednesday',
      activityTypes: ['DANCE'],
      activitiesForWhom: ['TEENS'],
      shortDescription: 'sdfvjk,gjk,kj',
      longDescription: '<p>sdfvsdfvgjkl</p>',
      places: ['DANCING_ROOM'],
      isCustomLinkToDetails: false,
      customLinkToDetails: null,
      isExpiresAtRequired: false,
      expiresAt: null,
      isToBePublished: true,
      createdAt: new Date('2023-11-02T13:06:26.000Z'),
      updatedAt: new Date('2023-11-03T07:41:11.000Z'),
      authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
      images: [],

      occurrence: [
        {
          id: '2507a2aa-36be-442b-b55a-22f4ddbe23eb',
          day: 'MONDAY',
          activityStart: new Date('2023-11-02T09:45:00.000Z'),
          activityEnd: new Date('2023-11-02T22:59:00.000Z'),
          cyclicalActivityId: '89a9598f-7c4f-4f69-a03a-72d52c547925',
        },
      ],
    },
  ];

  it('should return correct, filtered by occurrence hours array', () => {
    expect(
      getCyclicalActivitiesByDayOfTheWeekSortedByDate(inputData, 'WEDNESDAY')
    ).toEqual([
      {
        id: '6150b60e-b581-42fe-bb75-ac808859800d',
        name: 'wednesday 1,2,5',
        activityTypes: ['DANCE'],
        activitiesForWhom: ['TEENS'],
        shortDescription: 'ergvwertfg',
        longDescription: '<p>retgbeytbtryb</p>',
        places: ['ART_ROOM'],
        isCustomLinkToDetails: false,
        customLinkToDetails: null,
        isExpiresAtRequired: false,
        expiresAt: null,
        isToBePublished: true,
        createdAt: new Date('2023-11-09T17:28:26.000Z'),
        updatedAt: new Date('2023-11-09T17:28:26.000Z'),
        authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
        images: [],

        occurrence: [
          {
            id: 'f42d9aaa-3ddf-4846-b494-afb4dd9fbcfc',
            day: 'WEDNESDAY',
            activityStart: new Date('2023-11-09T07:20:00.000Z'),
            activityEnd: new Date('2023-11-09T12:50:00.000Z'),
            cyclicalActivityId: '6150b60e-b581-42fe-bb75-ac808859800d',
          },
        ],
      },

      {
        id: '6150b60e-b581-42fe-bb75-ac808859800d',
        name: 'wednesday 1,2,5',
        activityTypes: ['DANCE'],
        activitiesForWhom: ['TEENS'],
        shortDescription: 'ergvwertfg',
        longDescription: '<p>retgbeytbtryb</p>',
        places: ['ART_ROOM'],
        isCustomLinkToDetails: false,
        customLinkToDetails: null,
        isExpiresAtRequired: false,
        expiresAt: null,
        isToBePublished: true,
        createdAt: new Date('2023-11-09T17:28:26.000Z'),
        updatedAt: new Date('2023-11-09T17:28:26.000Z'),
        authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
        images: [],

        occurrence: [
          {
            id: 'f42d9aaa-3ddf-4846-b494-afb4dd9fbcfc',
            day: 'WEDNESDAY',
            activityStart: new Date('2023-11-09T07:36:00.000Z'),
            activityEnd: new Date('2023-11-09T12:50:00.000Z'),
            cyclicalActivityId: '6150b60e-b581-42fe-bb75-ac808859800d',
          },
        ],
      },

      {
        id: '89a9598f-7c4f-4f69-a03a-72d52c547925',
        name: 'wednesday 2',
        activityTypes: ['DANCE'],
        activitiesForWhom: ['TEENS'],
        shortDescription: 'sdfvjk,gjk,kj',
        longDescription: '<p>sdfvsdfvgjkl</p>',
        places: ['DANCING_ROOM'],
        isCustomLinkToDetails: false,
        customLinkToDetails: null,
        isExpiresAtRequired: false,
        expiresAt: null,
        isToBePublished: true,
        createdAt: new Date('2023-11-02T13:06:26.000Z'),
        updatedAt: new Date('2023-11-03T07:41:11.000Z'),
        authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
        images: [],
        occurrence: [
          {
            id: '2507a2aa-36be-442b-b55a-22f4ddbe23eb',
            day: 'WEDNESDAY',
            activityStart: new Date('2023-11-02T09:45:00.000Z'),
            activityEnd: new Date('2023-11-02T22:59:00.000Z'),
            cyclicalActivityId: '89a9598f-7c4f-4f69-a03a-72d52c547925',
          },
        ],
      },

      {
        id: '8ea0f6f8-7edb-424f-b514-604f86d106e1',
        name: 'wednesday 3',
        activityTypes: ['DANCE'],
        activitiesForWhom: ['TEENS'],
        shortDescription: 'krótki',
        longDescription: '<p>długi</p>',
        places: ['ART_ROOM'],
        isCustomLinkToDetails: false,
        customLinkToDetails: null,
        isExpiresAtRequired: false,
        expiresAt: null,
        isToBePublished: true,
        createdAt: new Date('2023-11-07T08:23:19.000Z'),
        updatedAt: new Date('2023-11-07T08:23:19.000Z'),
        authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
        images: [],

        occurrence: [
          {
            id: 'f6e8d8ac-c6ab-455d-a04b-8a692d7b6c9b',
            day: 'WEDNESDAY',
            activityStart: new Date('2023-11-07T10:59:00.000Z'),
            activityEnd: new Date('2023-11-07T11:01:00.000Z'),
            cyclicalActivityId: '8ea0f6f8-7edb-424f-b514-604f86d106e1',
          },
        ],
      },

      {
        id: '6150b60e-b581-42fe-bb75-ac808859800d',
        name: 'wednesday 1,2,5',
        activityTypes: ['DANCE'],
        activitiesForWhom: ['TEENS'],
        shortDescription: 'ergvwertfg',
        longDescription: '<p>retgbeytbtryb</p>',
        places: ['ART_ROOM'],
        isCustomLinkToDetails: false,
        customLinkToDetails: null,
        isExpiresAtRequired: false,
        expiresAt: null,
        isToBePublished: true,
        createdAt: new Date('2023-11-09T17:28:26.000Z'),
        updatedAt: new Date('2023-11-09T17:28:26.000Z'),
        authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
        images: [],

        occurrence: [
          {
            id: '9a25b621-4090-4f48-a301-4fd44503c5a0',
            day: 'WEDNESDAY',
            activityStart: new Date('2023-11-09T14:00:00.000Z'),
            activityEnd: new Date('2023-11-09T16:00:00.000Z'),
            cyclicalActivityId: '6150b60e-b581-42fe-bb75-ac808859800d',
          },
        ],
      },
    ]);
  });

  it('should return empty array when passed null', () => {
    expect(
      getCyclicalActivitiesByDayOfTheWeekSortedByDate(
        null as unknown as CyclicalActivityTemporary[],
        'WEDNESDAY'
      )
    ).toEqual([]);
  });
  it('should return empty array when passed undefined', () => {
    expect(
      getCyclicalActivitiesByDayOfTheWeekSortedByDate(
        undefined as unknown as CyclicalActivityTemporary[],
        'WEDNESDAY'
      )
    ).toEqual([]);
  });

  it('should return empty array when passed empty array', () => {
    expect(
      getCyclicalActivitiesByDayOfTheWeekSortedByDate([], 'WEDNESDAY')
    ).toEqual([]);
  });

  it('should return empty array when passed array with no desired day in occurrence', () => {
    expect(
      getCyclicalActivitiesByDayOfTheWeekSortedByDate(
        inputDataWithNoWednesday,
        'WEDNESDAY'
      )
    ).toEqual([]);
  });
});
