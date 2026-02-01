import { TArtisticGroup } from '@/types';
import { create } from 'zustand';

const artisticGroups: TArtisticGroup[] = [
  {
    id: '2',
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    createdAt: new Date('2026-01-30'),
    title: 'Marzenie mini mini',
    updatedAt: new Date('2026-01-30'),
    isToBePublished: true,
    detailedDescription: `Celem zajęć jest kształtowanie prawidłowej postawy i nauka koordynacji ruchowej w rytm muzyki. Pracujemy nad poprawą mięśni. Ćwicząc i bawiąc się z dziećmi, wspomagamy ich rozwój psychoruchowy. Kształtujemy poczucie równowagi, stabilizując ciało.

Dzięki naszym zajęciom najmłodsze dzieci podnoszą wszechstronną sprawność fizyczną, rozwijają wszystkie cechy motoryki (siła, szybkość, zręczność, wytrzymałość) oraz umiejętności taneczne, mające zastosowanie w naszych artystycznych zespołach 😊

Zabawy taneczne i tańce kształtują świadomy ruch, prawidłowy oddech, rozwijają myślenie, spostrzegawczość, koncentrację, wyobraźnię i inteligencję twórczą, wpływają na umiejętność komunikowania się, sprzyjając tym samym nabywaniu kompetencji społecznych.

Dzieci bardzo lubią tańczyć, a wiele zabaw połączonych z ruchem i tańcem podejmują spontanicznie. Taniec jest naturalnym zjawiskiem podnoszącym poziom endorfin, a przyjemność czerpana z ruchu prowadzonego w parze z muzyką zwiększa radość dziecka!


Prowadzenie: Natalia Tomecka

Zajęcia: wtorek - godz. 16.45 - 17.45 i czwartek - godz. 15.30-16.30`,
    images: [
      {
        url: '2025_12_20__event___t2swgmno2o9zi3xi3ogckk.jpg',
        alt: 'etyhty',
        additionInfoThatMustBeDisplayed: null,
      },
    ],
  },
  {
    id: '3',
    authorId: '4943cb73-9db3-4055-b5d8-67ecd96a43ef',
    createdAt: new Date('2026-01-31'),
    title: 'Marzenie bis',
    updatedAt: new Date('2026-01-31'),
    isToBePublished: true,
    detailedDescription: `Stylizowany taniec, zaadaptowany do potrzeb scenicznych jest naszym przedmiotem pracy. Bierzemy na warsztat cechy charakterystyczne różnych tańców: cygańskiego, arabskiego, marynarskiego, chińskiego i wielu, wielu innych. Tworzymy miniatury, w których muzyka, choreografia i kostium tworzą spójność. Opowiadamy poprzez taniec historię, zdarza się, że przechodzimy w Teatr Tańca!

Dzięki temu stylowi każdego sezonu tańczymy coś nowego, rozwijamy swoją wyobraźnię, wyrażamy myśli i uczucia. Uczymy się wiele technik, co pozwala nam poczuć satysfakcję i radość z ruchu.

Taniec spełnia wielorakie funkcje: zaspakaja doznania duchowe i estetyczne, jest kulturalną rozrywką, a nawet formą treningu sprawności fizycznej. Dlatego też należy do najbardziej relaksujących form spędzania wolnego czasu. Taniec wyzwala endorfiny, dlatego też zapisz się na zajęcia taneczne i poczuj radość płynącą z tańca!


Prowadzenie: Natalia Tomecka

Zajęcia: wtorek - godz. 18.00-19.30 i czwartek - godz. 16.45-18.15`,
    images: [
      {
        url: 'https://witosa.s3.eu-north-1.amazonaws.com/groups_marzenie_bis_001.jpg',
        alt: 'etyhty',
        additionInfoThatMustBeDisplayed: null,
      },
      {
        // id: 'f7c1ad00-85c9-479f-8215-b6e02722ce71',
        url: 'https://witosa.s3.eu-north-1.amazonaws.com/groups_marzenie_bis_002.jpgg',
        alt: 'etyhty',
        additionInfoThatMustBeDisplayed: null,
        // artisticGroupId: '7cbaebe3-51af-438c-b997-937330eed8d8',
        // index: 0,
      },
    ],
  },
];

interface ArtisticGroupsStore {
  artisticGroups: TArtisticGroup[];
  getArtisticGroup: (title: string) => TArtisticGroup | undefined;
}

export const useArtisticGroupsStore = create<ArtisticGroupsStore>()(
  (set, get) => ({
    artisticGroups: artisticGroups,
    getArtisticGroup: (title: string) =>
      get().artisticGroups.find((group) => group.title === title),
  })
);
