import {
  TEventTemporary,
  TNewsletterTemporary,
  TSliderGroupsImages,
} from '@/types';

export const newsletterMockData: TNewsletterTemporary[] = [
  {
    email: 'test@test.pl',
    createdAt: new Date('2023-08-27T14:20:00.968Z'),
    updatedAt: new Date('2023-08-27T14:20:00.968Z'),
  },
  {
    email: 'test2@test2.pl',
    createdAt: new Date('2023-09-03T14:20:00.968Z'),
    updatedAt: new Date('2023-09-03T14:20:00.968Z'),
  },
  {
    email: 'test3@test3.pl',
    createdAt: new Date('2023-09-05T14:20:00.968Z'),
    updatedAt: new Date('2023-09-05T14:20:00.968Z'),
  },
  {
    email: 'cokolwie@test4.pl',
    createdAt: new Date('2023-09-05T14:21:00.968Z'),
    updatedAt: new Date('2023-09-05T14:21:00.968Z'),
  },
  {
    email: 'test55@test.pl',
    createdAt: new Date('2023-09-05T14:25:00.968Z'),
    updatedAt: new Date('2023-09-05T14:25:00.968Z'),
  },
  {
    email: 'test6@test.pl',
    createdAt: new Date('2023-09-06T14:20:00.968Z'),
    updatedAt: new Date('2023-09-06T14:20:00.968Z'),
  },
  {
    email: 'test7@test.pl',
    createdAt: new Date('2023-09-27T14:20:00.968Z'),
    updatedAt: new Date('2023-09-27T14:20:00.968Z'),
  },
];

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
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: false,
    kindOfEnterInfo:
      'Aby zdobyć bezpłatną wejściówkę, należy zadzwonić do sekretariatu Centrum Kultury (tel.  32 330 36 80) w godzinach 7.30-15.30.',
    ticketBuyingId: null,
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
    visibleInSliderTo: new Date('2023-09-03T23:59:00.968Z'),
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
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: false,
    kindOfEnterInfo:
      'Wstęp bezpłatny, aby wziąć udział w zajęciach tanecznych i plastycznych należy w dniu imprezy zapisać się i pobrać imienną wejściówkę.',
    ticketBuyingId: null,
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
    visibleInSliderTo: new Date('2023-09-02T23:59:00.968Z'),
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
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: false,
    kindOfEnterInfo: 'Wstęp wolny.',
    ticketBuyingId: null,
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
    visibleInSliderTo: new Date('2023-09-08T23:59:00.968Z'),
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
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: false,
    kindOfEnterInfo: 'Wstęp wolny.',
    ticketBuyingId: null,

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
    visibleInSliderTo: null,
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-09-08T23:59:00.968Z'),
  },
  {
    id: 'd44e7r47-0b04-ff81-8456-ce6bf7fd87yq',
    eventTypes: ['CONCERT'],
    eventForWhom: ['ADULTS', 'SENIORS', 'WOMEN', 'TEENS'],
    title: 'Duo Flamenco',
    places: ['CONCERT_HALL'],
    shortDescription:
      'Ekspresyjny taniec i wirtuozeria gitary flamenco w wykonaniu najlepszych artystów tego gatunku w Polsce - Anny Mendak oraz Michała Czachowskiego.',
    eventStartDate: new Date('2023-09-09T19:00:00.968Z'),
    eventEndDate: null,
    createdAt: new Date('2023-08-26T15:20:24.968Z'),
    updatedAt: new Date('2023-08-26T15:20:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_duoflamenco_001.jpg',
        alt: 'Tańcząca tancerka flamenco oraz dwóch gitarzystów.',
        additionInfoThatMustBeDisplayed: null,
      },
      {
        url: 'events_duoflamenco_002.jpg',
        alt: 'Tańcząca tancerka flamenco oraz dwóch gitarzystów.',
        additionInfoThatMustBeDisplayed: null,
      },
    ],
    detailedDescription:
      '        <div>\r\n            <p>\r\n              Zapraszamy serdecznie na pełen energii, pasji i niesamowitości\r\n              koncert Duo Flamenco w wykonaniu Michała Czachowskiego i Anny\r\n              Mendak.\r\n            </p>\r\n            <p>\r\n              Flamenco jest najpopularniejszą muzyką etniczną na świecie,\r\n              powstała w Andaluzji, regionie południowej Hiszpanii, gdzie\r\n              przewijały się kultury różnych nacji. W wyniku wzajemnych wpływów,\r\n              na początku XIX wieku powstała niezwykle ekspresyjna muzyka, którą\r\n              znamy pod nazwą Flamenco.\r\n            </p>\r\n            <p>\r\n              <b>Michał Czachowski</b> - gitarzysta flamenco, kompozytor,\r\n              producent muzyczny. Swe umiejętności muzyczne rozwijał u boku\r\n              takich gitarzystów flamenco jak: Rafael Cortés, Gerardo Núñez i\r\n              Salva del Real. Dwukrotnie został uznany za najlepszego gitarzystę\r\n              Flamenco w Polsce. Założyciel zespołu muzyki flamenco Viva\r\n              Flamenco oraz międzynarodowego projektu Indialucia, za który był\r\n              nominowany do Fryderyków 2006.\r\n            </p>\r\n            <p>\r\n              <b>Anna Mendak</b> - czołowa tancerka Flamenco w Polsce,\r\n              choreograf, pedagog, tancerka brzucha, psycholog. Przez ponad 10\r\n              lat była czołową tancerką polskich grup flamenco. Wraz z zespołami\r\n              występowała na wielu festiwalach tanecznych, gitarowych i\r\n              folkowych. W 2004 roku zajęła I miejsce w konkursie na najlepszą\r\n              polską tancerkę flamenco.\r\n            </p>\r\n          </div>',
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: true,
    kindOfEnterInfo:
      'Bilet w cenie 50 pln. Bilety można rezerwować dzwoniąc pod numer 32 332 63 81, codziennie od 15.00 do 20.00.',
    ticketBuyingId: null,
    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: false,
    isToBeOnlyInNewsSection_NotSeenInEvents: false,
    newsSectionImageUrl: 'news-img-duoflamenco-001.jpg',
    newsSectionImageAlt: 'Tańcząca tancerka flamenco oraz gitarzysta.',
    //slider
    isToBeInSlider: true,
    sliderImageUrl: 'events_duoflamenco_002.jpg',
    sliderImageAlt: 'Tańcząca tancerka flamenco oraz gitarzysta.',
    visibleInSliderFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleInSliderTo: new Date('2023-09-09T23:59:00.968Z'),
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-09-09T23:59:00.968Z'),
  },
  {
    id: 'aa4e7r47-7804-ff81-8456-ce6bf7fd83wq',
    eventTypes: ['WORKSHOP'],
    eventForWhom: ['CHILDREN', 'TEENS'],
    title: 'Warsztaty flamenco dla dzieci',
    places: ['CONCERT_HALL'],
    shortDescription:
      'Tańczący wachlarz flamenco - warsztaty taneczne, plastyczne w wykonaniu Anny Mendak i z muzyką na żywo wykonywaną przez czołowego gitarzystę flamenco w Polsce - Michała Czachowskiego.',
    eventStartDate: new Date('2023-09-10T10:00:00.968Z'),
    eventEndDate: null,
    createdAt: new Date('2023-08-26T15:20:24.968Z'),
    updatedAt: new Date('2023-08-26T15:20:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_duoflamenco_001.jpg',
        alt: 'Tańcząca tancerka flamenco oraz dwóch gitarzystów.',
        additionInfoThatMustBeDisplayed: null,
      },
      {
        url: 'events_duoflamenco_002.jpg',
        alt: 'Tańcząca tancerka flamenco oraz dwóch gitarzystów.',
        additionInfoThatMustBeDisplayed: null,
      },
    ],
    detailedDescription:
      '<div>\r\n            <p>\r\n              <b>Anna Mendak</b> - czołowa tancerka flamenco poprowadzi\r\n              warsztaty tańca dla dzieci w wieku 7-14 lat.\r\n            </p>\r\n            <p>\r\n              Podczas warsztatów uczestnicy wykonają wachlarz flamenco,\r\n              zapoznają z się z podstawowymi technikami i krokami tańca\r\n              flamenco. Muzyczny klimat podczas warsztatów stworzy Michał\r\n              Czachowski wirtuoz gitary. Wszyscy uczestnicy niesamowitego\r\n              spotkania będą mogli zrobić sobie pamiątkowe zdjęcie z artystami\r\n              na scenie Art CK.\r\n            </p>\r\n            <p>\r\n              Rezerwacja telefoniczna pod nr telefonu 32/332 63 81 w godz. 15.00\r\n              -20.00.\r\n            </p>\r\n\r\n            <p>\r\n              <b>Zapraszamy!</b>\r\n            </p>\r\n          </div>',
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: true,
    kindOfEnterInfo:
      'Bilet w cenie 30 pln. Bilety można rezerwować dzwoniąc pod numer 32 332 63 81, codziennie od 15.00 do 20.00.',
    ticketBuyingId: null,
    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: false,
    isToBeOnlyInNewsSection_NotSeenInEvents: false,
    newsSectionImageUrl: 'news-img-duoflamenco-002.jpg',
    newsSectionImageAlt: 'Tańcząca tancerka flamenco oraz gitarzysta.',
    //slider
    isToBeInSlider: true,
    sliderImageUrl: 'events_duoflamenco_001.jpg',
    sliderImageAlt: 'Tańcząca tancerka flamenco oraz gitarzysta.',
    visibleInSliderFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleInSliderTo: new Date('2023-09-10T23:59:00.968Z'),
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-09-10T23:59:00.968Z'),
  },
  {
    id: 'dr4e8847-7gg4-ff81-8456-ce6bf7fd86gq',
    eventTypes: ['CONCERT', 'DANCE'],
    eventForWhom: ['TEENS', 'ADULTS', 'SENIORS', 'WOMEN'],
    title: 'CUMBANCHEROS - koncert muzyki kubańskiej',
    places: ['CONCERT_HALL'],
    shortDescription:
      'Zapraszamy serdecznie na pełen gorących rytmów koncert muzyki kubańskiej w wykonaniu Zespołu CUMBANCHEROS.',
    eventStartDate: new Date('2023-09-23T19:00:00.968Z'),
    eventEndDate: null,
    createdAt: new Date('2023-08-26T15:20:24.968Z'),
    updatedAt: new Date('2023-08-26T15:20:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_kuba_001.jpg',
        alt: 'Postaci członków zespołu CUMBANCHEROS.',
        additionInfoThatMustBeDisplayed: null,
      },
    ],
    detailedDescription:
      '          <div>\r\n            <p>\r\n              Zapraszamy na wieczór z kubańską muzyką w wykonaniu zespołu\r\n              Cumbancheros w składzie:\r\n            </p>\r\n            <p>\r\n              <b>Edi Sánchez</b> jest Kolumbijczykiem, który od kilku lat\r\n              mieszka w Polsce. Razem z zespołem zaprezentuje szeroki repertuar\r\n              muzyki latynoskiej, wywodzącej się z rejonu Morza Karaibskiego. W\r\n              jego repertuarze znajdują się utwory w stylu rumba, cha-cha,\r\n              mambo, salsa i inne. Ciągłe eksperymentowanie i łączenie różnych\r\n              gatunków salsowych jest oryginalną i emocjonującą propozycją dla\r\n              publiczności. Lider zespołu jest nie tylko wielkim orędownikiem\r\n              muzyki wywodzącej się z jego rodzinnych stron, ale także\r\n              prawdziwym showmanem, który z charakterystyczną dla kolumbijczyków\r\n              energią i pasją prezentuje latynoskie standardy, czym zaraża\r\n              publiczność, skłania do uśmiechu i tańca w gorących rytmach salsy.\r\n              Jego ideą jest przekazanie pozytywnych wibracji, które muzyka ta\r\n              stwarza i przenosi, oraz ukazanie jej niezwykle towarzyskiego\r\n              charakteru.\r\n            </p>\r\n\r\n            <p>\r\n              <b>Paul Chapman</b>, Wenezuelski muzyk, muzycznie kształcił się w\r\n              swojej rodzimej Wenezueli. Od kilku lat mieszka i koncertuje w\r\n              Polsce i dzieli się z polskimi muzykami i słuchaczami muzyką\r\n              Ameryki Łacińskiej.\r\n            </p>\r\n\r\n            <p>\r\n              <b>Alberto Suazo Sanchez</b>, urodził się w Coscomatepec stan\r\n              Veracruz Meksyk. Swoja przygodę z muzyką rozpoczął w wieku 10 lat.\r\n              Gra na instrumentach strunowych (gitara,charango, jarama vihuela ,\r\n              guitarron, cuatro venezolano, tiple colombiano). Wielokorotnie\r\n              uczestniczył w festiwalach w Meksyku i Europie, zdobywając na nich\r\n              liczne nagrody. Występuje zarówno solowo jak i z zespołami (np.\r\n              Orizaba, Grupo Colibri, Grupo Tlahuiskalli ). Obecnie mieszka w\r\n              Polsce i zajmuje się programami artystycznymi związanymi z muzyka\r\n              latynoamerykañską.\r\n            </p>\r\n          </div>',
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: true,
    kindOfEnterInfo:
      'Bilet w cenie 30 zł. Rezerwacja miejsc pod numerem telefonu 32 332 63 79 w godzinach 12.00 - 20.00.',
    ticketBuyingId: null,
    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: false,
    isToBeOnlyInNewsSection_NotSeenInEvents: false,
    newsSectionImageUrl: 'news-img-kubanski-001.jpg',
    newsSectionImageAlt: 'Postaci członków zespołu CUMBANCHEROS.',
    //slider
    isToBeInSlider: true,
    sliderImageUrl: 'events_kuba_001.jpg',
    sliderImageAlt: 'Postaci członków zespołu CUMBANCHEROS.',
    visibleInSliderFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleInSliderTo: new Date('2023-09-23T23:59:00.968Z'),
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-09-23T23:59:00.968Z'),
  },
  {
    id: 'dale8847-d3g4-ff81-8116-ce6rr7fd8656',
    eventTypes: ['SPECTACLE'],
    eventForWhom: ['CHILDREN'],
    title: 'WALIZKI Z RÓŻNYCH STRON ŚWIATA - Teatr Lalek Marka Żyły',
    places: ['CONCERT_HALL'],
    shortDescription:
      'Zapraszamy do spędzenia rodzinnie niedzieli w towarzystwie Teatru Lalek.',
    eventStartDate: new Date('2023-09-24T16:00:00.968Z'),
    eventEndDate: null,
    createdAt: new Date('2023-08-26T15:20:24.968Z'),
    updatedAt: new Date('2023-08-26T15:20:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_walizki_001.jpg',
        alt: 'Twórca Teatru Lalek oraz kilka postaci z jego spektakli.',
        additionInfoThatMustBeDisplayed: null,
      },
      {
        url: 'events_walizki_002.jpg',
        alt: 'Aktor rozmawiający z postacią ze spektaklu.',
        additionInfoThatMustBeDisplayed: null,
      },
      {
        url: 'events_walizki_003.jpg',
        alt: 'Aktor animujący dwie kukiełki podczas spektaklu.',
        additionInfoThatMustBeDisplayed: null,
      },
    ],
    detailedDescription:
      '  <div>\r\n            <p>\r\n              Spektakl pełen walizek, a walizki pełne lalek, bajek, historii i\r\n              opowieści - z różnych krajów, czasów i miejsc (nawet takich, które\r\n              w ogóle nie istnieją!) Pojawiają się bardzo różne lalki a historie\r\n              są raz śmieszne innym razem trochę straszne! Spektakl nie ma\r\n              końca, gdyż nowe historie w nowych walizkach pojawiają się cały\r\n              czas! Aktualnie można spotkać się z: Najsmaczniejszą walizką - a w\r\n              niej aromatyczna historia z Krainy Sera, Walizką pełną\r\n              krasnoludków - historia o krasnoludku, który nauczył się latać.\r\n              Tajemnicza walizka, w której mieści się chyba z tysiąc historii,\r\n              ale lubi ona płatać figle… Walizka z czasów jaskiniowców - z\r\n              jedynym na świecie… a niech to będzie niespodzianką!\r\n            </p>\r\n\r\n            <p>\r\n              Teatr Lalek Marka Żyły powstał w 2016 r. z pasji i miłości do\r\n              lalek i rozśmieszania. Każdy temat starają się okrasić sporą dawką\r\n              dobrego humoru. Ideą tego teatru jest teatr wędrowny, jarmarczny,\r\n              który gra wszędzie tam, gdzie tylko można ustawić niewielką scenę,\r\n              pełną lalek!\r\n            </p>\r\n          </div>',
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: true,
    kindOfEnterInfo:
      'Bilet w cenie 35 zł. Rezerwacja miejsc pod numerem telefonu 32 332 63 79 w godzinach 12.00 - 20.00.',
    ticketBuyingId: null,

    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: false,
    isToBeOnlyInNewsSection_NotSeenInEvents: false,
    newsSectionImageUrl: 'news-img-walizki-001.jpg',
    newsSectionImageAlt: 'Aktor animujący dwie kukiełki podczas spektaklu.',

    //slider
    isToBeInSlider: true,
    sliderImageUrl: 'events_walizki_001.jpg',
    sliderImageAlt: 'Twórca Teatru Lalek oraz kilka postaci z jego spektakli.',
    visibleInSliderFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleInSliderTo: new Date('2023-09-24T23:59:00.968Z'),
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-09-24T23:59:00.968Z'),
  },
  {
    id: '12we27417-9875-ff81-g351-ce6bfr4ghta5',
    eventTypes: ['OTHERS'],
    eventForWhom: ['CHILDREN', 'TEENS'],
    title: 'Rozpoczęliśmy zapisy dzieci na zajęcia akrobatyki.',
    places: ['DANCING_ROOM'],
    shortDescription: 'Zapraszamy na zajęcia akrobatyki. Rozpoczęliśmy zapisy.',
    eventStartDate: new Date('2023-09-13T18:00:00.968Z'),
    eventEndDate: null,
    createdAt: new Date('2023-08-27T14:20:00.968Z'),
    updatedAt: new Date('2023-08-27T14:20:00.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_akrobatyka_001.jpg',
        alt: 'Baner akcji Narodowego czytania.',
        additionInfoThatMustBeDisplayed: null,
      },
      // {
      //   url: 'events_nc_002.jpg',
      //   alt: 'Program Narodowego Czytania.',
      //   additionInfoThatMustBeDisplayed: null,
      // },
    ],
    detailedDescription:
      '          <div><p>Zapraszamy na zajęcia akrobatyki. Rozpoczęliśmy zapisy.</p><p>Dzwońcie w godzinach popołudniowych na numery <b>32 332 63 97</b> lub <b>32 332 63 79.</b></p><p>Pierwsze zajęcia odbędą się w sobotę, <b>30 września</b>.</p></div>',
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: false,
    kindOfEnterInfo: 'Wstęp wolny.',
    ticketBuyingId: null,

    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: true,
    isToBeOnlyInNewsSection_NotSeenInEvents: true,
    newsSectionImageUrl: 'news-img-akrobatyka-001.jpg',
    newsSectionImageAlt: 'Akrobatyka dla dzieci.',
    //slider
    isToBeInSlider: false,
    sliderImageUrl: null,
    sliderImageAlt: null,
    visibleInSliderFrom: null,
    visibleInSliderTo: null,
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-09-08T23:59:00.968Z'),
  },
  {
    id: 'dadd8847-d3g1-ff81-8116-676rr7fd8aa3',
    eventTypes: ['OTHERS'],
    eventForWhom: ['TEENS', 'ADULTS', 'SENIORS', 'WOMEN'],
    title: 'Spotkanie autorskie z Justyną Wydrą',
    places: ['CONCERT_HALL'],
    shortDescription:
      'Serdecznie zapraszamy w piątek, 15 września o godz. 18:00 na spotkania autorskie z Justyną Wydrą w ramach projektu NCK - NIEPODLEGŁA.',

    eventStartDate: new Date('2023-09-15T18:00:00.968Z'),
    eventEndDate: null,
    createdAt: new Date('2023-08-26T15:20:24.968Z'),
    updatedAt: new Date('2023-08-26T15:20:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_autorskie_001.jpg',
        alt: 'Twarz autorki - młoda kobieta w okularach i długich, prostych włosach.',
        additionInfoThatMustBeDisplayed: null,
      },
    ],
    detailedDescription:
      '<div><p>Serdecznie zapraszamy w piątek, <b>15 września o godz. 18:00</b> na <b>spotkania autorskie z Justyną Wydrą</b> do nowo otwartego Art CK w Knurowie, przy ul. Witosa 6.</p><p>Prowadzenie: <b>Szymon Szwajger</b>.</p><p><b>Justyna Wydra</b> - od zawsze kocha się w słowach. Szczególnie tych pisanych, śpiewanych i wypowiadanych na kinowym ekranie. Pracuje z nimi jako copywriter i autorka artykułów dla prasy drukowanej oraz internetowej. Pochodzi z Gliwic, gdzie dorastała i mieszka do dziś. Z rodzinnym miastem i Śląskiem czuje się silnie związana, co znajduje odzwierciedlenie także w jej twórczości. Współtwórczyni Klubu Książki Kobiecej. Justyna Wydra książki zaczęła wydawać w połowie zeszłej dekady i od tego czasu publikuje regularnie. Najnowsza powieść jej autorstwa pt. Ja matką? Ratunku! do księgarń trafiła pod koniec zeszłego roku. Po godzinach czyta książki, prowadzi bloga, słucha muzyki i stara się nadrobić filmowe zaległości. Gdy ma już naprawdę serdecznie dosyć słów, zamyka za sobą drzwi i udaje się tam, dokąd pokieruje ją instynkt Włóczykija - najczęściej ląduje na górskim szlaku, bądź w północnych Włoszech.</p><p>Autorka powieści „Esesman i Żydówka”, ”Zaniemówienie”, "Ponieważ wróciłam”, „Warkoczyk”, „Ja matką? Ratunku!”.</p></div>',
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: false,
    kindOfEnterInfo:
      'Wstęp wolny. Dofinansowano ze środków Biura „Niepodległa” w ramach Programu Dotacyjnego „Symbole Narodowe RP"',
    ticketBuyingId: null,

    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: false,
    isToBeOnlyInNewsSection_NotSeenInEvents: false,
    newsSectionImageUrl: 'news-img-autorskie-001.jpg',
    newsSectionImageAlt:
      'Twarz autorki - młoda kobieta w okularach i długich, prostych włosach.',

    //slider
    isToBeInSlider: true,
    sliderImageUrl: 'events_autorskie_001.jpg',
    sliderImageAlt:
      'Twarz autorki - młoda kobieta w okularach i długich, prostych włosach.',
    visibleInSliderFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleInSliderTo: new Date('2023-09-15T23:59:00.968Z'),
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-09-15T23:59:00.968Z'),
  },
  {
    id: '1ase27417-9875-ffhy-g351-ce6bfr4gh3aa',
    eventTypes: ['DANCE', 'OTHERS'],
    eventForWhom: ['ADULTS', 'SENIORS', 'WOMEN'],
    title: 'Rozpoczynamy zajęcia Body Groove.',
    places: ['DANCING_ROOM'],
    shortDescription:
      'Zapraszamy wszystkich zainteresowanych zajęciami Body Groove, na pierwsze otwarte zajęcia, które odbędą się 5 października od godz. 18.45.',
    eventStartDate: new Date('2023-09-13T18:00:00.968Z'),
    eventEndDate: null,
    createdAt: new Date('2023-08-27T14:20:00.968Z'),
    updatedAt: new Date('2023-08-27T14:20:00.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      // {
      //   url: 'events_akrobatyka_001.jpg',
      //   alt: 'Baner akcji Narodowego czytania.',
      //   additionInfoThatMustBeDisplayed: null,
      // },
      // {
      //   url: 'events_nc_002.jpg',
      //   alt: 'Program Narodowego Czytania.',
      //   additionInfoThatMustBeDisplayed: null,
      // },
    ],
    detailedDescription: '',
    isCustomLinkToDetails: true,
    customLinkToDetails: '/activities/83aw7r17-0uu4-41e1-fff5-c36bvendh878',

    //paying
    isPayed: false,
    kindOfEnterInfo: 'Wstęp wolny.',
    ticketBuyingId: null,

    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: true,
    isToBeOnlyInNewsSection_NotSeenInEvents: true,
    newsSectionImageUrl: 'news-img-bodygroove-001.jpg',
    newsSectionImageAlt: 'Zajęcia Body Groove.',
    //slider
    isToBeInSlider: false,
    sliderImageUrl: null,
    sliderImageAlt: null,
    visibleInSliderFrom: null,
    visibleInSliderTo: null,
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-09-08T23:59:00.968Z'),
  },
  {
    id: 'f54d8847-d3g1-gt51-8116-6r6rr7fd8899',
    eventTypes: ['LITERATURE'],
    eventForWhom: ['TEENS'],
    title: 'Wieczorek Głośnego Czytania',
    places: ['CONCERT_HALL'],
    shortDescription:
      'Zapraszamy młodzież (13-16 lat) na spotkanie ze "Zwiadowcami", czeka na Was nie tylko literatura... :)',
    eventStartDate: new Date('2023-09-29T18:00:00.968Z'),
    eventEndDate: new Date('2023-09-29T21:00:00.968Z'),
    createdAt: new Date('2023-08-26T15:20:24.968Z'),
    updatedAt: new Date('2023-08-26T15:20:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_zwiadowcy_003.jpg',
        alt: 'Napis Wieczorek Głośnego Czytania.',
        additionInfoThatMustBeDisplayed: null,
      },
      {
        url: 'events_zwiadowcy_001.jpg',
        alt: 'Plakat powieści "Zwiadowcy".',
        additionInfoThatMustBeDisplayed: null,
      },
      {
        url: 'events_zwiadowcy_002.jpg',
        alt: 'Zdjęcie programu Wieczorku Głośnego Czytania "Zwiadowców".',
        additionInfoThatMustBeDisplayed: null,
      },
    ],
    detailedDescription:
      '<div><p>Jeśli masz 13-16 lat i kochasz czytanie ten wieczór jest dla Ciebie!</p><p>W programie:</p><ul><li>czytanie fragmentów serii „Zwiadowcy” Johna Flanagana,</li><li>familiada książkowa (quizy, challenge, wyzwania),</li><li>wspólne kręcenie książkowego filmiku,</li><li>sjesta biblioteczna (pogawędka o bibliotece i czytaniu),</li><li>literacka uczta (poczęstunek).</li></ul><p>Wydarzenie jest realizowane w ramach projektu "Nowe otwarcie - Projekt DK+. Inicjatywy Lokalne ".</p><p>Dofinansowano ze środków Ministra Kultury i Dziedzictwa Narodowego w ramach programu Narodowego Centrum Kultury: Dom Kultury+ Edycja 2023</p></div>',
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: false,
    kindOfEnterInfo:
      'Wstep bezpłatny. Zapisy odbywają się w MBP,  Filii nr 2, (al. Lipowa 12) lub pod nr tel. 32 332 63 94.',
    ticketBuyingId: null,

    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: false,
    isToBeOnlyInNewsSection_NotSeenInEvents: false,
    newsSectionImageUrl: 'news-img-zwiadowcy-001.jpg',
    newsSectionImageAlt:
      'Twarz autorki - młoda kobieta w okularach i długich, prostych włosach.',

    //slider
    isToBeInSlider: true,
    sliderImageUrl: 'events_zwiadowcy_001.jpg',
    sliderImageAlt: 'Plakat powieści "Zwiadowcy".',
    visibleInSliderFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleInSliderTo: new Date('2023-09-29T23:59:00.968Z'),
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-09-29T23:59:00.968Z'),
  },
  {
    id: '32dd8847-fr41-gt51-8dev-6r6rr7fd56ws',
    title: 'Spotkanie z Alkiem Rogozińskim',
    eventTypes: ['LECTURE', 'OTHERS'],
    eventForWhom: ['TEENS', 'SENIORS', 'ADULTS'],
    places: ['CONCERT_HALL'],
    shortDescription:
      'Zapraszamy na kolejne już w Art CK spotkanie z literaturą, tym razem naszym gościem będzie autor kryminałów - Alek Rogoziński.',
    eventStartDate: new Date('2023-10-13T18:00:00.968Z'),
    eventEndDate: new Date('2023-10-13T21:00:00.968Z'),
    createdAt: new Date('2023-10-04T15:20:24.968Z'),
    updatedAt: new Date('2023-10-04T15:20:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_alek_001.jpg',
        alt: 'Portret młodego mężczyzny w kolorowej koszuli na tle zielonej ściany.',
        additionInfoThatMustBeDisplayed: 'Foto: Anna Powałowska',
      },
      {
        url: 'events_alek_002.jpg',
        alt: 'Portret młodego mężczyzny otulonego szalem i podtrzymującego brodę złożonymi rękoma, wszytsko w monochromatycznej kolorystyce.',
        additionInfoThatMustBeDisplayed: 'Foto: Anna Powałowska',
      },
    ],
    detailedDescription:
      '<div><p><b>Alek Rogoziński</b> - Z zawodu dziennikarz, z pasji kryminalista… to znaczy - twórca kryminałów. Przez lata związany z mediami (Radio Plus i Radio Kolor).</p><p>Zadebiutował w marcu 2015 roku kryminałem „Ukochany z piekła rodem”, zdobywając pierwsze miejsce na liście bestsellerów kryminalnych EMPIK.com. Kolejną pierwszą pozycję zdobył w 2022 roku w kategorii literatura obyczajowa dzięki powieści „Przeklęta szkatułka”. Dwie jego powieści, „Jak Cie zabić, kochanie?” i „Do trzech razy śmierć”, zostały nominowane w plebiscycie „Książka roku” portalu Lubimy Czytać.</p><p>Za książkę „Lustereczko, powiedz przecie” nagrodzony 1-szą nagrodą w plebiscycie „Zbrodnia z przymrużeniem oka”. Ponownie zdobył tę nagrodę rok później za powieść „Zbrodnia w wielkim mieście”, a dwa lata później za komedię kryminalną „Raz, dwa, trzy… giniesz ty!”.W 2021 roku jego książka „Miasteczko morderców” została nominowana do Grand Prix Festiwalu Kryminalna Warszawa.</p><p>W październiku 2022 roku w czasie gali wręczenia nagród „Złoty Pocisk”, odbywającej się w ramach 25. Międzynarodowych Targów Książki w Krakowie, został wyróżniony za swoją twórczość nagrodą specjalną!</p><p>Spotkanie realizowane jest z programu Narodowego Centrum Kultury Dom Kultury + Edycja 2023.</p></div>',
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: false,
    kindOfEnterInfo: 'Wstęp wolny.',
    ticketBuyingId: null,

    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: false,
    isToBeOnlyInNewsSection_NotSeenInEvents: false,
    newsSectionImageUrl: 'news-img-alek-001.jpg',
    newsSectionImageAlt:
      'Portret mężczyzny w kolorowym przebraniu, czarny cylinder, czerwony frak, kolorowy szal, dłońmi w białych rękawiczkach trzyma żółtą filiżankę, na twarzy kolorowy makijaż.',

    //slider
    isToBeInSlider: true,
    sliderImageUrl: 'events_alek_001.jpg',
    sliderImageAlt:
      'Portret młodego mężczyzny w kolorowej koszuli na tle zielonej ściany.',
    visibleInSliderFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleInSliderTo: new Date('2023-10-13T23:59:00.968Z'),
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-10-13T23:59:00.968Z'),
  },
  {
    id: '44dd8847-f5g1-gt51-811v-6r6rr7fd8wws',
    eventTypes: ['CONCERT'],
    eventForWhom: ['ADULTS', 'SENIORS', 'WOMEN'],
    title: 'Wieczór włoski CIAO AMORE',
    places: ['CONCERT_HALL'],
    shortDescription:
      'Za nami już wieczór hiszpański (z flamenco), wieczór kubański, a przed nami wieczór włoski... :)',
    eventStartDate: new Date('2023-10-20T18:00:00.968Z'),
    eventEndDate: new Date('2023-10-20T21:00:00.968Z'),
    createdAt: new Date('2023-09-29T15:20:24.968Z'),
    updatedAt: new Date('2023-09-29T15:20:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_italia_002.jpg',
        alt: 'Plakat Andrea Lattari.',
        additionInfoThatMustBeDisplayed: null,
      },
    ],
    detailedDescription:
      '<div><p>Za nami już wieczór hiszpański (z flamenco), wieczór kubański, a przed nami wieczór włoski - chcieliśmy w naszym Art CK przedłużyć ten uroczy czas wakacyjnych podróży i wspomnień, dając Wam możliwość artystycznego przeniesienia się do tych pięknych, pełnych słońca i pozytywnej energii miejsc.</p><p>Zatem, planujcie już wieczór 20 października aby pobyć z nami trochę we włoskich klimatach!!!</p></div>',
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: true,
    kindOfEnterInfo: 'Cena biletu: 35 zł',
    ticketBuyingId: null,

    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: false,
    isToBeOnlyInNewsSection_NotSeenInEvents: false,
    newsSectionImageUrl: 'news-img-italia-001.jpg',
    newsSectionImageAlt: 'Plakat Andrea Lattari.',

    //slider
    isToBeInSlider: true,
    sliderImageUrl: 'events_italia_002.jpg',
    sliderImageAlt: 'Plakat Andrea Lattari.',
    visibleInSliderFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleInSliderTo: new Date('2023-10-20T23:59:00.968Z'),
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-10-20T23:59:00.968Z'),
  },
  {
    id: '123d8847-e3g1-gt51-871v-fr6rr7fd8wzz',
    eventTypes: ['CYCLIC_MEETING', 'WORKSHOP', 'OTHERS'],
    eventForWhom: ['ADULTS', 'SENIORS', 'WOMEN'],
    title: 'Kobiecy wieczór z dynią na pierwszym planie ',
    places: ['CONCERT_HALL'],
    shortDescription:
      'Rozpoczynamy cykl jesiennych wieczorów kobiecych, na pierwszy plan stawiamy dynię i wszelkie cudowności od niej pochodzące! Będziemy spędzać uroczy wieczór, robiąc piękne ozdoby dyniowe do naszych wnętrz, smakując dyniowe pyszności popijane aromatyczną kawą, a wszystko to w przy pięknej muzyce, świecach i uśmiechniętych sercach!',
    eventStartDate: new Date('2023-10-14T18:00:00.968Z'),
    eventEndDate: new Date('2023-10-14T20:00:00.968Z'),
    createdAt: new Date('2023-10-04T22:20:24.968Z'),
    updatedAt: new Date('2023-10-04T22:20:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_dynia_001.jpg',
        alt: 'Plakat na czarnym tle kolorowe liście i dynie oraz napis Kobiecy Wieczór z dynią, 14 października, godz. 18.00, Art CK.',
        additionInfoThatMustBeDisplayed: null,
      },
    ],
    detailedDescription:
      '<div><p>Dynia bardzo lubi się z jesiennymi kwiatami! Będzie wyglądała świetnie  jako… oryginalny wazon na kwiaty. Uczestnicząc w naszym Kobiecym Wieczorze z DYNIĄ w tle przygotujemy dla Ciebie wszystkie materiały, które będą potrzebne Ci do stworzenia pięknej dekoracji dyniowo - kwiatowej, którą oczywiście weźmiesz do swojego domu! W naszej Art Cafe otrzymasz również profesjonalną pomoc i wsparcie w wykonaniu tej dekoracji.</p><p>Stworzymy dla Ciebie niezwykłą atmosferę wspierającą twórczą pracę:  świece, muzyka, uśmiech, pyszności dyniowe, świeża kawa - czy jeszcze o czymś zapomnieliśmy by dać Ci chwilę odprężenia?</p></div>',
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: true,
    kindOfEnterInfo:
      'Wstęp: 45 zł, rezerwacja miejsc pod numerem telefonu 32 332 63 79.',
    ticketBuyingId: null,

    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: false,
    isToBeOnlyInNewsSection_NotSeenInEvents: false,
    newsSectionImageUrl: 'news-img-dyniai-001.jpg',
    newsSectionImageAlt:
      'W wydrążonej dyni tkwią różne kolorowe kwiaty tworząc ozdobę, dekorację.',

    //slider
    isToBeInSlider: true,
    sliderImageUrl: 'events_dynia_001.jpg',
    sliderImageAlt:
      'Plakat na czarnym tle kolorowe liście i dynie oraz napis Kobiecy Wieczór z dynią, 14 października, godz. 18.00, Art CK.',
    visibleInSliderFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleInSliderTo: new Date('2023-10-14T23:59:00.968Z'),
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-10-14T23:59:00.968Z'),
  },
  {
    id: '8wwd8847-e3c1-gt51-991v-fr6rr44d8wz4',
    eventTypes: ['WORKSHOP'],
    eventForWhom: ['ADULTS', 'CHILDREN', 'TEENS', 'WOMEN'],
    title: 'Jasiek CoJest - Warsztay Hip-Hop',
    places: ['CONCERT_HALL'],
    shortDescription:
      '28 października zapraszamy do udziału w warsztatach tańca Hip-Hop z naszym gościem - Jaśkiem - Janem Jagodzińskim.',
    eventStartDate: new Date('2023-10-28T11:00:00.968Z'),
    eventEndDate: new Date('2023-10-28T20:00:00.968Z'),
    createdAt: new Date('2023-10-10T22:20:24.968Z'),
    updatedAt: new Date('2023-10-10T22:20:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_jasiek_001.jpg',
        alt: 'Czarno - białe zdjęcie ukazujące tańczącego hip hop młodego mężczyznę.',
        additionInfoThatMustBeDisplayed: null,
      },
      {
        url: 'events_jasiek_002.jpg',
        alt: 'Portret młodego mężczyzny w pozycji tanecznej na białym tle.',
        additionInfoThatMustBeDisplayed: null,
      },
    ],

    detailedDescription:
      '<div><p>  Jasiek - Założyciel studia Tutaj oraz studia Origin of, tancerz i choreograf prężnie działający na polskiej i zagranicznej scenie tanecznej.</p><p>Jego pasją jest przekazywanie swojej wiedzy kolejnym pokoleniom tancerzy. Szczególnie pociąga go hip hop, ale w swojej drodze tanecznej próbował wielu stylów, co dało mu solidną podstawę do eksperymentowania z ruchem.</p><p>  Jest zwycięzcą licznych polskich i zagranicznych wydarzeń tanecznych. W 2022 roku stworzył wraz z ekipą Co Jest Crew przy współpracy z francuskim choreografem Hamdim Dridi spektakl pt. "Step By Step", będący fuzją tańca współczesnego ze street dancem.</p><p> Na swoich zajęciach skupia się na indywidualnym rozwoju każdego z podopiecznych zwracając szczególną uwagę na rozwijanie kreatywności, budowanie charakteru oraz naukę techniki.</p><p>Godz. <b>11.00</b> - grupa młodsza<br/>Godz. <b>12.45</b> - grupa starsza</p></div>',
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: true,
    kindOfEnterInfo: 'Wstęp: 40 zł.',
    ticketBuyingId: null,

    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: false,
    isToBeOnlyInNewsSection_NotSeenInEvents: false,
    newsSectionImageUrl: 'news-img-jasiek-001.jpg',
    newsSectionImageAlt:
      'Czarno-białe zdjęcie ukazujące tańczącego hip hop młodego mężczyznę.',

    //slider
    isToBeInSlider: true,
    sliderImageUrl: 'events_jasiek_001.jpg',
    sliderImageAlt:
      'Czarno - białe zdjęcie ukazujące tańczącego hip hop młodego mężczyznę.',
    visibleInSliderFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleInSliderTo: new Date('2023-10-28T23:59:00.968Z'),
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-10-28T23:59:00.968Z'),
  },
  {
    id: '2wad8842-evc1-gt51-991v-fr6rrecd8wz0',
    eventTypes: ['CONCERT'],
    eventForWhom: ['ADULTS', 'TEENS', 'WOMEN', 'SENIORS'],
    title: 'Koncert Joanny Stasińskiej z zespołem',
    places: ['CONCERT_HALL'],
    shortDescription:
      'Koncert Joanny Stasińskiej z zespołem - Inicjatywa Lokalna Projektu DK+.',
    eventStartDate: new Date('2023-10-27T19:00:00.968Z'),
    eventEndDate: new Date('2023-10-27T22:00:00.968Z'),
    createdAt: new Date('2023-10-13T22:20:24.968Z'),
    updatedAt: new Date('2023-10-13T22:20:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_joanna_001.jpg',
        alt: 'Młoda kobieta, długie i proste blond włosy, ubrana w czarną sukienkę z saksofonem w dłoniach.',
        additionInfoThatMustBeDisplayed: null,
      },
    ],

    detailedDescription:
      '<div><p>Kolejna inicjatywa projektu Nowe otwarcie - Projekt DK+, to koncert znakomitej saksofonistki Joanny Stasińskiej z towarzyszeniem przyjaciół - muzyków polskiej sceny.</p><p>W repertuarze znajdą się utwory w klimacie funky i smooth jazz, m.in. takich artystów jak Stevie Wonder czy Candy Dufler.</p><p>W skład zespołu wchodzą:</p><ul><li>Joanna Stasińska - saksofon</li><li>Erwin Żebro - trąbka</li><li>Konstanty Janiak - puzon</li><li>Mariusz Orzełowski - gitara</li><li>Bartosz Kalicki - instrumenty klawiszowe</li><li>Piotr Zaufal - gitara basowa</li><li>Kamil Wójcik - perkusja</li><li>Łukasz Wicher - wokal</li></ul><p>Projekt dofinansowano ze środków Ministerstwo Kultury i Dziedzictwa Narodowego w ramach programu Narodowe Centrum Kultury na realizację projektu Dom Kultury + Edycja 2023 - Inicjatywy Lokalne.</p></div>',
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: false,
    kindOfEnterInfo: 'Wstęp wolny, finansowany z projektu Dom Kultury+.',
    ticketBuyingId: null,

    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: false,
    isToBeOnlyInNewsSection_NotSeenInEvents: false,
    newsSectionImageUrl: 'news-img-joanna-001.jpg',
    newsSectionImageAlt:
      'Młoda kobieta, długie i proste blond włosy, ubrana w czarną sukienkę z saksofonem w dłoniach.',

    //slider
    isToBeInSlider: true,
    sliderImageUrl: 'events_joanna_001.jpg',
    sliderImageAlt:
      'Młoda kobieta, długie i proste blond włosy, ubrana w czarną sukienkę z saksofonem w dłoniach.',
    visibleInSliderFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleInSliderTo: new Date('2023-10-27T23:59:00.968Z'),
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-10-27T23:59:00.968Z'),
  },

  {
    id: '222d8842-evc1-gt51-vf1v-fr6gbecd8wv1',
    eventTypes: ['OTHERS'],
    eventForWhom: ['CHILDREN'],
    title: 'Bal z dynią dla dzieci ',
    places: ['CONCERT_HALL'],
    shortDescription:
      'Zapraszamy dzieci na pełen atrakcyjnych zabaw bal, gdzie dynia będzie pełnić rolę główną!',
    eventStartDate: new Date('2023-10-28T17:30:00.968Z'),
    eventEndDate: new Date('2023-10-28T20:00:00.968Z'),
    createdAt: new Date('2023-10-13T22:20:24.968Z'),
    updatedAt: new Date('2023-10-13T22:20:24.968Z'),
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',

    //details
    images: [
      {
        url: 'events_badyni_001.jpg',
        alt: 'Plakat balu dyni.',
        additionInfoThatMustBeDisplayed: null,
      },
    ],

    detailedDescription:
      '<div><p><b>28. października o 17:30</b> zapraszamy wszystkie dzieci na BAL z motywem dyni!</p><p>W programie:</p><ul><li>dyniowe animacje poprowadzone przez AnimatOlkę</li><li>pokaz dyniowych strojów</li><li>poszukiwanie ukrytych dyni</li><li>pomarańczowe mini disco</li><li>bańki mydlane</li><li>poczęstunek dla dzieci</li></ul><p>Zapisów dzieci możecie dokonać telefonicznie, dzwoniąc do nas od 12.00 do 20.00 pod telefon o numerze: 32 332 63 79 lub pisząc mail: [info@art-ck.pl](mailto:info@art-ck.pl)</p></div>',
    isCustomLinkToDetails: false,
    customLinkToDetails: null,

    //paying
    isPayed: true,
    kindOfEnterInfo: 'Bilet wstępu 40 zł.',
    ticketBuyingId: null,

    //news
    isToBeInNewsSection: true,
    isDateToBeHiddenInNewsSection: false,
    isToBeOnlyInNewsSection_NotSeenInEvents: false,
    newsSectionImageUrl: 'news-img-badyni-001.jpg',
    newsSectionImageAlt:
      'Przebrane na bal dzieci wyciągają w zabawie ręcę w górę.',

    //slider
    isToBeInSlider: true,
    sliderImageUrl: 'events_badyni_001.jpg',
    sliderImageAlt: 'Plakat balu dyni.',
    visibleInSliderFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleInSliderTo: new Date('2023-10-28T23:59:00.968Z'),
    //publishing
    isToBePublished: true,
    visibleFrom: new Date('2023-08-26T15:20:24.968Z'),
    visibleTo: new Date('2023-10-28T23:59:00.968Z'),
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

// export const allCyclicalActivitiesMockData: CyclicalActivityTemporary[] = [
//   {
//     id: '843w7w17-0uu4-4jr1-fff5-c36b4endh841',
//     name: 'PRINTMAKING - zajęcia plastyczne dla dorosłych.',
//     activityTypes: ['PLASTICITY'],
//     activitiesForWhom: ['ADULTS', 'SENIORS', 'WOMEN'],
//     shortDescription:
//       'Warsztaty ręcznego tworzenia matryc w różnych materiałach i w różnych technikach (m.in. przy pomocy prasy drukarskiej).',
//     longDescription:
//       '<p>\r\n            Prowadząca: <b>AGATA NIŹNIKIEWICZ</b>\r\n          </p>\r\n          <p>\r\n            Zajęcia, na których absolutnie odpoczniesz od elektroniki i na\r\n            chwilę zwolnisz, zatracając się w pracy manualnej.\r\n          </p>\r\n          <p>\r\n            Nie jest to czas wyłącznie dla osób uzdolnionych plastycznie,\r\n            ponieważ dla uczestników warsztatów przygotowane są szablony i\r\n            wzory.\r\n          </p>\r\n          <p>\r\n            Warsztaty polegają na ręcznym tworzeniu matryc w różnych materiałach\r\n            w zależności od techniki. Wyryte matryce pokrywamy farbą drukarską i\r\n            przy użyciu prasy drukarskiej przenosimy rysunek z matrycy na\r\n            papier, tworząc grafikę.\r\n          </p>\r\n          <p>\r\n            Zajęcia prowadzone w miłej atmosferze sprzyjają odprężeniu i\r\n            twórczym działaniom oraz pozwalają na chwilę relaksu, Prace\r\n            uczestników systematycznie będą prezentowane w formie wystaw.\r\n          </p>',
//     isCustomLinkToDetails: false,
//     customLinkToDetails: '',
//     images: [
//       {
//         url: 'activities_image_004.jpg',
//         alt: 'Prezentowana wystawa miała formę wizualizacji multimedialnej opartej na filme VR 360 i odtwarzanej za pomocą przeznaczonych do tego celu okularów i słuchawek.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//       {
//         url: 'activities_image_005.jpg',
//         alt: 'Cykl dyplomowy “Subtelne Formy”, który przedstawiał ciało, jako abstrakcyjną wyłaniającą się z czerni formę.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//       {
//         url: 'activities_image_006.jpg',
//         alt: 'Cykl “Introspekcja” buduje obraz człowieka składającego się nie tylko z fizycznego wyglądu ale także z własnej emocjonalności.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//     ],
//     occurrence: [
//       {
//         id: '854e7c17-0uu4-4881-fff5-ce6bgezzh848',
//         day: 'MONDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T18:00:00.968Z'),
//             activityEnd: new Date('2000-01-01T20:00:00.968Z'),
//           },
//         ],
//       },
//     ],
//     places: ['ART_ROOM'],
//     isToBePublished: true,
//     createdAt: new Date('2023-08-10T11:00:24.968Z'),
//     updatedAt: new Date('2023-08-10T11:00:24.968Z'),
//     authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
//     isExpiresAtRequired: true,
//     expiresAt: new Date('2025-08-10T11:00:24.968Z'),
//   },
//   {
//     id: '854e7r17-0uu4-4ee1-fff5-ce6bgefdh841',
//     name: 'Próba zespołu Marzenie.',
//     activityTypes: ['DANCE', 'RECREATION'],
//     activitiesForWhom: ['TEENS'],
//     shortDescription:
//       'Próba najstarszej grupy zespołu tańca charakterystycznego. Grupa pokazowa.',
//     longDescription: null,
//     isCustomLinkToDetails: true,
//     customLinkToDetails: '/groups/marzenie',
//     images: [],
//     occurrence: [
//       {
//         id: '854e7c17-ruu4-4881-fff5-ce5bgezzh848',
//         day: 'MONDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T18:30:00.968Z'),
//             activityEnd: new Date('2000-01-01T20:00:00.968Z'),
//           },
//         ],
//       },
//       {
//         id: '85ee4c17-ruu4-4881-fff5-ce5bgezzh848',
//         day: 'WEDNESDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T16:15:00.968Z'),
//             activityEnd: new Date('2000-01-01T17:45:00.968Z'),
//           },
//         ],
//       },
//     ],
//     places: ['DANCING_ROOM'],
//     isToBePublished: true,
//     createdAt: new Date('2023-08-10T11:00:24.968Z'),
//     updatedAt: new Date('2023-08-10T11:00:24.968Z'),
//     authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
//     isExpiresAtRequired: true,
//     expiresAt: new Date('2025-08-10T11:00:24.968Z'),
//   },
//   {
//     id: '854w7r17-0du4-4ee1-fff5-cq6bgendh841',
//     name: 'Próba zespołu Marzenie Bis.',
//     activityTypes: ['DANCE', 'RECREATION'],
//     activitiesForWhom: ['CHILDREN', 'TEENS'],
//     shortDescription: 'Próba grupy zespołu tańca charakterystycznego.',
//     longDescription: null,
//     isCustomLinkToDetails: true,
//     customLinkToDetails: '/groups/marzenie_bis',
//     images: [],
//     occurrence: [
//       {
//         id: 'a54d7d17-ruu4-4881-fff5-ce5bbezzh848',
//         day: 'TUESDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T18:00:00.968Z'),
//             activityEnd: new Date('2000-01-01T19:30:00.968Z'),
//           },
//         ],
//       },
//       {
//         id: '85je4c17-ruu4-4881-fff5-ce5bge2ah848',
//         day: 'THURSDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T16:45:00.968Z'),
//             activityEnd: new Date('2000-01-01T18:15:00.968Z'),
//           },
//         ],
//       },
//     ],
//     places: ['DANCING_ROOM'],
//     isToBePublished: true,
//     createdAt: new Date('2023-08-10T11:00:24.968Z'),
//     updatedAt: new Date('2023-08-10T11:00:24.968Z'),
//     authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
//     isExpiresAtRequired: true,
//     expiresAt: new Date('2025-08-10T11:00:24.968Z'),
//   },
//   {
//     id: '854w7r17-0uu4-4ee1-fff5-ce6bgendh841',
//     name: 'Próba zespołu Marzenie Mini Mini.',
//     activityTypes: ['DANCE', 'RECREATION'],
//     activitiesForWhom: ['CHILDREN'],
//     shortDescription:
//       'Próba najmłodszej grupy zespołu tańca charakterystycznego.',
//     longDescription: null,
//     images: [],
//     isCustomLinkToDetails: true,
//     customLinkToDetails: '/groups/marzenieminimini',
//     occurrence: [
//       {
//         id: 'f54e7d17-ruu4-4881-fff5-ce5bgezzh848',
//         day: 'TUESDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T16:45:00.968Z'),
//             activityEnd: new Date('2000-01-01T17:45:00.968Z'),
//           },
//         ],
//       },
//       {
//         id: '85je4c17-ruu4-4881-fff5-ce5bge2ah848',
//         day: 'THURSDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T15:30:00.968Z'),
//             activityEnd: new Date('2000-01-01T16:30:00.968Z'),
//           },
//         ],
//       },
//     ],
//     places: ['DANCING_ROOM'],
//     isToBePublished: true,
//     createdAt: new Date('2023-08-10T11:00:24.968Z'),
//     updatedAt: new Date('2023-08-10T11:00:24.968Z'),
//     authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
//     isExpiresAtRequired: true,
//     expiresAt: new Date('2025-08-10T11:00:24.968Z'),
//   },
//   {
//     id: '85ww7r17-0uu4-4ee1-fff5-c36bgendh841',
//     name: 'Próba zespołu Hipnoteria Bis.',
//     activityTypes: ['DANCE', 'RECREATION'],
//     activitiesForWhom: ['TEENS'],
//     shortDescription: 'Próba młodszej grupy zespołu tańca Street Dance.',
//     longDescription: null,
//     images: [],
//     isCustomLinkToDetails: true,
//     customLinkToDetails: '/groups/hipnoteriabis',
//     occurrence: [
//       {
//         id: 'f54e7d17-r3u4-4881-fff5-ce5bgegzh848',
//         day: 'WEDNESDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T18:00:00.968Z'),
//             activityEnd: new Date('2000-01-01T19:30:00.968Z'),
//           },
//         ],
//       },
//       {
//         id: '85je4237-ruu4-4881-fff5-ce5bhy2ah848',
//         day: 'FRIDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T15:30:00.968Z'),
//             activityEnd: new Date('2000-01-01T17:00:00.968Z'),
//           },
//         ],
//       },
//     ],
//     places: ['DANCING_ROOM'],
//     isToBePublished: true,
//     createdAt: new Date('2023-08-10T11:00:24.968Z'),
//     updatedAt: new Date('2023-08-10T11:00:24.968Z'),
//     authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
//     isExpiresAtRequired: true,
//     expiresAt: new Date('2025-08-10T11:00:24.968Z'),
//   },
//   {
//     id: '81ww7r17-0uu4-4ee1-fff5-c36b6endh841',
//     name: 'Próba zespołu Hipnoteria.',
//     activityTypes: ['DANCE', 'RECREATION'],
//     activitiesForWhom: ['TEENS'],
//     shortDescription: 'Próba starszej grupy zespołu tańca Street Dance.',
//     longDescription: null,
//     images: [],
//     isCustomLinkToDetails: true,
//     customLinkToDetails: '/groups/hipnoteria',
//     occurrence: [
//       {
//         id: 'f54e7d17-z3u4-4881-fff5-ce52gegzh848',
//         day: 'WEDNESDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T19:30:00.968Z'),
//             activityEnd: new Date('2000-01-01T21:00:00.968Z'),
//           },
//         ],
//       },
//       {
//         id: '85456237-ruu4-4881-ffr5-ce5bhy2ah848',
//         day: 'FRIDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T17:15:00.968Z'),
//             activityEnd: new Date('2000-01-01T18:45:00.968Z'),
//           },
//         ],
//       },
//     ],
//     places: ['DANCING_ROOM'],
//     isToBePublished: true,
//     createdAt: new Date('2023-08-10T11:00:24.968Z'),
//     updatedAt: new Date('2023-08-10T11:00:24.968Z'),
//     authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
//     isExpiresAtRequired: true,
//     expiresAt: new Date('2025-08-10T11:00:24.968Z'),
//   },
//   {
//     id: '83aw7r17-0uu4-41e1-fff5-c36bvendh878',
//     name: 'Body Groove',
//     activityTypes: ['DANCE', 'RECREATION'],
//     activitiesForWhom: ['ADULTS', 'SENIORS', 'WOMEN'],
//     shortDescription: 'Trening w duchu Body Groove dla dorosłych uczestników.',
//     longDescription:
//       '<p>\r\n            Prowadząca: <b>JOANNA KUSY-SZPOTAŃSKA</b>\r\n          </p>\r\n\r\n          <p>\r\n            Body Groove to super zabawa, która jest przeznaczona dla każdego\r\n            ciała! Poświęcona zdrowiu i dobremu samopoczuciu. Na treningach\r\n            wykonujesz proste ruchy taneczne i czerpiesz z tego wszystkie\r\n            korzyści dla siebie !\r\n          </p>\r\n          <p>\r\n            Do tego mieszanka świetnej muzyki to idealny przepis na dobry\r\n            dance...\r\n          </p>\r\n          <p>\r\n            Taniec poprawi twoją elastyczność i siłę, poprawi skupienie i da Ci\r\n            lepszy sen i nastrój!!!\r\n          </p>\r\n\r\n          <p>\r\n            Każde zajęcia poprzedzone będą gimnastyką ogólnorozwojową zwaną też\r\n            ogólnokondycyjną. To propozycja dla osób w każdym wieku!\r\n          </p>\r\n\r\n          <p>\r\n            Ćwiczenia wzmocnią twój organizm, poprawią koordynację i z pewnością\r\n            pozytywnie wpłyną na samopoczucie. To dobry sposób o zadbanie o\r\n            swoje ciało :)\r\n          </p>\r\n          <p>\r\n            Będzie to miła forma spędzania czasu. Zadbaj o siebie razem z nami,\r\n            poczuj satysfakcję i więcej PEWNOŚCI !!!\r\n          </p>\r\n          <p>\r\n            Zobaczcie jak w duchu Body Groove, bawią się inni:\r\n            <a\r\n              href="https://fb.watch/mAKn3WXt0f/"\r\n    title="Otwiera się w nowej zakładce."          target="_blank"\r\n              rel="noopener noreferrer"\r\n            >\r\n              https://fb.watch/mAKn3WXt0f/\r\n            </a>\r\n          </p><p>Pierwsze otwarte zajęcia, odbędą się <b>5 października od godz. 18.30</b>.</p>',
//     isCustomLinkToDetails: false,
//     customLinkToDetails: '',
//     images: [
//       {
//         url: 'activities_image_016.jpg',
//         alt: 'Kolorowe postacie kobiet, wykonujących ruch taneczny.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//     ],
//     occurrence: [
//       {
//         id: 'f54e7aa7-z3u4-4881-fff5-ce52gegz5988',
//         day: 'THURSDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T18:45:00.968Z'),
//             activityEnd: new Date('2000-01-01T20:00:00.968Z'),
//           },
//         ],
//       },
//     ],
//     places: ['DANCING_ROOM'],
//     isToBePublished: true,
//     createdAt: new Date('2023-08-10T11:00:24.968Z'),
//     updatedAt: new Date('2023-08-10T11:00:24.968Z'),
//     authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
//     isExpiresAtRequired: true,
//     expiresAt: new Date('2025-08-10T11:00:24.968Z'),
//   },
//   {
//     id: '843w7r17-0uu4-4jj1-fff5-c36b4endh841',
//     name: 'Warsztaty kreatywne "Przestrzeń sztuki"',
//     activityTypes: ['PLASTICITY'],
//     activitiesForWhom: ['TEENS', 'ADULTS', 'SENIORS', 'WOMEN'],
//     shortDescription: 'Kurs malarstwa i rysunku dla młodzieży i dorosłych.',
//     longDescription:
//       '          <p>\r\n            <b>Warsztaty kreatywne „PRZESTRZEŃ SZTUKI” - malarstwo i rysunek</b>\r\n          </p>\r\n          <p>\r\n            Prowadząca: <b>SYLWIA LIPINA</b>\r\n          </p>\r\n          <p>\r\n            Artystka sztuk pięknych, projektantka graficzna, historyczka sztuki.\r\n            Jest abslowentką BA (HONS) Fine Art - University of the Arts London,\r\n            Chelsea College of Art and Design, HNC Diploma in Art and Design -\r\n            Southampton City College oraz Studia Podyplomowe z Historii Sztuki -\r\n            Uniwersytet Śląski w Katowicach.\r\n          </p>\r\n          <p>\r\n            Spotkania oscylujące wokół malarstwa akwarelowego, akrylowego oraz\r\n            rysunku. Zapoznanie z historią sztuki (interpretacja dzieła,\r\n            estetyka dzieła, ikonografia, ikonologia), rozumienia koła kolorów,\r\n            podstawowe zasady perspektywy i kompozycji.\r\n          </p>\r\n          <p>\r\n            Celem warsztatów jest włączenie w kreatywne działania społeczność\r\n            dorosłych i seniorów, oraz dzieci i młodzieży w wieku 13+.\r\n            Działania zorientowane są wokół hasła „kreatywność przez całe\r\n            życie” i prowokują do rozwoju umiejętności praktycznych,\r\n            interpersonalnych, rozwój umiejętności analitycznych, krytycznego\r\n            myślenia, dyskusji prowadzących do wzajemnego inspirowania i\r\n            motywowania, terapia sztuką.\r\n          </p>\r\n          <p>Jakie kompetencje zdobędziesz podczas warsztatów:</p>\r\n          <ul>\r\n            <li>\r\n              Zrozumienie wartości twórczego wyrażania i komunikowania idei\r\n              ,znaczeń i emocji.\r\n            </li>\r\n            <li>\r\n              Podnoszenie świadomości kulturowej i chęci uczestnictwa w\r\n              doświadczeniach kulturalnych.\r\n            </li>\r\n            <li>\r\n              Umiejętności praktyczne, praca z materiałem, metodyczna praca,\r\n              proces twórczy.\r\n            </li>\r\n            <li>Umiejętność interpretacji dzieła sztuki.</li>\r\n            <li>\r\n              Wzrost umiejętności interpersonalnych, komunikacji werbalnej i\r\n              niewerbalnej.\r\n            </li>\r\n            <li>Wykorzystanie sztuki jako terapii.</li>\r\n          </ul>',
//     isCustomLinkToDetails: false,
//     customLinkToDetails: '',
//     images: [
//       {
//         url: 'activities_image_001.jpg',
//         alt: 'Malarstwo: Dreamscape. Obraz akrylowy na płótnie. Praca autorstwa Sylwii Lipiny.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//       {
//         url: 'activities_image_002.jpg',
//         alt: 'Malarstwo: Submerged no.1. Obraz olejny na płótnie. Praca autorstwa Sylwii Lipiny.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//       {
//         url: 'activities_image_003.jpg',
//         alt: 'Grafika: Orbit - malarstwo poddane obróbce graficznej. Praca autorstwa Sylwii Lipiny.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//     ],
//     occurrence: [
//       {
//         id: 'f54wed17-z3u4-ht81-fff5-ce528egzh848',
//         day: 'TUESDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T17:00:00.968Z'),
//             activityEnd: new Date('2000-01-01T20:00:00.968Z'),
//           },
//         ],
//       },
//     ],
//     places: ['ART_ROOM'],
//     isToBePublished: true,
//     createdAt: new Date('2023-08-10T11:00:24.968Z'),
//     updatedAt: new Date('2023-08-10T11:00:24.968Z'),
//     authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
//     isExpiresAtRequired: true,
//     expiresAt: new Date('2025-08-10T11:00:24.968Z'),
//   },
//   {
//     id: '833w7r17-0uu4-4jj1-fff5-c3fb4endh8s1',
//     name: 'Kreatywna plastyka dla dzieci.',
//     activityTypes: ['PLASTICITY'],
//     activitiesForWhom: ['CHILDREN'],
//     shortDescription:
//       'Kreatywne zajęcia plastyczne dla dzieci w wieku 6 - 10 lat',
//     longDescription:
//       "          <p>\r\n            Prowadząca: <b>AGATA NIŹNIKIEWICZ</b>\r\n          </p>\r\n          <p>\r\n            Kreatywne zajęcia plastyczne to warsztaty mające na celu\r\n            wszechstronne rozwinięcie zdolności manualnych dzieci oraz\r\n            zainteresowanie ich sztuką i kulturą. Podczas warsztatów uczestnicy\r\n            poznają różne techniki plastyczne, uczą się łączyć je ze sobą oraz\r\n            twórczo wykorzystywać.\r\n          </p>\r\n          <p>Zajęcia także ćwiczą skupienie i cierpliwość podczas pracy.</p>\r\n          <p>\r\n            Przyjazna atmosfera i małe grupy sprzyjają integracji wśród\r\n            uczestników, pozwalają poczuć się swobodnie na zajęciach i tym samym\r\n            odkryć swoje talenty!\r\n          </p>\r\n          <br />\r\n          <p>\r\n            <b>Agata Niźnikiewicz</b> - artystka, graficzka, fotografka i\r\n            pedagog.\r\n          </p>\r\n          <p>\r\n            Absolwentka Akademii Sztuk Pięknych w Katowicach (kier. grafika\r\n            warsztatowa), Akademii Sztuk Pięknych we Wrocławiu (kier. fotografia\r\n            i multimedia), Instytutu Studiów Podyplomowych Wyższej Szkoły Nauk\r\n            Pedagogicznych (studia podyplomowe z przygotowania pedagogicznego).\r\n          </p>\r\n          <p>\r\n            Jest autorką wielu projektów artystycznych, prezentowanych na\r\n            licznych wystawach:\r\n          </p>\r\n          <ul>\r\n            <li>\r\n              WYSTAWY INDYWIDUALNE: ● Connect, Teoria w Katowicach. ● Subtelne\r\n              Formy, Galeria Sztukateria w Knurowie ● Subtelne Formy, Galeria\r\n              Tłustym Drukiem w Łodzi\r\n            </li>\r\n            <li>\r\n              WYSTAWY ZBIOROWE ● Cyberfoto, Regionalny Ośrodek Kultury w\r\n              Częstochowie ● Relations/Young Wave, Galeria Foto-Gen we Wrocławiu\r\n              ● Human / Człowiek, Sztukateria w Knurowie ● Wystaw się w CSW\r\n              2018, Centrum Sztuki Współczesnej w Toruniu ● Grafika Roku, Rondo\r\n              Sztuki w Katowicach ● Młoda Sztuka w Starym Mieście, New Era Art w\r\n              Krakowie ● Prace dyplomowe, Galerii Sztuki Współczesnej BWA w\r\n              Katowicach ● Wystaw się w CSW 2017, Centrum Sztuki Współczesnej w\r\n              Toruniu\r\n            </li>\r\n            <li>\r\n              WYSTAWY MIĘDZYNARODOWE ● Unobvious, Suwon Photo Korea Południowa.\r\n              ● 16. Międzynarodowe Triennale Grafiki Małe Formy, Miejska Galeria\r\n              Sztuki w Łodzi ● Platform Project, Fronteer Athens School of Fine\r\n              Arts{' '}\r\n            </li>\r\n            <li>\r\n              NAGRODY ● Honorowy Medal 16. Międzynarodowych Triennale Małe Formy\r\n              Grafiki, Polska-Łódź\r\n            </li>\r\n          </ul>",
//     isCustomLinkToDetails: false,
//     customLinkToDetails: '',

//     images: [
//       {
//         url: 'activities_image_007.jpg',
//         alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//       {
//         url: 'activities_image_008.jpg',
//         alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//       {
//         url: 'activities_image_009.jpg',
//         alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//       {
//         url: 'activities_image_010.jpg',
//         alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//       {
//         url: 'activities_image_011.jpg',
//         alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//     ],

//     occurrence: [
//       {
//         id: '22awed17-z454-ht81-dfr5-cefr8egzh199',
//         day: 'MONDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T16:30:00.968Z'),
//             activityEnd: new Date('2000-01-01T18:00:00.968Z'),
//           },
//         ],
//       },
//       {
//         id: 'f54wed17-z454-ht81-fff5-cefr8egzh148',
//         day: 'WEDNESDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T16:00:00.968Z'),
//             activityEnd: new Date('2000-01-01T17:30:00.968Z'),
//           },
//         ],
//       },
//     ],
//     places: ['ART_ROOM'],
//     isToBePublished: true,
//     createdAt: new Date('2023-08-10T11:00:24.968Z'),
//     updatedAt: new Date('2023-08-10T11:00:24.968Z'),
//     authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
//     isExpiresAtRequired: true,
//     expiresAt: new Date('2025-08-10T11:00:24.968Z'),
//   },
//   {
//     id: '836727r17-tdu4-4jj1-fff5-c3fb4endh8s1',
//     name: 'Grafika warsztatowa dla młodzieży.',
//     activityTypes: ['PLASTICITY'],
//     activitiesForWhom: ['TEENS'],
//     shortDescription:
//       'Warsztaty z tradycyjnych technik drukarskich w nowoczesnym wydaniu.',
//     longDescription:
//       " <p>\r\n            Prowadząca: <b>AGATA NIŹNIKIEWICZ</b>\r\n          </p>\r\n          <p>\r\n            Zapraszamy na warsztaty z tradycyjnych technik drukarskich w\r\n            nowoczesnym wydaniu.\r\n          </p>\r\n          <p>\r\n            Podczas zajęć uczestnicy poznają linoryt, technikę suchej igły czy\r\n            mezzotintę, a następnie nauczą się wykorzystywać ich potencjał\r\n            wizualny do tworzenia wyjątkowych grafik.\r\n          </p>\r\n          <p>\r\n            Uczestnicy własnoręcznie wykonują matrycę, pokrywają ją farbą, a za\r\n            pomocą prasy drukarskiej przenoszą wizerunek z matrycy na papier.\r\n            Gotowe prace planujemy systematycznie prezentować w formie wystaw\r\n            stacjonarnych i instalacji multimedialnych. Zajęcia obejmują także\r\n            podstawy rysunku i kompozycji, aby umożliwić uczestnikom tworzenie\r\n            własnych świadomych i przemyślanych projektów.\r\n          </p>\r\n\r\n          <p>\r\n            <b>Agata Niźnikiewicz</b> - artystka, graficzka, fotografka i\r\n            pedagog.\r\n          </p>\r\n          <p>\r\n            Absolwentka Akademii Sztuk Pięknych w Katowicach (kier. grafika\r\n            warsztatowa), Akademii Sztuk Pięknych we Wrocławiu (kier. fotografia\r\n            i multimedia), Instytutu Studiów Podyplomowych Wyższej Szkoły Nauk\r\n            Pedagogicznych (studia podyplomowe z przygotowania pedagogicznego).\r\n          </p>\r\n\r\n          <p>\r\n            Jest autorką wielu projektów artystycznych, prezentowanych na\r\n            licznych wystawach:\r\n          </p>\r\n          <ul>\r\n            <li>\r\n              WYSTAWY INDYWIDUALNE: ● Connect, Teoria w Katowicach. ● Subtelne\r\n              Formy, Galeria Sztukateria w Knurowie ● Subtelne Formy, Galeria\r\n              Tłustym Drukiem w Łodzi\r\n            </li>\r\n            <li>\r\n              WYSTAWY ZBIOROWE ● Cyberfoto, Regionalny Ośrodek Kultury w\r\n              Częstochowie ● Relations/Young Wave, Galeria Foto-Gen we Wrocławiu\r\n              ● Human / Człowiek, Sztukateria w Knurowie ● Wystaw się w CSW\r\n              2018, Centrum Sztuki Współczesnej w Toruniu ● Grafika Roku, Rondo\r\n              Sztuki w Katowicach ● Młoda Sztuka w Starym Mieście, New Era Art w\r\n              Krakowie ● Prace dyplomowe, Galerii Sztuki Współczesnej BWA w\r\n              Katowicach ● Wystaw się w CSW 2017, Centrum Sztuki Współczesnej w\r\n              Toruniu\r\n            </li>\r\n            <li>\r\n              WYSTAWY MIĘDZYNARODOWE ● Unobvious, Suwon Photo Korea Południowa.\r\n              ● 16. Międzynarodowe Triennale Grafiki Małe Formy, Miejska Galeria\r\n              Sztuki w Łodzi ● Platform Project, Fronteer Athens School of Fine\r\n              Arts{' '}\r\n            </li>\r\n            <li>\r\n              NAGRODY ● Honorowy Medal 16. Międzynarodowych Triennale Małe Formy\r\n              Grafiki, Polska-Łódź\r\n            </li>\r\n          </ul>",
//     isCustomLinkToDetails: false,
//     customLinkToDetails: '',

//     images: [
//       {
//         url: 'activities_image_012.jpg',
//         alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//       {
//         url: 'activities_image_013.jpg',
//         alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//       {
//         url: 'activities_image_014.jpg',
//         alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//       {
//         url: 'activities_image_015.jpg',
//         alt: 'Wybrane prace dzieci, które powstawały pod kierunkiem Agaty Niźnikiewicz.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//     ],

//     occurrence: [
//       {
//         id: 'f54we877-z454-hdd1-fff5-cefr87gzh148',
//         day: 'WEDNESDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T17:45:00.968Z'),
//             activityEnd: new Date('2000-01-01T19:45:00.968Z'),
//           },
//         ],
//       },
//     ],
//     places: ['ART_ROOM'],
//     isToBePublished: true,
//     createdAt: new Date('2023-08-10T11:00:24.968Z'),
//     updatedAt: new Date('2023-08-10T11:00:24.968Z'),
//     authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
//     isExpiresAtRequired: true,
//     expiresAt: new Date('2025-08-10T11:00:24.968Z'),
//   },
//   {
//     id: '836723r17-4du4-4jj1-fff5-c3fb4endg8s1',
//     name: 'Młody projektant wnętrz.',
//     activityTypes: ['PLASTICITY'],
//     activitiesForWhom: ['TEENS', 'ADULTS'],
//     shortDescription:
//       'Młody projektant wnętrz - rozwijaj swoją kreatywność, wyobraźnię, poznaj modelowanie 3D i stwórz swój pierwszy projekt wnętrza!',
//     longDescription:
//       '<p>\r\n            Prowadząca: <b>AGNIESZKA BALA</b>\r\n          </p>\r\n          <p>\r\n            Młody projektant wnętrz - rozwijaj swoją kreatywność, wyobraźnię,\r\n            poznaj modelowanie 3D i stwórz swój pierwszy projekt wnętrza!\r\n          </p>\r\n          <p>Nasze zajęcia obejmują:</p>\r\n          <ul>\r\n            <li>\r\n              wstęp - czym jest projektowanie, czym jest design, krótka historia\r\n              sztuki\r\n            </li>\r\n            <li>proces projektowania</li>\r\n            <li>style w aranżacji wnętrz</li>\r\n            <li>wpływ światła na wnętrze</li>\r\n            <li>nauka obsługi programu do projektowania wnętrz</li>\r\n            <li>wizualizacje</li>\r\n          </ul>\r\n          <p>\r\n            Zajęcia w formie prezentacji, pracy w grupie, pracy indywidualnej.\r\n          </p>\r\n          <p>\r\n            Praca na makiecie, praca z &quot;kartką i ołówkiem&quot; szkice,\r\n            praca z mood boardem (tablica inspiracji) praca w programach (trzeba\r\n            mieć swój laptop).\r\n          </p><p ><b>Początek zajęć w październiku.</b></p>',
//     isCustomLinkToDetails: false,
//     customLinkToDetails: '',

//     images: [
//       {
//         url: 'artcafe_006.jpg',
//         alt: 'Zdjęcie wnętrza Art Cafe.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//       {
//         url: 'artcafe_004.jpg',
//         alt: 'Zbliżenie huśtawki w Art Cafe.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//       {
//         url: 'artcafe_007.jpg',
//         alt: 'Zdjęcie wnętrza Art Cafe.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//     ],

//     occurrence: [
//       {
//         id: 'f88we877-z454-89d1-fff5-cefr87g22148',
//         day: 'THURSDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T18:00:00.968Z'),
//             activityEnd: new Date('2000-01-01T20:00:00.968Z'),
//           },
//         ],
//       },
//     ],
//     places: ['ART_ROOM'],
//     isToBePublished: true,
//     createdAt: new Date('2023-08-10T11:00:24.968Z'),
//     updatedAt: new Date('2023-08-10T11:00:24.968Z'),
//     authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
//     isExpiresAtRequired: true,
//     expiresAt: new Date('2025-08-10T11:00:24.968Z'),
//   },
//   {
//     id: 'aa6723r17-4du4-7uj1-fff5-c3fb4endg9fr',
//     name: 'Akrobatyka dla dzieci i młodzieży.',
//     activityTypes: ['RECREATION', 'EDUCATION', 'DANCE', 'OTHERS'],
//     activitiesForWhom: ['CHILDREN', 'TEENS'],
//     shortDescription:
//       'Treningi akrobatyczne dla lepszego rozwoju Twojego dziecka.',
//     longDescription:
//       '          <div>\r\n            <p>\r\n              Zapraszamy na absolutną nowość w ofercie naszej instytucji, jaką\r\n              są treningi akrobatyczne.\r\n            </p>\r\n            <p>\r\n              Zajęcia poprowadzi doświadczona instruktorka akrobatyki:\r\n              <b> Kimi Łagowska</b>.\r\n            </p>\r\n            <p>\r\n              Treningi akrobatyczne pomagają pokonywać własne lęki i słabości,\r\n              kształtują charakter i są wspaniałą nauką dyscypliny oraz\r\n              skupienia. Kolejne udane elementy (przewroty, gwiazdy, stanie na\r\n              głowie czy rękach, mostki, przejścia, fliki) budują samoocenę i\r\n              dodają pewności siebie. Dziecko staje się bardziej zwinne,\r\n              silniejsze, nabiera większej świadomości ciała i szybciej opanuje\r\n              różne zadania koordynacyjne w sporcie, w tańcu i życiu codziennym.\r\n            </p>\r\n            <p>\r\n              Zajęcia rozpoczynają się <b>30.09</b> i odbywać się będą w każdą\r\n              sobotę w czterech odrębnych grupach.\r\n            </p>\r\n            <p>\r\n              Dla bezpieczeństwa i komfortu dzieci, grupy nie będą przekraczały\r\n              14 osób.\r\n            </p>\r\n            <p>\r\n              Koszt: 70 pln za miesiąc. Pierwsze zajęcia <b>30.09</b> są\r\n              zajęciami <b>bezpłatnymi</b>.\r\n            </p>\r\n          </div>',
//     isCustomLinkToDetails: false,
//     customLinkToDetails: '',

//     images: [
//       {
//         url: 'activities_image_017.jpg',
//         alt: 'Instruktorka akrobatyki w trakcie ćwiczeń z dziećmi na sali gimnastycznej.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//       {
//         url: 'activities_image_018.jpg',
//         alt: 'Instruktorka akrobatyki w trakcie ćwiczeń z dziećmi na sali gimnastycznej.',
//         additionInfoThatMustBeDisplayed: null,
//       },
//       {
//         url: 'activities_image_019.jpg',
//         alt: 'Instruktorka akrobatyki w trakcie ćwiczeń z dziećmi na sali gimnastycznej.',
//         additionInfoThatMustBeDisplayed: 'lagowski.foto.pl',
//       },
//     ],

//     occurrence: [
//       {
//         id: 'aaawe877-z4rt-89d1-fff5-cefr87g22wed',
//         day: 'SATURDAY',
//         duration: [
//           {
//             activityStart: new Date('2000-01-01T11:00:00.968Z'),
//             activityEnd: new Date('2000-01-01T12:30:00.968Z'),
//           },
//           {
//             activityStart: new Date('2000-01-01T12:30:00.968Z'),
//             activityEnd: new Date('2000-01-01T14:00:00.968Z'),
//           },
//           {
//             activityStart: new Date('2000-01-01T14:15:00.968Z'),
//             activityEnd: new Date('2000-01-01T15:45:00.968Z'),
//           },
//           {
//             activityStart: new Date('2000-01-01T15:45:00.968Z'),
//             activityEnd: new Date('2000-01-01T17:15:00.968Z'),
//           },
//         ],
//       },
//     ],
//     places: ['DANCING_ROOM'],
//     isToBePublished: true,
//     createdAt: new Date('2023-08-10T11:00:24.968Z'),
//     updatedAt: new Date('2023-08-10T11:00:24.968Z'),
//     authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
//     isExpiresAtRequired: true,
//     expiresAt: new Date('2025-08-10T11:00:24.968Z'),
//   },
// ];
