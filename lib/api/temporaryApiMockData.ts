import { CyclicalActivityTemporary, TSliderGroupsImages } from '@/types';
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
    id: 'n54e7c17-0b04-4881-8456-ce6bf7fde841',
    eventTypes: ['CONCERT'],
    title: 'Pink Floyd - Dark side of the moon',
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    isToBeInNewsSection: true,
    newsSectionImageUrl: 'news-img-002.jpg',
    shortDescription:
      'Pink Floyd – brytyjski zespół rockowy założony w 1965 roku w Londynie. Ich twórczość, początkowo klasyfikowana jako rock psychodeliczny, w późniejszych latach nabrała cech rocka progresywnego. Grupa znana jest z filozoficznie zabarwionych tekstów piosenek, eksperymentów z dźwiękiem, innowacyjnego podejścia do kwestii grafiki w albumach oraz rozbudowanych występów koncertowych. Sprzedali na całym świecie ponad 250 milionów albumów[5][6][7] (z tego ok. 74,5 miliona w samych Stanach Zjednoczonych)[8].',
    eventStartDate: new Date('2023-09-02T21:00:24.968Z'),
    eventEndDate: new Date('2023-09-02T23:00:24.968Z'),
    isToBePublished: true,
  },
  {
    id: '854e7c17-0584-4881-8456-ce6bf7nde841',
    eventTypes: ['WORKSHOP', 'LECTURE'],
    title: 'Joanna Chalicka - A gdzież moje konie wrone',
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    isToBeInNewsSection: true,
    newsSectionImageUrl: 'news-img-001.jpg',
    shortDescription:
      'Koncert dawnych pieśni wiejskich, wiosennych, letnich, weselnych oraz śpiewanych opowieści z różnych regionów Polski i Ukrainy w wykonaniu uczestniczek zajęć Jagny Knittel pt. „Śpiewanie po staremu”.',
    eventStartDate: new Date('2023-09-01T18:00:24.968Z'),
    eventEndDate: new Date('2023-09-02T21:00:24.968Z'),
    isToBePublished: true,
  },
  {
    id: '854e7c17-0584-4881-fff5-de6bf7fde841',
    eventTypes: ['WORKSHOP'],
    title: 'Kino Szkoła - Zajęcia kinematograficzne',
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    isToBeInNewsSection: true,
    newsSectionImageUrl: 'news-img-003.jpg',
    shortDescription:
      '„Tylko to dzieło czegoś jest warte, z którego człowiek może się poprawić i mądrości nauczyć”-słowa Adama Mickiewicza były przewodnią myślą uroczystości wręczenia stypendiów Prezesa Rady Ministrów na rok szkolny 2018/2019, która odbyła się 26 listopada w Wyższej Szkole Menadżerskiej w Warszawie. W uroczystości udział wzięli między innymi Minister Marek Suski, Mazowiecki Kurator Oświaty Aurelia Michałowska, Dyrektor Generalny Ministerstwa Edukacji Narodowej Joanna Szczawińska.',
    eventStartDate: new Date('2023-08-30T18:30:24.968Z'),
    eventEndDate: new Date('2023-09-02T21:00:24.968Z'),
    isToBePublished: true,
  },
  {
    id: '854e7c17-0584-4881-fff5-ce6bgefdh841',
    eventTypes: ['CONCERT'],
    title: 'Knury Knurów - Koncert charytatywny na rzecz ...',
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    isToBeInNewsSection: true,
    newsSectionImageUrl: 'news-img-004.jpg',
    shortDescription:
      '„Miejsce, w którym koncert ma być zorganizowany, powinno być dostosowane do wielkości imprezy. Eventy charytatywne zazwyczaj przygotowywane są na większą skalę, aby jak najwięcej osób mogło wziąć udział w wydarzeniu, z którego dochód przeznaczony będzie na szczytny cel. Wiele placówek oferuje możliwość zorganizowania koncertów charytatywnych, warto więc porozmawiać z władzami miasta, w którym koncert ma się odbyć, a na pewno zaprezentują oni odpowiednie rozwiązanie.',
    eventStartDate: new Date('2023-09-10T18:30:24.968Z'),
    eventEndDate: new Date('2023-09-12T21:00:24.968Z'),
    isToBePublished: true,
  },
];

export const sliderGroupsHipnoteriaBisImages: TSliderGroupsImages = {
  marzenieMiniMini: [
    {
      url: 'groups_marzenie_mini_mini_001.jpg',
      alt: 'Tancerki w kolorowych kostiumach w tańcu arabskim.',
    },
    {
      url: 'groups_marzenie_mini_mini_002.jpg',
      alt: '7 letnie dziewczynki na plenerowej scenie, w różowych bodach, występują z okazji Dnia Tańca.',
    },
    {
      url: 'groups_marzenie_mini_mini_003.jpg',
      alt: 'Dziewczynki z grupy artystyczna Marzenie Mini Mini, na plenerowej scenie w kółeczku.',
    },
  ],
  marzenieBis: [
    {
      url: 'groups_marzenie_bis_001.jpg',
      alt: 'Średnio zaawansowane tancerki w choreografii z elementami ludowymi.',
    },
    {
      url: 'groups_marzenie_bis_002.jpg',
      alt: 'Tancerki na scenie, w ludowych spódniczkach i białych bluzkach, ustawione w figurach.',
    },
    {
      url: 'groups_marzenie_bis_003.jpg',
      alt: 'Tańczące dziewczynki w stylu nowoczesnym na Prentacjach Artystycznych.',
    },
    {
      url: 'groups_marzenie_bis_004.jpg',
      alt: 'Młode tancerki na scenie w srebrnych kostiumach, przedstawiają inscenizację taneczną pt. "Początek".',
    },
  ],
  marzenie: [
    {
      url: 'groups_marzenie_001.jpg',
      alt: 'Najstarsze dziewczyny zespołu "Marzenie" pozują do zdjęcia w ustawieniu litery V.',
    },
    {
      url: 'groups_marzenie_002.jpg',
      alt: 'Dziewczęta ustawione w klasycznych figurach na scenie Domu Kultury.',
    },
    {
      url: 'groups_marzenie_003.jpg',
      alt: 'Tańcząca młodzież z rekwizytem, materiałem imitującym ocean.',
    },
    {
      url: 'groups_marzenie_004.jpg',
      alt: 'Tańcząca młodzież z rekwizytem, materiałem imitującym ocean.',
    },
    {
      url: 'groups_marzenie_005.jpg',
      alt: 'Tancerki w czasie występu, ukazujące swoje umiejętności techniczne.',
    },
  ],
  hipnoteriaBis: [
    {
      url: 'groups_hipnoteriabis_001.jpg',
      alt: 'Grupa radosnych dziewcząt i chłopców na scenie ze swoją trenerką.',
    },
    {
      url: 'groups_hipnoteriabis_002.jpg',
      alt: 'Grupa dziewcząt i chłopców w katanach jeansowych i koszulach w kratę, pozuje do zdjęcia.',
    },
    {
      url: 'groups_hipnoteriabis_003.jpg',
      alt: 'Dziewczęta w pomarańczowych bluzach i luźnych spodniach, przemieszczają się w różnych kierunkach na scenie.',
    },
    {
      url: 'groups_hipnoteriabis_004.jpg',
      alt: 'Tańczące dziewczynki z okazji Dnia Dziecka, na scenie plenerowej.',
    },
  ],
  hipnoteria: [
    {
      url: 'groups_hipnoteria_001.jpg',
      alt: 'Grupa dziewcząt i chłopców w katanach jeansowych i koszulach w kratę, pozuje do zdjęcia.',
    },
  ],
};

export const allCyclicalActivitiesMockData: CyclicalActivityTemporary[] = [
  {
    id: '854e7c17-0uu4-4881-fff5-ce6bgefdh841',
    name: 'Kreatywna plastyka dla dorosłych.',
    activityTypes: ['PLASTICITY'],
    activitiesForWhom: ['ADULTS', 'SENIORS', 'WOMEN'],
    shortDescription: 'coś tutaj będzie!!!!!!!!!!!',
    customLinkToDetails: '',
    occurrence: [
      {
        id: '854e7c17-0uu4-4881-fff5-ce6bgezzh848',
        day: 'MONDAY',
        activityStart: new Date('2000-01-01T18:00:00.968Z'),
        activityEnd: new Date('2000-01-01T20:00:00.968Z'),
      },
    ],
    place: 'ART_ROOM',
    extendedInfo: {
      images: [
        {
          url: 'activities_image_001.jpg',
          alt: 'Malarstwo: Dreamscape. Obraz akrylowy na płótnie. Praca autorstwa Sylwii Lipiny.',
        },
        {
          url: 'activities_image_002.jpg',
          alt: 'Malarstwo: Submerged no.1. Obraz olejny na płótnie. Praca autorstwa Sylwii Lipiny.',
        },
        {
          url: 'activities_image_003.jpg',
          alt: 'Grafika: Orbit - malarstwo poddane obróbce graficznej. Praca autorstwa Sylwii Lipiny.',
        },
      ],
      description:
        '          <p>\r\n            <b>Warsztaty kreatywne „PRZESTRZEŃ SZTUKI” - malarstwo i rysunek</b>\r\n          </p>\r\n          <p>\r\n            Prowadząca: <b>SYLWIA LIPINA</b>\r\n          </p>\r\n          <p>\r\n            Artystka sztuk pięknych, projektantka graficzna, historyczka sztuki.\r\n            Jest abslowentką BA (HONS) Fine Art - University of the Arts London,\r\n            Chelsea College of Art and Design, HNC Diploma in Art and Design -\r\n            Southampton City College oraz Studia Podyplomowe z Historii Sztuki -\r\n            Uniwersytet Śląski w Katowicach.\r\n          </p>\r\n          <p>\r\n            Spotkania oscylujące wokół malarstwa akwarelowego, akrylowego oraz\r\n            rysunku. Zapoznanie z historią sztuki (interpretacja dzieła,\r\n            estetyka dzieła, ikonografia, ikonologia), rozumienia koła kolorów,\r\n            podstawowe zasady perspektywy i kompozycji.\r\n          </p>\r\n          <p>\r\n            Celem warsztatów jest włączenie w kreatywne działania społeczność\r\n            dorosłych i seniorów, oraz dzieci i młodzieży w wieku  13+.\r\n            Działania zorientowane są  wokół hasła „kreatywność przez całe\r\n            życie” i prowokują do rozwoju umiejętności praktycznych,\r\n            interpersonalnych, rozwój umiejętności analitycznych, krytycznego\r\n            myślenia, dyskusji prowadzących do wzajemnego inspirowania  i\r\n            motywowania, terapia sztuką.\r\n          </p>\r\n          <p>Jakie kompetencje zdobędziesz podczas warsztatów:</p>\r\n          <ul>\r\n            <li>\r\n              Zrozumienie wartości twórczego wyrażania i komunikowania idei\r\n              ,znaczeń i emocji.\r\n            </li>\r\n            <li>\r\n              Podnoszenie świadomości kulturowej i chęci uczestnictwa w\r\n              doświadczeniach kulturalnych.\r\n            </li>\r\n            <li>\r\n              Umiejętności praktyczne, praca z materiałem, metodyczna praca,\r\n              proces twórczy.\r\n            </li>\r\n            <li>Umiejętność interpretacji dzieła sztuki.</li>\r\n            <li>\r\n              Wzrost umiejętności interpersonalnych, komunikacji werbalnej i\r\n              niewerbalnej.\r\n            </li>\r\n            <li>Wykorzystanie sztuki jako terapii.</li>\r\n          </ul>',
    },
    isToBePublished: true,
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    expiresAt: new Date('2025-08-10T11:00:24.968Z'),
  },
  {
    id: '854e7r17-0uu4-4ee1-fff5-ce6bgefdh841',
    name: 'Próba zespołu Marzenie.',
    activityTypes: ['DANCE', 'RECREATION'],
    activitiesForWhom: ['TEENS'],
    shortDescription:
      'Próba najstarszej grupy zespołu tańca charakterystycznego. Grupa pokazowa.',
    customLinkToDetails: '/groups/marzenie',
    occurrence: [
      {
        id: '854e7c17-ruu4-4881-fff5-ce5bgezzh848',
        day: 'MONDAY',
        activityStart: new Date('2000-01-01T18:30:00.968Z'),
        activityEnd: new Date('2000-01-01T20:00:00.968Z'),
      },
      {
        id: '85ee4c17-ruu4-4881-fff5-ce5bgezzh848',
        day: 'WEDNESDAY',
        activityStart: new Date('2000-01-01T16:00:00.968Z'),
        activityEnd: new Date('2000-01-01T17:30:00.968Z'),
      },
    ],
    place: 'DANCING_ROOM',
    isToBePublished: true,
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    expiresAt: new Date('2025-08-10T11:00:24.968Z'),
  },
  {
    id: '854w7r17-0du4-4ee1-fff5-cq6bgendh841',
    name: 'Próba zespołu Marzenie Bis.',
    activityTypes: ['DANCE', 'RECREATION'],
    activitiesForWhom: ['CHILDREN', 'TEENS'],
    shortDescription: 'Próba grupy zespołu tańca charakterystycznego.',
    customLinkToDetails: '/groups/marzenie_bis',
    occurrence: [
      {
        id: 'a54d7d17-ruu4-4881-fff5-ce5bbezzh848',
        day: 'TUESDAY',
        activityStart: new Date('2000-01-01T17:00:00.968Z'),
        activityEnd: new Date('2000-01-01T18:30:00.968Z'),
      },
      {
        id: '85je4c17-ruu4-4881-fff5-ce5bge2ah848',
        day: 'THURSDAY',
        activityStart: new Date('2000-01-01T16:45:00.968Z'),
        activityEnd: new Date('2000-01-01T18:15:00.968Z'),
      },
    ],
    place: 'DANCING_ROOM',
    isToBePublished: true,
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    expiresAt: new Date('2025-08-10T11:00:24.968Z'),
  },
  {
    id: '854w7r17-0uu4-4ee1-fff5-ce6bgendh841',
    name: 'Próba zespołu Marzenie Mini Mini.',
    activityTypes: ['DANCE', 'RECREATION'],
    activitiesForWhom: ['CHILDREN'],
    shortDescription:
      'Próba najmłodszej grupy zespołu tańca charakterystycznego.',
    customLinkToDetails: '/groups/marzenieminimini',
    occurrence: [
      {
        id: 'f54e7d17-ruu4-4881-fff5-ce5bgezzh848',
        day: 'TUESDAY',
        activityStart: new Date('2000-01-01T15:30:00.968Z'),
        activityEnd: new Date('2000-01-01T16:30:00.968Z'),
      },
      {
        id: '85je4c17-ruu4-4881-fff5-ce5bge2ah848',
        day: 'THURSDAY',
        activityStart: new Date('2000-01-01T15:30:00.968Z'),
        activityEnd: new Date('2000-01-01T16:30:00.968Z'),
      },
    ],
    place: 'DANCING_ROOM',
    isToBePublished: true,
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    expiresAt: new Date('2025-08-10T11:00:24.968Z'),
  },
  {
    id: '85ww7r17-0uu4-4ee1-fff5-c36bgendh841',
    name: 'Próba zespołu Hipnoteria Bis.',
    activityTypes: ['DANCE', 'RECREATION'],
    activitiesForWhom: ['TEENS'],
    shortDescription: 'Próba młodszej grupy zespołu tańca Street Dance.',
    customLinkToDetails: '/groups/hipnoteriabis',
    occurrence: [
      {
        id: 'f54e7d17-r3u4-4881-fff5-ce5bgegzh848',
        day: 'WEDNESDAY',
        activityStart: new Date('2000-01-01T18:00:00.968Z'),
        activityEnd: new Date('2000-01-01T19:30:00.968Z'),
      },
      {
        id: '85je4237-ruu4-4881-fff5-ce5bhy2ah848',
        day: 'FRIDAY',
        activityStart: new Date('2000-01-01T15:30:00.968Z'),
        activityEnd: new Date('2000-01-01T17:00:00.968Z'),
      },
    ],
    place: 'DANCING_ROOM',
    isToBePublished: true,
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    expiresAt: new Date('2025-08-10T11:00:24.968Z'),
  },
  {
    id: '81ww7r17-0uu4-4ee1-fff5-c36b6endh841',
    name: 'Próba zespołu Hipnoteria.',
    activityTypes: ['DANCE', 'RECREATION'],
    activitiesForWhom: ['TEENS'],
    shortDescription: 'Próba starszej grupy zespołu tańca Street Dance.',
    customLinkToDetails: '/groups/hipnoteria',
    occurrence: [
      {
        id: 'f54e7d17-z3u4-4881-fff5-ce52gegzh848',
        day: 'WEDNESDAY',
        activityStart: new Date('2000-01-01T19:30:00.968Z'),
        activityEnd: new Date('2000-01-01T21:00:00.968Z'),
      },
      {
        id: '85456237-ruu4-4881-ffr5-ce5bhy2ah848',
        day: 'FRIDAY',
        activityStart: new Date('2000-01-01T17:15:00.968Z'),
        activityEnd: new Date('2000-01-01T18:45:00.968Z'),
      },
    ],
    place: 'DANCING_ROOM',
    isToBePublished: true,
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    expiresAt: new Date('2025-08-10T11:00:24.968Z'),
  },
  {
    id: '83ww7r17-0uu4-4ee1-fff5-c36bvendh841',
    name: 'Body Groove.',
    activityTypes: ['DANCE', 'RECREATION'],
    activitiesForWhom: ['ADULTS', 'SENIORS', 'WOMEN'],
    shortDescription: 'Trening w duchu Body Groove dla dorosłych uczestników.',
    customLinkToDetails: '',
    occurrence: [
      {
        id: 'f54e7aa7-z3u4-4881-fff5-ce52gegz5988',
        day: 'THURSDAY',
        activityStart: new Date('2000-01-01T18:30:00.968Z'),
        activityEnd: new Date('2000-01-01T20:00:00.968Z'),
      },
    ],
    place: 'DANCING_ROOM',
    isToBePublished: true,
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    expiresAt: new Date('2025-08-10T11:00:24.968Z'),
  },
  {
    id: '843w7r17-0uu4-4jj1-fff5-c36b4endh841',
    name: 'Warsztaty kreatywne "Przestrzeń sztuki"',
    activityTypes: ['PLASTICITY'],
    activitiesForWhom: ['TEENS', 'ADULTS', 'SENIORS', 'WOMEN'],
    shortDescription: 'Kurs malarstwa i rysunku dla młodzieży i dorosłych.',
    customLinkToDetails: '',
    occurrence: [
      {
        id: 'f54wed17-z3u4-ht81-fff5-ce528egzh848',
        day: 'TUESDAY',
        activityStart: new Date('2000-01-01T17:00:00.968Z'),
        activityEnd: new Date('2000-01-01T20:00:00.968Z'),
      },
    ],
    place: 'ART_ROOM',
    isToBePublished: true,
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    expiresAt: new Date('2025-08-10T11:00:24.968Z'),
  },
  {
    id: '833w7r17-0uu4-4jj1-fff5-c3fb4endh8s1',
    name: 'Kreatywna plastyka dla dzieci.',
    activityTypes: ['PLASTICITY'],
    activitiesForWhom: ['CHILDREN'],
    shortDescription: 'coś tutaj będzie!!!!!!!!!!!',
    customLinkToDetails: '',
    occurrence: [
      {
        id: 'f54wed17-z454-ht81-fff5-cefr8egzh148',
        day: 'WEDNESDAY',
        activityStart: new Date('2000-01-01T16:00:00.968Z'),
        activityEnd: new Date('2000-01-01T17:30:00.968Z'),
      },
    ],
    place: 'ART_ROOM',
    isToBePublished: true,
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    expiresAt: new Date('2025-08-10T11:00:24.968Z'),
  },
  {
    id: '836727r17-tdu4-4jj1-fff5-c3fb4endh8s1',
    name: 'Kreatywna plastyka dla młodzieży.',
    activityTypes: ['PLASTICITY'],
    activitiesForWhom: ['TEENS'],
    shortDescription: 'coś tutaj będzie!!!!!!!!!!!',
    customLinkToDetails: '',
    occurrence: [
      {
        id: 'f54we877-z454-hdd1-fff5-cefr87gzh148',
        day: 'WEDNESDAY',
        activityStart: new Date('2000-01-01T17:45:00.968Z'),
        activityEnd: new Date('2000-01-01T19:45:00.968Z'),
      },
    ],
    place: 'ART_ROOM',
    isToBePublished: true,
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    expiresAt: new Date('2025-08-10T11:00:24.968Z'),
  },
  {
    id: '836723r17-4du4-4jj1-fff5-c3fb4endg8s1',
    name: 'Młody projektant wnętrz.',
    activityTypes: ['PLASTICITY'],
    activitiesForWhom: ['TEENS', 'ADULTS'],
    shortDescription: 'Krótki kurs projektowania wnętrz.',
    customLinkToDetails: '',
    occurrence: [
      {
        id: 'f88we877-z454-89d1-fff5-cefr87g22148',
        day: 'THURSDAY',
        activityStart: new Date('2000-01-01T18:00:00.968Z'),
        activityEnd: new Date('2000-01-01T20:00:00.968Z'),
      },
    ],
    place: 'ART_ROOM',
    isToBePublished: true,
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    expiresAt: new Date('2025-08-10T11:00:24.968Z'),
  },
];
