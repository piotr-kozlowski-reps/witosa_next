import {
  CyclicalActivityTemporary,
  TEventTemporary,
  TSliderGroupsImages,
} from '@/types';

// export const mainSliderMockData: Slide[] = [
//   {
//     id: '2f4e7c17-0b04-4881-8456-ce6bf7fde841',
//     eventType: ['CONCERT'],
//     slideTitle: 'Pink Floyd - Dark side of the moon.',
//     slideAlt: 'Koncert zespołu Pink Floyd, z płytą: Dark side of the moon.',
//     eventDate: new Date('2023-09-13T19:30:00'),
//     authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
//     createdAt: new Date('2023-08-10T11:00:24.968Z'),
//     updatedAt: new Date('2023-08-10T11:00:24.968Z'),
//     slideUrl: `news-img-002.jpg`,
//     visibleFrom: new Date('2023-08-10T11:00:24.968Z'),
//     visibleUntil: new Date('2023-09-10T11:00:24.968Z'),
//   },
//   {
//     id: '2f422c17-0b04-4881-de56-ce6457fde84l',
//     eventType: ['CABARET', 'SPECTACLE'],
//     slideTitle: 'Kabaret Starszych Panów',
//     slideAlt: 'Kabaret Starszych Panów.',
//     eventDate: new Date('2023-09-03T20:00:00'),
//     authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
//     createdAt: new Date('2023-08-10T11:00:24.968Z'),
//     updatedAt: new Date('2023-08-10T11:00:24.968Z'),
//     slideUrl: `artcafe_007.jpg`,
//     visibleFrom: new Date('2023-08-10T11:00:24.968Z'),
//     visibleUntil: new Date('2023-09-20T11:00:24.968Z'),
//   },
//   {
//     id: 'as422c17-0b04-4881-de56-ce6457fde34r',
//     eventType: ['FESTIVAL'],
//     slideTitle: 'Festiwal moździeży',
//     slideAlt: 'Festiwal moździeży.',
//     eventDate: new Date('2023-09-09T15:15:00'),
//     authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
//     createdAt: new Date('2023-08-10T11:00:24.968Z'),
//     updatedAt: new Date('2023-08-10T11:00:24.968Z'),
//     slideUrl: `activities_image_004.jpg`,
//     visibleFrom: new Date('2023-08-10T11:00:24.968Z'),
//     visibleUntil: new Date('2023-09-20T11:00:24.968Z'),
//   },
// ];

export const allEventsMockData: TEventTemporary[] = [
  {
    id: 'de4e7c17-0b04-ff81-8456-ce6bf7fde45a',
    eventTypes: ['CONCERT'],
    eventForWhom: ['ADULTS', 'SENIORS', 'WOMEN'],
    title: 'Marcin Wyrostek Solo',
    places: ['CONCERT_HALL'],
    shortDescription:
      'Zapraszamy serdecznie, w ramach Festiwalu Otwarcia Art CK, na koncert genialnego akordeonisty Marcina Wyrostka. Założyciel i lider projektów: Tango Corazon, Coloriage, Music and Dance Show. Producent i wydawca własnych albumów, producent tras koncertowych oraz koncertów galowych (m.in. Filharmonia Narodowa, NOSPR). Koncertował na całym świecie, a tym razem wystąpi u nas.',
    eventStartDate: new Date('2023-09-03T19:00:00.968Z'),
    eventEndDate: null,
    createdAt: new Date('2023-08-26T15:20:24.968Z'),
    updatedAt: new Date('2023-08-26T15:20:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_wyrostek_003.jpg',
        alt: 'Zdjęcie Marcina Wyrostka z akordeonem.',
        additionInfoThatMustBeDisplayed: 'foto: Nicolas Dominic Talvola.',
      },
      {
        url: 'events_wyrostek_001.jpg',
        alt: 'Zdjęcie Marcina Wyrostka z akordeonem.',
        additionInfoThatMustBeDisplayed: 'foto: Konrad Wrona.',
      },
      {
        url: 'events_wyrostek_002.jpg',
        alt: 'Akordeonista Marcin Wyrostek grający na scenie.',
        additionInfoThatMustBeDisplayed: 'foto: Konrad Wrona.',
      },
    ],
    detailedDescription:
      '          <div>\r\n            <p>\r\n              <b>Marcin Wyrostek</b> - wirtuoz akordeonu, kompozytor i aranżer,\r\n              absolwent i obecnie wykładowca Akademii Muzycznej w Katowicach na\r\n              Wydziale Instrumentalnym oraz Wydziale Jazzu i Muzyki Rozrywkowej.\r\n            </p>\r\n            <p>\r\n              Zwycięzca polskiej edycji programu Mam Talent TVN. Zdobywca 7\r\n              Platynowych Płyt, nagroda Prezydenta RP 2010, Nagroda Ministra\r\n              Kultury 2004, Bestseller Empiku 2012, Statuetka Top Trendy 2011,\r\n              Promotor Polski 2017 - to tylko nieliczne sukcesy i tytuły jakie\r\n              Marcin Wyrostek zdobył na polskiej scenie muzycznej. Ponadto jest\r\n              laureatem i zwycięzcą wielu Międzynarodowych Konkursów\r\n              Akordeonowych: AAA Festival Detroit (USA), Coupe Mondiale\r\n              (Słowacja, Węgry), Reinach AG (Szwajcaria), Rzym (Włochy).\r\n            </p>\r\n            <p>\r\n              Podczas Festiwalu Otwarcia Art. CK, artysta wystąpi z recitalem\r\n              solowym opartym na muzyce baroku, romantyzmu (transkrypcje utworów\r\n              organowych, orkiestrowych, fortepianowych), muzyce współczesnej\r\n              oraz własnych kompozycjach, w których wyraźnie słychać inspiracje\r\n              muzyką ilustracyjną, popularną, filmową, argentyńską, hiszpańską,\r\n              bałkańską, francuską, polską i żydowską. Usłyszymy tu akordeon\r\n              zarówno w wersji akustycznej jak i elektronicznej.\r\n            </p>\r\n          </div>',

    //paying
    isPayed: false,
    kindOfEnterInfo:
      'Aby zdobyć bezpłatną wejściówkę, należy zadzwonić do sekretariatu Centrum Kultury (tel.  32 330 36 80) w godzinach 7.30-15.30.',
    ticketBuyingUrl: null,
    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: false,
    isToBeOnlyInNewsSection_NotSeenInEvents: false,
    newsSectionImageUrl: 'news-img-wyrostek-001.jpg',
    newsSectionImageAlt: 'Akordeonista stojący na oświetlonej scenie.',
    //slider
    isToBeInSlider: true,
    sliderImageUrl: 'events_wyrostek_001.jpg',
    sliderImageAlt: 'Zdjęcie Marcina Wyrostka z akordeonem.',
    visibleInSliderFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleInSLiderTo: new Date('2023-09-03T23:59:00.968Z'),
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-09-03T23:59:00.968Z'),
  },
  {
    id: 'de827c17-0b04-ff81-gg56-ce6bfr4gz45a',
    eventTypes: ['WORKSHOP', 'OTHERS'],
    eventForWhom: ['CHILDREN', 'TEENS'],
    title: 'Festiwal Otwarcia Art CK dla dzieci i młodzieży',
    places: ['CONCERT_HALL', 'ART_ROOM', 'DANCING_ROOM'],
    shortDescription:
      'Zapraszamy naszych MŁODYCH GOŚCI na uroczyste otwarcie Art CK! Przygotowaliśmy specjalnie dla WAS troszkę atrakcji i niespodzianek. Będziecie mieli okazję po raz pierwszy zwiedzić nową przestrzeń Centrum Kultury, przy okazji świetnie się bawiąc…',
    eventStartDate: new Date('2023-09-02T15:30:00.968Z'),
    eventEndDate: new Date('2023-09-02T19:30:00.968Z'),
    createdAt: new Date('2023-08-27T14:20:00.968Z'),
    updatedAt: new Date('2023-08-27T14:20:00.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_dladzieci_001.jpg',
        alt: 'Zdjęcie kolorowych postaci tworzących grupę o nazwie: Lufcik na korbkę.',
        additionInfoThatMustBeDisplayed: null,
      },
      {
        url: 'events_dladzieci_002.jpg',
        alt: 'Abstrakcyjny kształt uzyskany na pokazie magicznych świateł LED SHOW.',
        additionInfoThatMustBeDisplayed: null,
      },
      {
        url: 'events_dladzieci_003.jpg',
        alt: 'Plakat Dobranocka Filmowa dla dzieci.',
        additionInfoThatMustBeDisplayed: null,
      },
    ],
    detailedDescription:
      '<div>\r\n            <p>\r\n              Zapraszamy naszych <b>MŁODYCH GOŚCI</b> na uroczyste otwarcie\r\n              <b> Art CK!</b>\r\n            </p>\r\n            <p>\r\n              Spotykamy się o <b>15.30</b> przy\r\n              <b> Miejskiej Szkole Podstawowej nr 9</b> w Knurowie i cudownym\r\n              korowodem prowadzonym przez fantastycznych artystów z\r\n              <b> Teatru LUFCIK NA KORBKĘ</b> dotrzemy do nas, gdzie na\r\n              powitanie będzie czekała na Was pierwsza niespodzianka!\r\n            </p>\r\n            <p>\r\n              W dalszej kolejności na naszej scenie pojawi się artysta, który\r\n              zaczaruje nas pokazem magicznych świateł <b>LED SHOW</b>.\r\n            </p>\r\n            <p>\r\n              Po pokazie świateł będziecie mogli wziąć udział w grach\r\n              prowadzonych przez Teatr LUFCIK NA KORBKĘ, zabawach tanecznych,\r\n              które nasze cudowne instruktorki tańca przygotują je specjalnie\r\n              dla Was w sali tanecznej oraz zabawach plastycznych,\r\n              przygotowanych przez nasze instruktorki działań twórczych w\r\n              pracowni plastycznej.\r\n            </p>\r\n            <p>\r\n              Około godziny <b>19.00</b> zapraszamy na <b>dobranockę filmową</b>\r\n              , którą się tego dnia pożegnamy i będziemy czekać na Was z\r\n              niecierpliwością w kolejne dni na spotkaniach organizacyjnych do\r\n              zajęć tanecznych i na realizowanych już od 4 września zajęć\r\n              plastycznych!\r\n            </p>\r\n          </div>',
    //paying
    isPayed: false,
    kindOfEnterInfo:
      'Wstęp bezpłatny, aby wziąć udział w zajęciach tanecznych i plastycznych należy w dniu imprezy zapisać się i pobrać imienną wejściówkę.',
    ticketBuyingUrl: null,
    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: false,
    isToBeOnlyInNewsSection_NotSeenInEvents: false,
    newsSectionImageUrl: 'news-img-dladzieci-001.jpg',
    newsSectionImageAlt:
      'Zdjęcie kolorowych postaci tworzących grupę teatralną: Lufcik na korbkę.',
    //slider
    isToBeInSlider: true,
    sliderImageUrl: 'events_dladzieci_001.jpg',
    sliderImageAlt:
      'Zdjęcie kolorowych postaci tworzących grupę o nazwie: Lufcik na korbkę.',
    visibleInSliderFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleInSLiderTo: new Date('2023-09-02T23:59:00.968Z'),
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-09-02T23:59:00.968Z'),
  },
  {
    id: 'dre27c17-0aa4-ff81-g356-ce6bfr4gz54v',
    eventTypes: ['OTHERS'],
    eventForWhom: ['TEENS', 'ADULTS', 'SENIORS', 'WOMEN'],
    title: 'Narodowe Czytanie 2023 - „Nad Niemnem” Elizy Orzeszkowej',
    places: ['CONCERT_HALL'],
    shortDescription:
      'Zapraszamy na 12. edycję Narodowego Czytania, w tym roku bohaterką literacką będzie powieść Elizy Orzeszkowej  „NAD NIEMNEM”.',
    eventStartDate: new Date('2023-09-08T17:00:00.968Z'),
    eventEndDate: null,
    createdAt: new Date('2023-08-27T14:20:00.968Z'),
    updatedAt: new Date('2023-08-27T14:20:00.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_nc_001.jpg',
        alt: 'Baner akcji Narodowego czytania.',
        additionInfoThatMustBeDisplayed: null,
      },
      {
        url: 'events_nc_002.jpg',
        alt: 'Program Narodowego Czytania.',
        additionInfoThatMustBeDisplayed: null,
      },
    ],

    detailedDescription:
      '          <div>\r\n            <p>\r\n              Akcja Narodowego Czytania została zainicjowana w 2012 roku wspólną\r\n              lekturą Pana Tadeusza Adama Mickiewicza. W 2013 roku w całej\r\n              Polsce odbyło się czytanie dzieł Aleksandra Fredry, a w rok\r\n              później przeczytano Trylogię Henryka Sienkiewicza.\r\n            </p>\r\n            <p>\r\n              Nad Niemnem to najbardziej znana powieść Elizy Orzeszkowej.\r\n              Powstawała w latach 1886-1887, a w formie książka ukazała się w\r\n              1888 roku. Ze względu na barwne opisy, wyrazistych bohaterów i\r\n              odwołania historyczne dzieło porównywano do Mickiewiczowskiego\r\n              &quot;Pana Tadeusza&quot;. Powieścią zainteresowała się również X\r\n              Muza, pierwszą ekranizację książki ukończono w 1939 roku, ale\r\n              obraz zaginął w czasie II wojny światowej. Kolejny film nakręcono\r\n              w połowie lat 80. XX wieku. Nad Niemnem to jeden najważniejszych\r\n              utworów literatury polskiej podejmujący tematykę Powstania\r\n              Styczniowego, którego 160-lecie obchodzone jest właśnie w 2023\r\n              roku.\r\n            </p>\r\n            <p>\r\n              Centrum Kultury w Knurowie połączyło siły z Zespołem Szkół\r\n              Zawodowych nr 2 w Knurowie i wspólnie zapraszają do udziału w tym\r\n              literackim wydarzeniu.\r\n            </p>\r\n            <p>\r\n              W programie poza oczywistym czytaniem fragmentów powieści\r\n              &quot;Nad Niemnem&quot; Elizy Orzeszkowej odbędą się warsztaty\r\n              artystyczne dla dzieci, akcja „Wymień Książkę z Biblioteką”,\r\n              możliwość ostemplowania własnego egzemplarza „Nad Niemnem”\r\n              dedykowaną pieczątką Narodowego Czytania i oczywiście wśród nas\r\n              będzie również Moluś Książkow.\r\n            </p>\r\n            <p>\r\n              Każdy otrzyma tematyczny upominek w postaci pamiątkowej widokówki\r\n              z cytatem.\r\n            </p>\r\n            <p>\r\n              Ponadto uczestnikom spotkania będzie towarzyszył zapach kawy i\r\n              słodkości pochodzący z naszej Art Cafe!\r\n            </p>\r\n            <p>\r\n              <b>Zapraszamy serdecznie!</b>\r\n            </p>\r\n          </div>',
    //paying
    isPayed: false,
    kindOfEnterInfo: 'Wstęp wolny.',
    ticketBuyingUrl: null,
    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: false,
    isToBeOnlyInNewsSection_NotSeenInEvents: false,
    newsSectionImageUrl: 'news-img-nc-001.jpg',
    newsSectionImageAlt: 'Baner akcji Narodowego czytania.',
    //slider
    isToBeInSlider: true,
    sliderImageUrl: 'events_nc_001.jpg',
    sliderImageAlt: 'Baner akcji Narodowego czytania.',
    visibleInSliderFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleInSLiderTo: new Date('2023-09-08T23:59:00.968Z'),
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-09-08T23:59:00.968Z'),
  },
  {
    id: 'dwwe27417-0aa4-ff81-g351-ce6bfr4gz5f5',
    eventTypes: ['OTHERS'],
    eventForWhom: ['CHILDREN', 'TEENS'],
    title: 'Rozpoczęcie zajęć grup tanecznych',
    places: ['CONCERT_HALL'],
    shortDescription:
      'Zapraszamy wszystkich chętnych młodych tancerzy do naszych grup tanecznych: Marzenie Mini Mini, Marzenie Bis, Marzenie, Hipnoteria Bis, Hipnoteria. Przed rozpoczęciem zajęć organizujemy spotkania organizacyjne do każdej z grup, podczas których opowiemy jak, gdzie i kiedy prowadzimy nasze zajęcia, będziecie również mieli okazję poznać instruktorów, prowadzących poszczególne grupy.',
    eventStartDate: new Date('2023-09-04T18:00:00.968Z'),
    eventEndDate: null,
    createdAt: new Date('2023-08-27T14:20:00.968Z'),
    updatedAt: new Date('2023-08-27T14:20:00.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      // {
      //   url: 'events_nc_001.jpg',
      //   alt: 'Baner akcji Narodowego czytania.',
      //   additionInfoThatMustBeDisplayed: null,
      // },
      // {
      //   url: 'events_nc_002.jpg',
      //   alt: 'Program Narodowego Czytania.',
      //   additionInfoThatMustBeDisplayed: null,
      // },
    ],
    detailedDescription:
      '          <div>\r\n            <p>\r\n              Zapraszamy wszystkich chętnych młodych tancerzy do naszych grup\r\n              tanecznych: Marzenie Mini Mini, Marzenie Bis, Marzenie, Hipnoteria\r\n              Bis, Hipnoteria. Przed rozpoczęciem zajęć organizujemy spotkania\r\n              organizacyjne do każdej z grup, podczas których opowiemy jak,\r\n              gdzie i kiedy prowadzimy nasze zajęcia, będziecie również mieli\r\n              okazję poznać instruktorów, prowadzących poszczególne grupy.\r\n            </p>\r\n            <p>\r\n              Poniżej harmonogram spotkań organizacyjnych dla poszczególnych\r\n              grup:\r\n            </p>\r\n            <ul>\r\n              <li>\r\n                <b>04.09.2023 r., godz. 18:00</b> - Spotkanie organizacyjne dla\r\n                grupy pokazowej Marzenie\r\n              </li>\r\n              <li>\r\n                <b>06.09.2023 r., godz. 17:00</b> - Spotkanie organizacyjne dla\r\n                zespołów Hipnoteria i Hipnoteria Bis\r\n              </li>\r\n              <li>\r\n                <b>08.09.2023 r., godz. 16.00</b> - Spotkanie organizacyjne dla\r\n                dzieci początkujących w wieku 6-7 lat\r\n              </li>\r\n              <li>\r\n                <b>08.09.2023 r., godz. 17.30</b> - Spotkanie organizacyjne dla\r\n                grupy utaneczniającej z roku 2022/2023 oraz zespołu Marzenie\r\n                Mini Mini\r\n              </li>\r\n            </ul>\r\n          </div>',
    //paying
    isPayed: false,
    kindOfEnterInfo: 'Wstęp wolny.',
    ticketBuyingUrl: null,

    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: true,
    isToBeOnlyInNewsSection_NotSeenInEvents: true,
    newsSectionImageUrl: 'news-img-grupytaneczne-001.jpg',
    newsSectionImageAlt: 'Baner akcji Narodowego czytania.',
    //slider
    isToBeInSlider: false,
    sliderImageUrl: null,
    sliderImageAlt: null,
    visibleInSliderFrom: null,
    visibleInSLiderTo: null,
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-09-08T23:59:00.968Z'),
  },
];

export const sliderGroupsHipnoteriaBisImages: TSliderGroupsImages = {
  marzenieMiniMini: [
    {
      url: 'groups_marzenie_mini_mini_001.jpg',
      alt: 'Tancerki w kolorowych kostiumach w tańcu arabskim.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'groups_marzenie_mini_mini_002.jpg',
      alt: '7 letnie dziewczynki na plenerowej scenie, w różowych bodach, występują z okazji Dnia Tańca.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'groups_marzenie_mini_mini_003.jpg',
      alt: 'Dziewczynki z grupy artystyczna Marzenie Mini Mini, na plenerowej scenie w kółeczku.',
      additionInfoThatMustBeDisplayed: null,
    },
  ],
  marzenieBis: [
    {
      url: 'groups_marzenie_bis_001.jpg',
      alt: 'Średnio zaawansowane tancerki w choreografii z elementami ludowymi.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'groups_marzenie_bis_002.jpg',
      alt: 'Tancerki na scenie, w ludowych spódniczkach i białych bluzkach, ustawione w figurach.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'groups_marzenie_bis_003.jpg',
      alt: 'Tańczące dziewczynki w stylu nowoczesnym na Prentacjach Artystycznych.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'groups_marzenie_bis_004.jpg',
      alt: 'Młode tancerki na scenie w srebrnych kostiumach, przedstawiają inscenizację taneczną pt. "Początek".',
      additionInfoThatMustBeDisplayed: null,
    },
  ],
  marzenie: [
    {
      url: 'groups_marzenie_001.jpg',
      alt: 'Najstarsze dziewczyny zespołu "Marzenie" pozują do zdjęcia w ustawieniu litery V.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'groups_marzenie_002.jpg',
      alt: 'Dziewczęta ustawione w klasycznych figurach na scenie Domu Kultury.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'groups_marzenie_003.jpg',
      alt: 'Tańcząca młodzież z rekwizytem, materiałem imitującym ocean.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'groups_marzenie_004.jpg',
      alt: 'Tańcząca młodzież z rekwizytem, materiałem imitującym ocean.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'groups_marzenie_005.jpg',
      alt: 'Tancerki w czasie występu, ukazujące swoje umiejętności techniczne.',
      additionInfoThatMustBeDisplayed: null,
    },
  ],
  hipnoteriaBis: [
    {
      url: 'groups_hipnoteriabis_001.jpg',
      alt: 'Grupa radosnych dziewcząt i chłopców na scenie ze swoją trenerką.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'groups_hipnoteriabis_002.jpg',
      alt: 'Grupa dziewcząt i chłopców w katanach jeansowych i koszulach w kratę, pozuje do zdjęcia.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'groups_hipnoteriabis_003.jpg',
      alt: 'Dziewczęta w pomarańczowych bluzach i luźnych spodniach, przemieszczają się w różnych kierunkach na scenie.',
      additionInfoThatMustBeDisplayed: null,
    },
    {
      url: 'groups_hipnoteriabis_004.jpg',
      alt: 'Tańczące dziewczynki z okazji Dnia Dziecka, na scenie plenerowej.',
      additionInfoThatMustBeDisplayed: null,
    },
  ],
  hipnoteria: [
    {
      url: 'groups_hipnoteria_001.jpg',
      alt: 'Grupa dziewcząt i chłopców w katanach jeansowych i koszulach w kratę, pozuje do zdjęcia.',
      additionInfoThatMustBeDisplayed: null,
    },
  ],
};

export const allCyclicalActivitiesMockData: CyclicalActivityTemporary[] = [
  {
    id: '843w7w17-0uu4-4jr1-fff5-c36b4endh841',
    name: 'PRINTMAKING - zajęcia plastyczne dla dorosłych.',
    activityTypes: ['PLASTICITY'],
    activitiesForWhom: ['ADULTS', 'SENIORS', 'WOMEN'],
    shortDescription:
      'Warsztaty ręcznego tworzenia matryc w różnych materiałach i w różnych technikach (m.in. przy pomocy prasy drukarskiej).',
    customLinkToDetails: '',
    extendedInfo: {
      images: [
        {
          url: 'activities_image_004.jpg',
          alt: 'Prezentowana wystawa miała formę wizualizacji multimedialnej opartej na filme VR 360 i odtwarzanej za pomocą przeznaczonych do tego celu okularów i słuchawek.',
          additionInfoThatMustBeDisplayed: null,
        },
        {
          url: 'activities_image_005.jpg',
          alt: 'Cykl dyplomowy “Subtelne Formy”, który przedstawiał ciało, jako abstrakcyjną wyłaniającą się z czerni formę.',
          additionInfoThatMustBeDisplayed: null,
        },
        {
          url: 'activities_image_006.jpg',
          alt: 'Cykl “Introspekcja” buduje obraz człowieka składającego się nie tylko z fizycznego wyglądu ale także z własnej emocjonalności.',
          additionInfoThatMustBeDisplayed: null,
        },
      ],
      description:
        '<p>\r\n            Prowadząca: <b>AGATA NIŹNIKIEWICZ</b>\r\n          </p>\r\n          <p>\r\n            Zajęcia, na których absolutnie odpoczniesz od elektroniki i na\r\n            chwilę zwolnisz, zatracając się w pracy manualnej.\r\n          </p>\r\n          <p>\r\n            Nie jest to czas wyłącznie dla osób uzdolnionych plastycznie,\r\n            ponieważ dla uczestników warsztatów przygotowane są szablony i\r\n            wzory.\r\n          </p>\r\n          <p>\r\n            Warsztaty polegają na ręcznym tworzeniu matryc w różnych materiałach\r\n            w zależności od techniki. Wyryte matryce pokrywamy farbą drukarską i\r\n            przy użyciu prasy drukarskiej przenosimy rysunek z matrycy na\r\n            papier, tworząc grafikę.\r\n          </p>\r\n          <p>\r\n            Zajęcia prowadzone w miłej atmosferze sprzyjają odprężeniu i\r\n            twórczym działaniom oraz pozwalają na chwilę relaksu, Prace\r\n            uczestników systematycznie będą prezentowane w formie wystaw.\r\n          </p>',
    },
    occurrence: [
      {
        id: '854e7c17-0uu4-4881-fff5-ce6bgezzh848',
        day: 'MONDAY',
        activityStart: new Date('2000-01-01T18:00:00.968Z'),
        activityEnd: new Date('2000-01-01T20:00:00.968Z'),
      },
    ],
    places: ['ART_ROOM'],
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
    places: ['DANCING_ROOM'],
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
        activityStart: new Date('2000-01-01T16:45:00.968Z'),
        activityEnd: new Date('2000-01-01T18:15:00.968Z'),
      },
      {
        id: '85je4c17-ruu4-4881-fff5-ce5bge2ah848',
        day: 'THURSDAY',
        activityStart: new Date('2000-01-01T16:45:00.968Z'),
        activityEnd: new Date('2000-01-01T18:15:00.968Z'),
      },
    ],
    places: ['DANCING_ROOM'],
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
    places: ['DANCING_ROOM'],
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
    places: ['DANCING_ROOM'],
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
    places: ['DANCING_ROOM'],
    isToBePublished: true,
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    expiresAt: new Date('2025-08-10T11:00:24.968Z'),
  },
  {
    id: '83aw7r17-0uu4-41e1-fff5-c36bvendh878',
    name: 'Body Groove',
    activityTypes: ['DANCE', 'RECREATION'],
    activitiesForWhom: ['ADULTS', 'SENIORS', 'WOMEN'],
    shortDescription: 'Trening w duchu Body Groove dla dorosłych uczestników.',
    customLinkToDetails: '',
    extendedInfo: {
      images: [
        {
          url: 'activities_image_016.jpg',
          alt: 'Kolorowe postacie kobiet, wykonujących ruch taneczny.',
          additionInfoThatMustBeDisplayed: null,
        },
      ],
      description:
        '<p>\r\n            Prowadząca: <b>JOANNA KUSY-SZPOTAŃSKA</b>\r\n          </p>\r\n\r\n          <p>\r\n            Body Groove to super zabawa, która jest przeznaczona dla każdego\r\n            ciała! Poświęcona zdrowiu i dobremu samopoczuciu. Na treningach\r\n            wykonujesz proste ruchy taneczne i czerpiesz z tego wszystkie\r\n            korzyści dla siebie !\r\n          </p>\r\n          <p>\r\n            Do tego mieszanka świetnej muzyki to idealny przepis na dobry\r\n            dance...\r\n          </p>\r\n          <p>\r\n            Taniec poprawi twoją elastyczność i siłę, poprawi skupienie i da Ci\r\n            lepszy sen i nastrój!!!\r\n          </p>\r\n\r\n          <p>\r\n            Każde zajęcia poprzedzone będą gimnastyką ogólnorozwojową zwaną też\r\n            ogólnokondycyjną. To propozycja dla osób w każdym wieku!\r\n          </p>\r\n\r\n          <p>\r\n            Ćwiczenia wzmocnią twój organizm, poprawią koordynację i z pewnością\r\n            pozytywnie wpłyną na samopoczucie. To dobry sposób o zadbanie o\r\n            swoje ciało :)\r\n          </p>\r\n          <p>\r\n            Będzie to miła forma spędzania czasu. Zadbaj o siebie razem z nami,\r\n            poczuj satysfakcję i więcej PEWNOŚCI !!!\r\n          </p>\r\n          <p>\r\n            Zobaczcie jak w duchu Body Groove, bawią się inni:\r\n            <a\r\n              href="https://fb.watch/mAKn3WXt0f/"\r\n              target="_blank"\r\n              rel="noopener noreferrer"\r\n            >\r\n              https://fb.watch/mAKn3WXt0f/\r\n            </a>\r\n          </p>',
    },
    occurrence: [
      {
        id: 'f54e7aa7-z3u4-4881-fff5-ce52gegz5988',
        day: 'THURSDAY',
        activityStart: new Date('2000-01-01T18:30:00.968Z'),
        activityEnd: new Date('2000-01-01T20:00:00.968Z'),
      },
    ],
    places: ['DANCING_ROOM'],
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
    extendedInfo: {
      images: [
        {
          url: 'activities_image_001.jpg',
          alt: 'Malarstwo: Dreamscape. Obraz akrylowy na płótnie. Praca autorstwa Sylwii Lipiny.',
          additionInfoThatMustBeDisplayed: null,
        },
        {
          url: 'activities_image_002.jpg',
          alt: 'Malarstwo: Submerged no.1. Obraz olejny na płótnie. Praca autorstwa Sylwii Lipiny.',
          additionInfoThatMustBeDisplayed: null,
        },
        {
          url: 'activities_image_003.jpg',
          alt: 'Grafika: Orbit - malarstwo poddane obróbce graficznej. Praca autorstwa Sylwii Lipiny.',
          additionInfoThatMustBeDisplayed: null,
        },
      ],
      description:
        '          <p>\r\n            <b>Warsztaty kreatywne „PRZESTRZEŃ SZTUKI” - malarstwo i rysunek</b>\r\n          </p>\r\n          <p>\r\n            Prowadząca: <b>SYLWIA LIPINA</b>\r\n          </p>\r\n          <p>\r\n            Artystka sztuk pięknych, projektantka graficzna, historyczka sztuki.\r\n            Jest abslowentką BA (HONS) Fine Art - University of the Arts London,\r\n            Chelsea College of Art and Design, HNC Diploma in Art and Design -\r\n            Southampton City College oraz Studia Podyplomowe z Historii Sztuki -\r\n            Uniwersytet Śląski w Katowicach.\r\n          </p>\r\n          <p>\r\n            Spotkania oscylujące wokół malarstwa akwarelowego, akrylowego oraz\r\n            rysunku. Zapoznanie z historią sztuki (interpretacja dzieła,\r\n            estetyka dzieła, ikonografia, ikonologia), rozumienia koła kolorów,\r\n            podstawowe zasady perspektywy i kompozycji.\r\n          </p>\r\n          <p>\r\n            Celem warsztatów jest włączenie w kreatywne działania społeczność\r\n            dorosłych i seniorów, oraz dzieci i młodzieży w wieku  13+.\r\n            Działania zorientowane są  wokół hasła „kreatywność przez całe\r\n            życie” i prowokują do rozwoju umiejętności praktycznych,\r\n            interpersonalnych, rozwój umiejętności analitycznych, krytycznego\r\n            myślenia, dyskusji prowadzących do wzajemnego inspirowania  i\r\n            motywowania, terapia sztuką.\r\n          </p>\r\n          <p>Jakie kompetencje zdobędziesz podczas warsztatów:</p>\r\n          <ul>\r\n            <li>\r\n              Zrozumienie wartości twórczego wyrażania i komunikowania idei\r\n              ,znaczeń i emocji.\r\n            </li>\r\n            <li>\r\n              Podnoszenie świadomości kulturowej i chęci uczestnictwa w\r\n              doświadczeniach kulturalnych.\r\n            </li>\r\n            <li>\r\n              Umiejętności praktyczne, praca z materiałem, metodyczna praca,\r\n              proces twórczy.\r\n            </li>\r\n            <li>Umiejętność interpretacji dzieła sztuki.</li>\r\n            <li>\r\n              Wzrost umiejętności interpersonalnych, komunikacji werbalnej i\r\n              niewerbalnej.\r\n            </li>\r\n            <li>Wykorzystanie sztuki jako terapii.</li>\r\n          </ul>',
    },
    occurrence: [
      {
        id: 'f54wed17-z3u4-ht81-fff5-ce528egzh848',
        day: 'TUESDAY',
        activityStart: new Date('2000-01-01T17:00:00.968Z'),
        activityEnd: new Date('2000-01-01T20:00:00.968Z'),
      },
    ],
    places: ['ART_ROOM'],
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
    shortDescription:
      'Kreatywne zajęcia plastyczne dla dzieci w wieku 6 - 10 lat',
    customLinkToDetails: '',
    extendedInfo: {
      images: [
        {
          url: 'activities_image_007.jpg',
          alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
          additionInfoThatMustBeDisplayed: null,
        },
        {
          url: 'activities_image_008.jpg',
          alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
          additionInfoThatMustBeDisplayed: null,
        },
        {
          url: 'activities_image_009.jpg',
          alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
          additionInfoThatMustBeDisplayed: null,
        },
        {
          url: 'activities_image_010.jpg',
          alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
          additionInfoThatMustBeDisplayed: null,
        },
        {
          url: 'activities_image_011.jpg',
          alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
          additionInfoThatMustBeDisplayed: null,
        },
      ],
      description:
        "          <p>\r\n            Prowadząca: <b>AGATA NIŹNIKIEWICZ</b>\r\n          </p>\r\n          <p>\r\n            Kreatywne zajęcia plastyczne to warsztaty mające na celu\r\n            wszechstronne rozwinięcie zdolności manualnych dzieci oraz\r\n            zainteresowanie ich sztuką i kulturą. Podczas warsztatów uczestnicy\r\n            poznają różne techniki plastyczne, uczą się łączyć je ze sobą oraz\r\n            twórczo wykorzystywać.\r\n          </p>\r\n          <p>Zajęcia także ćwiczą skupienie i cierpliwość podczas pracy.</p>\r\n          <p>\r\n            Przyjazna atmosfera i małe grupy sprzyjają integracji wśród\r\n            uczestników, pozwalają poczuć się swobodnie na zajęciach i tym samym\r\n            odkryć swoje talenty!\r\n          </p>\r\n          <br />\r\n          <p>\r\n            <b>Agata Niźnikiewicz</b> - artystka, graficzka, fotografka i\r\n            pedagog.\r\n          </p>\r\n          <p>\r\n            Absolwentka Akademii Sztuk Pięknych w Katowicach (kier. grafika\r\n            warsztatowa), Akademii Sztuk Pięknych we Wrocławiu (kier. fotografia\r\n            i multimedia), Instytutu Studiów Podyplomowych Wyższej Szkoły Nauk\r\n            Pedagogicznych (studia podyplomowe z przygotowania pedagogicznego).\r\n          </p>\r\n          <p>\r\n            Jest autorką wielu projektów artystycznych, prezentowanych na\r\n            licznych wystawach:\r\n          </p>\r\n          <ul>\r\n            <li>\r\n              WYSTAWY INDYWIDUALNE: ● Connect, Teoria w Katowicach. ● Subtelne\r\n              Formy, Galeria Sztukateria w Knurowie ● Subtelne Formy, Galeria\r\n              Tłustym Drukiem w Łodzi\r\n            </li>\r\n            <li>\r\n              WYSTAWY ZBIOROWE ● Cyberfoto, Regionalny Ośrodek Kultury w\r\n              Częstochowie ● Relations/Young Wave, Galeria Foto-Gen we Wrocławiu\r\n              ● Human / Człowiek, Sztukateria w Knurowie ● Wystaw się w CSW\r\n              2018, Centrum Sztuki Współczesnej w Toruniu ● Grafika Roku, Rondo\r\n              Sztuki w Katowicach ● Młoda Sztuka w Starym Mieście, New Era Art w\r\n              Krakowie ● Prace dyplomowe, Galerii Sztuki Współczesnej BWA w\r\n              Katowicach ● Wystaw się w CSW 2017, Centrum Sztuki Współczesnej w\r\n              Toruniu\r\n            </li>\r\n            <li>\r\n              WYSTAWY MIĘDZYNARODOWE ● Unobvious, Suwon Photo Korea Południowa.\r\n              ● 16. Międzynarodowe Triennale Grafiki Małe Formy, Miejska Galeria\r\n              Sztuki w Łodzi ● Platform Project, Fronteer Athens School of Fine\r\n              Arts{' '}\r\n            </li>\r\n            <li>\r\n              NAGRODY ● Honorowy Medal 16. Międzynarodowych Triennale Małe Formy\r\n              Grafiki, Polska-Łódź\r\n            </li>\r\n          </ul>",
    },
    occurrence: [
      {
        id: 'f54wed17-z454-ht81-fff5-cefr8egzh148',
        day: 'WEDNESDAY',
        activityStart: new Date('2000-01-01T16:00:00.968Z'),
        activityEnd: new Date('2000-01-01T17:30:00.968Z'),
      },
    ],
    places: ['ART_ROOM'],
    isToBePublished: true,
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    expiresAt: new Date('2025-08-10T11:00:24.968Z'),
  },
  {
    id: '836727r17-tdu4-4jj1-fff5-c3fb4endh8s1',
    name: 'Grafika warsztatowa dla młodzieży.',
    activityTypes: ['PLASTICITY'],
    activitiesForWhom: ['TEENS'],
    shortDescription:
      'Warsztaty z tradycyjnych technik drukarskich w nowoczesnym wydaniu.',
    customLinkToDetails: '',
    extendedInfo: {
      images: [
        {
          url: 'activities_image_012.jpg',
          alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
          additionInfoThatMustBeDisplayed: null,
        },
        {
          url: 'activities_image_013.jpg',
          alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
          additionInfoThatMustBeDisplayed: null,
        },
        {
          url: 'activities_image_014.jpg',
          alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
          additionInfoThatMustBeDisplayed: null,
        },
        {
          url: 'activities_image_015.jpg',
          alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
          additionInfoThatMustBeDisplayed: null,
        },
      ],
      description:
        " <p>\r\n            Prowadząca: <b>AGATA NIŹNIKIEWICZ</b>\r\n          </p>\r\n          <p>\r\n            Zapraszamy na warsztaty z tradycyjnych technik drukarskich w\r\n            nowoczesnym wydaniu.\r\n          </p>\r\n          <p>\r\n            Podczas zajęć uczestnicy poznają linoryt, technikę suchej igły czy\r\n            mezzotintę, a następnie nauczą się wykorzystywać ich potencjał\r\n            wizualny do tworzenia wyjątkowych grafik.\r\n          </p>\r\n          <p>\r\n            Uczestnicy własnoręcznie wykonują matrycę, pokrywają ją farbą, a za\r\n            pomocą prasy drukarskiej przenoszą wizerunek z matrycy na papier.\r\n            Gotowe prace planujemy systematycznie prezentować w formie wystaw\r\n            stacjonarnych i instalacji multimedialnych. Zajęcia obejmują także\r\n            podstawy rysunku i kompozycji, aby umożliwić uczestnikom tworzenie\r\n            własnych świadomych i przemyślanych projektów.\r\n          </p>\r\n\r\n          <p>\r\n            <b>Agata Niźnikiewicz</b> - artystka, graficzka, fotografka i\r\n            pedagog.\r\n          </p>\r\n          <p>\r\n            Absolwentka Akademii Sztuk Pięknych w Katowicach (kier. grafika\r\n            warsztatowa), Akademii Sztuk Pięknych we Wrocławiu (kier. fotografia\r\n            i multimedia), Instytutu Studiów Podyplomowych Wyższej Szkoły Nauk\r\n            Pedagogicznych (studia podyplomowe z przygotowania pedagogicznego).\r\n          </p>\r\n\r\n          <p>\r\n            Jest autorką wielu projektów artystycznych, prezentowanych na\r\n            licznych wystawach:\r\n          </p>\r\n          <ul>\r\n            <li>\r\n              WYSTAWY INDYWIDUALNE: ● Connect, Teoria w Katowicach. ● Subtelne\r\n              Formy, Galeria Sztukateria w Knurowie ● Subtelne Formy, Galeria\r\n              Tłustym Drukiem w Łodzi\r\n            </li>\r\n            <li>\r\n              WYSTAWY ZBIOROWE ● Cyberfoto, Regionalny Ośrodek Kultury w\r\n              Częstochowie ● Relations/Young Wave, Galeria Foto-Gen we Wrocławiu\r\n              ● Human / Człowiek, Sztukateria w Knurowie ● Wystaw się w CSW\r\n              2018, Centrum Sztuki Współczesnej w Toruniu ● Grafika Roku, Rondo\r\n              Sztuki w Katowicach ● Młoda Sztuka w Starym Mieście, New Era Art w\r\n              Krakowie ● Prace dyplomowe, Galerii Sztuki Współczesnej BWA w\r\n              Katowicach ● Wystaw się w CSW 2017, Centrum Sztuki Współczesnej w\r\n              Toruniu\r\n            </li>\r\n            <li>\r\n              WYSTAWY MIĘDZYNARODOWE ● Unobvious, Suwon Photo Korea Południowa.\r\n              ● 16. Międzynarodowe Triennale Grafiki Małe Formy, Miejska Galeria\r\n              Sztuki w Łodzi ● Platform Project, Fronteer Athens School of Fine\r\n              Arts{' '}\r\n            </li>\r\n            <li>\r\n              NAGRODY ● Honorowy Medal 16. Międzynarodowych Triennale Małe Formy\r\n              Grafiki, Polska-Łódź\r\n            </li>\r\n          </ul>",
    },
    occurrence: [
      {
        id: 'f54we877-z454-hdd1-fff5-cefr87gzh148',
        day: 'WEDNESDAY',
        activityStart: new Date('2000-01-01T17:45:00.968Z'),
        activityEnd: new Date('2000-01-01T19:45:00.968Z'),
      },
    ],
    places: ['ART_ROOM'],
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
    shortDescription:
      'Młody projektant wnętrz - rozwijaj swoją kreatywność, wyobraźnię, poznaj modelowanie 3D i stwórz swój pierwszy projekt wnętrza!',
    customLinkToDetails: '',
    extendedInfo: {
      images: [
        {
          url: 'artcafe_006.jpg',
          alt: 'Zdjęcie wnętrza Art Cafe.',
          additionInfoThatMustBeDisplayed: null,
        },
        {
          url: 'artcafe_004.jpg',
          alt: 'Zbliżenie huśtawki w Art Cafe.',
          additionInfoThatMustBeDisplayed: null,
        },
        {
          url: 'artcafe_007.jpg',
          alt: 'Zdjęcie wnętrza Art Cafe.',
          additionInfoThatMustBeDisplayed: null,
        },
      ],
      description:
        '<p>\r\n            Prowadząca: <b>AGNIESZKA BALA</b>\r\n          </p>\r\n          <p>\r\n            Młody projektant wnętrz - rozwijaj swoją kreatywność, wyobraźnię,\r\n            poznaj modelowanie 3D i stwórz swój pierwszy projekt wnętrza!\r\n          </p>\r\n          <p>Nasze zajęcia obejmują:</p>\r\n          <ul>\r\n            <li>\r\n              wstęp - czym jest projektowanie, czym jest design, krótka historia\r\n              sztuki\r\n            </li>\r\n            <li>proces projektowania</li>\r\n            <li>style w aranżacji wnętrz</li>\r\n            <li>wpływ światła na wnętrze</li>\r\n            <li>nauka obsługi programu do projektowania wnętrz</li>\r\n            <li>wizualizacje</li>\r\n          </ul>\r\n          <p>\r\n            Zajęcia w formie prezentacji, pracy w grupie, pracy indywidualnej.\r\n          </p>\r\n          <p>\r\n            Praca na makiecie, praca z &quot;kartką i ołówkiem&quot; szkice,\r\n            praca z mood boardem (tablica inspiracji) praca w programach (trzeba\r\n            mieć swój laptop).\r\n          </p>',
    },
    occurrence: [
      {
        id: 'f88we877-z454-89d1-fff5-cefr87g22148',
        day: 'THURSDAY',
        activityStart: new Date('2000-01-01T18:00:00.968Z'),
        activityEnd: new Date('2000-01-01T20:00:00.968Z'),
      },
    ],
    places: ['ART_ROOM'],
    isToBePublished: true,
    createdAt: new Date('2023-08-10T11:00:24.968Z'),
    updatedAt: new Date('2023-08-10T11:00:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    expiresAt: new Date('2025-08-10T11:00:24.968Z'),
  },
];
