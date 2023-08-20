import { TSliderGroupsImages } from '@/types';
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
      alt: 'Grupa artystyczna Hipnoteria.',
    },
  ],
};
